const { app, BrowserWindow, ipcMain } = require('electron/main');
const path = require('node:path');

let windows = []; // 열린 창들을 저장할 배열

const createWindow = () => {
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
    },
  });

  win.loadFile('index.html');

  win.on('closed', () => {
    windows = windows.filter((w) => w !== win);
  });

  windows.push(win);
};

console.log('app Ready Check: [', app.isReady(), ']');

app.whenReady().then(() => {
  console.log('app Ready Check: [', app.isReady(), ']');

  ipcMain.handle('ping', () => 'pong');

  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
