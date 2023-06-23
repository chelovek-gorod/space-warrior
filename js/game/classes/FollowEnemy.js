import EnemyShipPrototype from "./EnemyShipPrototype.js";
import canvas from "../../engine/canvas.js";
import { player } from "../main.js";
import { turnTo, moveAccordingDirection } from '../../engine/gameFunctions.js';

class FollowEnemy extends EnemyShipPrototype {
    constructor(x, y) {
        super('enemy_240x102px.png', x, y);
        this.speed = 0.12 + Math.random() * 0.04;
        this.turnSpeed = 0.01;
        this.hp = 30;
        this.damage = this.hp;
        this.scores = this.hp;
        this.size = 50;

        this.isExist = true;
    }

    update(dt) {
        // move
        turnTo(this, player, this.turnSpeed * dt);
        moveAccordingDirection(this, this.speed * dt);

        if ( this.isOnCollision() ) return;

        // test out of screen (except top border)
        if (this.centerY - this.halfHeight > canvas.height
        || this.centerX - this.halfWidth > canvas.width
        || this.centerX + this.halfWidth < 0) this.isExist = false;
        else this.draw();
    }
}

export default FollowEnemy;