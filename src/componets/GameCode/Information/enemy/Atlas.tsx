import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHPHeel, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyHPHeelBattleEventArea } from "../../parts/area/battleEventArea";

class AtlasBeam extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "アトラス砲";
        this.power = 85;
        this.mei = 40;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class AtlasBeamSaber extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "アトラスサーベル";
        this.power = 60;
        this.mei = 80;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class AtlasDrive extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "アトラスドライブ";
        this.power = 90;
        this.mei = 30;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}



const ZombiGirlCommands:EnemyPhysicalAttack[] = [
    new AtlasBeam(),
    new AtlasBeamSaber(),
    new AtlasDrive(),
]


export class CuleGoa extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 152;
        this.PAT = 52;
        this.MAT = 62;
        this.PDF = 65;
        this.MDF = 64;
        this.SP = 46;
        this.exp = 18;
        this.name = "アトラス";
    
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

