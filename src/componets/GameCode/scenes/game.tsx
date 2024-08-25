"use client"
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient, User } from "@supabase/supabase-js";
import Phaser, { Math } from "phaser";
import { GameInfo, gameInterface, Player } from "@/types/game";
import { Button } from "../parts/button";

export default class game extends Phaser.Scene {
  ball? :Phaser.GameObjects.Sprite;
  name? :String;
  button? :Button;
  player? :Player|null = null; 
  gameInfo? :GameInfo|null = null; 
  supabase:SupabaseClient<any, "public", any> = createClient();

  constructor() {
    super("game");
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
    const data:gameInterface = {player:this.player,gameInfo:this.gameInfo};
    this.scene.launch('top',data);
  }

  update(): void {
  }
}
