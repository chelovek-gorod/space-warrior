import Sprite from "../../engine/classes/Sprite.js";
import canvas from "../../engine/canvas.js";

class EnemyBullet extends Sprite {
    constructor(x, y, speed) {
        super('enemy_bullet_10x40px.png', x, y);
        this.speed = speed;
        this.isExist = true;
    }

    update(dt) {
        this.centerY += this.speed * dt;
        if (this.centerY > canvas.height + this.halfHeight) this.isExist = false;
        else this.draw();
    }
}

export default EnemyBullet;