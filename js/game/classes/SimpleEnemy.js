import Sprite from "../../engine/classes/Sprite.js";
import canvas from "../../engine/canvas.js";
import { player, oneLoopObjectsArr, addToMaxEnemies, enemiesBulletsArr } from "../main.js";
import OneLoopSpritesheet from './OneLoopSpritesheet.js';
import { playSound } from '../../engine/sound.js';
import { getDistance } from '../../engine/gameFunctions.js';
import EnemyBullet from "./EnemyBullet.js";

class SimpleEnemy extends Sprite {
    constructor(x, y) {
        super('enemy_52x78px.png', x, y);
        this.speed = 0.04 + Math.random() * 0.04;
        this.sideSpeed = -0.02 + Math.random() * 0.04;
        this.hp = 20;
        this.damage = 20;
        this.scores = this.hp;
        this.size = 24;

        this.bulletSpeed = 0.2;
        this.bulletDamage = 5;
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
        this.centerY += this.speed * dt;
        this.centerX += this.sideSpeed * dt;

        // attack
        if (this.centerY > 0) this.shutTime -= dt;
        if (this.shutTime <= 0) {
            this.shutTime += this.shutTimeout;
            const bullet = new EnemyBullet(this.centerX, this.centerY, this.bulletSpeed, this.bulletDamage);
            enemiesBulletsArr.push(bullet);
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

export default SimpleEnemy;