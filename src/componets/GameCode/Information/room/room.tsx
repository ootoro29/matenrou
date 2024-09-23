import { SearchFindRoomKeyEvent } from "../../functions/searchEvent";
import { DPN } from "../../functions/utils";
import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import { NormalSearchArea, searchArea } from "../../parts/area/searchArea";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { Enemy } from "../enemy/enemy";

export abstract class Room {
    nextRooms?:Room[];
    PRooms:number[] = [];
    Enemys?:searchArea[][];
    PEnemys:number[] = [];
    name:string = "";
    constructor(){
    }
    nextRoomList():Room[]{
        if(!this.nextRooms)return[];
        return this.nextRooms;
    }
    nextRoom(index:number):Room|null{
        if(!this.nextRooms)return null;
        if(!this.PRooms)return null;
        if(index <= -1 || index >= this.nextRooms?.length)return null;
        if(index <= -1 || index >= this.PRooms?.length)return null;
        if(this.PRooms[index] == 0){
            return this.nextRooms[index];
        }else{
            return null;
        }
    }
    findRoomKeyEvent(scene:searchAction,p:number):NormalSearchArea[] | null{
        let rnd = Math.random()*100;
        console.log(rnd);
        if(rnd < p){
            let index = DPN(this.PRooms);
            if(this.PRooms[index] != -1 &&this.PRooms[index] != 0 && index != -1){
                this.PRooms[index] = 0;
                if(!this.nextRooms)return null;
                return SearchFindRoomKeyEvent(scene,this.nextRooms[index].name);
            }
        }
        return null;
    }
    abstract initialize():void;
    abstract genSearchEvent(scene:searchAction):searchArea[];
    abstract genAdvanceRoomEvent(scene:AdventureThinking):advanceRoomEventArea[];
}