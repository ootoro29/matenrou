import { advanceRoomAreaManager, advanceRoomEventArea, NormalAdvanceRoomArea } from "../../parts/area/advanceRoom";
import { searchAreaManager, searchArea } from "../../parts/area/searchArea";
import {AdventureActionScene, BattleActionScene } from "../../parts/scene";
import AdventureScene from "../adventure";
import BattleScene from "../battle";
import main from "../main";

export default class BattleThinking extends BattleActionScene {
    turnText?:Phaser.GameObjects.Text;
    constructor(){
        super("battleThinking")
    }
    preload() {
        if(!this.BM)return;
        if(!this.MAIN)return;
        if(!this.MAIN.Room)return;
        if(!this.MAIN.PINF)return;
    }
    create(){
        if(!this.Parents)return;
        this.turnText = this.add.text(600,400,`(${this.Parents.turn}/6)`,{fontFamily:"Arial",fontSize:56});
        this.thinking();
    }

    changeBMText(){
        if(!this.Parents)return;
        //this.turnText?.setText(`${this.Parents.turn}ターン目`);
        if(this.Parents.turn == this.Parents.first_turn){
            this.BM?.changeText(["行動","魔法","アイテム","ステータス","分析","X"]);
        }else{
            this.BM?.changeText(["行動","魔法","アイテム","ステータス","分析","戻る"]);
        }
    }
    
    initialize(): void {
        this.thinking()
    }
    thinking(){
        if(!this.BM)return;
        this.changeBMText();
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        const click = this.BM.checkClick();
        if(click == 0){
            this.scene.start("battleActSelect",{main:this.MAIN,battle:this.Parents});
        }
        if(click == 1){
            this.scene.start("battleMagicSelect",{main:this.MAIN,battle:this.Parents});
        }
        if(click == 2){
            this.scene.start("battleItemSelect",{main:this.MAIN,battle:this.Parents});
        }
        if(click == 3){
            this.scene.start("confirmBattleStatus",{main:this.MAIN,battle:this.Parents});
        }
        if(click == 4){
            this.scene.start("battleAnalize",{main:this.MAIN,battle:this.Parents});
        }
        if(click == 5){
            this.Parents?.backTurn();
        }
    }
}