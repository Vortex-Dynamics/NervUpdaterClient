// You can also put expose this code to the renderer
// process with the `contextBridge` API
const { ipcRenderer } = require('electron')

ipcRenderer.on('github-lookup', (_event, arg) => {
  console.log(arg) // prints "pong" in the DevTools console
})