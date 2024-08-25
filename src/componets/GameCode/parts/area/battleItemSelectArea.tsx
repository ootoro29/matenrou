import { Area } from "../area";
import { Room } from "../../Information/room/room";
import { Button } from "../button";
import BattleScene from "../../scenes/battle";
import { Item } from "../../Information/item/item";
import BattleItemSelect from "../../scenes/actions/battleItemSelect";
import { Command } from "../../Information/commands";



export class BattleItemSelectArea extends Area{
    actSelections:Button[] = []
    index = 0;
    battle?:BattleScene
    battleItemList:Item[] = [];
    constructor(scene:BattleItemSelect){
        super(scene);
        this.battle = scene.Parents;
        this.setItemList();
        this.create();
    }
    setItemList(){
        if(this.battle && this.battle.player && this.battle.player.Item){
            this.battleItemList = this.battle.player?.Item.genBattleItemList();
        }
    }
    initialize(): void {
        if(!this.battleItemList)return;
        for(let i = 0; i < 5; i++){
            const idx = this.index - 1 + i
            let label = "";
            let visible = false;
            if(idx >= this.battleItemList.length || idx < 0){
            }else{
                label = `${this.battleItemList[idx].name} ×${this.battleItemList[idx].count}`;
                visible = true;
            }
            const button = new Button(this.scene,45,350+110*i,label,{
                width:this.width-90,
                height:100,
                onClick: () => {
                    this.setIndex(idx);
                },
            },{
                align:"left",
                fontSize:50,
                textcolor:"#000000",
                rectcolor:0xaaaa00,
                strokecolor:0x555500
            }).setVisible(visible);
            this.actSelections.push(button);
        }
        this.updateStyle();
        this.contents = this.scene.add.container(0,0);
        for(let i = 0; i < this.actSelections.length; i++){
            this.contents.add(this.actSelections[i]);
        }
        const textStyle = { font: '64px Arial', fill: '#ffffff' };
        this.contents.add(this.scene.add.text(50,50,`アイテム選択`,textStyle))
    }
    setIndex(index:number){
        if(!this.battleItemList)return;
        if(index <= -1 || index >= this.battleItemList.length)return;
        this.index = index;
        for(let i = 0; i < 5; i++){
            const idx = this.index - 1 + i
            let label = "";
            let visible = false;
            if(idx >= this.battleItemList.length || idx < 0){
            }else{
                label = `${this.battleItemList[idx].name} ×${this.battleItemList[idx].count}`;
                visible = true;
            }
            this.actSelections[i].setVisible(visible).setText(label)?.setFunction(
                () => {
                    this.setIndex(idx);
                }
            );
        }
    }
    currentCommand():Command{
        return this.battleItemList[this.index].itemCommand();
    }
    upIndex(){
        if(this.index-1 >= 0){
            this.setIndex(this.index-1);
        }
    }
    downIndex(){
        if(!this.battleItemList)return;
        if(this.index+1 < this.battleItemList.length){
            this.setIndex(this.index+1);
        }
    }
    leftIndex(){
        if(this.index-5 >= 0){
            this.setIndex(this.index-5);
        }else{
            this.setIndex(0);
        }
    }
    rightIndex(){
        if(!this.battleItemList)return;
        if(this.index+5 < this.battleItemList.length){
            this.setIndex(this.index+5);
        }else{
            this.setIndex(this.battleItemList.length-1);
        }
    }
    downStyle(){
        if(this.index <= -1 || this.index >= this.actSelections.length)return;
        this.actSelections[this.index].setStyle({
            align:"left",
            fontSize:50,
            textcolor:"#000000",
            rectcolor:0xaaaa00,
            strokecolor:0x555500
        });
    }
    updateStyle(){
        if(this.index <= -1 || this.index >= this.actSelections.length)return;
        this.actSelections[1].setStyle({
            align:"left",
            fontSize:50,
            textcolor:"#000000",
            rectcolor:0xcccc00,
            strokecolor:0xffff00,
            strokeWeight:10,
        });
    }
    
}