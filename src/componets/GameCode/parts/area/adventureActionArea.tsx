import { Area } from "../area";
import { Room } from "../../Information/room/room";
import { Button } from "../button";
import { Command } from "../../Information/commands";
import AdventureScene from "../../scenes/adventure";
import { AdventureActionScene } from "../scene";



export class AdventureActionArea extends Area{
    actSelections:Button[] = []
    index = 0;
    adventure?:AdventureScene;
    actList:Command[] = [];
    constructor(scene:AdventureActionScene){
        super(scene);
        this.adventure = scene.Parents;
        if(this.adventure && this.adventure.player && this.adventure.player.Item){
            this.actList = this.adventure.player?.genAdventureActList();
        }
        this.load();
    }
    currentCommand(){
        return this.actList[this.index];
    }
    initialize(): void {
        if(!this.actList)return;
        for(let i = 0; i < 5; i++){
            const idx = this.index - 1 + i
            let label = "";
            let visible = false;
            if(idx >= this.actList.length || idx < 0){
            }else{
                label = `${this.actList[idx].name}`;
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
        if(!this.actList)return;
        if(index <= -1 || index >= this.actList.length)return;
        this.index = index;
        for(let i = 0; i < 5; i++){
            const idx = this.index - 1 + i
            let label = "";
            let visible = false;
            if(idx >= this.actList.length || idx < 0){
            }else{
                label = `${this.actList[idx].name}`;
                visible = true;
            }
            this.actSelections[i].setVisible(visible).setText(label)?.setFunction(
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
        if(!this.actList)return;
        if(this.index+1 < this.actList.length){
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
        if(!this.actList)return;
        if(this.index+5 < this.actList.length){
            this.setIndex(this.index+5);
        }else{
            this.setIndex(this.actList.length-1);
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