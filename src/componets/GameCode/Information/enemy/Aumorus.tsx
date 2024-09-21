import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHPHeel, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyHPHeelBattleEventArea } from "../../parts/area/battleEventArea";

class PoisonWing extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "グレゴイュウィング";
        this.power = 45;
        this.mei = 90;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class DeepEye extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "深淵の目";
        this.power = 65;
        this.mei = 80;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class SucPower extends EnemyMagicalAttack{
    initialize(): void {// 防御力アップ
        this.name = "吸気";
        this.power = 25;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}



const ZombiGirlCommands:EnemyPhysicalAttack[] = [
    new PoisonWing(),
    new DeepEye(),
    new SucPower(),
]


export class Aumorus extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 124;
        this.PAT = 36;
        this.MAT = 66;
        this.PDF = 68;
        this.MDF = 69;
        this.SP = 35;
        this.exp = 18;
        this.name = "アウモラス";
    
        this.candidatePCommands = [
            new EnemyProbCommand([ZombiGirlCommands[0],ZombiGirlCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([ZombiGirlCommands[0],ZombiGirlCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([ZombiGirlCommands[1],ZombiGirlCommands[2]],{prob:[70,30]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        //this.key = "fireSlime"
        //this.scene.load.image(this.key,"/assets/enemy/fireSlime/戦闘.png");
    }
    genPComand(): ProbCommand {
        return this.candidatePCommands[Math.floor(Math.random()*this.candidatePCommands.length)];
    }
}

