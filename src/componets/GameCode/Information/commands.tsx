import { calDamage, calHit } from "../functions/damage";
import { AdventureEventArea, CancelTransformAdventureEventArea, HPHeelAdventureEventArea, NormalAdventureEventArea, TransformAdventureEventArea, UseItemAdventureEventArea } from "../parts/area/adventureEventArea";
import { BattleEventArea, CancelTransformBattleEventArea, EPABattleEventArea, EPAShieldBattleEventArea, HPHeelBattleEventArea, MPHeelBattleEventArea, NormalBattleEventArea, PMABattleEventArea, PPABattleEventArea, ShieldBattleEventArea, ShieldBreakBattleEventArea, TransformBattleEventArea, UseItemBattleEventArea } from "../parts/area/battleEventArea";
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
        const damage:number = calDamage(status.status.PAT,battle.enemy.PDF,this.power);
        if(calHit(status.status.SP,battle.enemy.SP,this.mei)){
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
        const damage:number = calDamage(battle.enemy.PAT,status.status.PDF,this.power);
        const hitShield = battle.player.Shield?.selectShield();
        if(hitShield){
            ans.push(new EPAShieldBattleEventArea(scene,hitShield,damage));
            if(hitShield.HP <= damage){
                ans.push(new NormalBattleEventArea(scene,`${hitShield.name}は崩壊した`));
            }
        }else if(calHit(battle.enemy.SP,status.status.SP,this.mei)){
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
        ans.push(new NormalBattleEventArea(scene,`プレイヤーの${this.name}!`));
        const status = battle.player.getBattleStatus();
        const damage:number = calDamage(status.status.MAT,battle.enemy.MDF,this.power);
        if(this.mp > status.MP){
            ans.push(new NormalBattleEventArea(scene,`しかしMPが足りなかった！`));
        }else if(!battle.player.isTransform()){
            ans.push(new NormalBattleEventArea(scene,`しかしあなたは魔法少女ではないので魔法が発動できなかった！`));
        }else if(calHit(status.status.SP,battle.enemy.SP,this.mei)){
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

export abstract class EnemyMagicalAttack extends Command {
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!battle.enemy)return[];
        let ans:BattleEventArea[] = []
        ans.push(new NormalBattleEventArea(scene,`${battle.enemy.name}の${this.name}!`));
        const status = battle.player.getBattleStatus();
        const damage:number = calDamage(battle.enemy.MAT,status.status.MDF,this.power);
        if(calHit(battle.enemy.SP,status.status.SP,this.mei)){
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
        return []
    }
}

export abstract class PlayerMagicalShield extends Command {
    shield?:Shield;
    doBattleCommand(battle:BattleScene,scene:BattleEventAction): BattleEventArea[] {
        if(!battle.player)return[];
        if(!this.shield)return[];
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
            ans.push(new ShieldBattleEventArea(scene,battle.player,this.mp,this.shield))
        }
        return ans;
    }
    doAdventureCommand(battle: AdventureScene, scene: AdventureEventAction): AdventureEventArea[] {
        return []
    }
}