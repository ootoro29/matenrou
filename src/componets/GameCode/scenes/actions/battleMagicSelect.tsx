import { PlayerProbCommand } from "../../Information/prob_commands";
import { BattleMagicSelectArea } from "../../parts/area/battleMagicSelectArea";
import {BattleActionScene } from "../../parts/scene";

export default class BattleMagicSelect extends BattleActionScene {
    battleMagicArea?:BattleMagicSelectArea
    constructor(){
        super("battleMagicSelect")
    }
    initialize(): void {
        if(!this.BM)return;
        const buttonTexts:string[] = ["やめる","↑","決定","←","↓","→"];
        this.BM.changeText(buttonTexts);
        this.battleMagicArea = new BattleMagicSelectArea(this);
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        if(!this.Parents)return;
        if(!this.battleMagicArea)return;
        const click = this.BM.checkClick();
        if(click == 0){
            this.scene.start("battleThinking",{main:this.MAIN,battle:this.Parents});
        }
        if(click == 1){
            this.battleMagicArea.upIndex();
        }
        if(click == 2){
            this.Parents.actions[this.Parents.turn-1] = new PlayerProbCommand(this.battleMagicArea?.currentCommand());
            this.scene.stop();
            this.Parents.nextTurn();
        }
        if(click == 3){
            this.battleMagicArea.leftIndex();
        }
        if(click == 4){
            this.battleMagicArea.downIndex();
        }
        if(click == 5){
            this.battleMagicArea.rightIndex();
        }

    }
}