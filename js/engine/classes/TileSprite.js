import canvas from '../canvas.js';
import {IMG} from '../loader.js';

class TileSprite {
    constructor(imageName, x, y, width, height, horizontalAlign = 'left', verticalAlign = 'top') {
        this.tile = IMG[imageName];
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.halfWidth = Math.floor(this.width / 2);
        this.halfHeight = Math.floor(this.height / 2);
        this.img = document.createElement('canvas');
        this.img.width = this.width;
        this.img.height = this.height;
        this.ctx = this.img.getContext('2d');
        this.generateImage(width, height, horizontalAlign, verticalAlign);

        this.direction = 0;
    }

    generateImage(width, height, horizontalAlign, verticalAlign) {
        let offsetX = 0;
        let offsetY = 0;
        if (horizontalAlign === 'center') {
            if (width > this.tile.width) offsetX = -Math.floor( (this.tile.width - (width % this.tile.width)) / 2 );
            if (width < this.tile.width) offsetX = -Math.floor( (this.tile.width - width) / 2 );
        }
        if (horizontalAlign === 'right') {
            if (width > this.tile.width) offsetX = -(this.tile.width - (width % this.tile.width));
            if (width < this.tile.width) offsetX = -(this.tile.width - width);
        }
        if (verticalAlign === 'center') {
            if (height > this.tile.height) offsetY = -Math.floor( (this.tile.height - (height % this.tile.height)) / 2 );
            if (height < this.tile.height) offsetY = -Math.floor( (this.tile.height - height) / 2 );
        }
        if (verticalAlign === 'bottom') {
            if (height > this.tile.height) offsetY = -(this.tile.height - (height % this.tile.height));
            if (height < this.tile.height) offsetY = -(this.tile.height - height);
        }

        for( let yy = offsetY; yy < height; yy += this.tile.height) {
            for( let xx = offsetX; xx < width; xx += this.tile.width) {
                this.ctx.drawImage(this.tile, xx, yy);
            }
        }
    }

    // отрисовка изображения
    draw() {
        if (this.direction === 0) canvas.context.drawImage( this.img, this.x,  this.y);
        else {
            canvas.context.setTransform(1, 0, 0, 1, this.x + this.halfWidth, this.y + this.halfHeight);
            canvas.context.rotate(this.direction);
            canvas.context.drawImage(this.img, -this.halfWidth, -this.halfHeight);
            canvas.context.setTransform(1, 0, 0, 1, 0, 0);
        }
    }
}

export default TileSprite;