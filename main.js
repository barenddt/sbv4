"use strict";

// Import parts of electron to use
const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");
const { autoUpdater } = require("electron-updater");
const isDev = require("electron-is-dev");
var ipcMain = require("electron").ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let updateWindow;

autoUpdater.logger = require("electron-log");
autoUpdater.logger.transports.file.level = "info";

autoUpdater.on("checking-for-update", () => {
  console.log("Checking for updates...");
});

autoUpdater.on("update-available", info => {
  console.log("Update available");
  console.log("Version", info.version);
  console.log("Release Date", info.releaseDate);

  updateWindow = new BrowserWindow({
    width: 400,
    height: 160,
    title: "Updater",
    alwaysOnTop: true,
    autoHideMenuBar: true,
    minimizable: false,
    maximizable: false,
    closable: false
  });

  updateWindow.on("closed", () => {
    updateWindow = null;
  });

  updateWindow.loadURL("file://" + __dirname + "/update.html");

  if (isDev) {
    updateWindow.webContents.openDevTools();
  }
});

autoUpdater.on("update-not-available", () => {
  console.log("Update not available");
  createWindow();
});

autoUpdater.on("download-progress", progress => {
  console.log(`Progress ${Math.floor(progress.percent)}`);
});

autoUpdater.on("update-downloaded", info => {
  console.log("Update downloaded.");
  if (!isDev) {
    autoUpdater.quitAndInstall();
  }
});

autoUpdater.on("error", error => {
  createWindow();
  console.log(error);
});

// Keep a reference for dev mode
let dev = false;
if (
  process.defaultApp ||
  /[\\/]electron-prebuilt[\\/]/.test(process.execPath) ||
  /[\\/]electron[\\/]/.test(process.execPath)
) {
  dev = true;
}

function createWindow() {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    webPreferences: {
      webSecurity: false
    },
    width: 1024,
    height: 768,
    show: false,
    resizable: false,
    maximizable: false,
    autoHideMenuBar: true
  });

  // and load the index.html of the app.
  let indexPath;
  if (dev && process.argv.indexOf("--noDevServer") === -1) {
    indexPath = url.format({
      protocol: "http:",
      host: "localhost:8080",
      pathname: "index.html",
      slashes: true
    });
  } else {
    indexPath = url.format({
      protocol: "file:",
      pathname: path.join(__dirname, "files", "index.html"),
      slashes: true
    });
  }
  mainWindow.loadURL(indexPath);

  // Don't show until we are ready and loaded
  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
    // Open the DevTools automatically if developing
    if (isDev) {
      mainWindow.webContents.openDevTools();
    }
  });

  // Emitted when the window is closed.
  mainWindow.on("closed", function() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", () => {
  if (!isDev) {
    autoUpdater.checkForUpdates();
  }
  autoUpdater.checkForUpdates();
});

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});
