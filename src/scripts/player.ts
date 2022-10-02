import { BoundedCharacter } from "./characters";
import { Direction } from "./main";

export class Player extends BoundedCharacter {
    /**
     
     */

    Update() {
        this.UpdatePosition();
    }

    UpdatePosition() {
        if (this.currentDirection != this.nextDirection)
            this.HandleChangeDirection();

        //update with current direction
        switch (this.currentDirection) {
            case Direction.Up:
                this.body.position.y -= this.gridHeight * this.speed * this.appRef.ticker.elapsedMS / 1000;
                break;
            case Direction.Down:
                this.body.position.y += this.gridHeight * this.speed * this.appRef.ticker.elapsedMS / 1000;
                break;
            case Direction.Left:
                this.body.position.x -= this.gridWidth * this.speed * this.appRef.ticker.elapsedMS / 1000;
                break;
            case Direction.Right:
                this.body.position.x += this.gridWidth * this.speed * this.appRef.ticker.elapsedMS / 1000;
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
        console.error("TRIGGERED GAMEOVER, IMPLEMENT GAME HANDLER");
    }
}