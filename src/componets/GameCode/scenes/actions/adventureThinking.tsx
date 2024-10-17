import { Enemy } from "../../Information/enemy/enemy";
import { advanceRoomAreaManager, advanceRoomEventArea, NormalAdvanceRoomArea } from "../../parts/area/advanceRoom";
import { searchAreaManager, searchArea } from "../../parts/area/searchArea";
import {AdventureActionScene } from "../../parts/scene";
import AdventureScene from "../adventure";
import { loadingScene } from "../loading";
import main from "../main";

export default class AdventureThinking extends AdventureActionScene {
    event = true;
    AM?:advanceRoomAreaManager;
    Areas? :advanceRoomEventArea[];
    constructor(){
        super("adventureThinking")
    }
    init(data:{main:main,adventure:AdventureScene,first:boolean}){
        this.MAIN = data.main;
        this.BM = this.MAIN.BM;
        this.Parents = data.adventure;
        this.event = data.first;
        this.initialize()
        
    }
    preload() {
        if(!this.BM)return;
        if(!this.MAIN)return;
        if(!this.MAIN.Room)return;
        if(!this.MAIN.PINF)return;
        if(!this.event)return;
        this.Areas = [
            (this.MAIN.PINF.isTransform()?
                new NormalAdvanceRoomArea(this,"部屋へと進む…",{key:"search_start_transform",image:"./assets/searchEvent/探索開始(変身).png"}):
                new NormalAdvanceRoomArea(this,"部屋へと進む…",{key:"search_start_normal",image:"./assets/searchEvent/探索開始(通常).png"})
            ),
            ...this.MAIN.Room.genAdvanceRoomEvent(this)
        ];
        this.Areas.map((area) => {
            area.load();
        })
        loadingScene(this);
    }
    create(){
        if(!this.event){
            this.thinking();
        }else{
            if(!this.Areas)return;
            for(let i = 0; i < this.Areas.length; i++){
                this.Areas[i].create();
            }
            this.AM = new advanceRoomAreaManager(this.Areas);
            this.changeBMText();
        }
    }

    changeBMText(){
        if(!this.AM)return;
        const area = this.AM.currentArea();
        if(!area)return;
        this.BM?.changeText(area.genSelections());
    }
    
    initialize(): void {
        //this.thinking()
    }
    thinking(){
        if(!this.BM)return;
        this.event = false;
        const buttonTexts:string[] = ["進む","探索","行動","アイテム","ステータス","X"];
        this.BM.changeText(buttonTexts);
    }
    toCombat(enemy:Enemy){
        if(!this.BM)return;
        this.event = false;
        const buttonTexts:string[] = ["進む","探索","行動","アイテム","ステータス","X"];
        this.BM.changeText(buttonTexts);
        this.scene.stop();
        this.Parents?.toCombat(enemy);
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        if(!this.AM)return;
        const click = this.BM.checkClick();
        if(this.event){
            const area = this.AM.currentArea();
            if(!area)return;
            area.opeClick(click);
        }else{
            if(click == 0){
                this.scene.start("advanceRoom",{main:this.MAIN,adventure:this.Parents});
            }
            if(click == 1){
                this.scene.start("search",{main:this.MAIN,adventure:this.Parents});
            }
            if(click == 2){
                this.scene.start("adventureAction",{main:this.MAIN,adventure:this.Parents});
            }
            if(click == 3){
                this.scene.start("adventureItem",{main:this.MAIN,adventure:this.Parents});
            }
            if(click == 4){
                this.scene.start("confirmAdventureStatus",{main:this.MAIN,adventure:this.Parents});
            }
        }
    }
}