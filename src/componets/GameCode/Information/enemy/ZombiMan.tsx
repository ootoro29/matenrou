import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHPHeel, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyHPHeelBattleEventArea } from "../../parts/area/battleEventArea";

class ZombiManSlash extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "切りつけ";
        this.power = 75;
        this.mei = 65;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class ZombiManTackle extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "ゾンビタックル";
        this.power = 60;
        this.mei = 85;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class ZombiManBuildUp extends EnemyMagicalHPHeel{ //TODO ステータス強化コマンドの追加
    initialize(): void {
        this.name = "ビルドアップ";
        this.power = 25;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}



const ZombiGirlCommands:EnemyPhysicalAttack[] = [
    new ZombiManSlash(),
    new ZombiManTackle(),
    new ZombiManBuildUp(),
]


export class ZombiMan extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 60;
        this.PAT = 18;
        this.MAT = 8;
        this.PDF = 14;
        this.MDF = 32;
        this.SP = 6;
        this.exp = 5;
        this.name = "ゾンビマン";
    
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

