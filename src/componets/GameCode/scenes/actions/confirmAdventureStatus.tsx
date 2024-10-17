import { BattleStatus, Status } from "@/types/game";
import { confirmBattleStatusArea, confirmStatusArea } from "../../parts/area/confirmStatusArea";
import {AdventureActionScene } from "../../parts/scene";
import { loadingScene } from "../loading";

export default class ConfirmAdventureStatus extends AdventureActionScene {
    statusTexts?:Phaser.GameObjects.Group;
    statusArea?:confirmBattleStatusArea;
    
    constructor(){
        super("confirmAdventureStatus")
    }
    initialize(): void {
        if(!this.BM)return;
        const buttonTexts:string[] = ["OK","X","X","X","X","X"];
        this.BM.changeText(buttonTexts);
    }
    preload() {
        loadingScene(this);
    }
    create(){
        if(!this.MAIN)return;
        if(!this.MAIN.PINF)return;
        const graphics = this.add.graphics();
        const data:BattleStatus = this.MAIN.PINF.getBattleStatus();
        this.statusArea = new confirmBattleStatusArea(this,this.MAIN.PINF);
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        const click = this.BM.checkClick();
        if(click == 0){
            this.scene.start("adventureThinking",{main:this.MAIN,adventure:this.Parents});
        }
    }
}

