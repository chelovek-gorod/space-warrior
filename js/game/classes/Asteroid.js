import Spritesheet from "../../engine/classes/Spritesheet.js";
import canvas from "../../engine/canvas.js";
import { player, messagesArr, oneLoopObjectsArr, addToMaxAsteroids, rocksArr } from "../main.js";
import OneLoopSpritesheet from './OneLoopSpritesheet.js';
import { playSound } from '../../engine/sound.js';
import { getDistance } from '../../engine/gameFunctions.js';
import Rock from "./Rock.js";
import MessageText from "./MessageText.js";

class Asteroid extends Spritesheet {
    constructor(x, y) {
        super('asteroid_white_90x108px_29frames.png', x, y, 90, 108, 29, 30);
        this.direction = Math.random() * (Math.PI * 2);
        this.speed = 0.04 + Math.random() * 0.04;
        this.sideSpeed = -(this.speed / 2) + Math.random() * this.speed;
        this.hp = 10 + Math.ceil(Math.random()*20);
        this.damage = 20;
        this.scores = 20;
        this.size = 36;
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
            addToMaxAsteroids();
            let explosion = new OneLoopSpritesheet(
                'explosion_200x200px_18frames.png',
                this.centerX, this.centerY,
                200, 200, 18, 30);
            oneLoopObjectsArr.push(explosion);
            playSound('se_explosion.mp3');
            if (object !== player) this.generateRocks();
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

        // test collision with rock
        for(let i = 0; i < rocksArr.length; i++) {
            if(getDistance(this, rocksArr[i]) < this.size + rocksArr[i].size) {
                rocksArr[i].isExist = false;
                this.addDamage( rocksArr[i].damage, rocksArr[i] )
                if (this.hp <= 0) return;
            }
        }

        // test collision with player bullet
        for(let i = 0; i < player.bulletsArr.length; i++) {
            if(getDistance(this, player.bulletsArr[i]) < this.size) {
                player.bulletsArr[i].isExist = false;
                this.addDamage( player.bulletsArr[i].damage, player.bulletsArr[i] )
                if (this.hp > 0) {
                    player.addScores(1);
                    messagesArr.push( new MessageText('✛1 SCORE', this.centerX, this.centerY) );
                } else {
                    player.addScores(this.scores);
                    messagesArr.push( new MessageText('✛' + this.scores + ' SCORES', this.centerX, this.centerY) );
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
                    let scores = Math.floor(this.scores / 2);
                    player.addScores(scores);
                    messagesArr.push( new MessageText('✛' + scores + ' SCORES', this.centerX, this.centerY) );
                    return;
                }
            }
        }

        // test collision with player
        if(getDistance(this, player) < this.size + player.size) {
            player.addDamage(this.damage);
            this.addDamage(this.hp, player);
            return;
        }

        if (this.centerY - this.halfHeight > canvas.height
        || this.centerX - this.halfWidth > canvas.width
        || this.centerX + this.halfWidth < 0) this.isExist = false;
        else this.drawWithAnimation(dt);
    }
}

export default Asteroid;