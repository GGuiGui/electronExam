const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electron', {
  openNewWindow: (url) => {
    console.log(url);
    ipcRenderer.invoke('openNewWindow', url);
  },
});
