import { BoundedCharacter } from "./characters";

export class Player extends BoundedCharacter {
    // see characters.ts for BoundedCharacter

    override TriggerOutOfBounds(): void {
        this.TriggerGameOver();
    }

    TriggerGameOver(): void {
        this.gameHandler.TriggerGameOver();
    }
}