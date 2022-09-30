// import * as PIXI from 'pixi.js';

let app = new PIXI.Application({ width: 800, height: 800 });

document.body.appendChild(app.view);

var gridWidth: number = app.screen.width / 15;
var gridHeight: number = app.screen.height / 15;

//background
const bg = new PIXI.Graphics();
bg.beginFill(0x9ACB59);
bg.drawRect(0, 0, app.screen.width, app.screen.height);
bg.endFill();
app.stage.addChild(bg);

//player
const playerBody = new PIXI.Graphics();
playerBody.beginFill(0x3F6FDE);
playerBody.drawRect(0, 0, gridWidth, gridHeight);
playerBody.endFill();
playerBody.position.x = (app.screen.width / 2) - (gridWidth / 2);
playerBody.position.y = (app.screen.height / 2) - (gridHeight / 2);
app.stage.addChild(playerBody);

document.addEventListener('keydown', onKeyDown);

function onKeyDown(key: KeyboardEvent) {
    // if W Key is pressed and not on the edge of level -> move
    if (key.keyCode === 87 && playerBody.position.y > gridWidth / 2) {
        playerBody.position.y -= gridHeight;
    }

    // S
    if (key.keyCode === 83 && playerBody.position.y < app.screen.height - gridHeight) {
        playerBody.position.y += gridHeight;
    }

    // A
    if (key.keyCode === 65 && playerBody.position.x > gridWidth / 2) {
        playerBody.position.x -= gridWidth;
    }

    // D
    if (key.keyCode === 68 && playerBody.position.x < app.screen.width - gridWidth) {
        playerBody.position.x += gridWidth;
    }
}

let timer = 0;
let moveDuration = 1;

app.ticker.add((delta) => {
    timer += delta;

    if (timer > moveDuration) {
        ManualUpdate();
        timer = 0;
    }
});

function ManualUpdate() {
    console.log("UPDATING NOW. TIME: " + app.ticker);
}