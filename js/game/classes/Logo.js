import Sprite from '../../engine/classes/Sprite.js';
import canvas from '../../engine/canvas.js';

class Logo extends Sprite {
    constructor(delayTime, hideShowTime, visibleTime) {
        super('MarsGameLogoDarkBg2k.png', canvas.centerX, canvas.centerY);
        this.delayTime = delayTime;
        this.showHideTime = hideShowTime;
        this.visibleTime = visibleTime;
        this.alphaStepPerMillisecond = 1 / this.showHideTime;
        this.visibleState = 'emerging'; // 'emerging', 'visible', 'disappearing'
        this.isExist = true;
        this.alpha = 0;
    }

    update(dt) {
        if (this.delayTime > 0) {
            this.delayTime -= dt;
            return;
        }

        switch (this.visibleState) {
            case 'emerging':
                this.alpha += this.alphaStepPerMillisecond * dt;
                if (this.alpha >= 1) {
                    this.alpha = 1;
                    this.visibleState = 'visible';
                }
            break;

            case 'visible':
                this.visibleTime -= dt;
                if (this.visibleTime <= 0) {
                    this.visibleState = 'disappearing';
                }
            break;

            default: // 'disappearing'
                this.alpha -= this.alphaStepPerMillisecond * dt;
                if (this.alpha <= 0) {
                    this.alpha = 0;
                    this.isExist = false;
                }
        }

        if (this.alpha < 1) {
            canvas.context.save();
            canvas.context.globalAlpha = this.alpha;
        }
        this.draw();
        if (this.alpha < 1) canvas.context.restore();
    }
}

export default Logo;