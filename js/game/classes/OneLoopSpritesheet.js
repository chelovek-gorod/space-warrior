import Spritesheet from "../../engine/classes/Spritesheet.js";

class OneLoopSpritesheet extends Spritesheet {
    constructor(imageName, centerX, centerY, frameWidth, frameHeight, frames, fps = 60) {
        super(imageName, centerX, centerY, frameWidth, frameHeight, frames, fps);
        this.direction = Math.random() * Math.PI * 2;
        this.isOnEnd = false;
        this.isExist = true;
    }

    update(dt) {
        this.drawWithAnimation(dt);
        if (this.frame === this.frames - 1) this.isExist = false;
    }
}

export default OneLoopSpritesheet;