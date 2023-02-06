window.electronAPI.updateProgress(async (_event, value) => {
    console.log(_event)
    console.log(value)
    updateProgressStep(value);
})

function updateProgressBar(progress){
    document.getElementById("progress-bar").style.width = progress + "%";
    document.getElementById("progress-label").textContent = progress + "%";
}

function updateProgressStep(step){
    document.getElementById("progress-step").textContent = step;
}

function toggleDownloadButton(shown){
    let button = document.getElementById("download");

    if (shown) {
        button.style.display = "block";
    } else {
        button.style.display = "none";
    }
}

function toggleDownloadDisplay(shown){

    if (shown) {
        document.getElementById("download-section").style.display = "block";
    } else {
        document.getElementById("download-section").style.display = "none";
    }
}

