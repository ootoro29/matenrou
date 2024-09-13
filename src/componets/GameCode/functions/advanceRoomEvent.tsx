import { BattleSlime } from "../Information/enemy/battleSlime";
import { FireSlime } from "../Information/enemy/fireSlime";
import { IceSlime } from "../Information/enemy/iceSlime";
import { RockSlime } from "../Information/enemy/rockSlime";
import { ThunderSlime } from "../Information/enemy/thunderSlime";
import { WindSlime } from "../Information/enemy/windSlime";
import * as AdvanceEvent  from "../parts/area/advanceRoom";
import AdventureThinking from "../scenes/actions/adventureThinking";

export function BattleSlimeEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new BattleSlime(),{key:"battleSlime_appear",image:"/assets/enemy/battleSlime/出現イベント.png"}),
    ]
}

export function FireSlimeEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new FireSlime(),{key:"fireSlime_appear",image:"/assets/enemy/fireSlime/出現イベント.png"}),
    ]
}

export function IceSlimeEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new IceSlime(),{key:"iceSlime_appear",image:"/assets/enemy/iceSlime/出現イベント.png"}),
    ]
}

export function RockSlimeEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new RockSlime(),{key:"rockSlime_appear",image:"/assets/enemy/rockSlime/出現イベント.png"}),
    ]
}

export function ThunderSlimeEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new ThunderSlime(),{key:"thunderSlime_appear",image:"/assets/enemy/thunderSlime/出現イベント.png"}),
    ]
}

export function WindSlimeEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new WindSlime(),{key:"windSlime_appear",image:"/assets/enemy/windSlime/出現イベント.png"}),
    ]
}