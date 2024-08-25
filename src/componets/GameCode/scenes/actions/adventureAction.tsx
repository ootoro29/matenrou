import { AdventureActionArea } from "../../parts/area/adventureActionArea";
import {AdventureActionScene } from "../../parts/scene";
import AdventureScene from "../adventure";

export default class AdventureAction extends AdventureActionScene {
    adventureActionArea?:AdventureActionArea
    constructor(){
        super("adventureAction")
    }
    initialize(): void {
        if(!this.BM)return;
        const buttonTexts:string[] = ["やめる","↑","決定","←","↓","→"];
        this.BM.changeText(buttonTexts);
        this.adventureActionArea = new AdventureActionArea(this);
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        if(!this.adventureActionArea)return;
        const click = this.BM.checkClick();
        if(click == 0){
            this.scene.start("adventureThinking",{main:this.MAIN,adventure:this.Parents});
        }
        if(click == 1){
            this.adventureActionArea.upIndex();
        }
        if(click == 2){
            this.scene.start("adventureEvent",{main:this.MAIN,adventure:this.Parents,command:this.adventureActionArea.currentCommand(),type:"action"});
        }
        if(click == 3){
            this.adventureActionArea.leftIndex();
        }
        if(click == 4){
            this.adventureActionArea.downIndex();
        }
        if(click == 5){
            this.adventureActionArea.rightIndex();
        }

    }
}