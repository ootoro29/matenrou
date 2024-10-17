import { AdventureItemArea } from "../../parts/area/adventureItemArea";
import {AdventureActionScene } from "../../parts/scene";
import AdventureScene from "../adventure";
import { loadingScene } from "../loading";

export default class AdventureItem extends AdventureActionScene {
    adventureItemArea?:AdventureItemArea
    constructor(){
        super("adventureItem")
    }
    initialize(): void {
        if(!this.BM)return;
        const buttonTexts:string[] = ["やめる","↑","決定","←","↓","→"];
        this.BM.changeText(buttonTexts);
        this.adventureItemArea = new AdventureItemArea(this);
    }
    preload() {
        loadingScene(this);
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        if(!this.adventureItemArea)return;
        const click = this.BM.checkClick();
        if(click == 0){
            this.scene.start("adventureThinking",{main:this.MAIN,adventure:this.Parents});
        }
        if(click == 1){
            this.adventureItemArea.upIndex();
        }
        if(click == 2){
            this.scene.start("adventureEvent",{main:this.MAIN,adventure:this.Parents,command:this.adventureItemArea.currentCommand(),type:"item"});
        }
        if(click == 3){
            this.adventureItemArea.leftIndex();
        }
        if(click == 4){
            this.adventureItemArea.downIndex();
        }
        if(click == 5){
            this.adventureItemArea.rightIndex();
        }

    }
}