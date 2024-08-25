"use client"
import { useEffect } from "react"
import { oAuthSignIn, signOut } from "./actions"

export function LogginButton(){
    return(
        <>
            <button onClick={async () => {
                await oAuthSignIn().then((res) => {
                    
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