import Text from './classes/Text.js';
import canvas from './canvas.js';

class CounterFPS extends Text {
    constructor() {
        super('FPS', canvas.width - 2, canvas.height - 12, {size: 10, font: 'PTSans', align: 'right'});
        this.updateTimeoutFPS = 500;
        this.currentTimeFPS = 0;
        this.frameCounter = 0;
    }

    update(dt) {
        this.frameCounter++;
        this.currentTimeFPS += dt;
        if (this.currentTimeFPS >= this.updateTimeoutFPS) {
            const FPS = `FPS: ${((this.frameCounter / this.currentTimeFPS) * 1000).toFixed(2)}`;
            this.render(FPS);
            this.frameCounter = 0;
            this.currentTimeFPS = 0;
        }
        this.draw();
    }
}

const counterFPS =  new CounterFPS();
export default counterFPS;