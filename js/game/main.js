/*
** IMPORTS
*/

import { loader, BGM } from '../engine/loader.js';

import canvas from '../engine/canvas.js';
import setAnimation from '../engine/animation.js';

import { getExistsObjectsFromArr } from '../engine/gameFunctions.js';

import { startBgMusic } from '../engine/sound.js';

import MOUSE from '../engine/controllers/mouse.js';
import TOUCH from '../engine/controllers/touch.js';

import sources from './sources.js';

import Logo from './classes/Logo.js';
import IntroText from './classes/IntroText.js';

import SpaceBackground from './classes/SpaceBackground.js';
import AlternateBackground from './classes/AlternateBackground.js';
import GameCursor from './classes/GameCursor.js';
import PlayerShip from './classes/PlayerShip.js';
import Asteroid from './classes/Asteroid.js';
import SimpleEnemy from './classes/SimpleEnemy.js';
import HeavyEnemy from './classes/HeavyEnemy.js';
import FollowEnemy from './classes/FollowEnemy.js';
import LightningEnemy from './classes/LightningEnemy.js';

/*
** INIT CURSOR CONTROL
*/

const isMobile = function() {
    if (navigator.userAgent.indexOf('Android') > 0) return true;
    if (navigator.userAgent.indexOf('iPhone') > 0) return true;
    if (navigator.userAgent.indexOf('iPad') > 0) return true;
    if (navigator.userAgent.indexOf('(X11;') > 0) return true;
    return false;
}();

const CURSOR = (isMobile) ? TOUCH : MOUSE;

/*
** LOADING SOURCES
*/

loader(sources, init);

/*
** DECLARATION ENTITIES
*/

let gameDeveloperLogo, gameTitleText, gameDescriptionText, startGameText, gameOverText;
let isGameStart = false;
let checkStartGameTimeout = 11000;

let scrollingBackground, smallGalaxyBackgroundLeft, smallGalaxyBackgroundRight,
blackHoleBackgroundLeft, blackHoleBackgroundRight, planetsBackground, redPlanetBackground;

let gameCursor, player;

let smokeArr = [];

let bonusesArr = [];

let messagesArr = [];

let asteroidsArr = [];
let maxAsteroidsOnScreen = 3;
function addToMaxAsteroids() { maxAsteroidsOnScreen += 0.3 };
function createAsteroid() {
    let xx = Math.random() * canvas.width;
    let yy = -Math.random() * canvas.centerX;
    asteroidsArr.push( new Asteroid(xx, yy) );
}

let rocksArr = [];

let enemiesArr = [];
let maxEnemiesOnScreen = 2.5;
function addToMaxEnemies() { maxEnemiesOnScreen += 0.2 };
function createEnemy() {
    let enemy; // SimpleEnemy, HeavyEnemy, FollowEnemy, LightningEnemy
    let xx = Math.random() * canvas.width;
    let yy = -(Math.random() * (canvas.height / 2)) - 240;
    let type = Math.floor(Math.random() * Math.floor(maxEnemiesOnScreen));
    switch (type) {
        case 0 :
        case 1 :
            enemy = new SimpleEnemy(xx, yy);
        break;
        case 2 :
        case 3 :
            enemy = new HeavyEnemy(xx, yy);
        break;
        case 4 :
            enemy = new FollowEnemy(xx, yy);
        break;
        default :
            enemy = new LightningEnemy(xx, yy);
    }
    enemiesArr.push( enemy );
    console.log(enemiesArr);
}

let enemiesBulletsArr = [];
let oneLoopObjectsArr = [];

/*
** INIT ENTITIES AND GAME EVENTS
*/

function init() {
    // Скрываем курсор мыши
    canvas.canvas.style.cursor = 'none';

    scrollingBackground = new SpaceBackground('scrolling_bg_2000x3400px.png', 3400, 0.01);

    const canvasWidth_1_divide_3 = Math.floor(canvas.width / 3);
    smallGalaxyBackgroundLeft = new AlternateBackground(
        'galaxy_480x420px.png',
        canvasWidth_1_divide_3, -420,
        canvas.height * 4, 0.015, -0.0002
    );
    smallGalaxyBackgroundRight = new AlternateBackground(
        'galaxy_480x420px.png',
        canvasWidth_1_divide_3 * 2, -canvas.height * 2,
        canvas.height * 4, 0.015, -0.0002
    );
    blackHoleBackgroundLeft = new AlternateBackground(
        'black_hole_left_320x320px.png',
        160, -canvas.height,
        canvas.height * 48, 0.05
    );
    blackHoleBackgroundRight = new AlternateBackground(
        'black_hole_right_320x320px.png',
        canvas.width - 160, -canvas.height * 24,
        canvas.height * 48, 0.05
    );
    planetsBackground = new AlternateBackground(
        'planets_920x760px.png',
        canvas.centerX, -canvas.height*10,
        canvas.height * 60, 0.06, 0.0005
    );
    redPlanetBackground = new AlternateBackground(
        'planet_604x588px.png',
        canvas.centerX, -canvas.height*12,
        canvas.height * 90, 0.08, 0.0006
    );

    gameDeveloperLogo = new Logo( 100, 1400, 1400);
    gameTitleText = new IntroText('Space Warrior', canvas.centerX, canvas.centerY - 80, 120, 5500, 1500, 2500);
    gameDescriptionText = new IntroText('Scrolling shooter', canvas.centerX, canvas.centerY + 50, 60, 8000, 1500, 0);
    startGameText = new IntroText('Click screen for start game', canvas.centerX, canvas.centerY, 40, 10700, 300, Infinity);

    gameCursor = new GameCursor();

    player = new PlayerShip();

    startBgMusic(BGM.path, BGM.arr, 1);
    setAnimation( update, {isFPSdisplay: true, isPerformanceDisplay: true, isMusicPlayInOnblur: false} );

    gameOverText = new IntroText('GAME OVER', canvas.centerX, canvas.centerY, 80, 0, 1000, Infinity);
}

/*
** GAME LOOP
*/

function update(dt) {
    // update background
    scrollingBackground.update(dt);

    // game preview
    if (!isGameStart) {
        if (checkStartGameTimeout > 0) {
            checkStartGameTimeout -= dt;
            if (gameDeveloperLogo.isExist === true) gameDeveloperLogo.update(dt);
            if (gameTitleText.isExist === true) gameTitleText.update(dt);
            if (gameDescriptionText.isExist === true) gameDescriptionText.update(dt);
            startGameText.update(dt);
            return;
        } else {
            startGameText.update(dt);
            if (CURSOR.isClick) {
                startGameText.visibleTime = 0;
                setTimeout( () => {
                    gameDeveloperLogo.isExist = false;
                    gameTitleText.isExist = false;
                    gameDescriptionText.isExist = false;
                    startGameText.isExist = false;
                    isGameStart = true;
                }, 500);
            }
            return;
        }
    }

    // adding backgrounds
    smallGalaxyBackgroundLeft.update(dt);
    smallGalaxyBackgroundRight.update(dt);
    blackHoleBackgroundLeft.update(dt);
    blackHoleBackgroundRight.update(dt);
    planetsBackground.update(dt);
    redPlanetBackground.update(dt);

    gameCursor.update(dt);

    // update bonuses
    for (let i = 0; i < bonusesArr.length; i++) bonusesArr[i].update(dt);
    bonusesArr = getExistsObjectsFromArr( bonusesArr );

    // update smoke
    for (let i = 0; i < smokeArr.length; i++) smokeArr[i].update(dt);
    smokeArr = getExistsObjectsFromArr( smokeArr );

    // update rock arr
    for (let i = 0; i < rocksArr.length; i++) rocksArr[i].update(dt);
    rocksArr = getExistsObjectsFromArr( rocksArr );

    // update enemies bullets arr
    for (let i = 0; i < enemiesBulletsArr.length; i++) enemiesBulletsArr[i].update(dt);
    enemiesBulletsArr = getExistsObjectsFromArr( enemiesBulletsArr );

    // update enemies arr
    if (enemiesArr.length < maxEnemiesOnScreen) createEnemy();
    for (let i = 0; i < enemiesArr.length; i++) enemiesArr[i].update(dt);
    enemiesArr = getExistsObjectsFromArr( enemiesArr );

    // update asteroids arr
    if (asteroidsArr.length < maxAsteroidsOnScreen) createAsteroid();
    for (let i = 0; i < asteroidsArr.length; i++) asteroidsArr[i].update(dt);
    asteroidsArr = getExistsObjectsFromArr( asteroidsArr );

    // update player
    if (player.hp > 0) player.update(dt);
    else gameOverText.update(dt);

    // update explosions
    for (let i = 0; i < oneLoopObjectsArr.length; i++) oneLoopObjectsArr[i].update(dt);
    oneLoopObjectsArr = getExistsObjectsFromArr( oneLoopObjectsArr );

    // update messages
    for (let i = 0; i < messagesArr.length; i++) messagesArr[i].update(dt);
    messagesArr = getExistsObjectsFromArr( messagesArr );

    // update player info
    player.propertiesText.draw();
    player.scoresText.draw();
    player.hpText.draw();
}

export {
    CURSOR, gameCursor, player, bonusesArr, oneLoopObjectsArr,
    addToMaxAsteroids, asteroidsArr, rocksArr, smokeArr,
    addToMaxEnemies, enemiesArr, enemiesBulletsArr, messagesArr
};