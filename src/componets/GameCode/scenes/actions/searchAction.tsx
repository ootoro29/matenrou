import { Enemy } from "../../Information/enemy/enemy";
import { AdventureActionArea } from "../../parts/area/adventureActionArea";
import { NormalSearchArea, searchArea, searchAreaManager } from "../../parts/area/searchArea";
import {AdventureActionScene } from "../../parts/scene";
import AdventureScene from "../adventure";
import { loadingScene } from "../loading";

export default class searchAction extends AdventureActionScene {
    AM?:searchAreaManager;
    Areas? :searchArea[];
    constructor(){
        super("search")
    }
    preload() {
        if(!this.BM)return;
        if(!this.MAIN)return;
        if(!this.MAIN.Room)return;
        if(!this.MAIN.PINF)return;
        this.Areas = [
            (this.MAIN.PINF.isTransform()?
                new NormalSearchArea(this,"探索開始！",{key:"search_start_transform",image:"./assets/searchEvent/探索開始(変身).png"}):
                new NormalSearchArea(this,"探索開始！",{key:"search_start_normal",image:"./assets/searchEvent/探索開始(通常).png"})
            ),
            ...this.MAIN.Room.genSearchEvent(this)
        ];
        this.Areas.map((area) => {
            area.load();
        })
        loadingScene(this);
    }
    initialize(): void {
    }
    toCombat(enemy:Enemy){
        if(!this.BM)return;
        const buttonTexts:string[] = ["進む","探索","行動","アイテム","ステータス","X"];
        this.BM.changeText(buttonTexts);
        this.scene.stop();
        this.Parents?.toCombat(enemy);
    }
    create(){
        if(!this.Areas)return;
        for(let i = 0; i < this.Areas.length; i++){
            this.Areas[i].create();
        }
        this.AM = new searchAreaManager(this.Areas);
        this.changeBMText();
    }
    changeBMText(){
        if(!this.AM)return;
        const area = this.AM.currentArea();
        if(!area)return;
        this.BM?.changeText(area.genSelections());
    }
    update(time: number, delta: number): void {
        if(!this.BM)return;
        if(!this.AM)return;
        const click = this.BM.checkClick();
        const area = this.AM.currentArea();
        if(!area)return;
        area.opeClick(click);

    }
}