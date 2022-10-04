import { Player } from './player';
import { Application, Graphics, Text, Ticker } from 'pixi.js';
import { Enemy, EnemyA, EnemyB, EnemyC } from './enemy';

export class GameHandler {

    //shared variables
    public appRef: Application;
    public player: Player;

    //stage
    private gridSpacing: number = 15;
    private gridWidth: number;
    private gridHeight: number;
    private timer: number = 0;
    private timerText: Text;

    //enemies
    private enemySpawnDuration: number = 5;
    private currentSpawnTimer: number = 0;
    private maxEnemies: number = 8;
    private enemies: Enemy[] = [];

    constructor(app: Application) {
        this.appRef = app;
        this.gridWidth = app.screen.width / this.gridSpacing;
        this.gridHeight = app.screen.height / this.gridSpacing;
    }

    public Initialize(): void {
        this.DrawStage();
        this.CreatePlayer();
        this.InitializeTimer();
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
        this.timerText = this.appRef.stage.addChild(new Text('USE WASD KEYS TO MOVE\nDON\'T LET THEM GET YOU!', {
            fontFamily: 'Arial',
            fontSize: 24,
            fill: 0xffffff,
            align: 'center'
        }));

        this.timerText.zIndex = 100; //make sure it's drawn above everything
        this.timerText.anchor.set(0.5);
        this.timerText.x = this.appRef.screen.width / 2;
        this.timerText.y = 50;
    }

    private CreatePlayer(): void {
        this.player = new Player(this, this.appRef.screen.width / 2,
            this.appRef.screen.height / 2, this.gridWidth, this.gridHeight, 5);
    }

    private HandleEnemySpawn() {
        this.currentSpawnTimer += Ticker.shared.elapsedMS / 1000;
        if (this.currentSpawnTimer > this.enemySpawnDuration) {
            this.currentSpawnTimer = 0;
            this.SpawnRandomEnemy();
        }
    }

    private SpawnRandomEnemy(): void {
        this.enemies.push(this.InstantiateRandomEnemy());
        this.enemies[this.enemies.length - 1].AssignPlayer(this.player);
    }

    private InstantiateRandomEnemy(): Enemy {
        let rand: number = Math.floor(Math.random() * 3);
        switch (rand) {
            case 0:
                return new EnemyA(this, this.GetRandomGridWidth(), this.GetRandomGridHeight(),
                    this.gridWidth, this.gridHeight, 4);
            case 1:
                return new EnemyB(this, this.GetRandomGridWidth(), this.GetRandomGridHeight(),
                    this.gridWidth, this.gridHeight, 4);
            case 2:
                return new EnemyC(this, this.GetRandomGridWidth(), this.GetRandomGridHeight(),
                    this.gridWidth, this.gridHeight, 4);
            default:
                break;
        }
    }

    public GetRandomGridWidth(): number {
        let grid = Math.floor(Math.random() * this.gridSpacing);
        return grid * this.gridWidth + this.gridWidth / 2;
    }

    public GetRandomGridHeight(): number {
        let grid = Math.floor(Math.random() * this.gridSpacing);
        return grid * this.gridHeight + this.gridHeight / 2;
    }

    private Update(): void {
        if (this.enemies.length < this.maxEnemies)
            this.HandleEnemySpawn();

        this.UpdateTimerText();
        this.UpdatePlayer();
        this.UpdateEnemies();
    }

    private UpdateTimerText(): void {
        this.timer += Ticker.shared.elapsedMS / 1000;
        this.timerText.text = 'SURVIVAL TIME: ' + Math.round(this.timer);
    }

    private UpdatePlayer(): void {
        this.player.Update();
    }

    private UpdateEnemies(): void {
        for (let i = 0; i < this.enemies.length; i++) {
            if (this.enemies[i].IsActive())
                this.enemies[i].Update();
        }
    }

    public TriggerGameOver(): void {
        Ticker.shared.stop();
        this.timerText.y = this.appRef.screen.height / 2;
        this.timerText.text = `GAMEOVER!\nSURVIVAL TIME: ${Math.round(Ticker.shared.lastTime
            / 1000)}\nREFRESH TO RESTART`;
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