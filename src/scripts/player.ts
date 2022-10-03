import { BoundedCharacter } from "./characters";
import { Direction } from "./main";

export class Player extends BoundedCharacter {
    // see characters.ts for BoundedCharacter

    override SetColor() {
        this.color = 0x4486f4;
    }

    override TriggerOutOfBounds(): void {
        this.TriggerGameOver();
    }

    TriggerGameOver(): void {
        this.gameHandler.TriggerGameOver();
    }

    GetCurrentDirection(): Direction {
        return this.currentDirection;
    }
}