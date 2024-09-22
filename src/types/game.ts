import { Command } from "@/componets/GameCode/Information/commands";
import { Room } from "@/componets/GameCode/Information/room/room";

export type Player = {
    name:string;
    uid:string;
}
export type GameInfo = {
    lv:number;
    exp:number;
    stamina:number;
}
export type MatchInfo = {
    room:string;
    HP:number;
    MP:number;
    CP:number;
    status:number;
    PATStage:number;
    MATStage:number;
    PDFStage:number;
    MDFStage:number;
    SPStage:number;
}
export type PComand = {
    command:Command;
    prob:number;
}
export interface gameInterface{
    player:Player;
    gameInfo:GameInfo;
}

export type normalStatus = {
    PAT:number;
    MAT:number;
    PDF:number;
    MDF:number;
    SP:number;
}

export type transformStatus = {
    PAT:number;
    MAT:number;
    PDF:number;
    MDF:number;
    SP:number;
}

export interface Status{
    lv:number;
    normalStatus:normalStatus;
    transformStatus:transformStatus;
    HP:number;
    HP_MAX:number;
    MP:number;
    MP_MAX:number;
    CP:number;
    CP_MAX:number;
    exp:number;
    exp_MAX:number;
}

export interface BattleStatus{
    lv:number;
    status:normalStatus|transformStatus;
    HP:number;
    HP_MAX:number;
    MP:number;
    MP_MAX:number;
    CP:number;
    CP_MAX:number;
    exp:number;
    exp_MAX:number;
}