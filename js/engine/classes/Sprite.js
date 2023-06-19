import canvas from '../canvas.js';
import { IMG } from '../loader.js';

class Sprite {
    constructor(imageName, centerX, centerY) {
        this.img = IMG[imageName];
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = this.img.width;
        this.height = this.img.height;
        this.halfWidth = Math.floor(this.width / 2);
        this.halfHeight = Math.floor(this.height / 2);

        this.direction = 0;
    }

    draw() {
        if (this.direction === 0) {
            canvas.context.drawImage(
                this.img,
                this.centerX - this.halfWidth, 
                this.centerY - this.halfHeight
            );
        } else {
            canvas.context.setTransform(1, 0, 0, 1, this.centerX, this.centerY);
            canvas.context.rotate(this.direction);
            canvas.context.drawImage(this.img, -this.halfWidth, -this.halfHeight);
            canvas.context.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
}

export default Sprite;