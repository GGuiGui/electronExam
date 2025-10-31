const { app, BrowserWindow, ipcMain, dialog } = require('electron/main');
const path = require('node:path');
const https = require('https');
const http = require('http');

let windows = []; // 열린 창들을 저장할 배열

const createWindow = (url) => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });
  if (!url) {
    url = './UI/index.html';
    win.loadFile(url);

    // 창이 닫히면 배열에서 제거
    win.on('closed', () => {
      windows = windows.filter((w) => w !== win);
    });

    windows.push(win);
  } else {
    if (/^https?:\/\//i.test(url)) {
      const protocol = url.startsWith('https') ? https : http;

      protocol
        .get(url, (res) => {
          if (res.statusCode === 200) {
            win.loadURL(url);

            // 창이 닫히면 배열에서 제거
            win.on('closed', () => {
              windows = windows.filter((w) => w !== win);
            });

            windows.push(win);
          } else {
            dialog.showErrorBox('접속 실패', `요청 실패: ${res.statusCode}`);
            win.close();
            return;
          }
        })
        .on('error', (err) => {
          dialog.showErrorBox('접속 오류', `요청 중 오류 발생:\n${err.message}`);
          win.close();
          return;
        });

      return;
    } else {
      win.close();
      return;
    }
  }
};

app.whenReady().then(() => {
  console.log('app Ready Check: [', app.isReady(), ']');

  ipcMain.handle('openNewWindow', (event, url) => {
    console.log('Input URL:', url);
    createWindow(url);
  });
  if (windows.length == 0) createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
  /*
    맥 환경일때 윈도우 창이 없는 경우 새로운 창을 생성시키기[맥에서는 app 종료가 안되게 했으므로]
  */
});

/*
    app.on('ready', () => {}); => app의 ready 이벤트에 후속 작업을 넣는 방식

    app.whenReady().then( () => {}); => 일렉트로닉에서 app 준비 완료시 whenReady()를 호출함 그 파라미터에 promise를 추가하는 방식
    - app.isReady()
        Returns boolean - true if Electron has finished initializing, false otherwise. See also app.whenReady().
    - app.whenReady()
        Returns Promise<void> - fulfilled when Electron is initialized. May be used as a convenient alternative to checking app.isReady() and subscribing to the ready event if the app is not ready yet.
    
*/

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
/*
    맥에서는 모든 UI창을 닫아도 아래에 남아있는게 원래 형태이므로 맥만 quit() 제외[모든 창이 닫히면 프로세스가 quit 되게]
*/
