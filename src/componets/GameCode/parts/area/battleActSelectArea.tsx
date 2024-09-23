import { Area } from "../area";
import { Room } from "../../Information/room/room";
import { Button } from "../button";
import { PlayserActCommands } from "../../Information/playerActCommands";
import { Command } from "../../Information/commands";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";


export class BattleActSelectArea extends Area{
    actSelections:Button[] = []
    index = 0;
    description:BBCodeText;
    constructor(scene:Phaser.Scene){
        super(scene);
        this.create();
        this.description = new BBCodeText(this.scene,140,500,"説明",{
            fontFamily:"Arial",
            fontSize:"36px",
            fill:"#ffffff",
            wrap:{
                mode:"char",
                width:this.width-100,
                
            }
            });
        this.scene.add.container().add(this.description);
        this.setIndex(this.index);
    }
    initialize(): void {
        for(let i = 0; i < 5; i++){
            const idx = this.index - 1 + i
            let label = "";
            let visible = false;
            if(idx >= PlayserActCommands.length || idx < 0){
            }else{
                label = `${PlayserActCommands[idx].name}`;
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
        return PlayserActCommands[this.index];
    }
    setIndex(index:number){
        if(index <= -1 || index >= PlayserActCommands.length)return;
        this.index = index;
        this.description?.setText(`${PlayserActCommands[index].name}\n ${PlayserActCommands[index].description}`);
        for(let i = 0; i < 5; i++){
            const idx = this.index - 1 + i
            let label = "";
            let visible = false;
            if(idx >= PlayserActCommands.length || idx < 0){
            }else{
                label = `${PlayserActCommands[idx].name}`;
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
        if(this.index+1 < PlayserActCommands.length){
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
        if(this.index+5 < PlayserActCommands.length){
            this.setIndex(this.index+5);
        }else{
            this.setIndex(PlayserActCommands.length-1);
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