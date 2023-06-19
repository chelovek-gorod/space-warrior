const IMG = {/* fileName: Image */};
const SE = {/* fileName: Audio */};
const BGM = {/* path: string, arr: [file names] */};

let uploadSize = 0;
let uploadStep = 0;

function loader( sources, callback ) {
    uploadSize = sources.images.arr.length + sources.sounds.arr.length;

    const loadingStatusDiv = document.createElement('div');
    loadingStatusDiv.id = 'loadingStatusDiv';
    loadingStatusDiv.innerHTML = `Loaded files: ${uploadStep}/${uploadSize}`;
    document.body.append(loadingStatusDiv);

    sources.images.arr.forEach( imageName => uploadImage(imageName) );
    sources.sounds.arr.forEach( soundName => uploadSound(soundName) );
    BGM.path = sources.music.path;
    BGM.arr = sources.music.arr;

    function uploadImage(imageName) {
        IMG[imageName] = new Image();
        IMG[imageName].src = sources.images.path + imageName;
        IMG[imageName].onload = () => updateLoadingProgress();
    }

    function uploadSound(soundName) {
        SE[soundName] = new Audio();
        SE[soundName].src = sources.sounds.path + soundName;
        SE[soundName].oncanplaythrough = (event) => {
            event.target.oncanplaythrough = null; /* don't play */
            updateLoadingProgress();
        };
    }

    function updateLoadingProgress() {
        uploadStep++;
        loadingStatusDiv.innerHTML = `Loaded files: ${uploadStep}/${uploadSize}`;
        if (uploadStep === uploadSize) loadingDone();
    }

    function loadingDone() {
        uploadSize = 0;
        uploadStep = 0;
        loadingStatusDiv.remove();
        const startButton = document.createElement('button');
        startButton.id = 'startButton';
        startButton.innerHTML = 'START';
        startButton.onclick = function() {
            startButton.remove();
            callback();
        };
        document.body.append(startButton);
    }
}

export {loader, IMG, SE, BGM};