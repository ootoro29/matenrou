import { BattleStatus, Status } from "@/types/game";
import { BattleItemSelectArea } from "../../parts/area/battleItemSelectArea";
import { confirmBattleStatusArea, confirmStatusArea } from "../../parts/area/confirmStatusArea";
import {BattleActionScene } from "../../parts/scene";

export default class ConfirmAdventureStatus extends BattleActionScene {
    statusTexts?:Phaser.GameObjects.Group;
    statusArea?:confirmBattleStatusArea;
    
    constructor(){
        super("confirmBattleStatus")
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
            this.scene.start("battleThinking",{main:this.MAIN,battle:this.Parents});
        }
    }
}