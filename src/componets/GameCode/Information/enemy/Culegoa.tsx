import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHPHeel, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyHPHeelBattleEventArea } from "../../parts/area/battleEventArea";

class DestoriaBreak extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "デストリアブレイク";
        this.power = 85;
        this.mei = 40;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class Collapse extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "地団駄";
        this.power = 60;
        this.mei = 80;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class CrackInGround extends EnemyMagicalAttack{
    initialize(): void {// 防御力アップ
        this.name = "地割れ";
        this.power = 110;
        this.mei = 10;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}



const ZombiGirlCommands:EnemyPhysicalAttack[] = [
    new DestoriaBreak(),
    new Collapse(),
    new CrackInGround(),
]


export class CuleGoa extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 192;
        this.PAT = 62;
        this.MAT = 47;
        this.PDF = 55;
        this.MDF = 58;
        this.SP = 32;
        this.exp = 18;
        this.name = "クレゴア";
    
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

