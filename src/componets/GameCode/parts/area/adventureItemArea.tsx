import { Area } from "../area";
import { Room } from "../../Information/room/room";
import { Button } from "../button";
import AdventureScene from "../../scenes/adventure";
import AdventureItem from "../../scenes/actions/adventureItem";
import { Item } from "../../Information/item/item";
import { Command } from "../../Information/commands";



export class AdventureItemArea extends Area{
    itemSelections:Button[] = []
    index = 0;
    adventure?:AdventureScene
    itemList:Item[] = [];
    constructor(scene:AdventureItem){
        super(scene);
        this.adventure = scene.Parents;
        if(this.adventure && this.adventure.player && this.adventure.player.Item){
            this.itemList = this.adventure.player?.Item.genItemList();
        }
        this.load();
    }
    currentCommand():Command{
        return this.itemList[this.index].itemCommand();
    }
    initialize(): void {
        if(!this.itemList)return;
        for(let i = 0; i < 5; i++){
            const idx = this.index - 1 + i
            let label = "";
            let visible = false;
            if(idx >= this.itemList.length || idx < 0){
            }else{
                label = `${this.itemList[idx].name} ×${this.itemList[idx].count}`;
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
            this.itemSelections.push(button);
        }
        this.updateStyle();
        this.contents = this.scene.add.container(0,0);
        for(let i = 0; i < this.itemSelections.length; i++){
            this.contents.add(this.itemSelections[i]);
        }
        const textStyle = { font: '64px Arial', fill: '#ffffff' };
        this.contents.add(this.scene.add.text(50,50,`アイテム選択`,textStyle))
    }
    setIndex(index:number){
        if(!this.itemList)return;
        if(index <= -1 || index >= this.itemList.length)return;
        this.index = index;
        for(let i = 0; i < 5; i++){
            const idx = this.index - 1 + i
            let label = "";
            let visible = false;
            if(idx >= this.itemList.length || idx < 0){
            }else{
                label = `${this.itemList[idx].name} ×${this.itemList[idx].count}`;
                visible = true;
            }
            this.itemSelections[i].setVisible(visible).setText(label)?.setFunction(
                () => {
                    this.setIndex(idx);
                }
            );
        }
    }
    upIndex(){
        if(this.index-1 >= 0){
            this.setIndex(this.index-1);
        }
    }
    downIndex(){
        if(!this.itemList)return;
        if(this.index+1 < this.itemList.length){
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
        if(!this.itemList)return;
        if(this.index+5 < this.itemList.length){
            this.setIndex(this.index+5);
        }else{
            this.setIndex(this.itemList.length-1);
        }
    }
    downStyle(){
        if(this.index <= -1 || this.index >= this.itemSelections.length)return;
        this.itemSelections[this.index].setStyle({
            align:"left",
            fontSize:50,
            textcolor:"#000000",
            rectcolor:0xaaaa00,
            strokecolor:0x555500
        });
    }
    updateStyle(){
        if(this.index <= -1 || this.index >= this.itemSelections.length)return;
        this.itemSelections[1].setStyle({
            align:"left",
            fontSize:50,
            textcolor:"#000000",
            rectcolor:0xcccc00,
            strokecolor:0xffff00,
            strokeWeight:10,
        });
    }
}