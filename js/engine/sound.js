import { SE } from '../engine/loader.js';

const BG_MUSIC = new Audio();
BG_MUSIC.addEventListener('ended', playNextBgMusic);

let bgMusicIndex = 0;
let bgMusicArr = [];
let bgMusicPath = '';

function startBgMusic(path, musicArr, startMusicIndex = 0) {
    BG_MUSIC.pause();

    bgMusicIndex = (startMusicIndex < musicArr.length) ? startMusicIndex : 0;
    bgMusicPath = path;
    bgMusicArr = musicArr;

    playNextBgMusic();
}

function playNextBgMusic() {
    BG_MUSIC.src = bgMusicPath + bgMusicArr[bgMusicIndex];
    BG_MUSIC.play();
    bgMusicIndex++;
    if (bgMusicIndex === bgMusicArr.length) bgMusicIndex = 0;
}

function playBgMusic() { if(BG_MUSIC.src) BG_MUSIC.play(); }
function pauseBgMusic() { BG_MUSIC.pause(); }

// плеер звуковых эффектов
function playSound( soundName ) {
    SE[soundName].currentTime = 0;
    SE[soundName].play();
}

export {playSound, startBgMusic, playBgMusic, pauseBgMusic};