import { Character, BoundedCharacter } from "./characters";
import { Direction } from "./main";
import { Player } from "./player";

export class Enemy extends BoundedCharacter {

    isActive: boolean = false;
    playerRef: Player;

    AssignPlayer(player: Player) {
        this.playerRef = player;
        this.isActive = true;
    }

    override TriggerOutOfBounds(): void {
        this.DestroyThis();
    }

    override Update(): void {
        this.CheckForCollision();
        this.UpdateDestination();
        this.UpdatePosition();
    }

    CheckForCollision(): void {
        let distance: number = Math.sqrt(Math.pow(Math.abs(this.playerRef.GetPositionY() - this.GetPositionY()), 2) +
            Math.pow(Math.abs(this.playerRef.GetPositionX() - this.GetPositionX()), 2));

        if (distance < this.gridWidth)// Math.sqrt(2) * this.gridWidth / 2)
            this.gameHandler.TriggerGameOver();
    }

    UpdateDestination(): void {
        //0 90 180 -90
        let angle = Math.atan2(this.playerRef.GetPositionY() - this.GetPositionY(),
            this.playerRef.GetPositionX() - this.GetPositionX()) * (180 / Math.PI);
        this.SetDestination(angle);
    }

    SetDestination(angle: number) {
        //set chasing direction
        this.nextDirection = Direction.Left;
        if (angle > -135) {
            if (angle < -45)
                this.nextDirection = Direction.Up;
            else {
                if (angle < 45)
                    this.nextDirection = Direction.Right;
                else if (angle < 135)
                    this.nextDirection = Direction.Down;
            }
        }
    }

    DestroyThis() {
        //if goes out of boundaries respawn it randomly
        this.body.x = this.gameHandler.GetRandomGridWidth();
        this.body.y = this.gameHandler.GetRandomGridHeight();
        this.currentDirection = this.GetRandomDirection();
        this.nextDirection = this.currentDirection;
    }
}