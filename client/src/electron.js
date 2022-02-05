const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');

const startUrl = url.format({
    pathname: path.join(__dirname, '../dist/index.html'),
    protocol: 'file:',
    slashes: true
});

function createWindow(){
    const win = new BrowserWindow({
        width: 480,
        height: 800
    });

    win.loadURL(startUrl);
    win.maximize();
    win.removeMenu(true);
    win.setTitle('Sandchat');
}

app.on('ready', () => {
    createWindow();

    app.on('activate', () => {
        if(BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});