import EnemyShipPrototype from "./EnemyShipPrototype.js";
import canvas from "../../engine/canvas.js";
import { enemiesBulletsArr } from "../main.js";
import EnemyBullet from "./EnemyBullet.js";

class SimpleEnemy extends EnemyShipPrototype {
    constructor(x, y) {
        super('enemy_52x78px.png', x, y);
        this.speed = 0.06 + Math.random() * 0.06;
        this.sideSpeed = -0.06 + Math.random() * 0.12;
        this.hp = 20;
        this.damage = this.hp;
        this.scores = this.hp;
        this.size = 24;

        this.bulletSpeed = 0.2;
        this.bulletDamage = 5;
        this.shutTimeout = 2000 + Math.floor(Math.random() * 1000);
        this.shutTime = this.shutTimeout;

        this.isExist = true;
    }

    update(dt) {
        // move
        this.centerY += this.speed * dt;
        this.centerX += this.sideSpeed * dt;

        // attack
        if (this.centerY > 0) this.shutTime -= dt;
        if (this.shutTime <= 0) {
            this.shutTime += this.shutTimeout;
            const bullet = new EnemyBullet(this.centerX, this.centerY, this.bulletSpeed, this.bulletDamage);
            enemiesBulletsArr.push(bullet);
        }

        if ( this.isOnCollision() ) return;

        // test out of screen (except top border)
        if (this.centerY - this.halfHeight > canvas.height
        || this.centerX - this.halfWidth > canvas.width
        || this.centerX + this.halfWidth < 0) this.isExist = false;
        else this.draw();
    }
}

export default SimpleEnemy;