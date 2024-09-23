import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";

class BattleSlimeSlash extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "斬りつけ";
        this.power = 50;
        this.mei = 50;
        this.key = "battleSlimeSlash"
        this.path = "/assets/enemy/battleSlime/斬りつけ.png";
    }
}

class BattleSlimeTackle extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "タックル";
        this.power = 30;
        this.mei = 80;
        this.key = "battleSlimeTackle"
        this.path = "/assets/enemy/battleSlime/タックル.png";
    }
}



const BattleSlimeCommands:EnemyPhysicalAttack[] = [
    new BattleSlimeSlash(),
    new BattleSlimeTackle(),
]


export class BattleSlime extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 45;
        this.PAT = 8;
        this.MAT = 4;
        this.PDF = 9;
        this.MDF = 12;
        this.SP = 21;
        this.exp = 2;
        this.name = "バトルスライム";
    
        this.candidatePCommands = [
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([BattleSlimeCommands[0],BattleSlimeCommands[1]],{prob:[45,55]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        this.key = "battleSlime"
        this.scene.load.image(this.key,"/assets/enemy/battleSlime/戦闘.png");
    }
    genPComand(): ProbCommand {
        return this.candidatePCommands[Math.floor(Math.random()*this.candidatePCommands.length)];
    }
}

