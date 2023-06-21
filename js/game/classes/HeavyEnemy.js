import EnemyShipPrototype from "./EnemyShipPrototype.js";
import canvas from "../../engine/canvas.js";
import { player, enemiesBulletsArr } from "../main.js";
import EnemyBullet from "./EnemyBullet.js";

class HeavyEnemy extends EnemyShipPrototype {
    constructor(x, y) {
        super('enemy_100x130px.png', x, y);
        this.speed = 0.03 + Math.random() * 0.03;
        this.sideSpeed = 0.02 + Math.random() * 0.02;
        this.hp = 40;
        this.damage = 30;
        this.scores = this.hp;
        this.size = 46;

        this.bulletSpeed = 0.2;
        this.bulletDamage = 5;
        this.shutTimeout = 1000 + Math.floor(Math.random() * 1000);
        this.shutTime = this.shutTimeout;

        this.isWithBonus = true;

        this.isExist = true;
    }

    update(dt) {
        // move
        this.centerY += this.speed * dt;
        if (this.centerX !== player.centerX) {
            let speedX = this.sideSpeed * dt;
            if (Math.abs(this.centerX - player.centerX) > speedX) {
                if (this.centerX > player.centerX) this.centerX -= speedX;
                else this.centerX += speedX;
            } else {
                this.centerX = player.centerX;
            }
        }

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

export default HeavyEnemy;