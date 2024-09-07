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
    }
}

class FireSlimeShot extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "マグマショット";
        this.power = 50;
        this.mei = 90;
    }
}

class FireSlimeTackle extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "マグマタックル";
        this.power = 40;
        this.mei = 90;
    }
}



const BattleSlimeCommands:EnemyPhysicalAttack[] = [
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
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[45,55]}),
            new EnemyProbCommand([BattleSlimeCommands[1],BattleSlimeCommands[2]],{prob:[70,30]}),
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

