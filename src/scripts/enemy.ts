import { BoundedCharacter } from "./characters";
import { Direction } from "./main";
import { Player } from "./player";

export abstract class Enemy extends BoundedCharacter {

    protected isActive: boolean = false;
    protected playerRef: Player;

    //FOR DEBUGGING USE
    /*protected targetDebug = new Graphics();
    protected InitializeDebug(): void {
        this.targetDebug.beginFill(0xff0000);
        this.targetDebug.drawRect(-this.gridWidth / 4, -this.gridHeight / 4, this.gridWidth / 2, this.gridHeight / 2);
        this.targetDebug.endFill();
        this.targetDebug.position.x = this.body.position.x;
        this.targetDebug.position.y = this.body.position.y;
        this.gameHandler.appRef.stage.addChild(this.targetDebug);
    }
    protected UpdateDebug(x: number, y: number): void {
        this.targetDebug.position.x = x;
        this.targetDebug.position.y = y;
    }*/

    public AssignPlayer(player: Player) {
        this.playerRef = player;
        this.isActive = true;
        // this.InitializeDebug();
    }

    override TriggerOutOfBounds(): void {
        this.DestroyThis();
    }

    override Update(): void {
        this.CheckForCollision();
        this.UpdateDestination();
        this.UpdatePosition();
    }

    IsActive(): boolean { return this.isActive; }

    CheckForCollision(): void {
        let distance: number = Math.sqrt(Math.pow(Math.abs(this.playerRef.GetPositionY() - this.GetPositionY()), 2) +
            Math.pow(Math.abs(this.playerRef.GetPositionX() - this.GetPositionX()), 2));

        if (distance < this.gridWidth)// Math.sqrt(2) * this.gridWidth / 2)
            this.gameHandler.TriggerGameOver();
    }

    protected abstract UpdateDestination(): void;

    protected SetDirection(angle: number): void {
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

    public DestroyThis(): void {
        //if goes out of boundaries respawn it randomly
        this.body.x = this.gameHandler.GetRandomGridWidth();
        this.body.y = this.gameHandler.GetRandomGridHeight();
        this.currentDirection = this.GetRandomDirection();
        this.nextDirection = this.currentDirection;
    }
}

//points at player
export class EnemyA extends Enemy {
    protected SetColor() {
        this.color = 0xda483b;
    }

    UpdateDestination(): void {
        //0 90 180 -90
        let angle = Math.atan2(this.playerRef.GetPositionY() - this.GetPositionY(),
            this.playerRef.GetPositionX() - this.GetPositionX()) * (180 / Math.PI);
        this.SetDirection(angle);
    }
}

//points ahead of player
export class EnemyB extends Enemy {
    protected SetColor(): void {
        this.color = 0xff860f;
    }

    protected UpdateDestination(): void {
        let posX = this.playerRef.GetPositionX();
        let posY = this.playerRef.GetPositionY();
        switch (this.playerRef.GetCurrentDirection()) {
            case Direction.Up:
                posY -= 3 * this.gridHeight;
                break;
            case Direction.Down:
                posY += 3 * this.gridHeight;
                break;
            case Direction.Right:
                posX += 3 * this.gridWidth;
                break;
            case Direction.Left:
                posX -= 3 * this.gridHeight;
                break;
            default:
                break;
        }
        // this.UpdateDebug(posX, posY);

        let angle = Math.atan2(posY - this.GetPositionY(),
            posX - this.GetPositionX()) * (180 / Math.PI);
        this.SetDirection(angle);
    }
}

//points behind of player
export class EnemyC extends Enemy {
    protected SetColor(): void {
        this.color = 0xfcd41a;
    }

    protected UpdateDestination(): void {
        let posX = this.playerRef.GetPositionX();
        let posY = this.playerRef.GetPositionY();
        switch (this.playerRef.GetCurrentDirection()) {
            case Direction.Up:
                posY += 3 * this.gridHeight;
                break;
            case Direction.Down:
                posY -= 3 * this.gridHeight;
                break;
            case Direction.Right:
                posX -= 3 * this.gridWidth;
                break;
            case Direction.Left:
                posX += 3 * this.gridHeight;
                break;
            default:
                break;
        }
        // this.UpdateDebug(posX, posY);

        let angle = Math.atan2(posY - this.GetPositionY(),
            posX - this.GetPositionX()) * (180 / Math.PI);
        this.SetDirection(angle);
    }
}