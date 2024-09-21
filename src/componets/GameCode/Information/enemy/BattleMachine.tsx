import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHPHeel, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyHPHeelBattleEventArea } from "../../parts/area/battleEventArea";

class MachineGun extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "マシンガン";
        this.power = 45;
        this.mei = 90;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class GenocideCanon extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "ジェノサイド砲";
        this.power = 65;
        this.mei = 80;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class DefenceMode extends EnemyMagicalAttack{
    initialize(): void {// 防御力アップ
        this.name = "ディフェンスモード";
        this.power = 25;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}



const ZombiGirlCommands:EnemyPhysicalAttack[] = [
    new MachineGun(),
    new GenocideCanon(),
    new DefenceMode(),
]


export class BattleMachine extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 82;
        this.PAT = 56;
        this.MAT = 32;
        this.PDF = 47;
        this.MDF = 38;
        this.SP = 46;
        this.exp = 14;
        this.name = "バトルマシーン";
    
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

