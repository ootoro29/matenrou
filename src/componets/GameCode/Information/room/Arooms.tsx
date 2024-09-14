import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { B11Room, B12Room, B5Room, B7Room, B9Room } from "./Brooms";
import { Room } from "./room";
import { BattleSlime } from "../enemy/battleSlime";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import * as AdvanceEvent  from "@/componets/GameCode/functions/advanceRoomEvent";

export class A5Room extends Room {
    constructor(){
        super()
        this.name = "A-5";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new B5Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class A7Room extends Room {
    constructor(){
        super()
        this.name = "A-7";
    }
    initialize(): void {
        this.nextRooms = [new B7Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
    genAdvanceRoomEvent(scene: AdventureThinking){
        return[];
    }
}

export class A9Room extends Room {
    constructor(){
        super()
        this.name = "A-9";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 80){
            return AdvanceEvent.BattleSlimeEvent(scene);
        }else{
            return AdvanceEvent.WindSlimeEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new B9Room(),new A10Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class A10Room extends Room {
    constructor(){
        super()
        this.name = "A-10";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 60){
            return AdvanceEvent.FireSlimeEvent(scene);
        }else{
            return AdvanceEvent.ThunderSlimeEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new A9Room(),new A11Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class A11Room extends Room {
    constructor(){
        super()
        this.name = "A-11";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 60){
            return AdvanceEvent.IceSlimeEvent(scene);
        }else{
            return AdvanceEvent.RockSlimeEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new B11Room(),new A10Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class A12Room extends Room {
    constructor(){
        super()
        this.name = "A-12";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new B12Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class A13Room extends Room {
    constructor(){
        super()
        this.name = "A-13";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new A12Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class A14Room extends Room {
    constructor(){
        super()
        this.name = "A-14";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new A13Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}