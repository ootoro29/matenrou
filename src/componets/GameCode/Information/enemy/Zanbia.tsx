import { PComand } from "@/types/game";
import { Enemy } from "./enemy";
import { EnemyProbCommand, ProbCommand } from "../prob_commands";
import { Command, EnemyMagicalAttack, EnemyMagicalHerugaia, EnemyMagicalHPSuc, EnemyMagicalLockSPAttack, EnemyMagicalMPSuc, EnemyMagicalParugoa, EnemyMagicalPATAttack, EnemyMagicalPray, EnemyMagicalSPAttack, EnemyMagicalWord, EnemyPhysicalAttack } from "../commands";
import BattleScene from "../../scenes/battle";
import { EnemyBattleSPStageChange } from "../../parts/area/battleEventArea";

class ZanbiaYomiSlash extends EnemyMagicalAttack{
    initialize(): void {
        this.name = "黄泉の闇刃";
        this.power = 75;
        this.mei = 75;
        this.key = "ZanbiaYomiSlash"
        this.path = "/assets/enemy/zanbia/黄泉の闇刃";
    }
}

class ZanbiaFist extends EnemyPhysicalAttack{
    initialize(): void {
        this.name = "ゾンビフィスト";
        this.power = 60;
        this.mei = 90;
        this.key = "ZanbiaFist"
        this.path = "/assets/enemy/zanbia/ゾンビフィスト";
    }
}

class ZanbiaNecroMist extends EnemyMagicalPATAttack{
    initialize(): void {
        this.name = "ネクロミスト";
        this.power = 30;
        this.mei = 85;
        this.key = "IshisuPlantGoku"
        this.path = "/assets/enemy/zanbia/ネクロミスト";
    }
}

class ZanbiaMPSuc extends EnemyMagicalMPSuc{
    initialize(): void {
        this.name = "MPドレイン"
        this.mei = 80;
        this.key = "ZanbiaMPSuc"
        this.path = "/assets/enemy/zanbia/MPドレイン";
    }
}

class ZanbiaMagicalWords extends EnemyMagicalWord{
    initialize(): void {
        this.name = "冥府の言霊"
        this.mei = 100;
        this.key = "IshisuPray"
        this.path = "/assets/enemy/zanbia/冥府の言霊";
    }
}

class ZanbiaHerugaia extends EnemyMagicalHerugaia{
    initialize(): void {
        this.name = "ヘルガイア"
        this.mei = 90;
        this.key = "Zanbia"
        this.path = "/assets/enemy/zanbia/ヘルガイア";
    }
}


const IceSlimeCommands:EnemyPhysicalAttack[] = [
    new ZanbiaYomiSlash(),
    new ZanbiaFist(),
    new ZanbiaNecroMist(),
    new ZanbiaMPSuc(),
    new ZanbiaMagicalWords(),
    new ZanbiaHerugaia(),
]


export class Zanbia extends Enemy{
    initialize(){
        this.HP = this.HP_MAX = 535;
        this.PAT = 37;
        this.MAT = 32;
        this.PDF = 38;
        this.MDF = 21;
        this.SP = 48;
        this.exp = 30;
        this.name = "ザンビア";
    
        this.candidatePCommands = [
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[1]],{prob:[80,20]}),
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[1]],{prob:[30,70]}),
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[1]],{prob:[45,55]}),
            new EnemyProbCommand([IceSlimeCommands[1],IceSlimeCommands[2]],{prob:[70,30]}),
            new EnemyProbCommand([IceSlimeCommands[1],IceSlimeCommands[2]],{prob:[30,70]}),
            new EnemyProbCommand([IceSlimeCommands[2],IceSlimeCommands[3],IceSlimeCommands[4]],{prob:[40,30,30]}),
            new EnemyProbCommand([IceSlimeCommands[0],IceSlimeCommands[3],IceSlimeCommands[4]],{prob:[60,20,10]}),
            new EnemyProbCommand([IceSlimeCommands[1],IceSlimeCommands[3]],{prob:[60,40]}),
            new EnemyProbCommand([IceSlimeCommands[4],IceSlimeCommands[5]],{prob:[80,20]}),
            new EnemyProbCommand([IceSlimeCommands[4],IceSlimeCommands[5]],{prob:[10,90]}),
        ];
    }
    load(scene: BattleScene): void {
        this.scene = scene;
        this.key = "zanbia"
        this.scene.load.image(this.key,"/assets/enemy/zanbia/戦闘.png");
    }
    genPComand(): ProbCommand {
        if(this.charge < 3){
            return this.candidatePCommands[Math.floor(Math.random()*(this.candidatePCommands.length-2))];
        }else{
            if(this.HP/this.HP_MAX < 0.4 && Math.random()*100 < 25){
                return this.candidatePCommands[9];    
            }
            return this.candidatePCommands[Math.floor(Math.random()*(this.candidatePCommands.length))];
        }
    }
}

