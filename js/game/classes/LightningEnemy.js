import EnemyShipPrototype from "./EnemyShipPrototype.js";
import canvas from "../../engine/canvas.js";
import { player } from "../main.js";
import { getDistance, drawLightning } from '../../engine/gameFunctions.js';

class LightningEnemy extends EnemyShipPrototype {
    constructor(x, y) {
        super('enemy_120x120px.png', x, y);
        this.speed = 0.03 + Math.random() * 0.03;
        this.sideSpeed = 0.02 + Math.random() * 0.02;
        this.rotationSpeed = this.speed * 0.5;
        this.hp = 70;
        this.damage = this.hp;
        this.scores = this.hp;
        this.size = 52;

        this.shutDistance = (canvas.width > canvas.height) ? canvas.centerY : canvas.centerX;
        this.shutDurationTimeout = 500;
        this.shutDurationTime = this.shutDurationTimeout;
        this.shutDamage = 0.04;
        this.shutDamageStorage = 0;
        this.shutTimeout = 2000 + Math.floor(Math.random() * 1000);
        this.shutTime = this.shutTimeout;

        this.isWithBonus = true;

        this.isExist = true;
    }

    update(dt) {
        // move
        this.direction += this.rotationSpeed;
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
        if (this.shutTime > 0) this.shutTime -= dt;
        else if (getDistance(this, player) <= this.shutDistance) {
            if (this.shutDurationTime > 0) {
                this.shutDurationTime -= dt;
                this.shutDamageStorage += this.shutDamage * dt;
                drawLightning(this, player);
                if (this.shutDamageStorage > 1) {
                    let damage = +this.shutDamageStorage.toFixed();
                    player.addDamage(damage);
                    this.shutDamageStorage -= damage;
                }
            } else {
                this.shutTime += this.shutTimeout;
                this.shutDurationTime += this.shutDurationTimeout;
            }
        }

        if ( this.isOnCollision() ) return;

        // test out of screen (except top border)
        if (this.centerY - this.halfHeight > canvas.height
        || this.centerX - this.halfWidth > canvas.width
        || this.centerX + this.halfWidth < 0) this.isExist = false;
        else this.draw();
    }
}

export default LightningEnemy;