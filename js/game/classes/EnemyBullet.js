import Sprite from "../../engine/classes/Sprite.js";
import canvas from "../../engine/canvas.js";
import { getDistance } from "../../engine/gameFunctions.js";
import { player, oneLoopObjectsArr } from "../main.js";
import OneLoopSpritesheet from './OneLoopSpritesheet.js';
import { playSound } from '../../engine/sound.js';

class EnemyBullet extends Sprite {
    constructor(x, y, speed, damage) {
        super('enemy_bullet_10x40px.png', x, y);
        this.speed = speed;
        this.damage = damage;
        this.isExist = true;
    }

    update(dt) {
        this.centerY += this.speed * dt;

        if (getDistance(this, player) < player.size) {
            this.isExist = false;
            player.addDamage( this.damage );
            let explosion = new OneLoopSpritesheet(
                'explosion_64x64px_17frames.png',
                this.centerX, this.centerY,
                64, 64, 17, 30);
            oneLoopObjectsArr.push(explosion);
            playSound('se_small_explosion.mp3');
            return;
        }

        if (this.centerY > canvas.height + this.halfHeight) this.isExist = false;
        else this.draw();
    }
}

export default EnemyBullet;