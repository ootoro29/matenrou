import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import * as AdvanceEvent  from "@/componets/GameCode/functions/advanceRoomEvent";
import searchAction from "../../scenes/actions/searchAction";
import { J5Room, J7Room, J9Room } from "./Jrooms";
import { Room } from "./room";

export class K5Room extends Room {
    constructor(){
        super()
        this.name = "K-5"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new J5Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class K7Room extends Room {
    constructor(){
        super()
        this.name = "K-7"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new J7Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class K9Room extends Room {
    constructor(){
        super()
        this.name = "K-9"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new J9Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

