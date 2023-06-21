import Text from "../../engine/classes/Text.js";
import canvas from "../../engine/canvas.js";

class IntroText extends Text {
    constructor(text, x, y, fontSize, delayTime, hideShowTime, visibleTime) {
        super(text, x, y, {size: fontSize, font: 'MicraDi', color: '#ffffff', align: 'center'});
        this.shadowColor = '#0000ff';
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

        canvas.context.save();
        if (this.alpha < 1) canvas.context.globalAlpha = this.alpha;
        canvas.context.shadowBlur  = 5;
        canvas.context.shadowColor = this.shadowColor;
        canvas.context.globalCompositeOperation = 'lighter';
        this.draw();
        canvas.context.restore();
    }
}

export default IntroText;