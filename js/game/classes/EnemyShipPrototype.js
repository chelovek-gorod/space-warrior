import Sprite from "../../engine/classes/Sprite.js";
import { player, messagesArr, bonusesArr, oneLoopObjectsArr, addToMaxEnemies } from "../main.js";
import OneLoopSpritesheet from './OneLoopSpritesheet.js';
import { playSound } from '../../engine/sound.js';
import { getDistance } from '../../engine/gameFunctions.js';
import MessageText from "./MessageText.js";
import Bonus from './Bonus.js';

class EnemyShipPrototype extends Sprite {
    constructor(imageName, x, y) {
        super(imageName, x, y);
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

    isOnCollision() {
        // test collision with player bullet
        for(let i = 0; i < player.bulletsArr.length; i++) {
            if(getDistance(this, player.bulletsArr[i]) < this.size) {
                player.bulletsArr[i].isExist = false;
                this.addDamage( player.bulletsArr[i].damage, player.bulletsArr[i] );
                if (this.hp > 0) {
                    player.addScores(1);
                    messagesArr.push( new MessageText('✛1 SCORE', this.centerX, this.centerY) );
                } else {
                    player.addScores(this.scores);
                    messagesArr.push( new MessageText('✛' +this.scores+ ' SCORES', this.centerX, this.centerY) );
                    if (this.isWithBonus) bonusesArr.push( new Bonus(this.centerX, this.centerY) );
                    return true;
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
                    messagesArr.push( new MessageText('✛' +scores+ ' SCORES', this.centerX, this.centerY) );
                    return true;
                }
            }
        }

        // test collision with player
        if(getDistance(this, player) < this.size + player.size) {
            player.addDamage(this.damage);
            this.addDamage(this.hp);
            return true;
        }

        // no fatal collision
        return false;
    }
}

export default EnemyShipPrototype;