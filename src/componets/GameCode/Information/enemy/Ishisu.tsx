import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHPSuc, EnemyMagicalLockSPAttack, EnemyMagicalParugoa, EnemyMagicalPray, EnemyMagicalSPAttack, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyBattleSPStageChange } from "../../parts/area/battleEventArea";

class IshisuHolySlash extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "エルドラの光刃";
        this.power = 70;
        this.mei = 80;
        //this.key = "iceSlimeIceBlock"
        //this.path = "/assets/enemy/iceSlime/氷塊.png";
    }
}

class IshisuPlantWhip extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "プラント・ウィップ";
        this.power = 60;
        this.mei = 90;
    }
}

class IshisuPlantGoku extends EnemyMagicalLockSPAttack{
    initialize(): void {
        this.name = "深緑の獄";
        this.power = 30
    }
}

class IshisuHPSuc extends EnemyMagicalHPSuc{
    initialize(): void {
        this.name = "HP吸収"
    }
}

class IshisuMagicalPray extends EnemyMagicalPray{
    initialize(): void {
        this.name = "エルフの祈り"
    }
}

class IshisuParugoa extends EnemyMagicalParugoa{
    initialize(): void {
        this.name = "パルゴア"
    }
}


const IceSlimeCommands:EnemyPhysicalAttack[] = [
    new IshisuHolySlash(),
    new IshisuPlantWhip(),
    new IshisuPlantGoku(),
    new IshisuHPSuc(),
    new IshisuMagicalPray(),
    new IshisuParugoa(),
]


export class Ishisu extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 360;
        this.PAT = 21;
        this.MAT = 25;
        this.PDF = 35;
        this.MDF = 20;
        this.SP = 48;
        this.exp = 30;
        this.name = "イシス";
    
        this.candidatePCommands = [
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[1]],{prob:[45,55]}),
            new EnemyProbCommand([IceSlimeCommands[1],IceSlimeCommands[2]],{prob:[70,30]}),
            new EnemyProbCommand([IceSlimeCommands[1],IceSlimeCommands[2]],{prob:[30,70]}),
            new EnemyProbCommand([IceSlimeCommands[2],IceSlimeCommands[3],IceSlimeCommands[4]],{prob:[40,30,30]}),
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[3],IceSlimeCommands[4]],{prob:[60,20,10]}),
            new EnemyProbCommand([IceSlimeCommands[1],IceSlimeCommands[3]],{prob:[60,40]}),
            new EnemyProbCommand([IceSlimeCommands[4],IceSlimeCommands[5]],{prob:[70,30]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        this.key = "ishisu"
        this.scene.load.image(this.key,"/assets/enemy/ishisu/戦闘.png");
    }
    genPComand(): ProbCommand {
        return this.candidatePCommands[Math.floor(Math.random()*this.candidatePCommands.length)];
    }
}

