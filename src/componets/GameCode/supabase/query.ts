"use client"

import { createClient } from "@/utils/supabase/client"
import { Room } from "../Information/room/room";
import top from "../scenes/top";
import { MatchInfo } from "@/types/game";
import PlayerINFO from "../Information/playerInformation";

const supabase = createClient()

export function updateStamina(uid:string,stamina:number){
    const updateGameInfo = async() => {
        const {error} = await supabase.from("GameInfo").update({stamina:stamina}).eq("uid",uid);
    }
    updateGameInfo();
}

export function setMatchInfo(uid:string,room:Room,HP:number,MP:number,CP:number){
    const updateGameInfo = async() => {
        const {error} = await supabase.from("MatchInfo").insert({room:room.name,HP:HP,MP:MP,CP:CP,uid:uid});
    }
    updateGameInfo();
}

export function updateMatchInfoRoom(uid:string,room:Room){
    const updateGameInfo = async() => {
        const {error} = await supabase.from("MatchInfo").update({room:room.name}).eq("uid",uid);
    }
    updateGameInfo();
}

export function updateMatchInfoStatus(uid:string,HP:number,MP:number,CP:number){
    const updateGameInfo = async() => {
        const {error} = await supabase.from("MatchInfo").update({HP:HP,MP:MP,CP:CP}).eq("uid",uid);
    }
    updateGameInfo();
}

export function getMatchInfo(uid:string,scene:top){
    const fetchMatchInfo = async () => {
        const {data,error} = await supabase.from("MatchInfo").select("*").eq("uid",`${uid}`);
        if(!data){
            scene.setMatchInfoToTop(null);
            return;
        }
        if(error)return;
        scene.setMatchInfoToTop(data[0] as MatchInfo);
    };
    fetchMatchInfo();
}

export function deleteMatchInfo(uid:string){
    const deleteMatchInfo = async () => {
        const {data,error} = await supabase.from("MatchInfo").delete().eq("uid",`${uid}`);
        if(error)return;
    };
    deleteMatchInfo();
}