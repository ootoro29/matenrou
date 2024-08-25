import { GameInfo, Player } from "@/types/game";
import { Button } from "./button";
export class ButtonManager{
    BList : Button[] = [];
    click:number = -1;
    constructor(scene:Phaser.Scene){
        for(let i = 0; i < 2; i++){
            for(let j = 0; j < 3; j++){
                let index = j+i*3;
                const button = new Button(scene,j*(scene.scale.width/3),scene.scale.height-400+i*200,`ボタン${index}`,{
                    width:scene.scale.width/3,
                    height:200,
                    onClick: () => {
                        if(this.BList[index].getText() != 'X')this.click = index;
                    },
                },{
                    align:"left",
                    fontSize:50,
                    textcolor:"#ffffff"
                })
                this.BList.push(button);
            }
          }
    }
    checkClick():number {
        const ans = this.click;
        this.click = -1;
        return ans;
    }
    changeText(texts:string[]){
        for(let i = 0; i < 6; i++){
            this.BList[i].setText(texts[i]);
        }
    }
}