"use client"
import { useEffect } from "react"
import { GameInfoCheck, oAuthSignIn, PlayerCheck, signOut } from "./actions"

export function LogginButton(){
    return(
        <>
            <button onClick={async () => {
                await oAuthSignIn().then((res) => {
                    PlayerCheck();
                    GameInfoCheck();
                }).catch((e) => {
                })
            }}>ログイン</button>
        </>
    )
}

export function LoggoutButton(){
    return(
        <>
            <button onClick={async () => {await signOut()}}>ログアウト</button>
        </>
    )
}