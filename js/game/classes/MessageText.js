import Text from "../../engine/classes/Text.js";
import canvas from "../../engine/canvas.js";

class MessageText extends Text {
    constructor(text, x, y) {
        super(text, x, y, {size: 20, font: 'MicraDi', color: '#ffff00', align: 'center'});
        this.shadowColor = '#ff00ff';
        this.hideTime = 1500;
        this.visibleTime = 500;
        this.alphaStepPerMillisecond = 1 / this.hideTime;
        this.speedY = 0.02;

        this.isExist = true;
        this.alpha = 1;
    }

    update(dt) {
        this.y -= this.speedY * dt;

        if (this.alpha === 1) {
            this.visibleTime -= dt;
            if (this.visibleTime <= 0) this.alpha -= this.alphaStepPerMillisecond * dt;
        } else {
            this.alpha -= this.alphaStepPerMillisecond * dt;
        }

        if (this.alpha <= 0) {
            this.isExist = false;
            return;
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

export default MessageText;