import Sprite from "../../engine/classes/Sprite.js";
import canvas from "../../engine/canvas.js";
import { player, oneLoopObjectsArr, addToMaxEnemies } from "../main.js";
import OneLoopSpritesheet from './OneLoopSpritesheet.js';
import { playSound } from '../../engine/sound.js';
import { getDistance, drawLightning } from '../../engine/gameFunctions.js';

class LightningEnemy extends Sprite {
    constructor(x, y) {
        super('enemy_120x120px.png', x, y);
        this.speed = 0.02 + Math.random() * 0.02;
        this.sideSpeed = 0.015 + Math.random() * 0.015;
        this.rotationSpeed = this.speed * 0.5;
        this.hp = 70;
        this.damage = 40;
        this.scores = this.hp;
        this.size = 52;

        this.shutDistance = 320;
        this.shutDurationTimeout = 500;
        this.shutDurationTime = this.shutDurationTimeout;
        this.shutDamage = 0.06;
        this.shutDamageStorage = 0;
        this.shutTimeout = 2000 + Math.floor(Math.random() * 1000);
        this.shutTime = this.shutTimeout;

        this.isExist = true;
    }

    addDamage( damage, object ) {
        this.hp -= damage;
        if (this.hp > 0) {
            let explosion = new OneLoopSpritesheet(
                'explosion_64x64px_17frames.png',
                object.centerX, object.centerY,
                64, 64, 17, 30);
            oneLoopObjectsArr.push(explosion);
            playSound('se_small_explosion.mp3');
        } else {
            this.isExist = false;
            addToMaxEnemies();
            let explosion = new OneLoopSpritesheet(
                'explosion_200x200px_18frames.png',
                this.centerX, this.centerY,
                200, 200, 18, 30);
            oneLoopObjectsArr.push(explosion);
            playSound('se_explosion.mp3');
        }
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

        if (this.centerY + this.halfHeight < 0) return;

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

        // test collision with player bullet
        for(let i = 0; i < player.bulletsArr.length; i++) {
            if(getDistance(this, player.bulletsArr[i]) < this.size) {
                player.bulletsArr[i].isExist = false;
                this.addDamage( player.bulletsArr[i].damage, player.bulletsArr[i] );
                if (this.hp > 0) player.addScores(1);
                else {
                    player.addScores(this.scores);
                    return;
                }
            }
        }

        // test collision with player rocket
        for(let i = 0; i < player.rocketsArr.length; i++) {
            if(getDistance(this, player.rocketsArr[i]) < this.size) {
                player.rockets++;
                player.rocketsArr[i].isExist = false;
                this.addDamage( player.rocketsArr[i].damage, player.rocketsArr[i] )
                if (this.hp <= 0) {
                    player.addScores(Math.floor(this.scores / 2));
                    return;
                }
            }
        }

        // test collision with player
        if(getDistance(this, player) < this.size + player.size) {
            player.addDamage(this.damage);
            this.addDamage(this.hp);
            return;
        }

        // test out of screen (except top border)
        if (this.centerY - this.halfHeight > canvas.height
        || this.centerX - this.halfWidth > canvas.width
        || this.centerX + this.halfWidth < 0) this.isExist = false;
        else this.draw();
    }
}

export default LightningEnemy;