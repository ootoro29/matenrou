import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { B11Room, B12Room, B13Room, B14Room, B4Room, B5Room, B6Room, B8Room } from "./Brooms";
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
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class C5Room extends Room {
    constructor(){
        super()
        this.name = "C-5"
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
        this.nextRooms = [new B5Room(),new C6Room()];
        this.PRooms = [30,70];
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

export class C6Room extends Room {
    constructor(){
        super()
        this.name = "C-6"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 60){
            return AdvanceEvent.BattleSlimeEvent(scene);
        }else if(rnd < 80){
            return AdvanceEvent.FireSlimeEvent(scene);
        }else {
            return AdvanceEvent.RockSlimeEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new D6Room(),new C5Room(),new B6Room()];
        this.PRooms = [30,30,40];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        let rndBattle = Math.random()*100;
        if(rndBattle < 60){
            return SearchEvent.BattleSlimeEvent(scene);
        }else if(rndBattle < 80){
            return SearchEvent.FireSlimeEvent(scene);
        }else{
            return SearchEvent.RockSlimeEvent(scene);
        }
    }
}

export class C8Room extends Room {
    constructor(){
        super()
        this.name = "C-8"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 60){
            return AdvanceEvent.BattleSlimeEvent(scene);
        }else if(rnd < 80){
            return AdvanceEvent.IceSlimeEvent(scene);
        }else {
            return AdvanceEvent.ThunderSlimeEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new B8Room()];
        this.PRooms = [100];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        let rndBattle = Math.random()*100;
        if(rndBattle < 60){
            return SearchEvent.BattleSlimeEvent(scene);
        }else if(rndBattle < 80){
            return SearchEvent.IceSlimeEvent(scene);
        }else{
            return SearchEvent.ThunderSlimeEvent(scene);
        }
    }
}

export class C10Room extends Room {
    constructor(){
        super()
        this.name = "C-10"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 50){
            return AdvanceEvent.ZombiManEvent(scene);
        }else {
            return AdvanceEvent.ZombiHakaEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new D10Room(),new C11Room()];
        this.PRooms = [30,70];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        const rndBattle = Math.random()*100;
        if(rndBattle < 50){
            return SearchEvent.ZombiManEvent(scene);
        }else {
            return SearchEvent.ZombiHakaEvent(scene);
        }
    }
}

export class C11Room extends Room {
    constructor(){
        super()
        this.name = "C-11"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 50){
            return AdvanceEvent.ZombiGirlEvent(scene);
        }else {
            return AdvanceEvent.ZombiHakaEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new C10Room(),new B11Room(),new C12Room()];
        this.PRooms = [30,30,40];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        const rndBattle = Math.random()*100;
        if(rndBattle < 50){
            return SearchEvent.ZombiGirlEvent(scene);
        }else {
            return SearchEvent.ZombiHakaEvent(scene);
        }
    }
}

export class C12Room extends Room {
    constructor(){
        super()
        this.name = "C-12"
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 40){
            return AdvanceEvent.WindSlimeEvent(scene);
        }else if(rnd < 80){
            return AdvanceEvent.ZombiHakaEvent(scene);
        }else {
            return AdvanceEvent.ZombiGirlEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new C11Room(),new B12Room()];
        this.PRooms = [30,70];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        const rndBattle = Math.random()*100;
        if(rndBattle < 40){
            return SearchEvent.WindSlimeEvent(scene);
        }else if(rndBattle < 80){
            return SearchEvent.ZombiHakaEvent(scene);
        }else {
            return SearchEvent.ZombiGirlEvent(scene);
        }
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
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
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
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}