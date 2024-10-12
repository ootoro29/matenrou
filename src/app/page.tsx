import Image from "next/image";
import styles from "./page.module.css";
import { createClient } from "@/utils/supabase/server";
import { LogginButton, LoggoutButton } from "./buttons";
import Link from "next/link";
import React from "react";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: {user},
  } = await supabase.auth.getUser();
  
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
