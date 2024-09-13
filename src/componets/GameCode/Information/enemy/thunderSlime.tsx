import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";

class ThunderSlimeSpark extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "ライデンタックル";
        this.power = 60;
        this.mei = 80;
        this.key = "thunderSlimeTackle"
        this.path = "/assets/enemy/thunderSlime/雷電タックル.png";
    }
}

class ThunderSlimeShot extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "サンダーショット";
        this.power = 50;
        this.mei = 90;
        this.key = "thunderSlimeShot"
        this.path = "/assets/enemy/thunderSlime/サンダーショット.png";
    }
}

class ThunderSlimeOmegaThunder extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "オメガサンダー";
        this.power = 80;
        this.mei = 60;
        this.key = "thunderSlimeOmegaThunder"
        this.path = "/assets/enemy/thunderSlime/オメガサンダー.png";
    }
}



const BattleSlimeCommands:EnemyPhysicalAttack[] = [
    new ThunderSlimeSpark(),
    new ThunderSlimeShot(),
    new ThunderSlimeOmegaThunder(),
]


export class ThunderSlime extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 35;
        this.PAT = 5;
        this.MAT = 18;
        this.PDF = 16;
        this.MDF = 18;
        this.SP = 16;
        this.exp = 3;
        this.name = "サンダースライム";
    
        this.candidatePCommands = [
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[45,55]}),
            new EnemyProbCommand([BattleSlimeCommands[1],BattleSlimeCommands[2]],{prob:[70,30]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        this.key = "thunderSlime"
        this.scene.load.image(this.key,"/assets/enemy/thunderSlime/戦闘.png");
    }
    genPComand(): ProbCommand {
        return this.candidatePCommands[Math.floor(Math.random()*this.candidatePCommands.length)];
    }
}

