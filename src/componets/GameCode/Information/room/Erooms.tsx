import { D100 } from "../../functions/utils";
import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { C14Room } from "./Crooms";
import { D13Room, D2Room, D3Room, D4Room, D7Room, D8Room, D9Room } from "./Drooms";
import { F10Room, F1Room, F5Room, F7Room } from "./Frooms";
import { Room } from "./room";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import * as AdvanceEvent  from "@/componets/GameCode/functions/advanceRoomEvent";

export class E2Room extends Room {
    constructor(){
        super()
        this.name = "E-2"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new F1Room()];
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

export class E3Room extends Room {
    constructor(){
        super()
        this.name = "E-3"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new D2Room();
        if(rnd <= 33){
            room1 = new D3Room();
        }else if(rnd <= 66){
            room1 = new D4Room();
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

export class E4Room extends Room {
    constructor(){
        super()
        this.name = "E-4"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new E5Room()];
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

export class E5Room extends Room {
    constructor(){
        super()
        this.name = "E-5"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new F5Room(),new E4Room()];
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

export class E7Room extends Room {
    constructor(){
        super()
        this.name = "E-7"
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
        this.nextRooms = [new F7Room(),new D7Room()];
        this.PRooms = [80,20];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        const curse = this.CurseEvent(scene,5);
        if(curse)return curse;
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

export class E8Room extends Room {
    constructor(){
        super()
        this.name = "E-8"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new D8Room()];
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

export class E9Room extends Room {
    constructor(){
        super()
        this.name = "E-9"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new E8Room(),new D9Room()];
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

export class E10Room extends Room {
    constructor(){
        super()
        this.name = "E-10"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new F10Room(),new E9Room()];
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

export class E11Room extends Room {
    constructor(){
        super()
        this.name = "E-11"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new E10Room()];
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

export class E12Room extends Room {
    constructor(){
        super()
        this.name = "E-12"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new E11Room()];
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

export class E13Room extends Room {
    constructor(){
        super()
        this.name = "E-13"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new E12Room(),new D13Room()];
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

export class E14Room extends Room {
    constructor(){
        super()
        this.name = "E-14"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new E13Room(),new C14Room()];
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

