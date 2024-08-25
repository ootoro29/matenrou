import { Area } from "./area";

export abstract class areaManager{
    AreaList?:Area[];
    index = 0;
    constructor(AreaList:Area[]){
        this.AreaList = AreaList;
        this.AreaList.map((a) => {
            a.setVisible(false);
        })
        if(this.AreaList.length!=0)this.AreaList[0].setVisible(true);
    }
    currentArea():Area | null{
        if(!this.AreaList)return null;
        if(this.isEmpty())return null;
        return this.AreaList[this.index];
    }
    nextArea(){
        if(!this.AreaList)return;
        if(this.index >= this.AreaList.length)return;
        this.AreaList[this.index].setVisible(false);
        this.index++;
        if(this.index < this.AreaList.length) {
            this.AreaList[this.index].setVisible(true);
        }
    }
    isEmpty(){
        return this.index == this.AreaList?.length
    }
    isLast(){
        return this.index+1 == this.AreaList?.length
    }
}