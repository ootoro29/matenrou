"use client"
import { useEffect } from "react"
import { GameInfoCheck, oAuthSignIn, PlayerCheck, signOut } from "./actions"

export function LogginButton(){
    return(
        <>
            <button onClick={async () => {
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
            <button onClick={async () => {await signOut()}}>ログアウト</button>
        </>
    )
}