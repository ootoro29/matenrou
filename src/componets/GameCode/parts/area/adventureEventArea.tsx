import { wrap } from "module";
import { Area, EventArea } from "../area";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";
import { areaManager } from "../areaManager";
import BattleEventAction from "../../scenes/actions/battleEventAction";
import { Enemy } from "../../Information/enemy/enemy";
import PlayerINFO from "../../Information/playerInformation";
import AdventureEventAction from "../../scenes/actions/adventureEventAction";
import { Item } from "../../Information/item/item";


export class AdventureEventAreaManager extends areaManager{
    AreaList?:AdventureEventArea[];
    index = -1;
    constructor(AreaList:AdventureEventArea[]){
        super(AreaList);
        this.nextArea();
    }
    currentArea():AdventureEventArea | null{
        if(!this.AreaList)return null;
        if(this.isEmpty())return null;
        return this.AreaList[this.index];
    }
    nextArea(){
        if(!this.AreaList)return;
        if(this.index >= this.AreaList.length)return;
        if(this.index >= 0)this.AreaList[this.index].setVisible(false);
        this.index++;
        if(this.index < this.AreaList.length) {
            this.AreaList[this.index].setVisible(true);
        }
        this.AreaList[this.index].appearance(this);
    }
}


export abstract class AdventureEventArea extends EventArea{
    parents?:AdventureEventAction;
    constructor(scene:AdventureEventAction,discription:string,{key="",image = ""} = {}){
        super(scene,discription,{key:key,image:image});
    }
    abstract genSelections(): string[];
    abstract opeClick(click:number): void;
    abstract appearance(AM:AdventureEventAreaManager): void;
}

export class NormalAdventureEventArea extends AdventureEventArea {
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
                //this.parents.scene.start("battleThinking",{main:this.parents.MAIN,battle:this.parents.Parents});
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM: AdventureEventAreaManager): void {
        
    }
}

export class GetEXPAdventureEventArea extends AdventureEventArea {
    exp:number = 0;
    player?:PlayerINFO;
    constructor(scene:AdventureEventAction,player:PlayerINFO,exp:number,{key="",image = ""} = {}){
        const discription = `プレイヤーは${exp}の経験値を得た`;
        super(scene,discription,{key:key,image:image});
        this.exp = exp;
        this.player = player;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void {
        if(!this.player)return;
        const result = this.player.getExp(this.exp);
        this.discription += result;
        if(!this.text || !this.discription)return;
        this.text?.setText(this.discription);
    }
}

export class HPHeelAdventureEventArea extends AdventureEventArea {
    player?:PlayerINFO;
    hp = 0;
    constructor(scene:AdventureEventAction,player:PlayerINFO,hp:number,{key="",image = ""} = {}){
        const discription = `プレイヤーのHPを${hp}回復した！`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
        this.hp = hp;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void {  
        if(!this.player)return;
        this.player.HP += this.hp;
        if(this.player.HP >= this.player.HP_MAX){
            this.player.HP = this.player.HP_MAX;
        }
    }
}

export class MPHeelAdventureEventArea extends AdventureEventArea {
    player?:PlayerINFO;
    mp = 0;
    constructor(scene:AdventureEventAction,player:PlayerINFO,mp:number,{key="",image = ""} = {}){
        const discription = `プレイヤーのMPを${mp}回復した！`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
        this.mp = mp;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void {  
        if(!this.player)return;
        this.player.MP += this.mp;
        if(this.player.MP >= this.player.MP_MAX){
            this.player.MP = this.player.MP_MAX;
        }
    }
}

export class UseItemAdventureEventArea extends AdventureEventArea {
    item?:Item
    constructor(scene:AdventureEventAction,item:Item,{key="",image = ""} = {}){
        const discription = `プレイヤーは${item.name}を使用した！`;
        super(scene,discription,{key:key,image:image});
        this.item = item;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void { 
        if(!this.item)return;
        this.item.count--;
    }
}

export class TransformAdventureEventArea extends AdventureEventArea {
    player?:PlayerINFO;
    mp = 0;
    constructor(scene:AdventureEventAction,player:PlayerINFO,mp:number,{key="",image = ""} = {}){
        const discription = `プレイヤーは魔法少女に変身した！`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
        this.mp = mp;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void {  
        if(!this.player)return;
        this.player.changeMP(-this.mp);
        this.player.transform = true;      
    }
}
export class CancelTransformAdventureEventArea extends AdventureEventArea {
    player?:PlayerINFO;
    mp = 0;
    constructor(scene:AdventureEventAction,player:PlayerINFO,mp:number,{key="",image = ""} = {}){
        const discription = `プレイヤーは魔法少女の変身を解除した！`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
        this.mp = mp;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void {  
        if(!this.player)return;
        this.player.changeMP(-this.mp);
        this.player.transform = false;      
    }
}

export class PlayerAdventurePATStageChange extends AdventureEventArea {
    player?:PlayerINFO;
    stage = 0;
    constructor(scene:AdventureEventAction,player:PlayerINFO,stage:number,{key="",image = ""} = {}){
        const discription = `プレイヤーのPATが${Math.abs(stage)}段階${(stage < 0)?"下がった":"上がった。"}`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
        this.stage = stage;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void {  
        if(!this.player)return;
        if((this.player.PATstage <= -6 && this.stage < 0) || (this.player.PATstage >= 6 && this.stage > 0))return;
        this.player.PATstage += this.stage;
    }
}
export class PlayerAdventureMATStageChange extends AdventureEventArea {
    player?:PlayerINFO;
    stage = 0;
    constructor(scene:AdventureEventAction,player:PlayerINFO,stage:number,{key="",image = ""} = {}){
        const discription = `プレイヤーのMATが${Math.abs(stage)}段階${(stage < 0)?"下がった":"上がった。"}`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
        this.stage = stage;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void {  
        if(!this.player)return;
        if((this.player.MATstage <= -6 && this.stage < 0) || (this.player.MATstage >= 6 && this.stage > 0))return;
        this.player.MATstage += this.stage;
    }
}

export class PlayerAdventurePDFStageChange extends AdventureEventArea {
    player?:PlayerINFO;
    stage = 0;
    constructor(scene:AdventureEventAction,player:PlayerINFO,stage:number,{key="",image = ""} = {}){
        const discription = `プレイヤーのPDFが${Math.abs(stage)}段階${(stage < 0)?"下がった":"上がった。"}`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
        this.stage = stage;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void {  
        if(!this.player)return;
        if((this.player.PDFstage <= -6 && this.stage < 0) || (this.player.PDFstage >= 6 && this.stage > 0))return;
        this.player.PDFstage += this.stage;
    }
}
export class PlayerAdventureMDFStageChange extends AdventureEventArea {
    player?:PlayerINFO;
    stage = 0;
    constructor(scene:AdventureEventAction,player:PlayerINFO,stage:number,{key="",image = ""} = {}){
        const discription = `プレイヤーのMDFが${Math.abs(stage)}段階${(stage < 0)?"下がった":"上がった。"}`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
        this.stage = stage;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void {  
        if(!this.player)return;
        if((this.player.MDFstage <= -6 && this.stage < 0) || (this.player.MDFstage >= 6 && this.stage > 0))return;
        this.player.MDFstage += this.stage;
    }
}
export class PlayerAdventureSPStageChange extends AdventureEventArea {
    player?:PlayerINFO;
    stage = 0;
    constructor(scene:AdventureEventAction,player:PlayerINFO,stage:number,{key="",image = ""} = {}){
        const discription = `プレイヤーのSPが${Math.abs(stage)}段階${(stage < 0)?"下がった":"上がった。"}`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
        this.stage = stage;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.doneEvent();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:AdventureEventAreaManager): void {  
        if(!this.player)return;
        if((this.player.SPstage <= -6 && this.stage < 0) || (this.player.SPstage >= 6 && this.stage > 0))return;
        this.player.SPstage += this.stage;
    }
}