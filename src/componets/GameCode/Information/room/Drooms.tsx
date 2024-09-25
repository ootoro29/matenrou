import { D100 } from "../../functions/utils";
import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { B1Room, B7Room, B9Room } from "./Brooms";
import { C10Room, C11Room, C4Room, C6Room } from "./Crooms";
import { E4Room, E7Room } from "./Erooms";
import { Room } from "./room";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import * as AdvanceEvent  from "@/componets/GameCode/functions/advanceRoomEvent";

export class D1Room extends Room {
    constructor(){
        super()
        this.name = "D-1"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new B1Room(),new D2Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class D2Room extends Room {
    constructor(){
        super()
        this.name = "D-2"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new C4Room();
        if(rnd <= 50){
            room1 = new E4Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class D3Room extends Room {
    constructor(){
        super()
        this.name = "D-3"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new C4Room();
        if(rnd <= 50){
            room1 = new E4Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class D4Room extends Room {
    constructor(){
        super()
        this.name = "D-4"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        const rnd = D100();
        let room1:Room = new C4Room();
        if(rnd <= 50){
            room1 = new E4Room();
        }
        this.nextRooms = [room1];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}


export class D6Room extends Room {
    constructor(){
        super()
        this.name = "D-6"
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
        this.nextRooms = [new C6Room(),new D7Room()];
        this.PRooms = [30,70];      
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
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

export class D7Room extends Room {
    constructor(){
        super()
        this.name = "D-7"
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
        this.nextRooms = [new E7Room(),new D6Room(),new B7Room()];
        this.PRooms = [50,25,25];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        let rndBattle = Math.random()*100;
        if(rndBattle < 80){
            return SearchEvent.BattleSlimeEvent(scene);
        }else{
            return SearchEvent.WindSlimeEvent(scene);
        }
    }
}

export class D8Room extends Room {
    constructor(){
        super()
        this.name = "D-8"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new D9Room()];
        this.PRooms = [100];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class D9Room extends Room {
    constructor(){
        super()
        this.name = "D-9"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 33){
            return AdvanceEvent.ZombiGirlEvent(scene);
        }else if(rnd < 66){
            return AdvanceEvent.ZombiManEvent(scene);
        }else{
            return AdvanceEvent.ZombiHakaEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new D8Room(),new B9Room(),new D10Room()];
        this.PRooms = [20,40,40];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const rndBattle = Math.random()*100;
        if(rndBattle < 33){
            return SearchEvent.ZombiGirlEvent(scene);
        }else if(rndBattle < 66){
            return SearchEvent.ZombiManEvent(scene);
        }else{
            return SearchEvent.ZombiHakaEvent(scene);
        }
    }
}

export class D10Room extends Room {
    constructor(){
        super()
        this.name = "D-10"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 50){
            return AdvanceEvent.ZombiGirlEvent(scene);
        }else{
            return AdvanceEvent.ZombiManEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new D9Room(),new C10Room()];
        this.PRooms = [50,50];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const rndBattle = Math.random()*100;
        if(rndBattle < 50){
            return SearchEvent.ZombiGirlEvent(scene);
        }else{
            return SearchEvent.ZombiManEvent(scene);
        }
    }
}

export class D11Room extends Room {
    constructor(){
        super()
        this.name = "D-11"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new C11Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class D12Room extends Room {
    constructor(){
        super()
        this.name = "D-12"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new D11Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class D13Room extends Room {
    constructor(){
        super()
        this.name = "D-13"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new D12Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}