import Spritesheet from "../../engine/classes/Spritesheet.js";
import canvas from "../../engine/canvas.js";
import { player, oneLoopObjectsArr, addToMaxAsteroids, rocksArr } from "../main.js";
import OneLoopSpritesheet from './OneLoopSpritesheet.js';
import { playSound } from '../../engine/sound.js';
import { getDistance } from '../../engine/gameFunctions.js';
import Rock from "./Rock.js";

class Asteroid extends Spritesheet {
    constructor(x, y, speed) {
        super('asteroid_white_90x108px_29frames.png', x, y, 90, 108, 29, 30);
        this.speed = speed;
        this.direction = Math.random() * (Math.PI * 2);
        this.sideSpeed = ((Math.random() < 0.5) ? -speed : speed) * Math.random() / 2;
        this.hp = 1 + Math.ceil(Math.random()*2);
        this.damage = this.hp * 10;
        this.scores = this.hp * 5;
        this.size = 36;
        this.isExist = true;
    }

    getDamage( damage, damageFromObject ) {
        this.hp -= damage;
        if (this.hp > 0) {
            let explosion = new OneLoopSpritesheet(
                'explosion_64x64px_17frames.png',
                damageFromObject.centerX, damageFromObject.centerY,
                64, 64, 17, 30);
            oneLoopObjectsArr.push(explosion);
            playSound('se_small_explosion.mp3');
        } else {
            this.isExist = false;
            addToMaxAsteroids();
            let explosion = new OneLoopSpritesheet(
                'explosion_200x200px_18frames.png',
                this.centerX, this.centerY,
                200, 200, 18, 30);
            oneLoopObjectsArr.push(explosion);
            playSound('se_explosion.mp3');
            if (damageFromObject !== player) this.generateRocks();
        }
    }

    generateRocks() {
        let rocks = 2 + Math.ceil(Math.random() * 3);
        let radianAngle = (Math.PI * 2) / rocks;
        for(let i = 0; i < rocks; i++) {
            let direction = radianAngle * i + Math.random() * radianAngle;
            rocksArr.push( new Rock(this.centerX, this.centerY, this.speed * 2, direction));
        }
    }

    update(dt) {
        this.centerY += this.speed * dt;
        this.centerX += this.sideSpeed * dt;

        // test collision with player bullet
        for(let i = 0; i < player.bulletsArr.length; i++) {
            if(getDistance(this, player.bulletsArr[i]) < this.size) {
                player.bulletsArr[i].isExist = false;
                this.getDamage( 1, player.bulletsArr[i] )
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
                this.getDamage( player.rocketsArr[i].damage, player.rocketsArr[i] )
                if (this.hp <= 0) {
                    player.addScores(Math.floor(this.scores / 2));
                    return;
                }
            }
        }

        // test collision with player
        if(getDistance(this, player) < this.size + player.size) {
            player.addDamage(this.damage);
            this.getDamage( this.hp, player )
            return;
        }

        if (this.centerY - this.halfHeight > canvas.height
        || this.centerX - this.halfWidth > canvas.width
        || this.centerX + this.halfWidth < 0) this.isExist = false;
        else this.drawWithAnimation(dt);
    }
}

export default Asteroid;