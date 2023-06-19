import EnemyShipPrototype from "./EnemyShipPrototype.js";

class SimpleEnemy extends EnemyShipPrototype {
    constructor(x, y, type) {
        super(imageName, x, y, size, speed, hp, damage, this.move, this.attack, type);
    }

    move(dt) {
        
    }

    attack(dt) {

    }
}

export default SimpleEnemy;