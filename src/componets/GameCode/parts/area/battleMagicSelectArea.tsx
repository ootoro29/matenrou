import { Area } from "../area";
import { Room } from "../../Information/room/room";
import { Button } from "../button";
import { PlayerMagCommands } from "../../Information/playerMagCommands";
import { Command } from "../../Information/commands";



export class BattleMagicSelectArea extends Area{
    actSelections:Button[] = []
    index = 0;
    constructor(scene:Phaser.Scene){
        super(scene);
        this.create();
    }
    initialize(): void {
        for(let i = 0; i < 5; i++){
            const idx = this.index - 1 + i
            let label = "";
            let visible = false;
            if(idx >= PlayerMagCommands.length || idx < 0){
            }else{
                label = `${PlayerMagCommands[idx].name}`;
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
        this.contents.add(this.scene.add.text(50,50,`行動選択`,textStyle))
    }
    currentCommand():Command{
        return PlayerMagCommands[this.index];
    }
    setIndex(index:number){
        if(index <= -1 || index >= PlayerMagCommands.length)return;
        this.index = index;
        for(let i = 0; i < 5; i++){
            const idx = this.index - 1 + i
            let label = "";
            let visible = false;
            if(idx >= PlayerMagCommands.length || idx < 0){
            }else{
                label = `${PlayerMagCommands[idx].name}`;
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
        if(this.index+1 < this.actSelections.length){
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
        if(this.index+5 < PlayerMagCommands.length){
            this.setIndex(this.index+5);
        }else{
            this.setIndex(PlayerMagCommands.length-1);
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