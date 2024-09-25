import { BattleStatus, normalStatus, Status, transformStatus } from "@/types/game";
import { calCP, calEXP, calHP, calMP, calNormalMAT, calNormalMDF, calNormalPAT, calNormalPDF, calNormalSP, calStage, calStatusFromStatus, calTransformMAT, calTransformMDF, calTransformPAT, calTransformPDF, calTransformSP } from "../functions/status";
import { ItemList } from "./item/itemList";
import { Command } from "./commands";
import { CancelTransformMagicalGirl, TransformMagicalGirl } from "./playerActCommands";
import { ShieldList } from "./shield/shieldList";
import { updateGameInfoLv, updateMatchInfoStatus } from "../supabase/query";

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
  poison = false;
  palsy = false;
  frozen = false;
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
  isPoison(){
    return this.poison;
  }
  isPalsy(){
    return this.palsy;
  }
  isFrozen(){
    return this.frozen;
  }
  toData(){
    const data = [
      (this.isTransform())?1:0,
      (this.isPoison())?1:0,
      (this.isPalsy())?1:0,
      (this.isFrozen())?1:0,
    ]
    return calStatusFromStatus(data);
  }
  toStatus(status:number[]){
    if(status[0] == 1)this.setTransForm();
    if(status[1] == 1)this.setPoison();
    if(status[2] == 1)this.setPalsy();
    if(status[3] == 1)this.setFrozen();
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
    updateGameInfoLv(this.uid,this.lv,this.exp);
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
    if(this.CP > this.CP_MAX)this.CP = this.CP_MAX;
    if(this.HP < 0)this.HP = 0;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }

  heelHP(h:number){
    if(h <= 0)return;
    this.HP += h;
    if(this.HP > this.HP_MAX)this.HP = this.HP_MAX;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }

  heel(){
    this.CP *= 0.8;
    if(this.transform){
      this.MP += this.MP_MAX/32;
      this.HP += this.HP_MAX/64;
    }else{
      this.MP += this.MP_MAX/8;
    }
    if(this.MP > this.MP_MAX)this.MP = this.MP_MAX;
    if(this.HP > this.HP_MAX)this.HP = this.HP_MAX;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }

  resetCP(){
    if(this.CP == 0)return;
    this.CP = 0;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }

  breakTransform(){
    this.MP = 0;
    this.transform = false;
    this.CP = 0;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }

  changeMP(m:number){
    if(m == 0)return;
    this.MP += m;
    if(this.MP < 0)this.MP = 0;
    if(this.MP > this.MP_MAX)this.MP = this.MP_MAX;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  setTransForm(){
    if(this.transform)return;
    this.transform = true;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  setPoison(){
    if(this.poison)return;
    this.poison = true;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  setPalsy(){
    if(this.palsy)return;
    this.palsy = true;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  setFrozen(){
    if(this.frozen)return;
    this.frozen = false;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  resetTransForm(){
    if(!this.transform)return;
    this.transform = false;
    this.CP = 0;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  resetPoison(){
    if(!this.poison)return;
    this.poison = false;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  resetPalsy(){
    if(!this.palsy)return;
    this.palsy = false;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  resetFrozen(){
    if(!this.frozen)return;
    this.frozen = false;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  changePATStage(s:number){
    if(s == 0)return;
    this.PATstage += s;
    if(this.PATstage < -6)this.PATstage = -6;
    if(this.PATstage > 6)this.PATstage = 6;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  changeMATStage(s:number){
    if(s == 0)return;
    this.MATstage += s;
    if(this.PATstage < -6)this.MATstage = -6;
    if(this.PATstage > 6)this.MATstage = 6;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  changePDFStage(s:number){
    if(s == 0)return;
    this.PDFstage += s;
    if(this.PATstage < -6)this.PDFstage = -6;
    if(this.PATstage > 6)this.PDFstage = 6;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  changeMDFStage(s:number){
    if(s == 0)return;
    this.MDFstage += s;
    if(this.PATstage < -6)this.MDFstage = -6;
    if(this.PATstage > 6)this.MDFstage = 6;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
  changeSPStage(s:number){
    if(s == 0)return;
    this.SPstage += s;
    if(this.PATstage < -6)this.SPstage = -6;
    if(this.PATstage > 6)this.SPstage = 6;
    updateMatchInfoStatus(this.uid,this.HP,this.MP,this.CP,this.PATstage,this.MATstage,this.PDFstage,this.MDFstage,this.SPstage,this.toData());
  }
}