require('./env');
const path = require('path');
const { app, BrowserWindow, ipcMain, dialog } = require('electron');
const url = require('url');

const { channels } = require('../src/shared/constants');

let mainWindow;

function createWindow() {
	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, '../index.html'),
			protocol: 'file:',
			slashes: true,
		});

	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			preload: path.join(__dirname, '/preloads/main.js'),
			nodeIntegration: false,
			nativeWindowOpen: true,
		},
	});

	mainWindow.loadURL(startUrl);
	mainWindow.webContents.openDevTools();

	mainWindow.on('closed', function() {
		mainWindow = null;
	});

	mainWindow.webContents.on(
		'new-window',
		(event, url, frameName, disposition, options, additionalFeatures) => {
			if (frameName === 'modal') {
				event.preventDefault();
				Object.assign(options, {
					modal: true,
					parent: mainWindow,
					resizable: false,
				});
				event.newGuest = new BrowserWindow(options);
				// event.newGuest.webContents.openDevTools();
			}
		}
	);
}

app.on('ready', createWindow);

app.on('window-all-closed', function() {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', function() {
	if (mainWindow === null) {
		createWindow();
	}
});

let hiddenWindow;
ipcMain.on(channels.project.GENERATE_REQUEST, (event, args) => {
	const backgroundFileUrl = url.format({
		pathname: path.join(__dirname, '../src/background/java.html'),
		protocol: 'file:',
		slashes: true,
	});

	hiddenWindow = new BrowserWindow({
		show: true,
		webPreferences: {
			nodeIntegration: true,
			preload: path.join(__dirname, '/preloads/java.js'),
		},
	});

	hiddenWindow.loadURL(backgroundFileUrl);
	hiddenWindow.webContents.openDevTools();

	hiddenWindow.on('closed', () => {
		hiddenWindow = null;
	});

	ipcMain.on(channels.project.BACKGROUND_READY, e => {
		e.reply(channels.project.GENERATE_PROJECT, args);
	});
});

ipcMain.on(channels.project.GENERATE_SUCCESS, (event, args) => {
	mainWindow.webContents.send(channels.project.GENERATE_SUCCESS, args);
	if (hiddenWindow) {
		hiddenWindow.close();
	}
});

ipcMain.on(channels.project.EXPORT, async (event, args) => {
	const { title } = args;

	console.log('chegou aqui');

	const savePath = await dialog.showSaveDialog(mainWindow, {
		filters: [{ name: 'Document do Word', extensions: ['docx'] }],
		defaultPath: title,
		properties: ['showOverwriteConfirmation'],
	});

	mainWindow.webContents.send(channels.project.EXPORT, savePath);
});

// filters: [
// 	{ name: 'Images', extensions: ['jpg', 'png', 'gif'] },
// 	{ name: 'Movies', extensions: ['mkv', 'avi', 'mp4'] },
// 	{ name: 'Custom File Type', extensions: ['as'] },
// 	{ name: 'All Files', extensions: ['*'] },
// ];
