// Modules to control application life and create native browser window
const { app, BrowserWindow, webContents, ipcRenderer } = require('electron')
const { Octokit, App } = require("octokit");
const path = require('path')
const {token} = require("./gittoken.json");

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
const octokit = new Octokit({auth: token});

var mainWindow;

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        width: 600,
        height: 300,
        backgroundColor: '#2f3241',
        resizable: false,
        titleBarStyle: 'hidden',
        titleBarOverlay: true,
        titleBarOverlay: {
            color: '#2f3241',
            symbolColor: '#74b1be',
            height: 60
        },
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    mainWindow.loadFile('index.html')

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()
}

async function initGithub (){
    console.log(`token: %s`, token)
    mainWindow.webContents.send("github-lookup", "looking up releases");
    // Compare: https://docs.github.com/en/rest/reference/users#get-the-authenticated-user
    const { data: { login }, } = await octokit.rest.users.getAuthenticated().catch(async err => {
        if (err) {
            console.log(err);
            mainWindow.webContents.send("error-message", {label: "authentication failed", err: err})
        }
    });
    console.log("Hello, %s", login);
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(async () => {
    createWindow()
    initGithub()

    app.on('activate', async () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
            initGithub();
        }
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.