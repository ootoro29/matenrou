import { ProbCommand } from "../../Information/prob_commands";
import { BattleAnalizeArea } from "../../parts/area/battleAnalizeArea";
import { BattleItemSelectArea } from "../../parts/area/battleItemSelectArea";
import {BattleActionScene } from "../../parts/scene";
import { loadingScene } from "../loading";

export default class BattleAnalizeSelect extends BattleActionScene {
    battleActionArea?:BattleAnalizeArea
    actionOrder:number[] = [0,0,0,0,0,0];
    actions:(ProbCommand|null)[] = [];
    constructor(){
        super("battleAnalize")
    }
    initialize(): void {
        this.changeBMTop();
        if(!this.Parents)return;
        this.actionOrder = this.Parents.actionOrder;
        this.actions = this.Parents.actions;
        this.battleActionArea = new BattleAnalizeArea(this);
    }
    changeBMTop(){
        if(!this.BM)return;
        const buttonTexts:string[] = ["OK","X","X","←","X","→"];
        this.BM.changeText(buttonTexts)
    }
    changeBMSub(){
        if(!this.BM)return;
        const buttonTexts:string[] = ["OK","X","X","←","戻る","→"];
        this.BM.changeText(buttonTexts)
    }

    preload() {
        loadingScene(this);
    }

    update(time: number, delta: number): void {
        if(!this.BM)return;
        if(!this.battleActionArea)return;
        const click = this.BM.checkClick();
        if(click == 0){
            this.scene.start("battleThinking",{main:this.MAIN,battle:this.Parents});
        }
        if(click == 3){
            this.battleActionArea.upIndex();
        }
        if(click == 4){
            this.battleActionArea.resetIndex();
        }
        if(click == 5){
            this.battleActionArea.downIndex();
        }

    }
}