import { advanceRoomEventArea } from "../../parts/area/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
"../../scenes/actions/adventureThinking";
import searchAction from "../../scenes/actions/searchAction";
import { A11Room, A12Room, A14Room, A5Room, A7Room, A9Room } from "./Arooms";
import { C11Room, C12Room, C5Room, C6Room, C8Room } from "./Crooms";
import { D7Room, D9Room } from "./Drooms";
import * as AdvanceEvent  from "../../parts/area/advanceRoom";
import * as SearchEvent from "@/componets/GameCode/functions/searchEvent"
import { Room } from "./room";
import { BattleSlime } from "../enemy/battleSlime";
import { DPN } from "../../functions/utils";

export class B1Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-1";
        this.nextRooms = [new B2Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class B2Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-2";
        this.nextRooms = [new B3Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class B3Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-3";
        this.nextRooms = [new B4Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class B4Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-4";
        this.nextRooms = [new B3Room(),new B5Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}

export class B5Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-5";
        this.nextRooms = [new C5Room(),new B4Room(),new A5Room(),new B6Room()];
        this.PRooms = [0,0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class B6Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-6";
        this.nextRooms = [new C6Room(),new B5Room(),new B7Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class B7Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[
            new AdvanceEvent.BattleAdvanceRoomArea(scene,new BattleSlime(),{key:"battleSlime_appear",image:"/assets/enemy/battleSlime/出現イベント.png"}),
        ];
    }
    initialize(): void {
        this.name = "B-7";
        this.nextRooms = [new D7Room(),new B6Room(),new A7Room(),new B8Room()];
        this.PRooms = [20,20,20,20];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,30);
        if(ans)return ans;
        let rnd = Math.random()*100;
        if(rnd < 10){
            return SearchEvent.SearchBattleSlimeEvent(scene);
        }
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class B8Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-8"
        this.nextRooms = [new C8Room(),new B7Room(),new B9Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class B9Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-9"
        this.nextRooms = [new D9Room(),new B8Room(),new A9Room()];
        this.PRooms = [0,0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class B11Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-11"
        this.nextRooms = [new C11Room(),new A11Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class B12Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-12"
        this.nextRooms = [new C12Room(),new A12Room()];
        this.PRooms = [0,0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class B13Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-13"
        this.nextRooms = [new B13Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}
export class B14Room extends Room {
    genAdvanceRoomEvent(scene: AdventureThinking): advanceRoomEventArea[] {
        return[];
    }
    initialize(): void {
        this.name = "B-14"
        this.nextRooms = [new A14Room()];
        this.PRooms = [0];
    }
    genSearchEvent(scene:searchAction){
        const ans = this.findRoomKeyEvent(scene,10);
        if(ans)return ans;
        return SearchEvent.SearchNoneEvent(scene)
    }
}