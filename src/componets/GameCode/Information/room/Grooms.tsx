import { D100 } from "../../functions/utils";
import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { F11Room, F4Room, F7Room, F9Room } from "./Frooms";
import { H11Room, H14Room, H1Room, H2Room, H3Room, H4Room, H5Room, H6Room, H7Room, H8Room } from "./Hrooms";
import { Room } from "./room";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import * as AdvanceEvent  from "@/componets/GameCode/functions/advanceRoomEvent";

export class G1Room extends Room {
    constructor(){
        super()
        this.name = "G-1"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new G3Room();
        if(rnd <= 30){
            room1 = new H1Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G2Room extends Room {
    constructor(){
        super()
        this.name = "G-2"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new G1Room();
        if(rnd <= 33){
            room1 = new H1Room();
        }else if(rnd <= 66){
            room1 = new H2Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G3Room extends Room {
    constructor(){
        super()
        this.name = "G-3"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new H3Room();
        if(rnd <= 45){
            room1 = new H2Room();
        }else if(rnd <= 90){
            room1 = new H4Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G4Room extends Room {
    constructor(){
        super()
        this.name = "G-4"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new H4Room();
        if(rnd <= 33){
            room1 = new H5Room();
        }else if(rnd <= 66){
            room1 = new G5Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G5Room extends Room {
    constructor(){
        super()
        this.name = "G-5"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new F4Room();
        if(rnd <= 50){
            room1 = new H4Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G6Room extends Room {
    constructor(){
        super()
        this.name = "G-6"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new H6Room(),new G7Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G7Room extends Room {
    constructor(){
        super()
        this.name = "G-7"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new H7Room(),new G6Room(),new F7Room(),new G8Room()];
        this.PRooms = [0,0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G8Room extends Room {
    constructor(){
        super()
        this.name = "G-8"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new H8Room(),new G7Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G9Room extends Room {
    constructor(){
        super()
        this.name = "G-9"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new F9Room(),new G10Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G10Room extends Room {
    constructor(){
        super()
        this.name = "G-10"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new G9Room(),new G11Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G11Room extends Room {
    constructor(){
        super()
        this.name = "G-11"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new H11Room(),new G10Room(),new F11Room()];
        this.PRooms = [0,0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G12Room extends Room {
    constructor(){
        super()
        this.name = "G-12"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new G11Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G13Room extends Room {
    constructor(){
        super()
        this.name = "G-13"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new G14Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class G14Room extends Room {
    constructor(){
        super()
        this.name = "G-14"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new H14Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}


