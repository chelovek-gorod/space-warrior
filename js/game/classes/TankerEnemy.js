import EnemyShipPrototype from "./EnemyShipPrototype.js";
import canvas from "../../engine/canvas.js";

class TankerEnemy extends EnemyShipPrototype {
    constructor(x, y) {
        super('enemy_102x240px.png', x, y);
        this.speed = 0.03 + Math.random() * 0.03;
        this.hp = 100;
        this.damage = this.hp;
        this.scores = this.hp;
        this.size = 48;

        this.isWithBonus = true;

        this.isExist = true;
    }

    update(dt) {
        // move
        this.centerY += this.speed * dt;

        if ( this.isOnCollision() ) return;

        // test out of screen (except top border)
        if (this.centerY - this.halfHeight > canvas.height) this.isExist = false;
        else this.draw();
    }
}

export default TankerEnemy;