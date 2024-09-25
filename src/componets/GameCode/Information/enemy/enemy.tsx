import { normalStatus, PComand } from "@/types/game";
import { BattleActionScene } from "../../parts/scene";
import BattleScene from "../../scenes/battle";
import { ProbCommand } from "../prob_commands";
import { calStage } from "../../functions/status";

export abstract class Enemy{
    scene?:BattleScene;
    HP = 10;
    HP_MAX = 10;
    PAT = 1;
    MAT = 1;
    PDF = 1;
    MDF = 1;
    SP = 1;
    charge = 0;
    PATstage = 0;
    MATstage = 0;
    PDFstage = 0;
    MDFstage = 0;
    SPstage = 0;
    exp = 1;
    name = "";
    image?:Phaser.GameObjects.Image;
    HP_BAR?:Phaser.GameObjects.Rectangle;
    key = "";
    candidatePCommands:ProbCommand[] = []
    constructor(){
        this.initialize();
    }
    create(){
        if(!this.scene)return;
        if(this.key != ""){
            this.image = this.scene.add.image(300,680,this.key).setScale(0.8);
        }else{
            this.scene.add.rectangle(300,680,540*0.8,800*0.8,0xff00000);
        }
        this.scene.add.rectangle(300,1000,300,75,0x00aa00);
        this.HP_BAR = this.scene.add.rectangle(300,1000,300,75,0x00ff00);
    }
    update(){
        if(!this.scene)return;
        if(!this.HP_BAR)return;
        //this.HP_BAR?.setW(300*(this.HP/this.HP_MAX));
        let rate = (this.HP/this.HP_MAX);
        if(rate > 1)rate = 1;
        if(rate < 0)rate = 0;
        this.HP_BAR.width = 300*rate;
    }
    getStatus():normalStatus{
        return {
            PAT:this.PAT*calStage(this.PATstage),
            PDF:this.PDF*calStage(this.PDFstage),
            MAT:this.PAT*calStage(this.MATstage),
            MDF:this.PDF*calStage(this.MDFstage),
            SP:this.PDF*calStage(this.SPstage),
        }
    }
    abstract initialize():void;
    abstract load(scene:BattleScene):void;
    abstract genPComand():ProbCommand;
}

