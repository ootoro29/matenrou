import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";

class WindSlimeStorm extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "ストーム";
        this.power = 60;
        this.mei = 80;
    }
}

class WindSlimeCutter extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "ウィンドカッター";
        this.power = 50;
        this.mei = 90;
    }
}

class WindSlimeCyclone extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "サイクロン";
        this.power = 80;
        this.mei = 60;
    }
}



const BattleSlimeCommands:EnemyPhysicalAttack[] = [
    new WindSlimeStorm(),
    new WindSlimeCutter(),
    new WindSlimeCyclone(),
]


export class FireSlime extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 50;
        this.PAT = 5;
        this.MAT = 15;
        this.PDF = 15;
        this.MDF = 15;
        this.SP = 15;
        this.exp = 3;
        this.name = "ウィンドスライム";
    
        this.candidatePCommands = [
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[45,55]}),
            new EnemyProbCommand([BattleSlimeCommands[1],BattleSlimeCommands[2]],{prob:[70,30]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        this.key = "windSlime"
        this.scene.load.image(this.key,"/assets/enemy/windSlime/戦闘.png");
    }
    genPComand(): ProbCommand {
        return this.candidatePCommands[Math.floor(Math.random()*this.candidatePCommands.length)];
    }
}

