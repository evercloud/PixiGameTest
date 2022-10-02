import { Ticker } from "pixi.js";
import { BoundedCharacter } from "./characters";
import { Direction } from "./main";

export class Player extends BoundedCharacter {
    // see characters.ts for BoundedCharacter

    Update() {
        this.UpdatePosition();
    }

    UpdatePosition() {
        if (this.currentDirection != this.nextDirection)
            this.HandleChangeDirection();

        switch (this.currentDirection) {
            case Direction.Up:
                this.body.position.y -= this.gridHeight * this.speed * Ticker.shared.elapsedMS / 1000;
                break;
            case Direction.Down:
                this.body.position.y += this.gridHeight * this.speed * Ticker.shared.elapsedMS / 1000;
                break;
            case Direction.Left:
                this.body.position.x -= this.gridWidth * this.speed * Ticker.shared.elapsedMS / 1000;
                break;
            case Direction.Right:
                this.body.position.x += this.gridWidth * this.speed * Ticker.shared.elapsedMS / 1000;
                break;
            default:
                break;
        }

        if (this.IsOutOfBounds(this.body.position.x, this.body.position.y))
            this.TriggerOutOfBounds();
    }

    override TriggerOutOfBounds(): void {
        this.TriggerGameOver();
    }

    TriggerGameOver(): void {
        this.gameHandler.TriggerGameOver();
    }
}