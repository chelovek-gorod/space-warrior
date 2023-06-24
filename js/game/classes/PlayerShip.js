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
        this.speed = 0.08;
        this.hpText = new Text('HP: 100%', 6, 6, {size: 20, font: 'MicraDi', color: '#ffffff', align: 'left'});
        this.scoresText = new Text('Scores: 0', canvas.width - 6, 6, {size: 20, font: 'MicraDi', color: '#ffffff', align: 'right' });
        this.size = 32;

        this.bulletSpeed = 1.6;
        this.bulletDamage = 10;
        this.bulletsClip = 1;
        this.bullets = this.bulletsClip;
        this.shutTimeout = 200;
        this.shutTime = 0;
        this.reloadTimeout = 2000;
        this.reloadTime = this.reloadTimeout;
        this.bulletsArr = [];

        this.rockets = 1;
        this.maxRockets = this.rockets;
        this.rocketLaunchTimeout = 500;
        this.rocketLaunchTime = this.rocketLaunchTimeout;
        this.rocketReloadTimeout = 2000;
        this.rocketReloadTime = this.rocketReloadTimeout;
        this.rocketStartSpeed = 0.1;
        this.rocketAcceleration = 1.02;
        this.rocketTurnSpeed = 0.05;
        this.rocketDamage = 30;
        this.rocketsArr = [];

        this.propertiesText = new Text(
            `Speed: ${(this.speed * 1000).toFixed()} | Rockets: ${this.rockets}/${this.maxRockets}`, canvas.centerX, 6, 
            {size: 20, font: 'MicraDi', color: '#00ff00', align: 'center' }
        );
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
        this.reloadTime -= dt;
        if (this.reloadTime <= 0) {
            this.reloadTime += this.reloadTimeout;
            this.bullets = this.bulletsClip;
        }
        if (this.bullets > 0) {
            this.shutTime -= dt;
            if (this.shutTime <= 0){
                this.shutTime += this.shutTimeout;
                // 1 fire lines (1, 2, 3 bullets)
                if (this.bulletsClip < 4) {
                    this.bullets -= 1;
                    this.bulletsArr.push( new PlayerBullet(this.centerX, this.centerY, this.bulletSpeed, this.bulletDamage) );
                    playSound('se_laser_shut.mp3');
                }
                // 2 fire lines (4, 5, 6, 7, 8 bullets)
                else if (this.bulletsClip < 9) {
                    this.bullets -= 2;
                    this.bulletsArr.push( new PlayerBullet(this.centerX - 15, this.centerY, this.bulletSpeed, this.bulletDamage) );
                    this.bulletsArr.push( new PlayerBullet(this.centerX + 15, this.centerY, this.bulletSpeed, this.bulletDamage) );
                    playSound('se_laser_shut.mp3');
                }
                // 3 fire lines (9, 10, 11, 12, 13, 14, 15 bullets)
                else if (this.bulletsClip < 16) {
                    this.bullets -= 3;
                    this.bulletsArr.push( new PlayerBullet(this.centerX - 30, this.centerY, this.bulletSpeed, this.bulletDamage) );
                    this.bulletsArr.push( new PlayerBullet(this.centerX , this.centerY, this.bulletSpeed, this.bulletDamage) );
                    this.bulletsArr.push( new PlayerBullet(this.centerX + 30, this.centerY, this.bulletSpeed, this.bulletDamage) );
                    playSound('se_laser_shut.mp3');
                }
                // 4 fire lines (4, 5, 6, 7, 8 bullets)
                else {
                    this.bullets -= 4;
                    this.bulletsArr.push( new PlayerBullet(this.centerX - 35, this.centerY, this.bulletSpeed, this.bulletDamage) );
                    this.bulletsArr.push( new PlayerBullet(this.centerX - 10, this.centerY, this.bulletSpeed, this.bulletDamage) );
                    this.bulletsArr.push( new PlayerBullet(this.centerX + 10, this.centerY, this.bulletSpeed, this.bulletDamage) );
                    this.bulletsArr.push( new PlayerBullet(this.centerX + 35, this.centerY, this.bulletSpeed, this.bulletDamage) );
                    playSound('se_laser_shut.mp3');
                }
                
            }
        }

        for(let i = 0; i < this.bulletsArr.length; i++) this.bulletsArr[i].update(dt);
        this.bulletsArr = getExistsObjectsFromArr(this.bulletsArr);

        // launching rockets
        if (this.rocketReloadTime > 0) {
            this.rocketReloadTime -= dt;
            if (this.rocketReloadTime <= 0) {
                let propertiesText = `Speed: ${(this.speed * 1000).toFixed()} | Rockets: ${this.rockets}/${this.maxRockets}`;
                this.propertiesText.render( propertiesText );
            }
        } else if (this.rockets > 0) {
            if (this.rocketLaunchTime > 0) this.rocketLaunchTime -= dt;
            else if (CURSOR.isClick || KEY.space) {
                this.rocketLaunchTime += this.rocketLaunchTimeout;
                this.rockets--;
                const rocket = new PlayerRocket( this.centerX, this.centerY,
                    this.rocketStartSpeed, this.rocketAcceleration,
                    this.rocketTurnSpeed, this.rocketDamage);
                this.rocketsArr.push( rocket );
                playSound('se_rocket_launch.mp3');
                let propertiesText = `Speed: ${(this.speed * 1000).toFixed()} | Rockets: ${this.rockets}/${this.maxRockets}`;
                this.propertiesText.render( propertiesText );
            }
        } else {
            this.rockets = this.maxRockets;
            this.rocketReloadTime += this.rocketReloadTimeout;
        }

        for(let i = 0; i < this.rocketsArr.length; i++) this.rocketsArr[i].update(dt);
        this.rocketsArr = getExistsObjectsFromArr(this.rocketsArr);

        // moving
        moveTo(this, gameCursor, this.speed * dt);
        this.drawWithAnimation(dt);
    }
}

export default PlayerShip;