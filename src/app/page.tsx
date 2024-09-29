import Image from "next/image";
import styles from "./page.module.css";
import { createClient } from "@/utils/supabase/server";
import { LogginButton, LoggoutButton } from "./buttons";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();

  const PlayerCheck = async() => {
    if(!user)return;
    const {data,error} = await supabase.from("Player").select("*").eq("uid",`${user.id}`);
    if(error){
    }else{
      if(data.length != 0)return;
      const {error} = await supabase
      .from("Player")
      .insert({name:user.user_metadata.name,uid:user.id,})
      console.log(error);
    }
  }
  const GameInfoCheck = async() => {
    if(!user)return;
    const {data,error} = await supabase.from("GameInfo").select("*").eq("uid",`${user.id}`);
    if(error){
    }else{
      if(data.length != 0)return;
      const {error} = await supabase
      .from("GameInfo")
      .insert({stamina:9999999999,lv:1,exp:0,uid:user.id,})
    }
  }

  if(user){
    PlayerCheck();
    GameInfoCheck();
  }

  
  return (
    <div className = {styles.top_page}>
      {(user)?(
        <>
          <Image src={"/top/ログイントップ画面.jpg"} alt="ログイントップ画面" width={270} height={400} className={styles.top_page_image}></Image>
          <Link href={"/game"}><button>ゲームスタート</button></Link>
          <LoggoutButton></LoggoutButton>
        </>
      ):(
        <>
          <Image src={"/top/トップ画面.jpg"} alt="トップ画面" width={270} height={400} className={styles.top_page_image}></Image>
          <LogginButton></LogginButton>
        </>
      )}
    </div>
  );
}
