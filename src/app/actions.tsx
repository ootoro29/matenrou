"use server"

import { getURL } from "@/utils/helpers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function oAuthSignIn() {

    const supabase = createClient();
    const redirectUrl = getURL("/auth/callback")
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider:"google",
        options: {
            redirectTo: redirectUrl,
        }
    })

    if (error) {
        redirect('/login?message=Could not authenticate user')
    }

    return redirect(data.url)
}

export async function signOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    redirect('/')
}

export async function PlayerCheck(){
    const supabase = createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if(!user)return;
    const {data,error} = await supabase.from("Player").select("*").eq("uid",`${user.id}`);
    if(error){
      console.log(error);
    }else{
      if(data.length != 0)return;
      const {error} = await supabase
      .from("Player")
      .insert({name:user.user_metadata.name,uid:user.id,})
    }
  }
export async function GameInfoCheck(){
    const supabase = createClient();
    const {
        data: {user},
    } = await supabase.auth.getUser();
    if(!user)return;
    const {data,error} = await supabase.from("GameInfo").select("*").eq("uid",`${user.id}`);
    if(error){
      console.log(error);
    }else{
      if(data.length != 0)return;
      const {error} = await supabase
      .from("GameInfo")
      .insert({stamina:9999999999,lv:1,exp:0,uid:user.id,})
    }
  }