import Sprite from "../../engine/classes/Sprite.js";
import {player, asteroidsArr, oneLoopObjectsArr, enemiesArr} from "../main.js";
import { getDistance, turnTo, moveAccordingDirection } from "../../engine/gameFunctions.js";
import { playSound } from "../../engine/sound.js";
import OneLoopSpritesheet from './OneLoopSpritesheet.js';
import canvas from "../../engine/canvas.js";

class PlayerRocket extends Sprite {
    constructor(x, y, speed, acceleration, turnSpeed, damage) {
        super('player_rocket_30x12px.png', x, y);
        this.direction = -Math.PI / 2;
        this.speed = speed;
        this.acceleration = acceleration;
        this.turnSpeed = turnSpeed;
        this.damage = damage;
        this.size = 12;

        this.addSmokeTimeout = 60;
        this.addSmokeTime = this.addSmokeTimeout;

        this.isExist = true
    }

    update(dt) {
        // get target
        let target = null;
        let minDistance = Infinity;
        for (let i = 0; i < asteroidsArr.length; i++) {
            let distance = getDistance(this, asteroidsArr[i]);
            if (distance < minDistance) {
                target = asteroidsArr[i];
                minDistance = distance;
            }
        }
        for (let i = 0; i < enemiesArr.length; i++) {
            let distance = getDistance(this, enemiesArr[i]);
            if (distance < minDistance) {
                target = enemiesArr[i];
                minDistance = distance;
            }
        }

        if (target) {
            turnTo( this, target, this.turnSpeed );
            moveAccordingDirection(this, this.speed * dt);
        } else {
            this.isExist = false;
            player.rockets++;
            let explosion = new OneLoopSpritesheet(
                'explosion_64x64px_17frames.png',
                this.centerX, this.centerY,
                64, 64, 17, 30);
            oneLoopObjectsArr.push(explosion);
            playSound('se_small_explosion.mp3');
            return;
        }

        // test out of screen
        if (this.centerY < -this.halfHeight || this.centerY + this.halfHeight > canvas.height
        || this.centerX < -this.halfHeight|| this.centerX + this.halfHeight > canvas.width) {
            player.rockets++;
            this.isExist = false;
            return;
        }

        // smoke
        this.addSmokeTime -= dt;
        if (this.addSmokeTime < 0) {
            this.addSmokeTime = this.addSmokeTimeout;
            let smoke = new OneLoopSpritesheet(
                'smoke_32x32px_25frames.png',
                this.centerX, this.centerY,
                32, 32, 25, 12);
            smoke.direction = Math.random() * (Math.PI * 2);
            oneLoopObjectsArr.push(smoke);
        }

        this.draw();

        // update speed and smoke timeout
        this.addSmokeTimeout /= this.acceleration;
        this.speed *= this.acceleration;
    }
}

export default PlayerRocket;