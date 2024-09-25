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
        this.nextRooms = [new B5Room()];
        this.PRooms = [100];
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
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
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
        if(rnd < 60){
            return AdvanceEvent.BattleSlimeEvent(scene);
        }else if(rnd < 80){
            return AdvanceEvent.ZombiGirlEvent(scene);
        }else{
            return AdvanceEvent.ZombiHakaEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new B9Room(),new A10Room()];
        this.PRooms = [30,70];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        const rndBattle = Math.random()*100;
        if(rndBattle < 60){
            return SearchEvent.BattleSlimeEvent(scene);
        }else if(rndBattle < 80){
            return SearchEvent.ZombiGirlEvent(scene);
        }else{
            return SearchEvent.ZombiHakaEvent(scene);
        }
    }
}

export class A10Room extends Room {
    constructor(){
        super()
        this.name = "A-10";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 50){
            return AdvanceEvent.BattleSlimeEvent(scene);
        }else if(rnd < 80){
            return AdvanceEvent.ZombiGirlEvent(scene);
        }else{
            return AdvanceEvent.ZombiManEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new A9Room(),new A11Room()];
        this.PRooms = [30,70];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        const rndBattle = Math.random()*100;
        if(rndBattle < 50){
            return SearchEvent.BattleSlimeEvent(scene);
        }else if(rndBattle < 80){
            return SearchEvent.ZombiGirlEvent(scene);
        }else{
            return SearchEvent.ZombiManEvent(scene);
        }
    }
}
export class A11Room extends Room {
    constructor(){
        super()
        this.name = "A-11";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 40){
            return AdvanceEvent.FireSlimeEvent(scene);
        }else if(rnd < 80){
            return AdvanceEvent.ZombiManEvent(scene);
        }else{
            return AdvanceEvent.ZombiHakaEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new B11Room(),new A10Room()];
        this.PRooms = [70,30];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        const rndBattle = Math.random()*100;
        if(rndBattle < 40){
            return SearchEvent.FireSlimeEvent(scene);
        }else if(rndBattle < 80){
            return SearchEvent.ZombiManEvent(scene);
        }else{
            return SearchEvent.ZombiHakaEvent(scene);
        }
    }
}
export class A12Room extends Room {
    constructor(){
        super()
        this.name = "A-12";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 40){
            return AdvanceEvent.IceSlimeEvent(scene);
        }else if(rnd < 70){
            return AdvanceEvent.ZombiManEvent(scene);
        }else{
            return AdvanceEvent.ZombiHakaEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new B12Room()];
        this.PRooms = [100];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        const rndBattle = Math.random()*100;
        if(rndBattle < 40){
            return SearchEvent.IceSlimeEvent(scene);
        }else if(rndBattle < 70){
            return SearchEvent.ZombiManEvent(scene);
        }else{
            return SearchEvent.ZombiHakaEvent(scene);
        }
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
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
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
        const ans = this.findRoomKeyEvent(scene,35);
        if(ans)return ans;
        const item = this.findItemEvent(scene,10);
        if(item)return item;
        return SearchEvent.SearchNoneEvent(scene)
    }
}