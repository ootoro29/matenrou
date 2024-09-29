"use client"
import styles from "./page.module.css";
import dynamic from "next/dynamic";
import { createClient } from "@/utils/supabase/client";
import { User } from "@supabase/supabase-js";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { GameInfo, Player } from "@/types/game";
import { GameInfoCheck, InitGameMatchInfo, InitPlayerInfo, PlayerCheck } from "../actions";

export default function Game(){
    const [user, setUser] = useState<User|null>(null);
    const [player, setPlayer] = useState<Player|null>(null);
    const [gameInfo, setGameInfo] = useState<GameInfo|null>(null);
    const [isLoggin, setIsLoggin] = useState<boolean|null>(null);
    const supabase = createClient();
    const router = useRouter();
    const Game = dynamic(() => import("@/app/components/Game"),{
      loading: () => (
        <div>
          <p>
            ゲームを読み込み中
          </p>
        </div>
      ),
      ssr:false,
    })
    useEffect(() => {
        const fetchUser = async () => {
          const { data: { session }, error } = await supabase.auth.getSession();
          if(error){
            setIsLoggin(false);
            return;
          }
          if(session){
            setIsLoggin(true);
            setUser(session.user);
          }else{
            setIsLoggin(false);
          }
        };
        fetchUser();
      }, []);
      useEffect(() => {
        if(!user)return;
        const fetchPlayer = async () => {
          const {data,error} = await supabase.from("Player").select("*").eq("uid",`${user.id}`);
          if(error)return;
          if(data.length == 0){
            await PlayerCheck().then(async() => {
              const Player = await InitPlayerInfo(user.user_metadata.name,user.id) as Player;
              setPlayer(Player);
            })
            return;
          }
          setPlayer(data[0] as Player);
        };
        fetchPlayer();
      }, [user]);
      useEffect(() => {
        if(!user)return;
        const fetchGameInfo = async () => {
          const {data,error} = await supabase.from("GameInfo").select("*").eq("uid",`${user.id}`);
          if(error)return;
          if(data.length == 0){
            await GameInfoCheck().then(async() => {
              const Game = await InitGameMatchInfo(user.id) as GameInfo;
              setGameInfo(Game);
            })
            return;
          }
          setGameInfo(data[0] as GameInfo);
        };
        fetchGameInfo();
      }, [user,player]);

    if(!isLoggin && isLoggin !== null){
      router.push('/');
      return;
    }
    if(!user || !player || !gameInfo){
        return(
          <div className={styles.game_page}>
            <p>Loading...</p>
          </div>
        )
    }
    return(
        <div className={styles.game_page}>
          <Game player={player} gameInfo={gameInfo}></Game>      
        </div>
    );
    
}