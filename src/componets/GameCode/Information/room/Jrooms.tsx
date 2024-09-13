import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { I10Room, I12Room, I13Room, I2Room, I4Room, I5Room, I6Room, I7Room, I8Room } from "./Irooms";
import { K5Room, K7Room, K9Room } from "./Krooms";
import { Room } from "./room";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import * as AdvanceEvent  from "@/componets/GameCode/functions/advanceRoomEvent";

export class J2Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-2"
        this.nextRooms = [new I2Room(),new J3Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J3Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-3"
        this.nextRooms = [new J2Room(),new J4Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J4Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-4"
        this.nextRooms = [new J3Room(),new I4Room(),new J5Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J5Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-5"
        this.nextRooms = [new K5Room(),new J4Room(),new I5Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J6Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-6"
        this.nextRooms = [new I6Room(),new J7Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J7Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-7"
        this.nextRooms = [new K7Room(),new J6Room(),new I7Room(),new J8Room()];
        this.PRooms = [0,0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J8Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-8"
        this.nextRooms = [new J7Room(),new I8Room(),new J9Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J9Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-9"
        this.nextRooms = [new K9Room(),new J8Room(),new J10Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J10Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-10"
        this.nextRooms = [new J9Room(),new I10Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J11Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-11"
        this.nextRooms = [new J12Room()];
        this.PRooms = [0,0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J12Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-12"
        this.nextRooms = [new J11Room(),new I12Room(),new J13Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class J13Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "J-13"
        this.nextRooms = [new J12Room(),new I13Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}


