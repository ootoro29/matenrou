import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { B11Room, B13Room, B14Room, B4Room, B5Room, B6Room, B8Room } from "./Brooms";
import { D10Room, D6Room } from "./Drooms";
import { Room } from "./room";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import * as AdvanceEvent  from "@/componets/GameCode/functions/advanceRoomEvent";

export class C4Room extends Room {
    constructor(){
        super()
        this.name = "C-4"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new B4Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class C5Room extends Room {
    constructor(){
        super()
        this.name = "C-5"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new B5Room(),new C6Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class C6Room extends Room {
    constructor(){
        super()
        this.name = "C-6"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new D6Room(),new C5Room(),new B6Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class C8Room extends Room {
    constructor(){
        super()
        this.name = "C-8"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new B8Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class C10Room extends Room {
    constructor(){
        super()
        this.name = "C-10"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new D10Room(),new C11Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class C11Room extends Room {
    constructor(){
        super()
        this.name = "C-11"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new C10Room(),new B11Room(),new C12Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class C12Room extends Room {
    constructor(){
        super()
        this.name = "C-12"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new C11Room(),new C12Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class C13Room extends Room {
    constructor(){
        super()
        this.name = "C-13"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new C12Room(),new B13Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class C14Room extends Room {
    constructor(){
        super()
        this.name = "C-14"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new C13Room(),new B14Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}