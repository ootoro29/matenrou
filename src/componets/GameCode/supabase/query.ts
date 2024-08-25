"use client"

import { createClient } from "@/utils/supabase/client"

const supabase = createClient()

export function setStamina(uid:string,stamina:number){
    const updateGameInfo = async() => {
        const {error} = await supabase.from("GameInfo").update({stamina:stamina}).eq("uid",uid);
    }
    updateGameInfo();
}