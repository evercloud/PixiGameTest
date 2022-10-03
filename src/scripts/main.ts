import { Application, Ticker } from 'pixi.js';
import { GameHandler } from './game-handler';

export enum Direction { Up, Down, Left, Right }

//initialize app
let app = new Application({ width: 800, height: 800 });
document.body.appendChild(app.view);

//initialize game handler
let gameHandler: GameHandler = new GameHandler(app);
gameHandler.Initialize();

//handle game preparation
app.stage.sortableChildren = true; //allow zIndex sorting for timer text
Ticker.shared.autoStart = false;
Ticker.shared.stop();
Ticker.shared.add(UpdateControls);

//intialize controls
let keysPressed: { [key: number]: boolean } = { 87: false, 83: false, 65: false, 68: false };
function OnKeyDown(key: KeyboardEvent) {
    keysPressed[key.keyCode] = true;
}
function OnKeyUp(key: KeyboardEvent) {
    keysPressed[key.keyCode] = false;
}
function UpdateControls() {
    // apparently handling key presses with some kind of priority helps smoothness a little bit
    if (keysPressed[87]) { gameHandler.player.SetNextDirection(Direction.Up); } //W
    else if (keysPressed[83]) { gameHandler.player.SetNextDirection(Direction.Down); } //S
    if (keysPressed[65]) { gameHandler.player.SetNextDirection(Direction.Left); } //A
    else if (keysPressed[68]) { gameHandler.player.SetNextDirection(Direction.Right); } //D
}

//wait for input
document.addEventListener('keydown', OnKeyPressedStart);

function OnKeyPressedStart(key: KeyboardEvent) {
    if (key.keyCode != 87 && key.keyCode != 83 && key.keyCode != 65 && key.keyCode != 68)
        return;

    //remove this listener
    document.removeEventListener('keydown', OnKeyPressedStart);
    //and setup controls
    document.addEventListener('keydown', OnKeyDown);
    document.addEventListener('keyup', OnKeyUp);

    switch (key.keyCode) {
        case 87:
            gameHandler.player.SetNextDirection(Direction.Up);
            break;
        case 83:
            gameHandler.player.SetNextDirection(Direction.Down);
            break;
        case 65:
            gameHandler.player.SetNextDirection(Direction.Left);
            break;
        case 68:
            gameHandler.player.SetNextDirection(Direction.Right);
            break;
        default:
            break;
    }

    //start game
    Ticker.shared.start();
}