import { BattleSlime } from "../Information/enemy/battleSlime";
import { FireSlime } from "../Information/enemy/fireSlime";
import { IceSlime } from "../Information/enemy/iceSlime";
import { RockSlime } from "../Information/enemy/rockSlime";
import { ThunderSlime } from "../Information/enemy/thunderSlime";
import { WindSlime } from "../Information/enemy/windSlime";
import * as SearchEvent  from "../parts/area/searchArea";
import searchAction from "../scenes/actions/searchAction";

export function SearchFindRoomKeyEvent(scene:searchAction,index:number){
    return [
        new SearchEvent.NormalSearchArea(scene,`${index+1}番目のドアのカギを拾った‼`)
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

export function SearchRockSlimeEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new RockSlime(),{key:"rockSlime_appear",image:"/assets/enemy/rockSlime/出現イベント.png"})
    ]
}

export function SearchThunderSlimeEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new ThunderSlime(),{key:"thunderSlime_appear",image:"/assets/enemy/thunderSlime/出現イベント.png"})
    ]
}

export function SearchWindSlimeEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new WindSlime(),{key:"windSlime_appear",image:"/assets/enemy/windSlime/出現イベント.png"})
    ]
}

export function SearchNoneEvent(scene:searchAction){
    return [
        new SearchEvent.NormalSearchArea(scene,"何も見つけられなかった。。。",{key:"can't search",image:"./assets/searchEvent/none.png"}),
    ]
}