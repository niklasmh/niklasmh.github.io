require('dotenv').config()
const electron = require('electron')
const serve = require('electron-serve')

const { app, BrowserWindow } = electron
const loadURL = serve({ directory: `${__dirname}/build` })
const isDevelopment = process.env.NODE_ENV !== 'production'

app.on('ready', () => {
  let options = {}

  if (!isDevelopment) {
    options = {
      autoHideMenuBar: true
    }
  }

  let mainWindow = new BrowserWindow(options)

  if (isDevelopment) {
    mainWindow.webContents.openDevTools()
    mainWindow.loadURL(`http://localhost:${process.env.PORT}`)
  } else {
    loadURL(mainWindow)
  }

  mainWindow.on('closed', () => {
    mainWindow = null
    app.quit()
  })
})
