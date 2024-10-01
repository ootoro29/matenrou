import { CommandAttribute } from "@/types/game";
import { calDamage, calHit } from "../functions/damage";
import { AdventureEventArea, CancelTransformAdventureEventArea, HPHeelAdventureEventArea, MPHeelAdventureEventArea, NormalAdventureEventArea, PlayerAdventureMATStageChange, PlayerAdventureMDFStageChange, PlayerAdventurePATStageChange, PlayerAdventurePDFStageChange, PlayerAdventureSPStageChange, TransformAdventureEventArea, UseItemAdventureEventArea } from "../parts/area/adventureEventArea";
import { BattleEventArea, CancelTransformBattleEventArea, EnemyBattleMATStageChange, EnemyBattleMDFStageChange, EnemyBattlePATStageChange, EnemyBattlePDFStageChange, EnemyBattleSPStageChange, EnemyHPHeelBattleEventArea, EnemyIshisuPray, EPABattleEventArea, EPAShieldBattleEventArea, HPHeelBattleEventArea, MPHeelBattleEventArea, NormalBattleEventArea, PlayerBattleIsLock, PlayerBattleMATStageChange, PlayerBattleMDFStageChange, PlayerBattlePATStageChange, PlayerBattlePDFStageChange, PlayerBattleSPStageChange, PMABattleEventArea, PPABattleEventArea, ShieldBattleEventArea, ShieldBreakBattleEventArea, TransformBattleEventArea, UseItemBattleEventArea } from "../parts/area/battleEventArea";
import AdventureEventAction from "../scenes/actions/adventureEventAction";
import BattleEventAction from "../scenes/actions/battleEventAction";
import AdventureScene from "../scenes/adventure";
import BattleScene from "../scenes/battle";
import { Shield } from "./shield/shield";

export abstract class Command{
    name = "";
    description = "";
    power = 0;
    mei = 0;
    key = "";
    mp = 0;
    path = "";
    type:CommandAttribute = "None";
    image?:Phaser.GameObjects.Image;
    constructor(){
        this.initialize();
    }
    load(scene:BattleEventAction){
        if(this.key != ""){
            scene.load.image(this.key,this.path);
        }
    }
    abstract initialize():void;
    abstract doBattleCommand(battle:BattleScene,scene:BattleEventAction):BattleEventArea[];
    abstract doAdventureCommand(adventure:AdventureScene,scene:AdventureEventAction):AdventureEventArea[];
}

export abstract class PlayerMagicCommand extends Command{
}




export abstract class PlayerPhysicalAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(battle.player.transform){
            imageInfo = {key:`${this.key}transform`,image:`${this.path}(魔法少女).png`};
        }
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`,imageInfo));
        
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = calDamage(status.status.PAT,Estatus.PDF,this.power);
        if(calHit(status.status.SP,Estatus.SP,this.mei,false)){
            ans.push(new PPABattleEventArea(scene,battle.enemy,damage));
        }else{
            ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}は回避した!`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyPhysicalAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        if(!battle.player.Shield)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`,{key:this.key,image:this.path}));
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = calDamage(Estatus.PAT,status.status.PDF,this.power);
        const Sdamage:number = calDamage(Estatus.MAT,battle.player.transform_status.PDF,this.power);
        const hitShield = battle.player.Shield?.selectShield();
        if(hitShield){
            ans.push(new EPAShieldBattleEventArea(scene,hitShield,Sdamage));
            if(hitShield.HP <= Sdamage){
                ans.push(new NormalBattleEventArea(scene,`${hitShield.name}は崩壊した`));
            }
        }else if(calHit(Estatus.SP,status.status.SP,this.mei,battle.player.isLock())){
            let imageInfo = {key:"playerdamage",image:"/assets/player/被弾.png"};
            if(battle.player.transform){
                imageInfo = {key:"playerdamagetransform",image:"/assets/player/被弾(魔法少女).png"};
            }
            ans.push(new EPABattleEventArea(scene,battle.player,damage,imageInfo));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは回避した!`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class PlayerMagicalAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`,imageInfo));
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = calDamage(status.status.MAT,Estatus.MDF,this.power);
        if(this.mp > status.MP){
            ans.push(new NormalBattleEventArea(scene,`しかしMPが足りなかった！`));
        }else if(!battle.player.isTransform()){
            ans.push(new NormalBattleEventArea(scene,`しかしあなたは魔法少女ではないので魔法が発動できなかった！`));
        }else if(calHit(status.status.SP,Estatus.SP,this.mei,false)){
            ans.push(new PMABattleEventArea(scene,battle.player,battle.enemy,damage,this.mp));
        }else{
            ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}は回避した!`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class PlayerMagicalAndPATAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`,imageInfo));
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = calDamage(status.status.MAT,Estatus.MDF,this.power);
        if(this.mp > status.MP){
            ans.push(new NormalBattleEventArea(scene,`しかしMPが足りなかった！`));
        }else if(!battle.player.isTransform()){
            ans.push(new NormalBattleEventArea(scene,`しかしあなたは魔法少女ではないので魔法が発動できなかった！`));
        }else if(calHit(status.status.SP,Estatus.SP,this.mei,false)){
            ans.push(new PMABattleEventArea(scene,battle.player,battle.enemy,damage,this.mp));
            if(Math.random()*100 < 15)ans.push(new EnemyBattlePATStageChange(scene,battle.enemy,-1));
        }else{
            ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}は回避した!`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class PlayerMagicalAndMATAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`,imageInfo));
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = calDamage(status.status.MAT,Estatus.MDF,this.power);
        if(this.mp > status.MP){
            ans.push(new NormalBattleEventArea(scene,`しかしMPが足りなかった！`));
        }else if(!battle.player.isTransform()){
            ans.push(new NormalBattleEventArea(scene,`しかしあなたは魔法少女ではないので魔法が発動できなかった！`));
        }else if(calHit(status.status.SP,Estatus.SP,this.mei,false)){
            ans.push(new PMABattleEventArea(scene,battle.player,battle.enemy,damage,this.mp));
            if(Math.random()*100 < 15)ans.push(new EnemyBattleMATStageChange(scene,battle.enemy,-1));
        }else{
            ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}は回避した!`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class PlayerMagicalAndPDFAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`,imageInfo));
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = calDamage(status.status.MAT,Estatus.MDF,this.power);
        if(this.mp > status.MP){
            ans.push(new NormalBattleEventArea(scene,`しかしMPが足りなかった！`));
        }else if(!battle.player.isTransform()){
            ans.push(new NormalBattleEventArea(scene,`しかしあなたは魔法少女ではないので魔法が発動できなかった！`));
        }else if(calHit(status.status.SP,Estatus.SP,this.mei,false)){
            ans.push(new PMABattleEventArea(scene,battle.player,battle.enemy,damage,this.mp));
            if(Math.random()*100 < 15)ans.push(new EnemyBattlePDFStageChange(scene,battle.enemy,-1));
        }else{
            ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}は回避した!`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class PlayerMagicalAndMDFAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`,imageInfo));
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = calDamage(status.status.MAT,Estatus.MDF,this.power);
        if(this.mp > status.MP){
            ans.push(new NormalBattleEventArea(scene,`しかしMPが足りなかった！`));
        }else if(!battle.player.isTransform()){
            ans.push(new NormalBattleEventArea(scene,`しかしあなたは魔法少女ではないので魔法が発動できなかった！`));
        }else if(calHit(status.status.SP,Estatus.SP,this.mei,false)){
            ans.push(new PMABattleEventArea(scene,battle.player,battle.enemy,damage,this.mp));
            if(Math.random()*100 < 15)ans.push(new EnemyBattleMDFStageChange(scene,battle.enemy,-1));
        }else{
            ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}は回避した!`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class PlayerMagicalAndSPAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`,imageInfo));
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = calDamage(status.status.MAT,Estatus.MDF,this.power);
        if(this.mp > status.MP){
            ans.push(new NormalBattleEventArea(scene,`しかしMPが足りなかった！`));
        }else if(!battle.player.isTransform()){
            ans.push(new NormalBattleEventArea(scene,`しかしあなたは魔法少女ではないので魔法が発動できなかった！`));
        }else if(calHit(status.status.SP,Estatus.SP,this.mei,false)){
            ans.push(new PMABattleEventArea(scene,battle.player,battle.enemy,damage,this.mp));
            if(Math.random()*100 < 15)ans.push(new EnemyBattleSPStageChange(scene,battle.enemy,-1));
        }else{
            ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}は回避した!`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyMagicalAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = calDamage(Estatus.MAT,status.status.MDF,this.power);
        const Sdamage:number = calDamage(Estatus.MAT,battle.player.transform_status.MDF,this.power);
        const hitShield = battle.player.Shield?.selectShield();
        if(hitShield){
            ans.push(new EPAShieldBattleEventArea(scene,hitShield,Sdamage));
            if(hitShield.HP <= Sdamage){
                ans.push(new NormalBattleEventArea(scene,`${hitShield.name}は崩壊した`));
            }
        }else if(calHit(Estatus.SP,status.status.SP,this.mei,battle.player.isLock())){
            let imageInfo = {key:"playerdamage",image:"/assets/player/被弾.png"};
            if(battle.player.transform){
                imageInfo = {key:"playerdamagetransform",image:"/assets/player/被弾(魔法少女).png"};
            }
            ans.push(new EPABattleEventArea(scene,battle.player,damage,imageInfo));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは回避した!`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyMagicalHPHeel extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        ans.push(new EnemyHPHeelBattleEventArea(scene,battle.enemy,this.power));
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class Transform extends PlayerMagicCommand {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`));
        const status = battle.player.getBattleStatus();
        if(this.mp <= status.MP){
            if(battle.player.transform){
                ans.push(new NormalBattleEventArea(scene,`たが君には既に魔法少女なので変身する必要が無い！`));
            }else{
                
                ans.push(new TransformBattleEventArea(scene,battle.player,this.mp));
            }
        }else{
            ans.push(new NormalBattleEventArea(scene,`しかし魔力が足りない！`));
        }
        return ans;
    }
    doAdventureCommand(adventure: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        if(!adventure.player)return[];
        let ans:AdventureEventArea[] = []
        ans.push(new NormalAdventureEventArea(scene,`プレイヤーの${this.name}!`));
        const status = adventure.player.getBattleStatus();
        if(this.mp <= status.MP){
            if(adventure.player.transform){
                ans.push(new NormalAdventureEventArea(scene,`たが君には既に魔法少女なので変身する必要が無い！`));
            }else{
                ans.push(new TransformAdventureEventArea(scene,adventure.player,this.mp));
            }
        }else{
            ans.push(new NormalAdventureEventArea(scene,`しかし魔力が足りない！`));
        }
        return ans;
    }
}

export abstract class CancelTransform extends PlayerMagicCommand {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`));
        const status = battle.player.getBattleStatus();
        if(this.mp <= status.MP){
            if(!battle.player.transform){
                ans.push(new NormalBattleEventArea(scene,`…そもそも君は魔法少女ではない`));
            }else{
                ans.push(new CancelTransformBattleEventArea(scene,battle.player,this.mp));
            }
        }else{
            ans.push(new NormalBattleEventArea(scene,`しかし魔力が足りない！`));
        }
        return ans;
    }
    doAdventureCommand(adventure: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        if(!adventure.player)return[];
        let ans:AdventureEventArea[] = []
        ans.push(new NormalAdventureEventArea(scene,`プレイヤーの${this.name}!`));
        const status = adventure.player.getBattleStatus();
        if(this.mp <= status.MP){
            if(!adventure.player.transform){
                ans.push(new NormalAdventureEventArea(scene,`…そもそも君は魔法少女ではない`));
            }else{
                ans.push(new CancelTransformAdventureEventArea(scene,adventure.player,this.mp));
            }
        }else{
            ans.push(new NormalAdventureEventArea(scene,`しかし魔力が足りない！`));
        }
        return ans;
    }
}

export abstract class PlayerItemHPHeel extends Command {
    index = -1;
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemBattleEventArea(scene,item));
            ans.push(new HPHeelBattleEventArea(scene,battle.player,this.power));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalBattleEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
    doAdventureCommand(adventure: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        if(!adventure.player)return[];
        let item = adventure.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:AdventureEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemAdventureEventArea(scene,item));
            ans.push(new HPHeelAdventureEventArea(scene,adventure.player,this.power));
        }else{
            ans.push(new NormalAdventureEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalAdventureEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
}

export abstract class PlayerItemMPHeel extends Command {
    index = -1;
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemBattleEventArea(scene,item));
            ans.push(new MPHeelBattleEventArea(scene,battle.player,this.power));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalBattleEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:AdventureEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemAdventureEventArea(scene,item));
            ans.push(new MPHeelAdventureEventArea(scene,battle.player,this.power));
        }else{
            ans.push(new NormalAdventureEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalAdventureEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
}

export abstract class PlayerMagicalShield extends Command {
    shield?:Shield;
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`));
        const status = battle.player.getBattleStatus();
        if(this.mp > status.MP){
            ans.push(new NormalBattleEventArea(scene,`しかしMPが足りなかった！`));
        }else if(!battle.player.isTransform()){
            ans.push(new NormalBattleEventArea(scene,`しかしあなたは魔法少女ではないので魔法が発動できなかった！`));
        }else if(!battle.player.Shield?.canSetShield()){
            ans.push(new NormalBattleEventArea(scene,`しかしシールドはこれ以上展開できない！`));
        }else{
            ans.push(new ShieldBattleEventArea(scene,battle.player,this.mp,this.genSheild()))
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
    abstract genSheild():Shield;
}

export abstract class EnemyMagicalPATAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        ans.push(new PlayerBattlePATStageChange(scene,battle.player,-1));
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyMagicalMATAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        ans.push(new PlayerBattleMATStageChange(scene,battle.player,-1));
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyMagicalPDFAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        ans.push(new PlayerBattlePDFStageChange(scene,battle.player,-1));
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyMagicalMDFAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        ans.push(new PlayerBattleMDFStageChange(scene,battle.player,-1));
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyMagicalSPAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        ans.push(new PlayerBattleSPStageChange(scene,battle.player,-1));
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyMagicalLockSPAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        ans.push(new PlayerBattleSPStageChange(scene,battle.player,-1));
        ans.push(new PlayerBattleIsLock(scene,battle.player));
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyMagicalHPSuc extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = Math.floor(battle.player.HP*0.2);
        const hitShield = battle.player.Shield?.selectShield();
        const Sdamage:number = damage;
        if(hitShield){
            ans.push(new EPAShieldBattleEventArea(scene,hitShield,Sdamage));
            if(hitShield.HP <= Sdamage){
                ans.push(new NormalBattleEventArea(scene,`${hitShield.name}は崩壊した`));
            }
            ans.push(new EnemyHPHeelBattleEventArea(scene,battle.enemy,Sdamage));
        }else if(calHit(Estatus.SP,status.status.SP,this.mei,battle.player.isLock())){
            let imageInfo = {key:"playerdamage",image:"/assets/player/被弾.png"};
            if(battle.player.transform){
                imageInfo = {key:"playerdamagetransform",image:"/assets/player/被弾(魔法少女).png"};
            }
            ans.push(new EPABattleEventArea(scene,battle.player,damage,imageInfo));
            ans.push(new EnemyHPHeelBattleEventArea(scene,battle.enemy,damage));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは回避した!`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyMagicalPray extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        const Estatus = battle.enemy.getStatus();
        ans.push(new EnemyIshisuPray(scene,battle.enemy));
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}

export abstract class EnemyMagicalParugoa extends Command {
    doBattleCommand(battle: BattleScene, scene: BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        const level = Math.min(battle.enemy.charge,6);
        battle.enemy.charge = 0;
        const pow = level*25+40;
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}(Lv${level})!`));
        const status = battle.player.getBattleStatus();
        const Estatus = battle.enemy.getStatus();
        const damage:number = calDamage(Estatus.MAT,status.status.MDF,pow);
        const Sdamage:number = calDamage(Estatus.MAT,battle.player.transform_status.MDF,pow);
        battle.player.Shield?.shieldList.map((s) => {
            ans.push(new EPAShieldBattleEventArea(scene,s,Sdamage));
            if(s.HP <= Sdamage){
                ans.push(new NormalBattleEventArea(scene,`${s.name}は崩壊した`));
            }
        })
        if(calHit(Estatus.SP,status.status.SP,this.mei,battle.player.isLock())){
            let imageInfo = {key:"playerdamage",image:"/assets/player/被弾.png"};
            if(battle.player.transform){
                imageInfo = {key:"playerdamagetransform",image:"/assets/player/被弾(魔法少女).png"};
            }
            ans.push(new EPABattleEventArea(scene,battle.player,damage,imageInfo));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは回避した!`));
        }
        return ans;
    }
    doAdventureCommand(adventure: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return [];
    }
}

export abstract class PlayerItemPATUp extends Command {
    index = -1;
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemBattleEventArea(scene,item));
            ans.push(new PlayerBattlePATStageChange(scene,battle.player,1));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalBattleEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:AdventureEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemAdventureEventArea(scene,item));
            ans.push(new PlayerAdventurePATStageChange(scene,battle.player,1));
        }else{
            ans.push(new NormalAdventureEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalAdventureEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
}

export abstract class PlayerItemMATUp extends Command {
    index = -1;
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemBattleEventArea(scene,item));
            ans.push(new PlayerBattleMATStageChange(scene,battle.player,1));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalBattleEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:AdventureEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemAdventureEventArea(scene,item));
            ans.push(new PlayerAdventureMATStageChange(scene,battle.player,1));
        }else{
            ans.push(new NormalAdventureEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalAdventureEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
}

export abstract class PlayerItemPDFUp extends Command {
    index = -1;
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemBattleEventArea(scene,item));
            ans.push(new PlayerBattlePDFStageChange(scene,battle.player,1));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalBattleEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:AdventureEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemAdventureEventArea(scene,item));
            ans.push(new PlayerAdventurePDFStageChange(scene,battle.player,1));
        }else{
            ans.push(new NormalAdventureEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalAdventureEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
}

export abstract class PlayerItemMDFUp extends Command {
    index = -1;
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemBattleEventArea(scene,item));
            ans.push(new PlayerBattleMDFStageChange(scene,battle.player,1));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalBattleEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:AdventureEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemAdventureEventArea(scene,item));
            ans.push(new PlayerAdventureMDFStageChange(scene,battle.player,1));
        }else{
            ans.push(new NormalAdventureEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalAdventureEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
}

export abstract class PlayerItemSPUp extends Command {
    index = -1;
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:BattleEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemBattleEventArea(scene,item));
            ans.push(new PlayerBattleSPStageChange(scene,battle.player,1));
        }else{
            ans.push(new NormalBattleEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalBattleEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        if(!battle.player)return[];
        let item = battle.player.Item?.battleItemList[this.index];
        if(!item)return[];
        let ans:AdventureEventArea[] = []
        let imageInfo = {key:`${this.key}`,image:`${this.path}.png`};
        if(item.count > 0){
            ans.push(new UseItemAdventureEventArea(scene,item));
            ans.push(new PlayerAdventureSPStageChange(scene,battle.player,1));
        }else{
            ans.push(new NormalAdventureEventArea(scene,`プレイヤーは${this.name}を使用した!`));
            ans.push(new NormalAdventureEventArea(scene,`…しかしもう${this.name}を持っていなかった！`));
        }
        return ans;
    }
}
