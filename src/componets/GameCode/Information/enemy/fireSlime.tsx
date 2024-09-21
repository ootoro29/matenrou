import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";

class FireSlimeBomb extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "マグマグ爆弾";
        this.power = 70;
        this.mei = 60;
        this.key = "fireSlimeBomb"
        this.path = "/assets/enemy/fireSlime/マグマグ爆弾.png";
    }
}

class FireSlimeShot extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "マグマショット";
        this.power = 50;
        this.mei = 90;
        this.key = "fireSlimeShot"
        this.path = "/assets/enemy/fireSlime/マグマショット.png";
    }
}

class FireSlimeTackle extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "マグマタックル";
        this.power = 40;
        this.mei = 90;
        this.key = "fireSlimeTackle"
        this.path = "/assets/enemy/fireSlime/マグマタックル.png";
    }
}



const FireSlimeCommands:EnemyPhysicalAttack[] = [
    new FireSlimeTackle(),
    new FireSlimeShot(),
    new FireSlimeBomb(),
]


export class FireSlime extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 45;
        this.PAT = 8;
        this.MAT = 10;
        this.PDF = 24;
        this.MDF = 12;
        this.SP = 6;
        this.exp = 3;
        this.name = "マグマスライム";
    
        this.candidatePCommands = [
            new EnemyProbCommand([FireSlimeCommands[0],FireSlimeCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([FireSlimeCommands[0],FireSlimeCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([FireSlimeCommands[0],FireSlimeCommands[1]],{prob:[45,55]}),
            new EnemyProbCommand([FireSlimeCommands[1],FireSlimeCommands[2]],{prob:[70,30]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        this.key = "fireSlime"
        this.scene.load.image(this.key,"/assets/enemy/fireSlime/戦闘.png");
    }
    genPComand(): ProbCommand {
        return this.candidatePCommands[Math.floor(Math.random()*this.candidatePCommands.length)];
    }
}

