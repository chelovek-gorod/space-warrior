import TileSprite from '../../engine/classes/TileSprite.js';
import canvas from '../../engine/canvas.js';

function getRestProperties( imageHeight ) {
    const BGHeight = (Math.ceil(canvas.height / imageHeight) + 1) * imageHeight;
    const BGPositionY = -(BGHeight - canvas.height);
    return [BGPositionY, canvas.width, BGHeight, 'center', 'bottom'];
}

class SpaceBackground extends TileSprite {
    constructor( imageName, imageHeight, scrollSpeed ) {
        super(imageName, 0, ...getRestProperties( imageHeight ));
        this.restartY = this.y;
        this.scrollSpeed = scrollSpeed;
    }
    update(dt) {
        this.y += this.scrollSpeed * dt;
        if (this.y > 0) this.y -= this.restartY;
        this.draw();
    }
}

export default SpaceBackground;