import { Shield } from "./shield";
import { NormalShield } from "./shields";

export class ShieldList {
    constructor(){
        this.shieldList = [
            //new NormalShield()
        ]
    }
    capacity:number = 2;
    shieldList:Shield[] = []
    setShield(s:Shield):void{
        this.shieldList.push(s)  
    }
    canSetShield():boolean{
        return this.shieldList.length < this.capacity;
    }
    selectShield():Shield|undefined{
        if(this.shieldList.length == 0){
            return undefined;
        }else{
            let ans:Shield|undefined;
            let max_HP = 0;
            for(let i = 0; i < this.shieldList.length; i++){
                if(this.shieldList[i].HP > max_HP){
                    max_HP = this.shieldList[i].HP;
                    ans = this.shieldList[i];
                }
            }
            return ans;
        }
    } 
    update(){
        this.shieldList.map((shield,i) => {
            if(shield.HP <= 0){
                this.shieldList = [...this.shieldList.slice(0,i),...this.shieldList.slice(i+1,this.shieldList.length)]
            }
        })
    }
}