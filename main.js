var app = new PIXI.Application({ width: 800, height: 800 });
document.body.appendChild(app.view);
var playerWidth = app.screen.width / 15;
var playerHeight = app.screen.height / 15;
//background
var bg = new PIXI.Graphics();
bg.beginFill(0x9ACB59);
bg.drawRect(0, 0, app.screen.width, app.screen.height);
bg.endFill();
app.stage.addChild(bg);
//player
var playerBody = new PIXI.Graphics();
playerBody.beginFill(0x3F6FDE);
playerBody.drawRect(0, 0, playerWidth, playerHeight);
playerBody.endFill();
playerBody.position.x = (app.screen.width / 2) - (playerWidth / 2);
playerBody.position.y = (app.screen.height / 2) - (playerHeight / 2);
app.stage.addChild(playerBody);
document.addEventListener('keydown', onKeyDown);
function onKeyDown(key) {
    console.log("PRESSED" + key.keyCode);
    // if W Key is pressed and not on the edge of level -> move
    if (key.keyCode === 87 && playerBody.position.y > playerWidth / 2) {
        playerBody.position.y -= playerHeight;
    }
    // S
    if (key.keyCode === 83 && playerBody.position.y < app.screen.height - playerHeight) {
        playerBody.position.y += playerHeight;
    }
    // A
    if (key.keyCode === 65 && playerBody.position.x > playerWidth / 2) {
        playerBody.position.x -= playerWidth;
    }
    // D
    if (key.keyCode === 68 && playerBody.position.x < app.screen.width - playerWidth) {
        playerBody.position.x += playerWidth;
    }
}
