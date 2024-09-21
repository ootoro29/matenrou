import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHPHeel, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyHPHeelBattleEventArea } from "../../parts/area/battleEventArea";

class GolemArm extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "ゴーレムアーム";
        this.power = 70;
        this.mei = 85;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class GolemCanon extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "グラナイトキャノン";
        this.power = 50;
        this.mei = 90;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class GolemBlessing extends EnemyMagicalAttack{
    initialize(): void {// 防御力アップ
        this.name = "石鎧化";
        this.power = 25;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}



const ZombiGirlCommands:EnemyPhysicalAttack[] = [
    new GolemArm(),
    new GolemCanon(),
    new GolemBlessing(),
]


export class Golem extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 107;
        this.PAT = 42;
        this.MAT = 51;
        this.PDF = 61;
        this.MDF = 58;
        this.SP = 32;
        this.exp = 14;
        this.name = "ゴーレム・クロア";
    
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

