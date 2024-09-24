import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
"../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { A11Room, A12Room, A14Room, A5Room, A7Room, A9Room } from "./Arooms";
import { C11Room, C12Room, C5Room, C6Room, C8Room } from "./Crooms";
import { D7Room, D9Room } from "./Drooms";
import * as AdvanceEvent  from "@/componets/GameCode/functions/advanceRoomEvent";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import { Room } from "./room";
import { BattleSlime } from "../enemy/battleSlime";
import { DPN } from "../../functions/utils";

export class B1Room extends Room {
    constructor(){
        super()
        this.name = "B-1";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new B2Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class B2Room extends Room {
    constructor(){
        super()
        this.name = "B-2";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new B3Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class B3Room extends Room {
    constructor(){
        super()
        this.name = "B-3";
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
        this.nextRooms = [new B4Room()];
        this.PRooms = [100];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
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

export class B4Room extends Room {
    constructor(){
        super()
        this.name = "B-4";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return AdvanceEvent.BossIshisuEvent(scene);
    }
    initialize(): void {
        this.nextRooms = [new B3Room(),new B5Room()];
        this.PRooms = [50,50];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class B5Room extends Room {
    constructor(){
        super()
        this.name = "B-5";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 80){
            return AdvanceEvent.BattleSlimeEvent(scene);
        }else{
            return AdvanceEvent.ThunderSlimeEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new C5Room(),new B4Room(),new A5Room(),new B6Room()];
        this.PRooms = [30,10,30,30];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        let rndBattle = Math.random()*100;
        if(rndBattle < 80){
            return SearchEvent.BattleSlimeEvent(scene);
        }else{
            return SearchEvent.ThunderSlimeEvent(scene);
        }
    }
}
export class B6Room extends Room {
    constructor(){
        super()
        this.name = "B-6";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 80){
            return AdvanceEvent.BattleSlimeEvent(scene);
        }else{
            return AdvanceEvent.IceSlimeEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new C6Room(),new B5Room(),new B7Room()];
        this.PRooms = [40,30,30];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        let rndBattle = Math.random()*100;
        if(rndBattle < 80){
            return SearchEvent.BattleSlimeEvent(scene);
        }else{
            return SearchEvent.IceSlimeEvent(scene);
        }
    }
}
export class B7Room extends Room {
    constructor(){
        super()
        this.name = "B-7";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return AdvanceEvent.BattleSlimeEvent(scene);
    }
    initialize(): void {
        this.nextRooms = [new D7Room(),new B6Room(),new A7Room(),new B8Room()];
        this.PRooms = [25,25,25,25];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,30);
        if(ans)return ans;
        return SearchEvent.BattleSlimeEvent(scene);
    }
}
export class B8Room extends Room {
    constructor(){
        super()
        this.name = "B-8";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 80){
            return AdvanceEvent.BattleSlimeEvent(scene);
        }else{
            return AdvanceEvent.FireSlimeEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new C8Room(),new B7Room(),new B9Room()];
        this.PRooms = [40,30,30];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        let rnd = Math.random()*100;
        let rndBattle = Math.random()*100;
        if(rndBattle < 80){
            return SearchEvent.BattleSlimeEvent(scene);
        }else{
            return SearchEvent.FireSlimeEvent(scene);
        }
    }
}
export class B9Room extends Room {
    constructor(){
        super()
        this.name = "B-9";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 80){
            return AdvanceEvent.BattleSlimeEvent(scene);
        }else{
            return AdvanceEvent.RockSlimeEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new D9Room(),new B8Room(),new A9Room()];
        this.PRooms = [10,30,60];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        let rndBattle = Math.random()*100;
        if(rndBattle < 80){
            return SearchEvent.BattleSlimeEvent(scene);
        }else{
            return SearchEvent.RockSlimeEvent(scene);
        }
    }
}
export class B11Room extends Room {
    constructor(){
        super()
        this.name = "B-11";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 40){
            return AdvanceEvent.ThunderSlimeEvent(scene);
        }else if(rnd < 80) {
            return AdvanceEvent.ZombiGirlEvent(scene);
        }else{
            return AdvanceEvent.ZombiManEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new C11Room(),new A11Room()];
        this.PRooms = [30,70];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        const rndBattle = Math.random()*100;
        if(rndBattle < 40){
            return SearchEvent.ThunderSlimeEvent(scene);
        }else if(rndBattle < 80){
            return SearchEvent.ZombiGirlEvent(scene);
        }else{
            return SearchEvent.ZombiManEvent(scene);
        }
    }
}
export class B12Room extends Room {
    constructor(){
        super()
        this.name = "B-12";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        const rnd = Math.random()*100;
        if(rnd < 40){
            return AdvanceEvent.RockSlimeEvent(scene);
        }else if(rnd < 70){
            return AdvanceEvent.ZombiGirlEvent(scene);
        }else{
            return AdvanceEvent.ZombiHakaEvent(scene);
        }
    }
    initialize(): void {
        this.nextRooms = [new C12Room(),new A12Room()];
        this.PRooms = [30,70];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        const rndBattle = Math.random()*100;
        if(rndBattle < 40){
            return SearchEvent.RockSlimeEvent(scene);
        }else if(rndBattle < 70){
            return SearchEvent.ZombiGirlEvent(scene);
        }else{
            return SearchEvent.ZombiHakaEvent(scene);
        }
    }
}
export class B13Room extends Room {
    constructor(){
        super()
        this.name = "B-13";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new B13Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class B14Room extends Room {
    constructor(){
        super()
        this.name = "B-14";
    }
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.nextRooms = [new A14Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,25);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}