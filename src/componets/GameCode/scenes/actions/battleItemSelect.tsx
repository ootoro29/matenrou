import { PlayerProbCommand } from "../../Information/prob_commands";
import { BattleItemSelectArea } from "../../parts/area/battleItemSelectArea";
import {BattleActionScene } from "../../parts/scene";

export default class BattleItemSelect extends BattleActionScene {
    battleItemSelectArea?:BattleItemSelectArea
    constructor(){
        super("battleItemSelect")
    }
    initialize(): void {
        if(!this.BM)return;
        const buttonTexts:string[] = ["やめる","↑","決定","←","↓","→"];
        this.BM.changeText(buttonTexts);
        this.battleItemSelectArea = new BattleItemSelectArea(this);
        this.battleItemSelectArea.setItemList();
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        if(!this.Parents)return;
        if(!this.battleItemSelectArea)return;
        const click = this.BM.checkClick();
        if(click == 0){
            this.scene.start("battleThinking",{main:this.MAIN,battle:this.Parents});
        }
        if(click == 1){
            this.battleItemSelectArea?.upIndex();
        }
        if(click == 2){
            this.Parents.actions[this.Parents.turn-1] = new PlayerProbCommand(this.battleItemSelectArea.currentCommand());
            this.scene.stop();
            this.Parents.nextTurn();
        }
        if(click == 3){
            this.battleItemSelectArea?.leftIndex();
        }
        if(click == 4){
            this.battleItemSelectArea?.downIndex();
        }
        if(click == 5){
            this.battleItemSelectArea?.rightIndex();
        }

    }
}