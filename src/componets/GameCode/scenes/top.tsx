"use client"
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient, User } from "@supabase/supabase-js";
import Phaser, { Math } from "phaser";
import { Button } from "../parts/button";
import { GameInfo, gameInterface, Player } from "@/types/game";
import { setStamina } from "../supabase/query";
import * as R from "../Information/room/index";
import { Room } from "../Information/room/room";


export default class top extends Phaser.Scene {
  button?: Button;
  name? :String;
  player? :Player|null = null; 
  gameInfo?: GameInfo|null = null; 
  supabase:SupabaseClient<any, "public", any> = createClient();

  constructor() {
    super("top");
  }
  init(data:gameInterface) {
    this.player = data.player;
    this.gameInfo = data.gameInfo;
  }
  /** This function loads resources that will be used later. */
  preload() {
    
  }
  
  create() {
    if(!this.player)return;
    if(!this.gameInfo)return;
    // シンプルなゲームオブジェクトを作成
    const graphics = this.add.graphics();

    // 四角形を描画
    graphics.fillStyle(0x3221ad, 1.0);
    graphics.fillRect(0, 0,this.scale.width, 300);

    /*
    // 円を描画
    graphics.fillStyle(0xff0000, 1.0);
    graphics.fillCircle(400, 300, 50);
    */

    // テキストを追加
    this.add.text(20, 20, `${this.player.name}`, { fontSize: '50px', color: '#ffffff' });
    this.add.text(20, 70, `stamina:${this.gameInfo.stamina}`, { fontSize: '50px', color: '#ffffff' });

    this.button = new Button(this,this.scale.width/2,400,"ゲームスタート",{
        width:750,
        height:150,
        onClick: () => {
            if(!this.player)return;
            if(!this.gameInfo)return;
            if(this.gameInfo.stamina > 0){
                setStamina(this.player.uid,--this.gameInfo.stamina);
                const data:gameInterface = {player:this.player,gameInfo:this.gameInfo};
                const room:Room = new R.AR.A7Room();
                this.scene.start('main',{data,room,first:true});
            }else{
                alert("スタミナが足りません");
            }
        },
    },{
        fontSize:50,
        textcolor:"#ffffff"
    })
  }

  update(): void {
  }
}
