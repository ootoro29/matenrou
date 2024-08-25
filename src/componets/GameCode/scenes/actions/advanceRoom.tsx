import { AdventureActionScene } from "../../parts/scene";
import { advanceRoom } from "../../parts/area/advanceRoom";
import { Room } from "../../Information/room/room";

export default class AdvanceRoom extends AdventureActionScene {
    statusTexts?:Phaser.GameObjects.Group;
    roomSelectionArea?:advanceRoom;
    
    constructor(){
        super("advanceRoom")
    }
    initialize(): void {
        if(!this.BM)return;
        const buttonTexts:string[] = ["やめる","↑","決定","X","↓","X"];
        this.BM.changeText(buttonTexts);
        if(!this.MAIN)return;
        if(!this.MAIN.Room)return;
        this.roomSelectionArea = new advanceRoom(this,this.MAIN.Room);
    }
    create(){
        if(!this.MAIN)return;
        if(!this.MAIN.PINF)return;
        const graphics = this.add.graphics();
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        if(!this.roomSelectionArea)return;
        const click = this.BM.checkClick();
        if(click == 0){
            //this.scene.run("adventureThinking");
            this.scene.start("adventureThinking",{main:this.MAIN,adventure:this.Parents,first:false});
            
        }
        if(click == 1){
            this.roomSelectionArea.upIndex();
        }
        if(click == 2){
            const nextRoom:Room|null = this.roomSelectionArea.nextRoom();
            if(nextRoom!==null){
                this.scene.stop("advanceRoom");
                this.Parents?.scene.stop("adventure");
                this.MAIN?.changeRoom(nextRoom);
            }
            else alert("まだこの部屋へのカギがありません。探索で探しましょう。");
        }
        if(click == 4){
            this.roomSelectionArea.downIndex();
        }
    }
}

