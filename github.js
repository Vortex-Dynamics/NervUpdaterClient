const { Octokit, App } = require("octokit");
const {token} = require("./config/gittoken.json");

// Create a personal access token at https://github.com/settings/tokens/new?scopes=repo
var octokit;

/**
 * initializes githubs octokit to handle interactions with the github api
 * @param {Electron.BrowserWindow} mainWindow the main window for error handling
 */
let initGithub = async (mainWindow) => {

    octokit = new Octokit({auth: token});

    mainWindow.webContents.send("github-lookup", "logging in...");

    const { data: { login }, } = await octokit.rest.users.getAuthenticated().catch(async err => {
        if (err) {
            console.log(err);
            mainWindow.webContents.send("error-message", {label: "authentication failed", err: err})
        }
    });
}

/**
 * fetches the latest release on a set repository
 * @param {Electron.BrowserWindow} mainWindow the main window for error handling
 */
let fetchLatest = async (mainWindow, repo) => {
    let releases = await octokit.rest.repos.getLatestRelease(repo).catch(async err => {
        mainWindow.webContents.send("github-lookup", "no releases found");
    });

    if (releases != undefined) {
        console.log(releases.data.tag_name);
        if (releases.data.tag_name != "0.0.0") {
            mainWindow.webContents.send("github-update", {"tag": releases.data.tag_name});
        }
    }
}

module.exports = {initGithub, fetchLatest}