import AdventureScene from "../scenes/adventure";
import BattleScene from "../scenes/battle";
import main  from "../scenes/main";
import { ButtonManager } from "./buttonManager";

export abstract class PartScene extends Phaser.Scene {
    MAIN?:main
    init(data:{main:main}){
        this.MAIN = data.main;
        this.initialize()
    }
    abstract initialize():void;
}

export abstract class ActionScene extends Phaser.Scene {
    MAIN?:main
    BM?:ButtonManager;
}

export abstract class AdventureActionScene extends ActionScene {
    Parents?:AdventureScene;
    init(data:{main:main,adventure:AdventureScene}){
        this.MAIN = data.main;
        this.BM = this.MAIN.BM;
        this.Parents = data.adventure;
        this.initialize()
    }
    abstract initialize():void;
}

export abstract class BattleActionScene extends ActionScene {
    Parents?:BattleScene;
    init(data:{main:main,battle:BattleScene}){
        this.MAIN = data.main;
        this.BM = this.MAIN.BM;
        this.Parents = data.battle;
        this.initialize()
    }
    abstract initialize():void;
}