import { Graphics, Ticker } from 'pixi.js';
import { Direction } from './main';
import { GameHandler } from './game-handler';

export class Character {
  gameHandler: GameHandler;
  speed: number;
  body = new Graphics();
  color: number;
  currentDirection: Direction;
  nextDirection: Direction;
  gridHeight: number;
  gridWidth: number;
  threshold: number = 3;

  constructor(gameHandler: GameHandler, color: number, posX: number, posY: number, width: number,
    height: number, speed: number) {
    this.gameHandler = gameHandler;
    this.color = color;
    this.body.beginFill(this.color);
    this.gridWidth = width;
    this.gridHeight = height;

    this.body.drawRect(-this.gridWidth / 2, -this.gridHeight / 2, this.gridWidth, this.gridHeight);
    this.body.endFill();
    this.body.position.x = posX;
    this.body.position.y = posY;
    this.gameHandler.appRef.stage.addChild(this.body);

    this.currentDirection = this.GetRandomDirection();
    this.nextDirection = this.currentDirection;
    this.speed = speed;
  }

  GetRandomDirection(): Direction {
    let rand = Math.floor(Math.random() * 4);
    switch (rand) {
      case 0: return Direction.Up;
      case 1: return Direction.Down;
      case 2: return Direction.Left;
      case 3: return Direction.Right;
      default: return Direction.Right;
    }
  }

  SetNextDirection(direction: Direction) {
    this.nextDirection = direction;
  }

  GetPositionX(): number {
    return this.body.position.x;
  }

  GetPositionY(): number {
    return this.body.position.y;
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
      x - this.threshold > this.gameHandler.appRef.screen.width - this.gridWidth / 2 ||
      y + this.threshold < 0 + this.gridHeight / 2 ||
      y - this.threshold > this.gameHandler.appRef.screen.width - this.gridHeight / 2)
      return true;
    return false;
  }

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

  TriggerOutOfBounds() { }
}
