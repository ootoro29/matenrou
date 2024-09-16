"use client"
import styles from "./page.module.css"
import Phaser from "phaser";
import { useEffect, useRef, useState } from "react";
import { gameInterface } from "@/types/game";
import AdventureScene from "@/componets/GameCode/scenes/adventure";
import game from "@/componets/GameCode/scenes/game";
import top from "@/componets/GameCode/scenes/top";
import main from "@/componets/GameCode/scenes/main";
import UIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
export default function Game(data:gameInterface) {
    const gameArea = useRef<HTMLDivElement>(null);

    const [sceneArray, setSceneArray] = useState<Phaser.Scene[]>([]);

    useEffect(() => {
        const readScenes = async () => {
            //シーンの読み込み。Promiseの関係でmapを使えなかったのでfor文
            const readScenesArray: Phaser.Scene[] = [];
            const importURLs:string[] = [
                `game`,
                `top`,
                `main`,
                `adventure`,
                `battle`,
                `loading`,
                `actions/adventureThinking`,
                `actions/confirmAdventureStatus`,
                `actions/advanceRoom`,
                `actions/adventureAction`,
                `actions/adventureEventAction`,
                `actions/adventureItem`,
                `actions/searchAction`,
                `actions/battleActSelect`,
                `actions/battleMagicSelect`,
                `actions/battleItemSelect`,
                `actions/battleAnalize`,
                `actions/battleStatus`,
                `actions/battleThinking`,
                `actions/battleEventAction`,
            ]
            for(let i = 0; i < importURLs.length; i++){
                const readModule:any = await import(
                    `@/componets/GameCode/scenes/${importURLs[i]}`
                );
                readScenesArray.push(readModule["default"]);
            }
            setSceneArray(readScenesArray);
        };
        readScenes();
    },[]);

    useEffect(() => {
        if(gameArea.current == null)return;
        if(sceneArray.length == 0)return;
        if(!data.player)return;
        const config: Phaser.Types.Core.GameConfig = {
            title: "摩天楼",
            type:Phaser.AUTO,
            parent: gameArea.current,
            scene:sceneArray,
            backgroundColor:'11b1ed',
            scale: {
                mode: Phaser.Scale.FIT,
                autoCenter: Phaser.Scale.CENTER_BOTH,
                width: 828,
                height: 1792,
            },
            max: {
                width: window.innerHeight*(414/896),
                height: window.innerHeight,
              },
              min: {
                width: 10,
                height: 10,
              },
            dom: {
                createContainer: true
            },
            plugins: {
                scene: [
                  {
                    key: 'rexUI',
                    plugin: UIPlugin,
                    mapping: 'rexUI'
                  }
                ]
              }
        };
        const phaserObj = new Phaser.Game(config);
        console.log(phaserObj.scene)
        phaserObj.scene.start('game', data);
        return () => {
            phaserObj.destroy(true,false);
        }
    },[gameArea,sceneArray])
    return(
        <div ref={gameArea} className={styles.game}></div>
    );
}