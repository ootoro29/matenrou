import { Atlas } from "../Information/enemy/Atlas";
import { Aumorus } from "../Information/enemy/Aumorus";
import { BattleMachine } from "../Information/enemy/BattleMachine";
import { BattleSlime } from "../Information/enemy/battleSlime";
import { CuleGoa } from "../Information/enemy/Culegoa";
import { FairySana } from "../Information/enemy/FairySana";
import { FireSlime } from "../Information/enemy/fireSlime";
import { FroFox } from "../Information/enemy/FroFox";
import { GoastMant } from "../Information/enemy/GoastMant";
import { Golem } from "../Information/enemy/Golem";
import { IceSlime } from "../Information/enemy/iceSlime";
import { KarakuriGoemon } from "../Information/enemy/KarakuriGoemon";
import { Luca } from "../Information/enemy/Luca";
import { Myotamoru } from "../Information/enemy/Myotamoru";
import { RockSlime } from "../Information/enemy/rockSlime";
import { StarKnightGirl } from "../Information/enemy/StarKnightGirl";
import { ThunderSlime } from "../Information/enemy/thunderSlime";
import { WindSlime } from "../Information/enemy/windSlime";
import { ZombiGirl } from "../Information/enemy/ZombiGirl";
import { ZombiHaka } from "../Information/enemy/ZombiHaka";
import { ZombiMan } from "../Information/enemy/ZombiMan";
import * as SearchEvent  from "../parts/area/searchArea";
import searchAction from "../scenes/actions/searchAction";

export function SearchFindRoomKeyEvent(scene:searchAction,name:string){
    return [
        new SearchEvent.NormalSearchArea(scene,`${name}のドアのカギを拾った‼`)
    ]
}

export function BattleSlimeEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new BattleSlime(),{key:"battleSlime_appear",image:"/assets/enemy/battleSlime/出現イベント.png"})
    ]
}

export function FireSlimeEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new FireSlime(),{key:"fireSlime_appear",image:"/assets/enemy/fireSlime/出現イベント.png"})
    ]
}

export function IceSlimeEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new IceSlime(),{key:"iceSlime_appear",image:"/assets/enemy/iceSlime/出現イベント.png"})
    ]
}

export function RockSlimeEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new RockSlime(),{key:"rockSlime_appear",image:"/assets/enemy/rockSlime/出現イベント.png"})
    ]
}

export function ThunderSlimeEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new ThunderSlime(),{key:"thunderSlime_appear",image:"/assets/enemy/thunderSlime/出現イベント.png"})
    ]
}

export function WindSlimeEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new WindSlime(),{key:"windSlime_appear",image:"/assets/enemy/windSlime/出現イベント.png"})
    ]
}

export function SearchNoneEvent(scene:searchAction){
    return [
        new SearchEvent.NormalSearchArea(scene,"何も見つけられなかった。。。",{key:"can't search",image:"./assets/searchEvent/none.png"}),
    ]
}

export function ZombiGirlEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new ZombiGirl()),
    ]
}

export function ZombiManEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new ZombiMan()),
    ]
}

export function ZombiHakaEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new ZombiHaka()),
    ]
}

export function FairySanaEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new FairySana()),
    ]
}

export function GolemEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new Golem()),
    ]
}

export function KarakuriGoemonEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new KarakuriGoemon()),
    ]
}

export function BattleMachineEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new BattleMachine()),
    ]
}

export function AumorusEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new Aumorus()),
    ]
}

export function CulegoaEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new CuleGoa()),
    ]
}

export function AtlasEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new Atlas()),
    ]
}

export function MyotamoruEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new Myotamoru()),
    ]
}

export function LucaEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new Luca()),
    ]
}

export function FroFoxEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new FroFox()),
    ]
}

export function GoastMantEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new GoastMant()),
    ]
}

export function StarKnightGirlMantEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new StarKnightGirl()),
    ]
}