import Sprite from "../../engine/classes/Sprite.js";

class PlayerBullet extends Sprite {
    constructor(x, y, speed, damage) {
        super('player_bullet_10x40px.png', x, y);
        this.speed = speed;
        this.damage = damage;
        this.isExist = true;
    }

    update(dt) {
        this.centerY -= this.speed * dt;
        if (this.centerY < -this.halfHeight) this.isExist = false;
        else this.draw();
    }
}

export default PlayerBullet;