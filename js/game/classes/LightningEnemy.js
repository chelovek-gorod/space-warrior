import EnemyShipPrototype from "./EnemyShipPrototype.js";
import canvas from "../../engine/canvas.js";
import { player } from "../main.js";
import { getDistance, turnTo, moveAccordingDirection, drawLightning } from '../../engine/gameFunctions.js';

class LightningEnemy extends EnemyShipPrototype {
    constructor(x, y) {
        super('enemy_186x126px.png', x, y);
        this.speed = 0.03 + Math.random() * 0.03;
        this.turnSpeed = 0.01;
        this.hp = 70;
        this.damage = this.hp;
        this.scores = this.hp;
        this.size = 62;

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
        turnTo(this, player, this.turnSpeed * dt);
        moveAccordingDirection(this, this.speed * dt);

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