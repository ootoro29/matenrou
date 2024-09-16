import { PComand } from "@/types/game";
import { AdventureActionArea } from "../../parts/area/adventureActionArea";
import { BattleEventArea, BattleEventAreaManager, GAMEOVERBattleEventArea, GetEXPBattleEventArea, NormalBattleEventArea, YOUWINBattleEventArea } from "../../parts/area/battleEventArea";
import { NormalSearchArea, searchArea, searchAreaManager } from "../../parts/area/searchArea";
import {AdventureActionScene, BattleActionScene } from "../../parts/scene";
import AdventureScene from "../adventure";
import BattleScene from "../battle";
import main from "../main";

export default class BattleEventAction extends BattleActionScene {
    AM?:BattleEventAreaManager;
    Areas? :BattleEventArea[];
    act?:PComand;
    D?:Date;
    S?:Date;
    constructor(){
        super("battleEvent")
    }

    init(data:{main:main,battle:BattleScene}){
        this.MAIN = data.main;
        this.BM = this.MAIN.BM;
        this.Parents = data.battle;
        this.initialize()
    }

    preload() {
        if(!this.BM)return;
        if(!this.MAIN)return;
        if(!this.MAIN.Room)return;
        if(!this.MAIN.PINF)return;
        if(!this.Areas)return;
        for(let i = 0; i < this.Areas.length; i++){
            this.Areas[i].load();
        }
        this.D = new Date();
        let scene = this.scene.launch('loading');
        this.load.on('complete',() => {
            this.S = new Date();
            this.scene.stop('loading');
            console.log(this.S.getTime()-(this.D?this.D.getTime():0));
        })
    }
    setAreas(Areas:BattleEventArea[]){
        this.Areas = Areas;
    }
    nextEventTurn(){
        if(!this.Areas)return;
        if(!this.Parents)return;
        if(!this.Parents.player)return;
        if(!this.Parents.enemy)return;
        if(this.Parents.player.HP <= 0){
            this.Areas = [
                new NormalBattleEventArea(this,"プレイヤーは力尽きた"),
                new GAMEOVERBattleEventArea(this)
            ];
            for(let i = 0; i < this.Areas.length; i++){
                this.Areas[i].load();
                this.Areas[i].create();
            }
            this.AM = new BattleEventAreaManager(this.Areas); 
        }else if(this.Parents.enemy.HP <= 0){
            this.Areas = [
                new NormalBattleEventArea(this,`${this.Parents.enemy.name}は力尽きた`),
                new GetEXPBattleEventArea(this,this.Parents.player,this.Parents.enemy.exp),
                new YOUWINBattleEventArea(this)
            ];
            for(let i = 0; i < this.Areas.length; i++){
                this.Areas[i].load();
                this.Areas[i].create();
            }
            this.AM = new BattleEventAreaManager(this.Areas);
        }else{
            this.Parents.nextEventTurn();
        }
    }
    initialize(): void {
    }
    battleFinish(){
        if(!this.AM)return;
        this.Areas = [];
        this.AM.AreaList = [];
    }
    YOUWIN(){
        if(!this.Parents)return;
        this.battleFinish();
        this.scene.stop();
        this.Parents.YOUWIN();
    }
    GAMEOVER(){
        if(!this.Parents)return;
        this.battleFinish();
        this.scene.stop();
        this.Parents.GAMEOVER();
    }
    create(){
        if(!this.D)return;
        this.S = new Date();
        console.log("Done:",this.S.getTime()-this.D.getTime());
        if(!this.Areas)return;
        for(let i = 0; i < this.Areas.length; i++){
            this.Areas[i].create();
        }
        this.AM = new BattleEventAreaManager(this.Areas);
        this.changeBMText();
        
    }
    changeBMText(){
        if(!this.AM)return;
        const area = this.AM.currentArea();
        if(!area)return;
        this.BM?.changeText(area.genSelections());
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        if(!this.AM)return;
        const click = this.BM.checkClick();
        const area = this.AM.currentArea();
        if(!area)return;
        area.opeClick(click);

    }
}