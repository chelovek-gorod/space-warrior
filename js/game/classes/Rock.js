import Spritesheet from "../../engine/classes/Spritesheet.js";
import canvas from "../../engine/canvas.js";
import { player, messagesArr, oneLoopObjectsArr, enemiesArr } from "../main.js";
import OneLoopSpritesheet from './OneLoopSpritesheet.js';
import { playSound } from '../../engine/sound.js';
import { getDistance, moveAccordingDirection } from '../../engine/gameFunctions.js';
import MessageText from "./MessageText.js";

class Rock extends Spritesheet {
    constructor(x, y, speed, direction) {
        super('rock_white_50x50px_8frames.png', x, y, 50, 50, 8, 18);
        this.speed = speed;
        this.direction = direction;
        this.damage = 5;
        this.scores = 5;
        this.size = 24;
        this.isExist = true;
    }

    addDamage() {
        this.isExist = false;
        let explosion = new OneLoopSpritesheet(
            'explosion_64x64px_17frames.png',
            this.centerX, this.centerY,
            64, 64, 17, 30);
        oneLoopObjectsArr.push(explosion);
        playSound('se_small_explosion.mp3');
    }

    update(dt) {
        moveAccordingDirection( this, this.speed * dt );

        // test collision with enemies
        for(let i = 0; i < enemiesArr.length; i++){
            if(getDistance(this, enemiesArr[i]) < this.size + enemiesArr[i].size) {
                enemiesArr[i].addDamage(this.damage, this);
                this.isExist = false;
                return;
            }
        }

        // test collision with player bullet
        for(let i = 0; i < player.bulletsArr.length; i++) {
            if(player.bulletsArr[i].isExist && getDistance(this, player.bulletsArr[i]) < this.size) {
                player.bulletsArr[i].isExist = false;
                player.addScores(5);
                messagesArr.push( new MessageText('✛5 SCORES', this.centerX, this.centerY) );
                this.addDamage();
                return;
            }
        }

        // test collision with player rocket
        for(let i = 0; i < player.rocketsArr.length; i++) {
            if(player.rocketsArr[i].isExist && getDistance(this, player.rocketsArr[i]) < this.size) {
                player.rocketsArr[i].isExist = false;
                this.addDamage();
                return;
            }
        }

        // test collision with player
        if(getDistance(this, player) < this.size + player.size) {
            player.addDamage(this.damage);
            this.addDamage();
            return;
        }

        // test out of screen
        if (this.centerY - this.halfHeight > canvas.height
        || this.centerY + this.halfHeight < 0
        || this.centerX - this.halfWidth > canvas.width
        || this.centerX + this.halfWidth < 0) this.isExist = false;
        else this.drawWithAnimation(dt);
    }
}

export default Rock;