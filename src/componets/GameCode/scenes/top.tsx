"use client"
import { createClient } from "@/utils/supabase/client";
import { SupabaseClient, User } from "@supabase/supabase-js";
import Phaser, { Math } from "phaser";
import { Button } from "../parts/button";
import { GameInfo, gameInterface, MatchInfo, Player } from "@/types/game";
import { getMatchInfo, setMatchInfo, updateStamina } from "../supabase/query";
import * as R from "../Information/room/index";
import { Room } from "../Information/room/room";
import { calCP, calHP, calMP } from "../functions/status";


export default class top extends Phaser.Scene {
  button?: Button;
  name?: String;
  player?: Player | null = null;
  gameInfo?: GameInfo | null = null;
  matchInfo?: MatchInfo | null = null;
  supabase: SupabaseClient<any, "public", any> = createClient();
  isLoading:boolean = true;

  constructor() {
    super("top");
  }
  init(data: gameInterface) {
    this.player = data.player;
    this.gameInfo = data.gameInfo;    
  }
  /** This function loads resources that will be used later. */
  preload() {
    if(!this.player)return;
    getMatchInfo(this.player.uid, this);
  }

  create() {

    const loadingScreen = document.getElementById('loadingScreen');
    if (loadingScreen) {
        loadingScreen.style.display = 'none';
    }

    if (!this.player) return;
    if (!this.gameInfo) return;
    // シンプルなゲームオブジェクトを作成
    const graphics = this.add.graphics();

    // 四角形を描画
    graphics.fillStyle(0x3221ad, 1.0);
    graphics.fillRect(0, 0, this.scale.width, 300);

    /*
    // 円を描画
    graphics.fillStyle(0xff0000, 1.0);
    graphics.fillCircle(400, 300, 50);
    */

    // テキストを追加
    this.add.text(20, 20, `${this.player.name}`, { fontSize: '50px', color: '#ffffff' });
    this.add.text(20, 70, `stamina:${this.gameInfo.stamina}`, { fontSize: '50px', color: '#ffffff' });

    this.button = new Button(this, this.scale.width / 2, 400, "ゲームスタート", {
      width: 750,
      height: 150,
      onClick: () => {
        if (!this.player) return;
        if (!this.gameInfo) return;
        if (this.isLoading) return;
        this.isLoading = true;
        if (this.matchInfo) {
          const data: gameInterface = { player: this.player, gameInfo: this.gameInfo };
          const room: Room = toRoom(this.matchInfo.room);
          this.scene.start('main', { data, room, first: true, matchInfo:this.matchInfo });
        } else {
          if (this.gameInfo.stamina > 0) {
            updateStamina(this.player.uid, --this.gameInfo.stamina);
            const data: gameInterface = { player: this.player, gameInfo: this.gameInfo };
            const room: Room = new R.AR.A7Room();
            setMatchInfo(this.player.uid,room,calHP(this.gameInfo.lv),calMP(this.gameInfo.lv),0);
            this.scene.start('main', { data, room, first: true });
          } else {
            alert("スタミナが足りません");
          }
        }
      },
    }, {
      fontSize: 50,
      textcolor: "#ffffff"
    })
  }

  update(): void {
    if(this.isLoading){
      this.button?.text?.setText("Loading...");
    }else if(this.matchInfo){
      this.button?.text?.setText("途中から始める");
    }else{
      this.button?.text?.setText("ゲームスタート");
    }
  }

  setMatchInfoToTop(info: MatchInfo|null) {
    this.matchInfo = info;
    this.isLoading = false;
  }
}

function toRoom(name: string): Room {
  switch (name) {
    case "A-5":
      return new R.AR.A5Room;
    case "A-7":
      return new R.AR.A7Room;
    case "A-9":
      return new R.AR.A9Room;
    case "A-10":
      return new R.AR.A10Room;
    case "A-11":
      return new R.AR.A11Room;
    case "A-12":
      return new R.AR.A12Room;
    case "A-13":
      return new R.AR.A13Room;
    case "A-14":
      return new R.AR.A14Room;
    case "B-1":
      return new R.BR.B1Room;
    case "B-2":
      return new R.BR.B2Room;
    case "B-3":
      return new R.BR.B3Room;
    case "B-4":
      return new R.BR.B4Room;
    case "B-5":
      return new R.BR.B5Room;
    case "B-6":
      return new R.BR.B6Room;
    case "B-7":
      return new R.BR.B7Room;
    case "B-8":
      return new R.BR.B8Room;
    case "B-9":
      return new R.BR.B9Room;
    case "B-11":
      return new R.BR.B11Room;
    case "B-12":
      return new R.BR.B12Room;
    case "B-13":
      return new R.BR.B13Room;
    case "B-14":
      return new R.BR.B14Room;
    case "C-4":
      return new R.CR.C4Room;
    case "C-5":
      return new R.CR.C5Room;
    case "C-6":
      return new R.CR.C6Room;
    case "C-8":
      return new R.CR.C8Room;
    case "C-10":
      return new R.CR.C10Room;
    case "C-11":
      return new R.CR.C11Room;
    case "C-12":
      return new R.CR.C12Room;
    case "C-13":
      return new R.CR.C13Room;
    case "C-14":
      return new R.CR.C14Room;
    case "D-1":
      return new R.DR.D1Room;
    case "D-2":
      return new R.DR.D2Room;
    case "D-3":
      return new R.DR.D3Room;
    case "D-4":
      return new R.DR.D4Room;
    case "D-6":
      return new R.DR.D6Room;
    case "D-7":
      return new R.DR.D7Room;
    case "D-8":
      return new R.DR.D8Room;
    case "D-9":
      return new R.DR.D9Room;
    case "D-10":
      return new R.DR.D10Room;
    case "D-11":
      return new R.DR.D11Room;
    case "D-12":
      return new R.DR.D12Room;
    case "D-13":
      return new R.DR.D13Room;

    case "E-2":
      return new R.ER.E2Room;
    case "E-3":
      return new R.ER.E3Room;
    case "E-4":
      return new R.ER.E4Room;
    case "E-5":
      return new R.ER.E5Room;
    case "E-7":
      return new R.ER.E7Room;
    case "E-8":
      return new R.ER.E8Room;
    case "E-9":
      return new R.ER.E9Room;
    case "E-10":
      return new R.ER.E10Room;
    case "E-11":
      return new R.ER.E11Room;
    case "E-12":
      return new R.ER.E12Room;
    case "E-13":
      return new R.ER.E13Room;
    case "E-14":
      return new R.ER.E14Room;

    case "F-1":
      return new R.FR.F1Room;
    case "F-4":
      return new R.FR.F4Room;
    case "F-5":
      return new R.FR.F5Room;
    case "F-6":
      return new R.FR.F6Room;
    case "F-7":
      return new R.FR.F7Room;
    case "F-8":
      return new R.FR.F8Room;
    case "F-9":
      return new R.FR.F9Room;
    case "F-10":
      return new R.FR.F10Room;
    case "F-11":
      return new R.FR.F11Room;
    case "F-12":
      return new R.FR.F12Room;
    case "F-13":
      return new R.FR.F13Room;
    case "F-14":
      return new R.FR.F14Room;

    case "G-1":
      return new R.GR.G1Room;
    case "G-2":
      return new R.GR.G2Room;
    case "G-3":
      return new R.GR.G3Room;
    case "G-4":
      return new R.GR.G4Room;
    case "G-5":
      return new R.GR.G5Room;
    case "G-6":
      return new R.GR.G6Room;
    case "G-7":
      return new R.GR.G7Room;
    case "G-8":
      return new R.GR.G8Room;
    case "G-9":
      return new R.GR.G9Room;
    case "G-10":
      return new R.GR.G10Room;
    case "G-11":
      return new R.GR.G11Room;
    case "G-12":
      return new R.GR.G12Room;
    case "G-13":
      return new R.GR.G13Room;
    case "G-14":
      return new R.GR.G14Room;

    case "H-1":
      return new R.HR.H1Room;
    case "H-2":
      return new R.HR.H2Room;
    case "H-3":
      return new R.HR.H3Room;
    case "H-4":
      return new R.HR.H4Room;
    case "H-5":
      return new R.HR.H5Room;
    case "H-6":
      return new R.HR.H6Room;
    case "H-7":
      return new R.HR.H7Room;
    case "H-8":
      return new R.HR.H8Room;
    case "H-9":
      return new R.HR.H9Room;
    case "H-10":
      return new R.HR.H10Room;
    case "H-11":
      return new R.HR.H11Room;
    case "H-12":
      return new R.HR.H12Room;
    case "H-13":
      return new R.HR.H13Room;
    case "H-14":
      return new R.HR.H14Room;

    case "I-1":
      return new R.IR.I1Room;
    case "I-2":
      return new R.IR.I2Room;
    case "I-3":
      return new R.IR.I3Room;
    case "I-4":
      return new R.IR.I4Room;
    case "I-5":
      return new R.IR.I5Room;
    case "I-6":
      return new R.IR.I6Room;
    case "I-7":
      return new R.IR.I7Room;
    case "I-8":
      return new R.IR.I8Room;
    case "I-9":
      return new R.IR.I9Room;
    case "I-10":
      return new R.IR.I10Room;
    case "I-11":
      return new R.IR.I11Room;
    case "I-12":
      return new R.IR.I12Room;
    case "I-13":
      return new R.IR.I13Room;
    case "I-14":
      return new R.IR.I14Room;
      
    case "J-2":
      return new R.JR.J2Room;
    case "J-3":
      return new R.JR.J3Room;
    case "J-4":
      return new R.JR.J4Room;
    case "J-5":
      return new R.JR.J5Room;
    case "J-6":
      return new R.JR.J6Room;
    case "J-7":
      return new R.JR.J7Room;
    case "J-8":
      return new R.JR.J8Room;
    case "J-9":
      return new R.JR.J9Room;
    case "J-10":
      return new R.JR.J10Room;
    case "J-11":
      return new R.JR.J11Room;
    case "J-12":
      return new R.JR.J12Room;
    case "J-13":
      return new R.JR.J13Room;

    case "K-5":
      return new R.KR.K5Room;

    case "K-7":
      return new R.KR.K7Room;

    case "K-9":
      return new R.KR.K9Room;
      

    default:
      return new R.AR.A7Room;
  }
}