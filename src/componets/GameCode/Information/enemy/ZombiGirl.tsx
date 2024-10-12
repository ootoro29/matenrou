import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHPHeel, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyHPHeelBattleEventArea } from "../../parts/area/battleEventArea";

class ZombiGirlSlash extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "切りつけ";
        this.power = 60;
        this.mei = 70;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class ZombiGirlKnife extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "投げナイフ";
        this.power = 40;
        this.mei = 90;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class ZombiGirlHPHeel extends EnemyMagicalHPHeel{
    initialize(): void {
        this.name = "再生";
        this.power = 25;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}



const ZombiGirlCommands:EnemyPhysicalAttack[] = [
    new ZombiGirlSlash(),
    new ZombiGirlKnife(),
    new ZombiGirlHPHeel(),
]


export class ZombiGirl extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 88;
        this.PAT = 30;
        this.MAT = 21;
        this.PDF = 18;
        this.MDF = 32;
        this.SP = 30;
        this.exp = 4;
        this.name = "ゾンビガール";
    
        this.candidatePCommands = [
            new EnemyProbCommand([ZombiGirlCommands[0],ZombiGirlCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([ZombiGirlCommands[0],ZombiGirlCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([ZombiGirlCommands[1],ZombiGirlCommands[2]],{prob:[70,30]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        this.key = "zombiGirl"
        this.scene.load.image(this.key,"/assets/enemy/zombiGirl/戦闘.png");
    }
    genPComand(): ProbCommand {
        return this.candidatePCommands[Math.floor(Math.random()*this.candidatePCommands.length)];
    }
}

