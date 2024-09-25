import { D100 } from "../../functions/utils";
import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { D1Room } from "./Drooms";
import { E14Room, E2Room, E3Room, E4Room, E5Room, E7Room } from "./Erooms";
import { G10Room, G12Room, G13Room, G2Room, G3Room, G4Room, G7Room, G9Room } from "./Grooms";
import { Room } from "./room";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import * as AdvanceEvent  from "@/componets/GameCode/functions/advanceRoomEvent";

export class F1Room extends Room {
    constructor(){
        super()
        this.name = "F-1"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new D1Room();
        if(rnd <= 48){
            room1 = new F4Room();
        }else if(rnd <= 96){
            room1 = new E2Room();
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

export class F4Room extends Room {
    constructor(){
        super()
        this.name = "F-4"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new G2Room();
        if(rnd <= 33){
            room1 = new G3Room();
        }else if(rnd <= 66){
            room1 = new G4Room();
        }
        const rnd2 = D100();
        let room2:Room = new E2Room();
        if(rnd2 <= 33){
            room2 = new E3Room();
        }else if(rnd2 <= 66){
            room2 = new E4Room();
        }
        this.nextRooms = [new F5Room(),room1,room2];
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

export class F5Room extends Room {
    constructor(){
        super()
        this.name = "F-5"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new F4Room(),new E5Room(),new F6Room()];
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

export class F6Room extends Room {
    constructor(){
        super()
        this.name = "F-6"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new F5Room(),new F7Room()];
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

export class F7Room extends Room {
    constructor(){
        super()
        this.name = "F-7"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 20){
            return AdvanceEvent.FireSlimeEvent(scene);
        }else if(rnd < 40){
            return AdvanceEvent.IceSlimeEvent(scene);
        }else if(rnd < 60){
            return AdvanceEvent.ThunderSlimeEvent(scene);
        }else if(rnd < 80){
            return AdvanceEvent.RockSlimeEvent(scene);
        }else{
            return AdvanceEvent.WindSlimeEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new G7Room(),new F6Room(),new E7Room(),new F8Room()];
        this.PRooms = [100,-1,-1,-1];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        const rndBattle = Math.random()*100;
        if(rndBattle < 20){
            return SearchEvent.FireSlimeEvent(scene);
        }else if(rndBattle < 40){
            return SearchEvent.IceSlimeEvent(scene);
        }else if(rndBattle < 60){
            return SearchEvent.ThunderSlimeEvent(scene);
        }else if(rndBattle < 80){
            return SearchEvent.RockSlimeEvent(scene);
        }else{
            return SearchEvent.WindSlimeEvent(scene);
        }
    }
}


export class F8Room extends Room {
    constructor(){
        super()
        this.name = "F-8"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new F7Room(),new F9Room()];
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

export class F9Room extends Room {
    constructor(){
        super()
        this.name = "F-9"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new G9Room(),new F8Room()];
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

export class F10Room extends Room {
    constructor(){
        super()
        this.name = "F-10"
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

export class F11Room extends Room {
    constructor(){
        super()
        this.name = "F-11"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new F12Room()];
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

export class F12Room extends Room {
    constructor(){
        super()
        this.name = "F-12"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new G12Room(),new F13Room()];
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

export class F13Room extends Room {
    constructor(){
        super()
        this.name = "F-13"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new G13Room(),new F14Room()];
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

export class F14Room extends Room {
    constructor(){
        super()
        this.name = "F-14"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new E14Room()];
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

