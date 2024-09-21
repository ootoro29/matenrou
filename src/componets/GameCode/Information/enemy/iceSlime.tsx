import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";

class IceSlimeIceBlock extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "氷塊";
        this.power = 70;
        this.mei = 60;
        this.key = "iceSlimeIceBlock"
        this.path = "/assets/enemy/iceSlime/氷塊.png";
    }
}

class IceSlimeShot extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "アイスショット";
        this.power = 50;
        this.mei = 90;
        this.key = "iceSlimeShot"
        this.path = "/assets/enemy/iceSlime/アイスショット.png";
    }
}

class IceSlimeBahn extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "アイスバーン";
        this.power = 40;
        this.mei = 90;
        this.key = "iceSlimeBahn"
        this.path = "/assets/enemy/iceSlime/アイスバーン.png";
    }
}



const IceSlimeCommands:EnemyPhysicalAttack[] = [
    new IceSlimeIceBlock(),
    new IceSlimeShot(),
    new IceSlimeBahn(),
]


export class IceSlime extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 45;
        this.PAT = 6;
        this.MAT = 14;
        this.PDF = 16;
        this.MDF = 20;
        this.SP = 5;
        this.exp = 3;
        this.name = "アイスライム";
    
        this.candidatePCommands = [
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[1]],{prob:[45,55]}),
            new EnemyProbCommand([IceSlimeCommands[1],IceSlimeCommands[2]],{prob:[70,30]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        this.key = "iceSlime"
        this.scene.load.image(this.key,"/assets/enemy/iceSlime/戦闘.png");
    }
    genPComand(): ProbCommand {
        return this.candidatePCommands[Math.floor(Math.random()*this.candidatePCommands.length)];
    }
}

