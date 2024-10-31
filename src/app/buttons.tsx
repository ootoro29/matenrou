"use client"
import { useEffect } from "react"
import styles from "./page.module.css";
import { GameInfoCheck, oAuthSignIn, PlayerCheck, signOut } from "./actions"
import Link from "next/link";

export function LogginButton(){
    return(
        <>
            <button className={styles.top_button} onClick={async () => {
                await oAuthSignIn().then((res) => {
                }).catch((e) => {
                })
                await PlayerCheck();
                await GameInfoCheck();
            }}>ログイン</button>
        </>
    )
}

export function LoggoutButton(){
    return(
        <>
            <button className={styles.top_button} onClick={async () => {await signOut()}}>ログアウト</button>
        </>
    )
}

export function HowToPlay(){
    return(
        <>
            <Link className={styles.top_link} href={"https://youtu.be/JybWaJtFTxE"}><button className={styles.top_button}>遊び方</button></Link>
        </>
    )
}