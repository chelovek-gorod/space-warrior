import Spritesheet from "../../engine/classes/Spritesheet.js";
import { CURSOR } from "../main.js";

class GameCursor extends Spritesheet {
    constructor() {
        super('player_cursor_48x48px_16frames.png', 0, 0, 48, 48, 16, 12);
    }

    update(dt) {
        this.centerX = CURSOR.x;
        this.centerY = CURSOR.y;
        this.drawWithAnimation(dt);
    }
}

export default GameCursor;