import { Area } from "../area";
import { Room } from "../../Information/room/room";
import { Button } from "../button";
import BattleScene from "../../scenes/battle";
import BattleAnalizeSelect from "../../scenes/actions/battleAnalize";
import { ProbCommand } from "../../Information/prob_commands";



export class BattleAnalizeArea extends Area{
    parents?:BattleAnalizeSelect
    actSelections:Button[] = []
    index = -1;
    titleText?:Phaser.GameObjects.Text;
    attackerText?:Phaser.GameObjects.Text;

    actionName1?:Phaser.GameObjects.Text;
    actionName2?:Phaser.GameObjects.Text;

    constructor(scene:BattleAnalizeSelect){
        super(scene);
        this.parents = scene;
        this.create();
        console.log(this.parents.actionOrder);
    }
    initialize(): void {
        if(!this.parents)return;
        for(let i = 0; i <this.parents.actionOrder.length; i++){
            const button = new Button(this.scene,50,150+130*i,`${(this.parents.actionOrder[i] == 1)?"プレイヤー":"敵"}`,{
                width:this.width-100,
                height:110,
                onClick: () => {
                    this.setIndex(i);
                },
            },{
                align:"left",
                fontSize:50,
                textcolor:"#000000",
                rectcolor:0xffffff,
                strokeWeight:9,
                strokecolor:0x000000
            })

            this.actSelections.push(button);
        }
        //this.updateStyle();
        this.contents = this.scene.add.container(0,0);
        for(let i = 0; i < this.actSelections.length; i++){
            this.contents.add(this.actSelections[i]);
        }
        const textStyle = { font: '64px Arial', fill: '#ffffff' };
        this.titleText = this.scene.add.text(30,50,`行動分析`,textStyle);
        this.contents.add(this.titleText)

        const textStyle2 = { font: '56px Arial', fill: '#ffffff' };
        this.attackerText = this.scene.add.text(60,140,`攻撃者:`,textStyle2).setVisible(false);
        this.contents.add(this.attackerText)

        const textStyle3 = { font: '48px Arial', fill: '#ffffff' };
        this.actionName1 = this.scene.add.text(60,220,`攻撃名`,textStyle3).setVisible(false);
        this.contents.add(this.actionName1)
        this.actionName2 = this.scene.add.text(60,550,`攻撃名`,textStyle3).setVisible(false);
        this.contents.add(this.actionName2)
        
    }
    setIndex(index:number){
        if(!this.parents)return;
        if(index < -1 || index >= this.actSelections.length)return;
        this.index = index;
        if(index == -1){
            this.actSelections.map((button) => {
                button.setVisible(true);
            })
            this.titleText?.setText("行動分析");
            this.attackerText?.setVisible(false);
            this.actionName1?.setVisible(false);
            this.actionName2?.setVisible(false);
            this.parents.changeBMTop();
        }else{
            this.actSelections.map((button) => {
                button.setVisible(false);
            })
            this.titleText?.setText(`行動分析 (${index+1}ターン目)`);
            this.attackerText?.setText(`攻撃者: ${(this.parents.actionOrder[index] == 1)?"プレイヤー":"敵"}`).setVisible(true);
            const P = this.parents.actions[index]?.show();
            if(!P){
                this.actionName1?.setText(`未定`).setVisible(true);
                this.actionName2?.setText(`未定`).setVisible(false);
            }else{
                this.actionName1?.setText(`${P[0].command.name} ${P[0].prob}%`).setVisible(true);
                if(P[1]){
                    this.actionName2?.setText(`${P[1].command.name} ${P[1].prob}%`).setVisible(true);
                }else{
                    this.actionName2?.setText(`未定`).setVisible(false);
                }
            }
            
            this.parents.changeBMSub();
        }
    }
    upIndex(){
        if(this.index-1 >= -1){
            this.setIndex(this.index-1);
        }
    }
    downIndex(){
        if(this.index+1 < this.actSelections.length){
            this.setIndex(this.index+1);
        }
    }
    resetIndex(){
        this.setIndex(-1);
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
        this.actSelections[this.index].setStyle({
            align:"left",
            fontSize:50,
            textcolor:"#000000",
            rectcolor:0xcccc00,
            strokecolor:0xffff00,
            strokeWeight:10,
        });
    }
    
}