import { BattleStatus, Status } from "@/types/game";
import { confirmBattleStatusArea, confirmStatusArea } from "../../parts/area/confirmStatusArea";
import {AdventureActionScene } from "../../parts/scene";

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
    create(){
        if(!this.MAIN)return;
        if(!this.MAIN.PINF)return;
        const graphics = this.add.graphics();
        const data:BattleStatus = this.MAIN.PINF.getBattleStatus();
        this.statusArea = new confirmBattleStatusArea(this,data);
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        const click = this.BM.checkClick();
        if(click == 0){
            this.scene.start("adventureThinking",{main:this.MAIN,adventure:this.Parents});
        }
    }
}

