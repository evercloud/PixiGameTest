import { Player } from './player';
import { Application, Graphics, Text, Ticker } from 'pixi.js';
import { Direction } from './main';


export class GameHandler {

    appRef: Application;
    gridSpacing: number = 15;
    gridWidth: number;
    gridHeight: number;
    timerText: Text;
    player: Player;

    constructor(app: Application) {
        this.appRef = app;
        this.gridWidth = app.screen.width / this.gridSpacing;
        this.gridHeight = app.screen.height / this.gridSpacing;
    }

    Initialize(): void {
        this.DrawStage();
        this.InitializeTimer();
        this.CreatePlayer();
        Ticker.shared.add(this.Update, this);
    }

    private DrawStage(): void {
        //draw background
        const bg = new Graphics();
        bg.beginFill(0x9ACB59);
        bg.drawRect(0, 0, this.appRef.screen.width, this.appRef.screen.height);
        bg.endFill();
        this.appRef.stage.addChild(bg);

        //draw grid
        const lines = new Graphics();
        for (let i = 0; i < this.gridSpacing; i++) {
            lines.beginFill(0x9ACB59); //same color as bg, no transparency needed
            lines.lineStyle(4, 0x91C250, 1);
            lines.moveTo(i * this.gridWidth, 0);
            lines.lineTo(i * this.gridWidth, this.appRef.screen.width);
            lines.moveTo(0, i * this.gridHeight);
            lines.lineTo(this.appRef.screen.height, i * this.gridHeight);
            lines.endFill();
        }
        this.appRef.stage.addChild(lines);
    }

    private InitializeTimer(): void {
        this.timerText = this.appRef.stage.addChild(new Text('SURVIVAL TIME: ', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff,
            align: 'center'
        }));

        this.timerText.anchor.set(0.5);
        this.timerText.x = this.appRef.screen.width / 2;
        this.timerText.y = 50;
    }

    private CreatePlayer(): void {
        this.player = new Player(this, 0x3F6FDE, -this.gridWidth / 2,
            -this.gridHeight / 2, this.gridWidth, this.gridHeight, Direction.Right, 5);
    }

    private Update(): void {
        this.UpdateTimerText();
        this.UpdatePlayer();

        //update enemy positions
        //check for collisions
    }

    private UpdateTimerText(): void {
        this.timerText.text = 'SURVIVAL TIME: ' + Math.round(Ticker.shared.lastTime / 1000);
    }

    private UpdatePlayer(): void {
        this.player.Update();
    }

    TriggerGameOver(): void {
        Ticker.shared.stop();
        this.timerText.y = this.appRef.screen.height / 2;
        this.timerText.text = "GAMEOVER! TIME: " + Math.round(Ticker.shared.lastTime / 1000);
    }
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