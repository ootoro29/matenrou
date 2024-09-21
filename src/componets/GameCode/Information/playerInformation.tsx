import { BattleStatus, normalStatus, Status, transformStatus } from "@/types/game";
import { calCP, calEXP, calHP, calMP, calNormalMAT, calNormalMDF, calNormalPAT, calNormalPDF, calNormalSP, calStage, calTransformMAT, calTransformMDF, calTransformPAT, calTransformPDF, calTransformSP } from "../functions/status";
import { ItemList } from "./item/itemList";
import { Command } from "./commands";
import { CancelTransformMagicalGirl, TransformMagicalGirl } from "./playerActCommands";
import { ShieldList } from "./shield/shieldList";
import { updateMatchInfoStatus } from "../supabase/query";

export default class PlayerINFO {
  lv = 0;
  exp = 0;
  exp_MAX = 0;
  uid:string = "";
  name:string = "";
  normal_status:normalStatus = {
    PAT:0,
    MAT:0,
    PDF:0,
    MDF:0,
    SP:0
  }
  transform_status:transformStatus = {
    PAT:0,
    MAT:0,
    PDF:0,
    MDF:0,
    SP:0,
  }
  HP = 0
  HP_MAX = 0
  MP = 0
  MP_MAX = 0
  CP = 0
  CP_MAX = 0
  transform = false;
  PATstage = 0;
  MATstage = 0;
  PDFstage = 0;
  MDFstage = 0;
  SPstage = 0;
  Item?:ItemList;
  Shield?:ShieldList
  constructor(lv:number,uid:string){
    this.lv = lv;
    this.HP = calHP(this.lv);
    this.MP = calMP(this.lv);
    this.CP = 0;
    this.Item = new ItemList();
    this.Shield = new ShieldList();
    this.uid = uid;
  }
  getConfirmStatus():Status{
    const data:Status = {
      lv:this.lv,
      normalStatus:this.normal_status,
      transformStatus:this.transform_status,
      HP:this.HP,
      HP_MAX:this.HP_MAX,
      MP:this.MP,
      MP_MAX:this.MP_MAX,
      CP:this.CP,
      CP_MAX:this.CP_MAX,
      exp:this.exp,
      exp_MAX:this.exp_MAX
    }
    return data;
  }
  getBattleStatus():BattleStatus{
    const data:BattleStatus = {
      lv:this.lv,
      status:this.changeStageStatus(((this.isTransform())?this.transform_status:this.normal_status)),
      HP:this.HP,
      HP_MAX:this.HP_MAX,
      MP:this.MP,
      MP_MAX:this.MP_MAX,
      CP:this.CP,
      CP_MAX:this.CP_MAX,
      exp:this.exp,
      exp_MAX:this.exp_MAX
    }
    return data;
  }
  changeStageStatus(status:transformStatus|normalStatus){
    status.MAT *= calStage(this.MATstage)
    status.PAT *= calStage(this.PATstage)
    status.MDF *= calStage(this.MDFstage)
    status.PDF *= calStage(this.PDFstage)
    status.SP *= calStage(this.SPstage)
    return status;
  }
  isTransform(){
    return this.transform;
  }
  updateStatus(){
    const lv = this.lv;
    this.normal_status.PAT = calNormalPAT(lv);
    this.normal_status.MAT = calNormalMAT(lv);
    this.normal_status.PDF = calNormalPDF(lv);
    this.normal_status.MDF = calNormalMDF(lv);
    this.normal_status.SP = calNormalSP(lv);
    this.transform_status.PAT = calTransformPAT(lv);
    this.transform_status.MAT = calTransformMAT(lv);
    this.transform_status.PDF = calTransformPDF(lv);
    this.transform_status.MDF = calTransformMDF(lv);
    this.transform_status.SP = calTransformSP(lv);
    this.HP_MAX = calHP(lv);
    this.MP_MAX = calMP(lv);
    this.CP_MAX = calCP(lv);
    this.exp_MAX = calEXP(lv);
    this.Shield?.update();
  }

  getExp(plus:number):string{
    this.exp += plus;
    const pre_lv = this.lv;
    while(this.exp >= this.exp_MAX){
      this.exp -= this.exp_MAX;
      this.lv++;
      this.updateStatus();
      this.exp_MAX = calEXP(this.lv);
    }
    if(pre_lv == this.lv){
      return ``;
    }else{
      return `${pre_lv}→${this.lv}にレベルアップ！`;
    }
  }

  genAdventureActList():Command[]{
    return [
      new TransformMagicalGirl(),
      new CancelTransformMagicalGirl()
    ];
  }

  damage(d:number){
    if(d <= 0)return;
    this.HP -= d;
    if(this.transform){
      this.CP += d;
    }
    if(this.HP < 0)this.HP = 0;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP);
  }

  heelHP(h:number){
    if(h <= 0)return;
    this.HP += h;
    if(this.HP > this.HP_MAX)this.HP = this.HP_MAX;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP);
  }

  changeMP(m:number){
    if(m == 0)return;
    this.MP += m;
    if(this.MP < 0)this.MP = 0;
    if(this.MP > this.MP_MAX)this.MP = this.MP_MAX;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP);
  }
}