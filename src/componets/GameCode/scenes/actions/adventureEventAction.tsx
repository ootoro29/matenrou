import { PComand } from "@/types/game";
import { AdventureActionArea } from "../../parts/area/adventureActionArea";
import { BattleEventArea, BattleEventAreaManager, GAMEOVERBattleEventArea, GetEXPBattleEventArea, NormalBattleEventArea, YOUWINBattleEventArea } from "../../parts/area/battleEventArea";
import { NormalSearchArea, searchArea, searchAreaManager } from "../../parts/area/searchArea";
import {AdventureActionScene, BattleActionScene } from "../../parts/scene";
import AdventureScene from "../adventure";
import BattleScene from "../battle";
import main from "../main";
import { AdventureEventArea, AdventureEventAreaManager } from "../../parts/area/adventureEventArea";
import { Command } from "../../Information/commands";

export default class AdventureEventAction extends AdventureActionScene {
    AM?:AdventureEventAreaManager;
    Areas? :AdventureEventArea[];
    command?:Command;
    type = "";
    constructor(){
        super("adventureEvent")
    }

    init(data:{main:main,adventure:AdventureScene,command:Command,type:string}){
        this.MAIN = data.main;
        this.BM = this.MAIN.BM;
        this.Parents = data.adventure;
        this.command = data.command;
        this.type = data.type;
        this.initialize()
    }

    preload() {
        if(!this.BM)return;
        if(!this.MAIN)return;
        if(!this.MAIN.Room)return;
        if(!this.MAIN.PINF)return;
        if(!this.Parents)return;
        /*
        (this.MAIN.PINF.isTransform()?
                new NormalBattleEventArea(this,"戦闘開始！",{key:"search_start_transform",image:"./assets/searchEvent/探索開始(変身).png"}):
                new NormalBattleEventArea(this,"戦闘開始！",{key:"search_start_normal",image:"./assets/searchEvent/探索開始(通常).png"})
            ),
        */
        if(!this.command)return;
        this.Areas = [
            ...this.command.doAdventureCommand(this.Parents,this)
        ];
    }
    initialize(): void {
        
    }
    create(){
        if(!this.Areas)return;
        for(let i = 0; i < this.Areas.length; i++){
            this.Areas[i].load();
        }
        this.AM = new AdventureEventAreaManager(this.Areas);
        this.changeBMText();
    }
    changeBMText(){
        if(!this.AM)return;
        const area = this.AM.currentArea();
        if(!area)return;
        this.BM?.changeText(area.genSelections());
    }
    doneEvent(){
        if(this.type === "item"){
            this.scene.start("adventureItem",{main:this.MAIN,adventure:this.Parents});
        }else if(this.type === "action"){
            this.scene.start("adventureAction",{main:this.MAIN,adventure:this.Parents});
        }else{
            this.scene.start("adventureThinking",{main:this.MAIN,adventure:this.Parents});
        }
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