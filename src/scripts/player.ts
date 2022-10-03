import { BoundedCharacter } from "./characters";
import { Direction } from "./main";

export class Player extends BoundedCharacter {
    // see characters.ts for BoundedCharacter

    protected override SetColor(): void {
        this.color = 0x4486f4;
    }

    protected override TriggerOutOfBounds(): void {
        this.TriggerGameOver();
    }

    private TriggerGameOver(): void {
        this.gameHandler.TriggerGameOver();
    }

    public GetCurrentDirection(): Direction {
        return this.currentDirection;
    }
}