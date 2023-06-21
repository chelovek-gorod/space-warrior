import canvas from "../../engine/canvas.js";
import Spritesheet from "../../engine/classes/Spritesheet.js";
import PlayerBullet from './PlayerBullet.js';
import PlayerRocket from "./PlayerRocket.js";
import { getExistsObjectsFromArr, moveTo } from "../../engine/gameFunctions.js";
import { gameCursor, CURSOR, oneLoopObjectsArr } from "../main.js";
import OneLoopSpritesheet from './OneLoopSpritesheet.js';
import { playSound } from "../../engine/sound.js";
import KEY from '../../engine/controllers/keyboard.js';

import Text from "../../engine/classes/Text.js";

class PlayerShip extends Spritesheet {
    constructor() {
        super('player_74x100px_16frames.png', canvas.centerX, canvas.height + 50, 74, 100, 16, 30);
        this.hp = 100;
        this.scores = 0;
        this.speed = 1.2;
        this.hpText = new Text('HP: 100%', 6, 6, {size: 20, font: 'MicraDi', color: '#ffffff', align: 'left'});
        this.scoresText = new Text('Scores: 0', canvas.width - 6, 6, {size: 20, font: 'MicraDi', color: '#ffffff', align: 'right' });
        this.size = 32;

        this.shutTimeout = 1200;
        this.shutTime = this.shutTimeout;
        this.bulletSpeed = 1.8;
        this.bulletDamage = 10;
        this.bulletsArr = [];

        this.rockets = 1;
        this.rocketLaunchTimeout = 1000;
        this.rocketLaunchTime = this.rocketLaunchTimeout;
        this.rocketStartSpeed = 0.1;
        this.rocketAcceleration = 1.02;
        this.rocketTurnSpeed = 0.05;
        this.rocketDamage = 30;
        this.rocketsArr = [];
    }

    addScores( scores ) {
        this.scores += scores;
        this.scoresText.render(`Scores: ${this.scores }`);
    }

    addDamage( damage ) {
        this.hp -= damage;
        if (this.hp < 1) {
            this.bulletsArr = []; // for stop detect collision with player bullets
            this.rocketsArr = []; // for stop detect collision with player rockets
            this.centerY = canvas.height * 2; // for stop detect collision with player
            this.hp = 0;
            this.hpText.render('HP: 0%');
            let explosion = new OneLoopSpritesheet(
                'explosion_200x200px_18frames.png',
                this.centerX, this.centerY,
                200, 200, 18, 30);
            oneLoopObjectsArr.push(explosion);
            playSound('se_explosion.mp3');
            return;
        }
        this.hpText.render(`HP: ${this.hp}%`);
    }

    update(dt) {
        // shuting
        this.shutTime -= dt;
        if (this.shutTime <= 0) {
            this.shutTime += this.shutTimeout;
            const bullet = new PlayerBullet(this.centerX, this.centerY, this.bulletSpeed, this.bulletDamage);
            this.bulletsArr.push( bullet );
            playSound('se_laser_shut.mp3');
        }

        for(let i = 0; i < this.bulletsArr.length; i++) this.bulletsArr[i].update(dt);
        this.bulletsArr = getExistsObjectsFromArr(this.bulletsArr);

        // launching
        if (this.rocketLaunchTime > 0) this.rocketLaunchTime -= dt;
        else if (this.rockets > 0 && (CURSOR.isClick || KEY.space)) {
            this.rockets--;
            this.rocketLaunchTime += this.rocketLaunchTimeout;
            const rocket = new PlayerRocket(
                this.centerX, this.centerY,
                this.rocketStartSpeed, this.rocketAcceleration,
                this.rocketTurnSpeed,
                this.rocketDamage);
            this.rocketsArr.push( rocket );
            playSound('se_rocket_launch.mp3');
        }

        for(let i = 0; i < this.rocketsArr.length; i++) this.rocketsArr[i].update(dt);
        this.rocketsArr = getExistsObjectsFromArr(this.rocketsArr);

        moveTo(this, gameCursor, this.speed);
        this.drawWithAnimation(dt);
    }
}

export default PlayerShip;