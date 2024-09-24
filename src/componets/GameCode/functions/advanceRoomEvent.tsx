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
import { Ishisu } from "../Information/enemy/Ishisu";
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

export function ZombiGirlEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new ZombiGirl()),
    ]
}

export function ZombiManEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new ZombiMan()),
    ]
}

export function ZombiHakaEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new ZombiHaka()),
    ]
}

export function FairySanaEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new FairySana()),
    ]
}

export function GolemEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new Golem()),
    ]
}

export function KarakuriGoemonEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new KarakuriGoemon()),
    ]
}

export function BattleMachineEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new BattleMachine()),
    ]
}

export function AumorusEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new Aumorus()),
    ]
}

export function CulegoaEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new CuleGoa()),
    ]
}

export function AtlasEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new Atlas()),
    ]
}

export function MyotamoruEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new Myotamoru()),
    ]
}

export function LucaEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new Luca()),
    ]
}

export function FroFoxEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new FroFox()),
    ]
}

export function GoastMantEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new GoastMant()),
    ]
}

export function StarKnightGirlMantEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new StarKnightGirl()),
    ]
}

export function BossIshisuEvent(scene:AdventureThinking){
    return [
        new AdvanceEvent.NormalAdvanceRoomArea(scene,"──────────その部屋からは溢れんばかりの生命力を感じた。"),
        new AdvanceEvent.NormalAdvanceRoomArea(scene,"壁にはツタが張り巡らされ侵食している。部屋の中心には金髪エルフの少女。"),
        new AdvanceEvent.NormalAdvanceRoomArea(scene,"そっと彼女が口を開く。"),
        new AdvanceEvent.NormalAdvanceRoomArea(scene,"「私の名前はイシス。普段は自室で祈りを捧げてるの」"),
        new AdvanceEvent.NormalAdvanceRoomArea(scene,"「でも今回は家主に侵入者がどんな子か調べてほしいって頼まれちゃったんだ。」"),
        new AdvanceEvent.NormalAdvanceRoomArea(scene,"そう言うと彼女はジッとこちらを見つめてくる。"),
        new AdvanceEvent.NormalAdvanceRoomArea(scene,"「ふ～ん。あなた、魔法少女になれるのね。……それも、ちょっと歪に。」"),
        new AdvanceEvent.NormalAdvanceRoomArea(scene,"「…………これ以上のことは戦ってみないと分からないなぁ。」"),
        new AdvanceEvent.BattleAdvanceRoomArea(scene,new Ishisu()),
    ]
}