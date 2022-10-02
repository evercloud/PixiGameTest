// import * as PIXI from 'pixi.js';
import { Application, Graphics, Text } from 'pixi.js';
import { Player } from './player';

export enum Direction { Up, Down, Left, Right }

//initialize app
let app = new Application({ width: 800, height: 800 });
document.body.appendChild(app.view);

//useful fields:
let gridSpacing: number = 15;
let gridWidth: number = app.screen.width / gridSpacing;
let gridHeight: number = app.screen.height / gridSpacing;

//draw background
const bg = new Graphics();
bg.beginFill(0x9ACB59);
bg.drawRect(0, 0, app.screen.width, app.screen.height);
bg.endFill();
app.stage.addChild(bg);

//draw grid lines
const lines = new Graphics();
for (let i = 0; i < gridSpacing; i++) {
    lines.beginFill(0x9ACB59); //same color as bg, no transparency needed
    lines.lineStyle(4, 0x91C250, 1);
    lines.moveTo(i * gridWidth, 0);
    lines.lineTo(i * gridWidth, app.screen.width);
    lines.moveTo(0, i * gridHeight);
    lines.lineTo(app.screen.height, i * gridHeight);
    lines.endFill();
}
app.stage.addChild(lines);

//create player
let player: Player = new Player(app, 0x3F6FDE, -gridWidth / 2, -gridHeight / 2, gridWidth, gridHeight, Direction.Right, 5);

//setup controls
let keysPressed = {};
document.addEventListener('keydown', onKeyDown);
document.addEventListener('keyup', onKeyUp);

function onKeyDown(key: KeyboardEvent) {
    keysPressed[key.keyCode] = true;
}
function onKeyUp(key: KeyboardEvent) {
    keysPressed[key.keyCode] = false;
}

//add timer text
const timerText = app.stage.addChild(new Text('SURVIVAL TIME: ', {
    fontFamily: 'Arial',
    fontSize: 24,
    fill: 0xffffff,
    align: 'center'
}));

timerText.anchor.set(0.5);
timerText.x = app.screen.width / 2;
timerText.y = 50;

app.ticker.add(Update);

function Update() {
    UpdateTimerText();
    UpdateControls();
    UpdatePlayer();

    //update enemy positions
    //check for collisions
}

function UpdateTimerText() {
    timerText.text = 'SURVIVAL TIME: ' + Math.round(app.ticker.lastTime / 1000);
}

function UpdateControls() {
    // apparently handling key presses with some kind of priority helps smoothness a little bit
    if (keysPressed[87]) { player.SetNextDirection(Direction.Up); } //W
    else if (keysPressed[83]) { player.SetNextDirection(Direction.Down); } //S
    if (keysPressed[65]) { player.SetNextDirection(Direction.Left); } //A
    else if (keysPressed[68]) { player.SetNextDirection(Direction.Right); } //D
}

function UpdatePlayer() {
    player.Update();
}

function TriggerGameOver() {
    app.ticker.stop();
    timerText.y = app.screen.height / 2;
    timerText.text = "GAMEOVER! TIME: " + Math.round(app.ticker.lastTime / 1000);
}

/*
//NOTES:
//deltaTime counts how many frames were rendered in one update (30FPS => 2, 60FPS => 1)
//to move the object 5 pixels per frame, use "5 * deltaTime"
//to move "300 pixels per second", use "0.3 * elapsedMs"

//YOU CAN REMOVE LISTENERS FROM UPDATE, example:
//   setTimeout (function(){
//     app.ticker.remove(app.animationUpdate);
//   },5000);*/