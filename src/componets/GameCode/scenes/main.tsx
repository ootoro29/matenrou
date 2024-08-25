"use client"
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient, User } from "@supabase/supabase-js";
import Phaser, { Math } from "phaser";
import { Button } from "../parts/button";
import { ButtonManager } from "../parts/buttonManager";
import { GameInfo, gameInterface, Player } from "@/types/game";
import { calCP, calHP, calMP, calNormalMAT, calNormalMDF, calNormalPAT, calNormalPDF, calNormalSP, calTransformMAT, calTransformMDF, calTransformPAT, calTransformPDF, calTransformSP } from "../functions/status";
import PlayerINFO from "../Information/playerInformation";
import { Room } from "../Information/room/room";
import * as R from "../Information/room/index";
import { Enemy } from "../Information/enemy/enemy";

export default class main extends Phaser.Scene {
  button?: Button;
  name? :String;
  player? :Player|null = null; 
  PINF?:PlayerINFO;
  Room?:Room;
  gameInfo? :GameInfo|null = null;
  supabase:SupabaseClient<any, "public", any> = createClient();

  
  
  BM?:ButtonManager;
  HP_BAR?:PlayerStatusBar;
  MP_BAR?:PlayerStatusBar;
  CP_BAR?:PlayerStatusBar;
  normal_player?:Phaser.GameObjects.Image;
  transform_player?:Phaser.GameObjects.Image;
  room_text?:Phaser.GameObjects.Text;
  first = true;

  constructor() {
    super("main");
  }
  init(data:{data:gameInterface,room:Room,first:boolean}) {
    this.player = data.data.player;
    this.gameInfo = data.data.gameInfo;
    this.first = data.first;
    if(this.first){
      this.PINF = new PlayerINFO(this.gameInfo.lv);
    }
    this.Room = data.room;
    this.Room.initialize();  
    if(!this.PINF) return;
    this.PINF.updateStatus();
  }
  /** This function loads resources that will be used later. */
  preload() {
    this.load.image("normal_player","./assets/player/ユーリ.png");
    this.load.image("transform_player","./assets/player/ユーリ(魔法少女の姿).png");
  }
  
  create() {
    if(!this.player)return;
    if(!this.PINF)return;
    // シンプルなゲームオブジェクトを作成
    const graphics = this.add.graphics();

    this.normal_player = this.add.image(700, 1200, "normal_player").setScale(0.85).setVisible(!this.PINF?.isTransform());
    this.transform_player = this.add.image(550, 1200, "transform_player").setScale(0.85).setVisible(this.PINF?.isTransform());
  
    graphics.fillStyle(0xaaaaaa, 1.0);
    graphics.fillRect(0, 0,this.scale.width, 300);

    this.HP_BAR = new PlayerStatusBar(this,640,250,0x00ff00,0x00aa00,"HP");
    this.MP_BAR = new PlayerStatusBar(this,460,250,0x00ffff,0x00aaaa,"MP");
    this.CP_BAR = new PlayerStatusBar(this,280,250,0xff0000,0xaa0000,"CP");

    this.room_text = this.add.text(40,120,"room",{fontSize:120});
    
    this.BM = new ButtonManager(this);

    this.scene.launch('adventure',{main:this,first:true});
    this.scene.moveAbove('adventure');
    //this.toCombat();
  }

  GAMEOVER(){
    this.scene.stop();
    this.scene.start("top");
  }

  toAdventure(){
    this.scene.launch('adventure',{main:this,first:false});
    this.scene.moveAbove('adventure');
  }

  toCombat(enemy:Enemy){
    this.scene.launch('battle',{main:this,enemy:enemy});
    this.scene.moveAbove('battle');
    //this.scene.moveDown('battle');
  }

  update(): void {
    if(!this.PINF)return;
    this.PINF.updateStatus();
    this.HP_BAR?.setP(this.PINF.HP,this.PINF.HP_MAX)
    this.MP_BAR?.setP(this.PINF.MP,this.PINF.MP_MAX)
    this.CP_BAR?.setP(this.PINF.CP,this.PINF.CP_MAX)

    this.normal_player?.setVisible(!this.PINF?.isTransform());
    this.transform_player?.setVisible(this.PINF?.isTransform());
    this.room_text?.setText(this.Room?.name || " ");
  }

  changeRoom(room:Room){
    if(!this.player)return;
    if(!this.gameInfo)return;
    const data:gameInterface = {player:this.player,gameInfo:this.gameInfo};
    this.scene.stop('main');
    this.scene.start('main',{data,room});
  }

}

class PlayerStatusBar extends Phaser.GameObjects.Container{
  P:number = 0;
  P_MAX:number = 10;
  P_Rect?: Phaser.GameObjects.Rectangle;
  PMAX_Rect?: Phaser.GameObjects.Rectangle;
  BarName?: Phaser.GameObjects.Text;
  constructor(scene: Phaser.Scene,x:number,y:number,c1:number,c2:number,name:string){
    super(scene,x,y);
    this.scene = scene
    this.scene.add.existing(this);
    this.x += 80;
    this.y -= 70;
    this.setSize(160,140);
    this.PMAX_Rect = scene.add.rectangle(0,0,160,140).setOrigin(0.5,0.5);
    this.PMAX_Rect.setFillStyle(c2).setStrokeStyle(9,0x000000)
    this.P_Rect = scene.add.rectangle(0,70,160,140).setOrigin(0.5,0);
    this.P_Rect.setFillStyle(c1).setStrokeStyle(9,0x000000)
    this.BarName = scene.add.text(0,-100,name,{fontSize:75,color:"#000000"}).setOrigin(0.5,0.5)
    this.add([this.PMAX_Rect,this.P_Rect,this.BarName]);
  }
  setP(P:number,P_MAX:number){
    this.P = P;
    this.P_MAX = P_MAX;
    let rate = (P/P_MAX);
    if(rate > 1)rate = 1;
    if(rate < 0)rate = 0;
    this.P_Rect?.setSize(160,-140*rate);
  }


}