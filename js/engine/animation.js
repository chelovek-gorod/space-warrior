import canvas from './canvas.js';
import counterFPS from './counterFPS.js';
import counterPerformance from './counterPerformance.js';
import { playBgMusic, pauseBgMusic } from './sound.js';

let update = null; /* game loop function */

let isMusicPlayInOnblur = false;

let isFPSdisplay = false;
let isPerformanceDisplay = false;
let previousTimeStamp;
let animationRequest;

function setAnimation( callback, options = null ) {
    if (!callback) return;
    if (update === null) document.body.prepend(canvas.canvas);
    update = callback;

    if (options.isFPSdisplay) isFPSdisplay = true;
    if (options.isPerformanceDisplay) isPerformanceDisplay = true;
    if (options.isMusicPlayInOnblur) isMusicPlayInOnblur = true;

    if(animationRequest) cancelAnimationFrame(animationRequest);
    
    previousTimeStamp = performance.now();
    animationRequest = requestAnimationFrame(animation);
}

let isOnfocus = true; 

window.onblur = function() {
    isOnfocus = false;
    console.log('screen onblur');
    
    if (!isMusicPlayInOnblur) pauseBgMusic();
};

window.onfocus = function() {
    if (isOnfocus) return; // don't start animation twice
    isOnfocus = true;

    if(animationRequest) cancelAnimationFrame(animationRequest);
    previousTimeStamp = performance.now();
    animationRequest = requestAnimationFrame(animation);
    console.log('screen onfocus');

    if (!isMusicPlayInOnblur) playBgMusic();
}

function animation(timeStamp) {
    const dt = timeStamp - previousTimeStamp;
    previousTimeStamp = timeStamp;

    canvas.context.clearRect(0, 0, canvas.width, canvas.height);

    if (isPerformanceDisplay) counterPerformance.start();

    if (update) update(dt);

    if (isPerformanceDisplay) counterPerformance.update(dt);

    if (isFPSdisplay) counterFPS.update(dt);

    if (isOnfocus) animationRequest = requestAnimationFrame(animation);
}

export default setAnimation;