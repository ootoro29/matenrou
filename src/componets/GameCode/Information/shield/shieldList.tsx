import { Shield } from "./shield";

export class ShieldList {
    capacity:number = 1;
    shieldList:Shield[] = []
    setShield(s:Shield){
        this.shieldList.push(s)  
    }
    canSetShield(){
        return this.shieldList.length < this.capacity;
    }
}