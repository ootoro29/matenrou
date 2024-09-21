import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHPHeel, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyHPHeelBattleEventArea } from "../../parts/area/battleEventArea";

class FairyBomb extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "フェアリーボム";
        this.power = 60;
        this.mei = 85;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class FairyBeam extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "フェアリービーム";
        this.power = 50;
        this.mei = 90;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class FairyTalk extends EnemyMagicalAttack{
    initialize(): void {// 攻撃力or防御力 DOWN
        this.name = "妖精のささやき";
        this.power = 25;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}



const ZombiGirlCommands:EnemyPhysicalAttack[] = [
    new FairyBomb(),
    new FairyBeam(),
    new FairyTalk(),
]


export class FairySana extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 68;
        this.PAT = 16;
        this.MAT = 34;
        this.PDF = 37;
        this.MDF = 44;
        this.SP = 30;
        this.exp = 8;
        this.name = "妖精サナ";
    
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

