import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";

class RockSlimeAttack extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "転がる";
        this.power = 50;
        this.mei = 80;
    }
}

class RockSlimeShot extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "ロックショット";
        this.power = 50;
        this.mei = 90;
    }
}

class RockSlimeEdge extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "ロックエッジ";
        this.power = 80;
        this.mei = 60;
    }
}



const BattleSlimeCommands:EnemyPhysicalAttack[] = [
    new RockSlimeAttack(),
    new RockSlimeShot(),
    new RockSlimeEdge(),
]


export class RockSlime extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 55;
        this.PAT = 5;
        this.MAT = 15;
        this.PDF = 24;
        this.MDF = 31;
        this.SP = 5;
        this.exp = 3;
        this.name = "ロックスライム";
    
        this.candidatePCommands = [
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[45,55]}),
            new EnemyProbCommand([BattleSlimeCommands[1],BattleSlimeCommands[2]],{prob:[70,30]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        this.key = "rockSlime"
        this.scene.load.image(this.key,"/assets/enemy/rockSlime/戦闘.png");
    }
    genPComand(): ProbCommand {
        return this.candidatePCommands[Math.floor(Math.random()*this.candidatePCommands.length)];
    }
}

