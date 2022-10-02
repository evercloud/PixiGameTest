import { Application, Graphics } from 'pixi.js';
import { Direction } from './main';

// export interface IMovable {
// name: string;
// IsPlayer: boolean;
//   SetNextDirection();
//   UpdatePosition();
// }

class Character {
  speed: number;
  body = new Graphics();
  color: number;
  appRef: Application;
  currentDirection: Direction;
  nextDirection: Direction;
  gridHeight: number;
  gridWidth: number;
  threshold: number = 3;

  constructor(app: Application, color: number, startX: number, startY: number, width: number,
    height: number, startDirection: Direction, speed: number) {
    this.color = color;
    this.body.beginFill(this.color);
    this.gridWidth = width;
    this.gridHeight = height;
    this.body.drawRect(startX, startY, this.gridWidth, this.gridHeight);
    this.body.endFill();
    this.appRef = app;
    this.body.position.x = (this.appRef.screen.width / 2);
    this.body.position.y = (this.appRef.screen.height / 2);
    this.appRef.stage.addChild(this.body);
    this.currentDirection = startDirection;
    this.nextDirection = startDirection;
    this.speed = speed;
    console.log("TODO: TEST REFERENCE ASSIGNMENT HERE");
  }

  SetNextDirection(direction: Direction) {
    this.nextDirection = direction;
  }

  UpdatePosition() { }


  HandleChangeDirection() {
    let distance: number;
    let temp: number;

    switch (this.currentDirection) {
      case Direction.Up:
      case Direction.Down:
        temp = Math.round((this.body.y - this.gridHeight / 2) / this.gridHeight);
        distance = Math.abs(temp * this.gridHeight - (this.body.y - this.gridHeight / 2));

        if (distance >= this.threshold)
          return;

        this.body.y = (temp * this.gridHeight) + this.gridHeight / 2;
        this.currentDirection = this.nextDirection;
        break;
      case Direction.Left:
      case Direction.Right:
        temp = Math.round((this.body.x - this.gridWidth / 2) / this.gridWidth);
        distance = Math.abs(temp * this.gridWidth - (this.body.x - this.gridWidth / 2));

        if (distance >= this.threshold)
          return;

        this.body.x = (temp * this.gridWidth) + this.gridWidth / 2;
        this.currentDirection = this.nextDirection;
        break;
      default:
        return;
    }
  }
}

export class BoundedCharacter extends Character {
  IsOutOfBounds(x: number, y: number): boolean {
    if (x + this.threshold < 0 + this.gridWidth / 2 ||
      x - this.threshold > this.appRef.screen.width - this.gridWidth / 2 ||
      y + this.threshold < 0 + this.gridHeight / 2 ||
      y - this.threshold > this.appRef.screen.width - this.gridHeight / 2)
      return true;
    return false;
  }

  TriggerOutOfBounds() { }
}
