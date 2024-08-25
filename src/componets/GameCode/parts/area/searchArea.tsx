import { wrap } from "module";
import searchAction from "../../scenes/actions/searchAction";
import { Area, EventArea } from "../area";
import BBCodeText from "phaser3-rex-plugins/plugins/bbcodetext";
import { areaManager } from "../areaManager";
import { Enemy } from "../../Information/enemy/enemy";

export class searchAreaManager extends areaManager{
    AreaList?:searchArea[];
    index = 0;
    constructor(AreaList:searchArea[]){
        super(AreaList);
    }
    currentArea():searchArea | null{
        if(!this.AreaList)return null;
        if(this.isEmpty())return null;
        return this.AreaList[this.index];
    }
}


export abstract class searchArea extends EventArea{
    parents?:searchAction;
    constructor(scene:searchAction,discription:string,{key="",image = ""} = {}){
        super(scene,discription,{key:key,image:image});
    }
    abstract genSelections(): string[];
    abstract opeClick(click:number): void;
}

export class NormalSearchArea extends searchArea {
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.scene.start("adventureThinking",{main:this.parents.MAIN,adventure:this.parents.Parents});
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
}

export class BattleSearchArea extends searchArea {
    enemy?:Enemy;
    constructor(scene:searchAction,enemy:Enemy,{key="",image = ""} = {}){
        const discription = `${enemy.name}が現れた！戦闘開始！`;
        super(scene,discription,{key:key,image:image});
        this.enemy = enemy;
    }
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(!this.enemy)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.AM?.nextArea();
                this.parents.toCombat(this.enemy);
            }else{
                alert("設定ミス(開発者にお問い合わせください)");
            }
        }
    }
}