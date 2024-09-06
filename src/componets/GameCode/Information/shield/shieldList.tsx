import { Shield } from "./shield";
import { BarrierShield } from "./shields";

export class ShieldList {
    constructor(){
        this.shieldList = [
            new BarrierShield()
        ]
    }
    capacity:number = 1;
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
}