// import * as PIXI from 'pixi.js';
var Direction;
(function (Direction) {
    Direction[Direction["Up"] = 0] = "Up";
    Direction[Direction["Down"] = 1] = "Down";
    Direction[Direction["Left"] = 2] = "Left";
    Direction[Direction["Right"] = 3] = "Right";
})(Direction || (Direction = {}));
//initialize app
var app = new PIXI.Application({ width: 800, height: 800 });
document.body.appendChild(app.view);
//useful fields:
var gridSpacing = 15;
var gridWidth = app.screen.width / gridSpacing;
var gridHeight = app.screen.height / gridSpacing;
//draw background
var bg = new PIXI.Graphics();
bg.beginFill(0x9ACB59);
bg.drawRect(0, 0, app.screen.width, app.screen.height);
bg.endFill();
app.stage.addChild(bg);
//draw grid lines
var lines = new PIXI.Graphics();
for (var i = 0; i < gridSpacing; i++) {
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
var playerSpeed = 5;
var playerBody = new PIXI.Graphics();
playerBody.beginFill(0x3F6FDE);
playerBody.drawRect(-gridWidth / 2, -gridHeight / 2, gridWidth, gridHeight);
playerBody.endFill();
playerBody.position.x = (app.screen.width / 2);
playerBody.position.y = (app.screen.height / 2);
app.stage.addChild(playerBody);
var currentDirection = Direction.Right;
var nextDirection = Direction.Right;
//add player keys listerner...
document.addEventListener('keydown', onKeyDown);
//...and handler
function onKeyDown(key) {
    // if key is pressed, set next direction
    if (key.keyCode === 87) {
        SetNextDirection(Direction.Up);
    } //W
    if (key.keyCode === 83) {
        SetNextDirection(Direction.Down);
    } //S
    if (key.keyCode === 65) {
        SetNextDirection(Direction.Left);
    } //A
    if (key.keyCode === 68) {
        SetNextDirection(Direction.Right);
    } //D
}
//add timer text
var timerText = app.stage.addChild(new PIXI.Text('SURVIVAL TIME: ', {
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
    //"SNAPPY" OLD VERSION
    // timer += app.ticker.elapsedMS;
    // if (timer <= moveDuration)
    //     return;
    // timer = 0;
    UpdatePlayerPosition();
    //update enemy positions
    //check for collisions
}
function UpdateTimerText() {
    timerText.text = 'SURVIVAL TIME: ' + Math.round(app.ticker.lastTime / 1000);
}
//PLAYER FUNCTIONS
function UpdatePlayerPosition() {
    //update with current direction
    switch (currentDirection) {
        case Direction.Up:
            playerBody.position.y -= gridHeight * playerSpeed * app.ticker.elapsedMS / 1000;
            break;
        case Direction.Down:
            playerBody.position.y += gridHeight * playerSpeed * app.ticker.elapsedMS / 1000;
            break;
        case Direction.Left:
            playerBody.position.x -= gridWidth * playerSpeed * app.ticker.elapsedMS / 1000;
            break;
        case Direction.Right:
            playerBody.position.x += gridWidth * playerSpeed * app.ticker.elapsedMS / 1000;
            break;
        default:
            break;
    }
    if (currentDirection != nextDirection)
        HandleChangeDirection();
    if (IsOutOfBounds(playerBody.position.x, playerBody.position.y))
        TriggerGameOver();
}
function IsOutOfBounds(x, y) {
    if (x < 0 + gridWidth / 2 || x > app.screen.width - gridWidth / 2 ||
        y < 0 + gridHeight / 2 || y > app.screen.width - gridHeight / 2)
        return true;
    return false;
}
function SetNextDirection(_direction) {
    console.log("PRESSED " + _direction.toString());
    nextDirection = _direction;
}
var thresholdDistance = 1;
function HandleChangeDirection() {
    var distance;
    var temp;
    switch (currentDirection) {
        case Direction.Up:
        case Direction.Down:
            temp = Math.round((playerBody.y - gridHeight / 2) / gridHeight);
            distance = Math.abs(temp * gridHeight - (playerBody.y - gridHeight / 2));
            if (distance >= thresholdDistance)
                return;
            playerBody.y = (temp * gridHeight) + gridHeight / 2;
            currentDirection = nextDirection;
            break;
        case Direction.Left:
        case Direction.Right:
            temp = Math.round((playerBody.x - gridWidth / 2) / gridWidth);
            distance = Math.abs(temp * gridWidth - (playerBody.x - gridWidth / 2));
            if (distance >= thresholdDistance)
                return;
            playerBody.x = (temp * gridWidth) + gridWidth / 2;
            currentDirection = nextDirection;
            break;
        default:
            return;
    }
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
