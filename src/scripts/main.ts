import { Application, Ticker } from 'pixi.js';
import { GameHandler } from './game-handler';

export enum Direction { Up, Down, Left, Right }

//initialize app
let app = new Application({ width: 800, height: 800 });
document.body.appendChild(app.view);

//initialize game
let gameHandler: GameHandler = new GameHandler(app);
gameHandler.Initialize();

//setup controls
let keysPressed: { [key: number]: boolean } = { 87: false, 83: false, 65: false, 68: false };
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(key: KeyboardEvent) {
    keysPressed[key.keyCode] = true;
}
function onKeyUp(key: KeyboardEvent) {
    keysPressed[key.keyCode] = false;
}
function UpdateControls() {
    // apparently handling key presses with some kind of priority helps smoothness a little bit
    if (keysPressed[87]) { gameHandler.player.SetNextDirection(Direction.Up); } //W
    else if (keysPressed[83]) { gameHandler.player.SetNextDirection(Direction.Down); } //S
    if (keysPressed[65]) { gameHandler.player.SetNextDirection(Direction.Left); } //A
    else if (keysPressed[68]) { gameHandler.player.SetNextDirection(Direction.Right); } //D
}
Ticker.shared.add(UpdateControls);