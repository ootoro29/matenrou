import {Item } from "./item";
import * as ITEM from "./items"
export class ItemList{
    battleItemList:Item[] = [];
    itemList:Item[] = [];
    constructor(){
        this.battleItemList = [
            new ITEM.HPDrink(3),
            new ITEM.HPTank(3),
            new ITEM.MPBin(3),
            new ITEM.MPDrink(3),
            new ITEM.MPTank(3),
        ];
    }
    setItemList(){
        
    }
    genBattleItemList(){
        return this.battleItemList.filter((item) => item.count > 0);
    }
    genItemList(){
        let ans = [...this.battleItemList,...this.itemList];
        return ans.filter((item) => item.count > 0);
    }
}