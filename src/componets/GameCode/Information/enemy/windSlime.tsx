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



const WindSlimeCommands:EnemyPhysicalAttack[] = [
    new WindSlimeStorm(),
    new WindSlimeCutter(),
    new WindSlimeCyclone(),
]


export class WindSlime extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 75;
        this.PAT = 10;
        this.MAT = 20;
        this.PDF = 32;
        this.MDF = 22;
        this.SP = 20;
        this.exp = 3;
        this.name = "ウィンドスライム";
    
        this.candidatePCommands = [
            new EnemyProbCommand([WindSlimeCommands[0],WindSlimeCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([WindSlimeCommands[0],WindSlimeCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([WindSlimeCommands[0],WindSlimeCommands[1]],{prob:[45,55]}),
            new EnemyProbCommand([WindSlimeCommands[1],WindSlimeCommands[2]],{prob:[70,30]}),
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

