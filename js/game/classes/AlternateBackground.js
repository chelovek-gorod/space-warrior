import Sprite from '../../engine/classes/Sprite.js';
import canvas from '../../engine/canvas.js';

class AlternateBackground extends Sprite {
    constructor(imageName, x, y, offsetY, scrollSpeed, rotationSpeed = 0) {
        super(imageName, x, y);
        this.offsetY = offsetY;
        this.scrollSpeed = scrollSpeed;
        this.rotationSpeed = rotationSpeed;
    }

    update(dt) {
        if (this.rotationSpeed) this.direction += this.rotationSpeed;

        this.centerY += this.scrollSpeed * dt;
        if (this.centerY - this.halfHeight > canvas.height) {
            this.centerY -= (this.offsetY + canvas.height);
        }

        if (this.centerY + this.halfHeight > 0 && this.centerY - this.halfHeight < canvas.height) {
            this.draw();
        }
    }
}

export default AlternateBackground;