import { PlayerProbCommand } from "../../Information/prob_commands";
import { BattleActSelectArea } from "../../parts/area/battleActSelectArea";
import {BattleActionScene } from "../../parts/scene";

export default class BattleActSelect extends BattleActionScene {
    battleActionArea?:BattleActSelectArea
    constructor(){
        super("battleActSelect")
    }
    initialize(): void {
        if(!this.BM)return;
        const buttonTexts:string[] = ["やめる","↑","決定","←","↓","→"];
        this.BM.changeText(buttonTexts);
        this.battleActionArea = new BattleActSelectArea(this);
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        if(!this.Parents)return;
        if(!this.battleActionArea)return;
        const click = this.BM.checkClick();
        if(click == 0){
            this.scene.start("battleThinking",{main:this.MAIN,battle:this.Parents});
        }
        if(click == 1){
            this.battleActionArea.upIndex();
        }
        if(click == 2){
            this.Parents.actions[this.Parents.turn-1] = new PlayerProbCommand(this.battleActionArea?.currentCommand());
            this.scene.stop();
            this.Parents.nextTurn();
        }
        if(click == 3){
            this.battleActionArea.leftIndex();
        }
        if(click == 4){
            this.battleActionArea.downIndex();
        }
        if(click == 5){
            this.battleActionArea.rightIndex();
        }

    }
}