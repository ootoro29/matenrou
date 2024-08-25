import { BattleSlime } from "../Information/enemy/battleSlime";
import * as SearchEvent  from "../parts/area/searchArea";
import searchAction from "../scenes/actions/searchAction";

export function SearchFindRoomKeyEvent(scene:searchAction,index:number){
    return [
        new SearchEvent.NormalSearchArea(scene,`${index+1}番目のドアのカギを拾った‼`)
    ]
}

export function SearchBattleSlimeEvent(scene:searchAction){
    return [
        new SearchEvent.BattleSearchArea(scene,new BattleSlime(),{key:"battleSlime_appear",image:"/assets/enemy/battleSlime/出現イベント.png"})
    ]
}

export function SearchNoneEvent(scene:searchAction){
    return [
        new SearchEvent.NormalSearchArea(scene,"何も見つけられなかった。。。",{key:"can't search",image:"./assets/searchEvent/none.png"}),
    ]
}