import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import * as AdvanceEvent  from "@/componets/GameCode/functions/advanceRoomEvent";
import searchAction from "../../scenes/actions/searchAction";
import { G10Room, G12Room, G1Room, G3Room, G5Room, G6Room, G7Room, G8Room } from "./Grooms";
import { I6Room, I7Room, I8Room } from "./Irooms";
import { Room } from "./room";
import { D100 } from "../../functions/utils";
import { F4Room } from "./Frooms";

export class H1Room extends Room {
    constructor(){
        super()
        this.name = "H-1"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new H2Room();
        if(rnd <= 50){
            room1 = new G3Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H2Room extends Room {
    constructor(){
        super()
        this.name = "H-2"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new G1Room();
        if(rnd <= 50){
            room1 = new G3Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H3Room extends Room {
    constructor(){
        super()
        this.name = "H-3"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new H1Room();
        if(rnd <= 50){
            room1 = new H5Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H4Room extends Room {
    constructor(){
        super()
        this.name = "H-4"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new F4Room();
        if(rnd <= 50){
            room1 = new H5Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H5Room extends Room {
    constructor(){
        super()
        this.name = "H-5"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new F4Room();
        if(rnd <= 50){
            room1 = new G5Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H6Room extends Room {
    constructor(){
        super()
        this.name = "H-6"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new I6Room(),new G6Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H7Room extends Room {
    constructor(){
        super()
        this.name = "H-7"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new I7Room(),new G7Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H8Room extends Room {
    constructor(){
        super()
        this.name = "H-8"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new I8Room(),new G8Room(),new H9Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H9Room extends Room {
    constructor(){
        super()
        this.name = "H-9"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new H8Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H10Room extends Room {
    constructor(){
        super()
        this.name = "H-10"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new G10Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H11Room extends Room {
    constructor(){
        super()
        this.name = "H-11"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new H10Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H12Room extends Room {
    constructor(){
        super()
        this.name = "H-12"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new G12Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H13Room extends Room {
    constructor(){
        super()
        this.name = "H-13"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new H12Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class H14Room extends Room {
    constructor(){
        super()
        this.name = "H-14"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new H13Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

