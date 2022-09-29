var app = new PIXI.Application({ antialias: true });
document.body.appendChild(app.view);
var graphics = new PIXI.Graphics();
// Rectangle
graphics.beginFill(0xDE3249);
graphics.drawRect(50, 50, 100, 100);
graphics.endFill();
app.stage.addChild(graphics);
