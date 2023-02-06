window.electronAPI.updateProgress((_event, value) => {
    console.log(_event)
    console.log(value)
    updateProgressStep(value);
})

window.electronAPI.handleError((_event, value) => {
    let error = `
    <div class="titlebar">NCOS Companion</div>
    <div class="content">
        <h1 class="centered">An Error Occured</h1>
        <div class="row">
            <div class="col-12">
                <h4 class="centered">${value.label}</h4>
                <h4 class="centered">pleas report this to <a class="link" target="_blank" href="https://github.com/Vortex-Dynamics/NervUpdaterClient/issues">us</a></h4>
                <pre class="centered">${value.err}</pre>
            </div>
        </div>
    </div>
    `;

    document.querySelector("body").innerHTML = error;
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

