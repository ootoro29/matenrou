import { wrap } from "module";
import { Area, EventArea } from "../area";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";
import { areaManager } from "../areaManager";
import BattleEventAction from "../../scenes/actions/battleEventAction";
import { Enemy } from "../../Information/enemy/enemy";
import PlayerINFO from "../../Information/playerInformation";
import { Item } from "../../Information/item/item";
import { Shield } from "../../Information/shield/shield";

export class BattleEventAreaManager extends areaManager{
    AreaList?:BattleEventArea[];
    index = -1;
    constructor(AreaList:BattleEventArea[]){
        super(AreaList);
        this.nextArea();
    }
    currentArea():BattleEventArea | null{
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


export abstract class BattleEventArea extends EventArea{
    parents?:BattleEventAction;
    constructor(scene:BattleEventAction,discription:string,{key="",image = ""} = {}){
        super(scene,discription,{key:key,image:image});
    }
    abstract genSelections(): string[];
    abstract opeClick(click:number): void;
    abstract appearance(AM:BattleEventAreaManager): void;
}

export class NormalBattleEventArea extends BattleEventArea {
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
                //this.parents.scene.start("battleThinking",{main:this.parents.MAIN,battle:this.parents.Parents});
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {
        
    }
}

export class GAMEOVERBattleEventArea extends BattleEventArea {
    constructor(scene:BattleEventAction,{key="",image = ""} = {}){
        const discription = "GAME OVER";
        super(scene,discription,{key:key,image:image});
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.GAMEOVER();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {
        
    }
}

export class YOUWINBattleEventArea extends BattleEventArea {
    constructor(scene:BattleEventAction,{key="",image = ""} = {}){
        const discription = "YOU WIN";
        super(scene,discription,{key:key,image:image});
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.YOUWIN();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {
        
    }
}


export class PPABattleEventArea extends BattleEventArea {
    damage:number = 0;
    enemy?:Enemy;
    constructor(scene:BattleEventAction,enemy:Enemy,damage:number,{key="",image = ""} = {}){
        const discription = `${enemy.name}は${damage}のダメージ！`;
        super(scene,discription,{key:key,image:image});
        this.damage = damage;
        this.enemy = enemy;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {
        if(!this.enemy)return;
        this.enemy.HP -= this.damage;
    }
}

export class PMABattleEventArea extends BattleEventArea {
    damage:number = 0;
    enemy?:Enemy;
    player?:PlayerINFO;
    mp:number = 0;
    constructor(scene:BattleEventAction,player:PlayerINFO,enemy:Enemy,damage:number,mp:number,{key="",image = ""} = {}){
        const discription = `${enemy.name}は${damage}のダメージ！`;
        super(scene,discription,{key:key,image:image});
        this.damage = damage;
        this.enemy = enemy;
        this.mp = mp;
        this.player = player;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {
        if(!this.enemy)return;
        if(!this.player)return;
        this.player.changeMP(-this.mp);
        this.enemy.HP -= this.damage;
    }
}

export class EPABattleEventArea extends BattleEventArea {
    damage:number = 0;
    player?:PlayerINFO;
    constructor(scene:BattleEventAction,player:PlayerINFO,damage:number,{key="",image = ""} = {}){
        const discription = `プレイヤーは${damage}のダメージ！`;
        super(scene,discription,{key:key,image:image});
        this.damage = damage;
        this.player = player;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {
        if(!this.player)return;
        this.player.damage(this.damage);
    }
}

export class EPAShieldBattleEventArea extends BattleEventArea {
    damage:number = 0;
    shield?:Shield;
    constructor(scene:BattleEventAction,shield:Shield,damage:number,{key="",image = ""} = {}){
        const discription = `${shield.name}で防いだ。${shield.name}に${damage}の損傷！`;
        super(scene,discription,{key:key,image:image});
        this.damage = damage;
        this.shield = shield;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {
        if(!this.shield)return;
        this.shield.HP -= this.damage;
    }
}
export class ShieldBreakBattleEventArea extends BattleEventArea {
    shields?:Shield[];
    index:number = 0;
    constructor(scene:BattleEventAction,shields:Shield[],index:number,{key="",image = ""} = {}){
        const discription = `${shields[index].name}は崩壊した。`;
        super(scene,discription,{key:key,image:image});
        this.shields = shields;
        this.index = index;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {
        if(!this.shields)return;
        this.shields = [... this.shields.slice(0,this.index),... this.shields.slice(this.index+1,this.shields.length) ]
    }
}

export class GetEXPBattleEventArea extends BattleEventArea {
    exp:number = 0;
    player?:PlayerINFO;
    constructor(scene:BattleEventAction,player:PlayerINFO,exp:number,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {
        if(!this.player)return;
        const result = this.player.getExp(this.exp);
        this.discription += result;
        if(!this.text || !this.discription)return;
        this.text?.setText(this.discription);
    }
}

export class TransformBattleEventArea extends BattleEventArea {
    player?:PlayerINFO;
    mp = 0;
    constructor(scene:BattleEventAction,player:PlayerINFO,mp:number,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        this.player.changeMP(-this.mp);
        this.player.transform = true;      
    }
}
export class CancelTransformBattleEventArea extends BattleEventArea {
    player?:PlayerINFO;
    mp = 0;
    constructor(scene:BattleEventAction,player:PlayerINFO,mp:number,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        this.player.changeMP(-this.mp);
        this.player.resetCP();
        this.player.transform = false;      
    }
}

export class BreakTransformBattleEventArea extends BattleEventArea {
    player?:PlayerINFO;
    constructor(scene:BattleEventAction,player:PlayerINFO,{key="",image = ""} = {}){
        const discription = `プレイヤーの魔法少女の変身が崩壊した！`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        this.player.transform = false;      
    }
}

export class HPHeelBattleEventArea extends BattleEventArea {
    player?:PlayerINFO;
    hp = 0;
    constructor(scene:BattleEventAction,player:PlayerINFO,hp:number,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        this.player.heelHP(this.hp);
    }
}

export class MPHeelBattleEventArea extends BattleEventArea {
    player?:PlayerINFO;
    mp = 0;
    constructor(scene:BattleEventAction,player:PlayerINFO,mp:number,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        this.player.changeMP(this.mp);
    }
}

export class UseItemBattleEventArea extends BattleEventArea {
    item?:Item
    constructor(scene:BattleEventAction,item:Item,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void { 
        if(!this.item)return;
        this.item.count--;
    }
}

export class ShieldBattleEventArea extends BattleEventArea {
    player?:PlayerINFO;
    mp = 0;
    shield:Shield;
    constructor(scene:BattleEventAction,player:PlayerINFO,mp:number,shield:Shield,{key="",image = ""} = {}){
        const discription = `プレイヤーは${shield.name}を展開する！`;
        super(scene,discription,{key:key,image:image});
        this.player = player;
        this.mp = mp;
        this.shield = shield;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        this.player.changeMP(-this.mp);
        this.player.Shield?.setShield(this.shield);      
    }
}

export class EnemyHPHeelBattleEventArea extends BattleEventArea {
    delta:number = 0;
    enemy?:Enemy;
    constructor(scene:BattleEventAction,enemy:Enemy,delta:number,{key="",image = ""} = {}){
        const discription = `${enemy.name}は${delta}の回復！`;
        super(scene,discription,{key:key,image:image});
        this.delta = delta;
        this.enemy = enemy;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {
        if(!this.enemy)return;
        this.enemy.HP += this.delta;
        if(this.enemy.HP > this.enemy.HP_MAX)this.enemy.HP = this.enemy.HP_MAX;
    }
}

export class EnemyBattlePATStageChange extends BattleEventArea {
    enemy?:Enemy;
    stage = 0;
    constructor(scene:BattleEventAction,enemy:Enemy,stage:number,{key="",image = ""} = {}){
        const discription = `${enemy.name}のPATが${Math.abs(stage)}段階${(stage < 0)?"下がった":"上がった。"}`;
        super(scene,discription,{key:key,image:image});
        this.enemy = enemy;
        this.stage = stage;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.enemy)return;
        if((this.enemy.PATstage <= -6 && this.stage < 0) || (this.enemy.PATstage >= 6 && this.stage > 0))return;
        this.enemy.PATstage += this.stage;
    }
}
export class EnemyBattleMATStageChange extends BattleEventArea {
    enemy?:Enemy;
    stage = 0;
    constructor(scene:BattleEventAction,enemy:Enemy,stage:number,{key="",image = ""} = {}){
        const discription = `${enemy.name}のMATが${Math.abs(stage)}段階${(stage < 0)?"下がった":"上がった。"}`;
        super(scene,discription,{key:key,image:image});
        this.enemy = enemy;
        this.stage = stage;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.enemy)return;
        if((this.enemy.MATstage <= -6 && this.stage < 0) || (this.enemy.MATstage >= 6 && this.stage > 0))return;
        this.enemy.MATstage += this.stage;
    }
}

export class EnemyBattlePDFStageChange extends BattleEventArea {
    enemy?:Enemy;
    stage = 0;
    constructor(scene:BattleEventAction,enemy:Enemy,stage:number,{key="",image = ""} = {}){
        const discription = `${enemy.name}のPDFが${Math.abs(stage)}段階${(stage < 0)?"下がった":"上がった。"}`;
        super(scene,discription,{key:key,image:image});
        this.enemy = enemy;
        this.stage = stage;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.enemy)return;
        if((this.enemy.PDFstage <= -6 && this.stage < 0) || (this.enemy.PDFstage >= 6 && this.stage > 0))return;
        this.enemy.PDFstage += this.stage;
    }
}
export class EnemyBattleMDFStageChange extends BattleEventArea {
    enemy?:Enemy;
    stage = 0;
    constructor(scene:BattleEventAction,enemy:Enemy,stage:number,{key="",image = ""} = {}){
        const discription = `${enemy.name}のMDFが${Math.abs(stage)}段階${(stage < 0)?"下がった":"上がった。"}`;
        super(scene,discription,{key:key,image:image});
        this.enemy = enemy;
        this.stage = stage;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.enemy)return;
        if((this.enemy.MDFstage <= -6 && this.stage < 0) || (this.enemy.MDFstage >= 6 && this.stage > 0))return;
        this.enemy.MDFstage += this.stage;
    }
}
export class EnemyBattleSPStageChange extends BattleEventArea {
    enemy?:Enemy;
    stage = 0;
    constructor(scene:BattleEventAction,enemy:Enemy,stage:number,{key="",image = ""} = {}){
        const discription = `${enemy.name}のSPが${Math.abs(stage)}段階${(stage < 0)?"下がった":"上がった。"}`;
        super(scene,discription,{key:key,image:image});
        this.enemy = enemy;
        this.stage = stage;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.enemy)return;
        if((this.enemy.SPstage <= -6 && this.stage < 0) || (this.enemy.SPstage >= 6 && this.stage > 0))return;
        this.enemy.SPstage += this.stage;
    }
}


export class PlayerBattlePATStageChange extends BattleEventArea {
    player?:PlayerINFO;
    stage = 0;
    constructor(scene:BattleEventAction,player:PlayerINFO,stage:number,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        if((this.player.PATstage <= -6 && this.stage < 0) || (this.player.PATstage >= 6 && this.stage > 0))return;
        this.player.PATstage += this.stage;
    }
}
export class PlayerBattleMATStageChange extends BattleEventArea {
    player?:PlayerINFO;
    stage = 0;
    constructor(scene:BattleEventAction,player:PlayerINFO,stage:number,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        if((this.player.MATstage <= -6 && this.stage < 0) || (this.player.MATstage >= 6 && this.stage > 0))return;
        this.player.MATstage += this.stage;
    }
}

export class PlayerBattlePDFStageChange extends BattleEventArea {
    player?:PlayerINFO;
    stage = 0;
    constructor(scene:BattleEventAction,player:PlayerINFO,stage:number,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        if((this.player.PDFstage <= -6 && this.stage < 0) || (this.player.PDFstage >= 6 && this.stage > 0))return;
        this.player.PDFstage += this.stage;
    }
}
export class PlayerBattleMDFStageChange extends BattleEventArea {
    player?:PlayerINFO;
    stage = 0;
    constructor(scene:BattleEventAction,player:PlayerINFO,stage:number,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        if((this.player.MDFstage <= -6 && this.stage < 0) || (this.player.MDFstage >= 6 && this.stage > 0))return;
        this.player.MDFstage += this.stage;
    }
}
export class PlayerBattleSPStageChange extends BattleEventArea {
    player?:PlayerINFO;
    stage = 0;
    constructor(scene:BattleEventAction,player:PlayerINFO,stage:number,{key="",image = ""} = {}){
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
                this.parents.nextEventTurn();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
    appearance(AM:BattleEventAreaManager): void {  
        if(!this.player)return;
        if((this.player.SPstage <= -6 && this.stage < 0) || (this.player.SPstage >= 6 && this.stage > 0))return;
        this.player.SPstage += this.stage;
    }
}