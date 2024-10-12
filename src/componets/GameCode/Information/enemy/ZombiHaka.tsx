import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHPHeel, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyHPHeelBattleEventArea } from "../../parts/area/battleEventArea";

class ZombiHakaFire extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "ハッカファイヤー";
        this.power = 65;
        this.mei = 70;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class ZombiHakaThunder extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "ハッカサンダー";
        this.power = 50;
        this.mei = 85;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}

class ZombiHakaLutia extends EnemyMagicalHPHeel{ //TODO ステータス強化コマンドの追加
    initialize(): void {
        this.name = "ハッカルティア";
        this.power = 25;
        //this.key = "fireSlimeTackle"
        //this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}



const ZombiGirlCommands:EnemyPhysicalAttack[] = [
    new ZombiHakaFire(),
    new ZombiHakaThunder(),
    new ZombiHakaLutia(),
]


export class ZombiHaka extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 90;
        this.PAT = 18;
        this.MAT = 38;
        this.PDF = 16;
        this.MDF = 35;
        this.SP = 10;
        this.exp = 5;
        this.name = "墓ゾンビ";
    
        this.candidatePCommands = [
            new EnemyProbCommand([ZombiGirlCommands[0],ZombiGirlCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([ZombiGirlCommands[0],ZombiGirlCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([ZombiGirlCommands[1],ZombiGirlCommands[2]],{prob:[70,30]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        this.key = "zombiHaka"
        this.scene.load.image(this.key,"/assets/enemy/zombiHaka/戦闘.png");
    }
    genPComand(): ProbCommand {
        return this.candidatePCommands[Math.floor(Math.random()*this.candidatePCommands.length)];
    }
}

