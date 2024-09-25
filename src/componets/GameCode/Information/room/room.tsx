import { SearchFindRoomKeyEvent } from "../../functions/searchEvent";
import { DPN } from "../../functions/utils";
import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import { NormalSearchArea, searchArea } from "../../parts/area/searchArea";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
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
    findItemEvent(scene:searchAction,p:number):NormalSearchArea[] | null{
        let rnd = Math.random()*100;
        if(rnd < p){
            let index = Math.floor(Math.random()*5);
            if(index == 0)return SearchEvent.FindPATCrystalEvent(scene);
            if(index == 1)return SearchEvent.FindMATCrystalEvent(scene);
            if(index == 2)return SearchEvent.FindPDFCrystalEvent(scene);
            if(index == 3)return SearchEvent.FindMDFCrystalEvent(scene);
            if(index == 4)return SearchEvent.FindSPCrystalEvent(scene);
        }
        return null;
    }
    abstract initialize():void;
    abstract genSearchEvent(scene:searchAction):searchArea[];
    abstract genAdvanceRoomEvent(scene:AdventureThinking):advanceRoomEventArea[];
}