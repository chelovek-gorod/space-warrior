import Sprite from "../../engine/classes/Sprite.js";
import canvas from "../../engine/canvas.js";
import { player, messagesArr } from "../main.js";
import { playSound } from '../../engine/sound.js';
import { getDistance } from '../../engine/gameFunctions.js';
import { IMG } from "../../engine/loader.js";
import MessageText from "./MessageText.js";

class Bonus extends Sprite {
    constructor(x, y) {
        super('bonus_empty_48x48px.png', x, y);
        this.type = this.getType();
        this.img = IMG['bonus_' +this.type+ '_48x48px.png'];
        this.speed = 0.05;
        this.size = 22;
        this.isExist = true;
    }

    getType() {
        switch( Math.floor(Math.random() * 5) ) {
            case 0 : return 'bullets';
            case 1 : return 'rockets';
            case 2 : return 'repair';
            case 3 : return 'speed';
            default: return 'scores';
        }
    }

    update(dt) {
        this.centerY += this.speed * dt;

        // test collision with player
        if(getDistance(this, player) < this.size + player.size) {
            this.isExist = false;
            let textMessage;
            switch(this.type) {
                case 'bullets' :
                    player.bulletsClip += 1;
                    textMessage = '✛1 SHUT';
                break;
                case 'rockets' :
                    player.rockets += 1;
                    player.maxRockets += 1;
                    player.rocketLaunchTimeout *= 0.8;
                    textMessage = '✛1 ROCKET';
                    player.propertiesText.render(`Speed: ${(player.speed * 1000).toFixed()} | Rockets: ${player.maxRockets}`);
                break;
                case 'repair' :
                    player.addDamage(-20);
                    textMessage = '✛20 HP';
                    break;
                case 'speed' :
                    player.speed *= 1.1;
                    textMessage = 'SPEED ✛10%';
                    player.propertiesText.render(`Speed: ${(player.speed * 1000).toFixed()} | Rockets: ${player.maxRockets}`);
                    break;
                default: /*'scores'*/
                    player.addScores(100);
                    textMessage = '✛100 SCORES';
            }
            messagesArr.push( new MessageText(textMessage, this.centerX, this.centerY) );
            playSound('se_bonus.mp3');
            return;
        }

        if (this.centerY - this.halfHeight > canvas.height) this.isExist = false;
        else this.draw();
    }
}

export default Bonus;