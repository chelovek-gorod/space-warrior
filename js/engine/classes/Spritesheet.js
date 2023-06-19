import canvas from '../canvas.js';
import {IMG} from '../loader.js';

export class Spritesheet {
    constructor(imageName, centerX, centerY, frameWidth, frameHeight, frames, fps = 60) {
        this.img = IMG[imageName];
        this.centerX = centerX;
        this.centerY = centerY;
        this.width = frameWidth;
        this.height = frameHeight;
        this.halfWidth = Math.floor(this.width / 2);
        this.halfHeight = Math.floor(this.height / 2);
        
        this.framesArr = this.getFramesArr(frameWidth, frameHeight, frames);
        this.frame = 0
        this.frames = frames;
        this.nextFrameTimeout = Math.floor(1000 / fps);
        this.nextFrameTime = this.nextFrameTimeout;

        this.direction = 0;
    }

    getFramesArr(frameWidth, frameHeight, frames) {
        const framesArr = [];
        for( let yy = 0; yy < this.img.height; yy += frameHeight) {
            for( let xx = 0; xx < this.img.width; xx += frameWidth) {
                framesArr.push( {x: xx, y: yy} );
            }
        }
        framesArr.length = frames;
        return framesArr;
    }

    drawWithAnimation(dt) {
        this.nextFrameTime -= dt;
        if (this.nextFrameTime < 0) {
            this.nextFrameTime += this.nextFrameTimeout;
            this.frame++;
            if (this.frame === this.frames) this.frame = 0;
        }

        if (this.direction === 0) this.draw();
        else {
            canvas.context.setTransform(1, 0, 0, 1, this.centerX, this.centerY);
            canvas.context.rotate(this.direction);
            this.draw(-this.halfWidth, -this.halfHeight);
            canvas.context.setTransform(1, 0, 0, 1, 0, 0);
        }
    }

    draw(pointX = this.centerX - this.halfWidth, pointY = this.centerY - this.halfHeight) {
        canvas.context.drawImage(
            this.img,
            this.framesArr[this.frame].x, this.framesArr[this.frame].y, 
            this.width, this.height,
            pointX, pointY,
            this.width, this.height
        );
    }
}

export default Spritesheet;