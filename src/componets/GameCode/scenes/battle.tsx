import { BattleActionScene, PartScene } from "../parts/scene";
import {Enemy } from "../Information/enemy/enemy";
import PlayerINFO from "../Information/playerInformation";
import { BattleSlime } from "../Information/enemy/battleSlime";
import { ProbCommand } from "../Information/prob_commands";
import main from "./main";
import { BattleEventArea } from "../parts/area/battleEventArea";
import BattleEventAction from "./actions/battleEventAction";

export default class BattleScene extends PartScene{
    first_turn = 0;
    turn = 0;
    event_turn = 0;
    actionOrder:number[] = [0,0,0,0,0,0];
    actions:(ProbCommand|null)[] = [];
    enemy?:Enemy;
    player?:PlayerINFO;
    Areas?:BattleEventArea[]
    battleAction?:BattleEventAction;
    constructor() {
        super("battle");
        
    }

    override init(data:{main:main,enemy:Enemy}){
        this.MAIN = data.main;
        this.enemy = data.enemy;
        this.initialize()
    }

    nextEventTurn(){
        if(!this.player)return;
        if(!this.enemy)return;
        this.event_turn++;
        if(this.event_turn > 6){
            this.event_turn = 0;
            this.turn = 0;
            this.scene.stop("battleEvent");
            this.scene.launch("battleThinking",{main:this.MAIN,battle:this});
            //this.battleInitialize();
        }else{
            this.scene.stop("battleEvent");
            this.scene.launch("battleEvent",{main:this.MAIN,battle:this});
            this.battleAction = this.scene.get<BattleEventAction>("battleEvent");
            const act = this.actions[this.event_turn-1];
            if(!act){
                alert("error");
                return;
            }
            if(!this.battleAction)return;
            const command = act.sample();
            this.Areas = [
                ...command.doBattleCommand(this,this.battleAction)
            ];
            this.battleAction.setAreas(this.Areas);
        }
    }
    battleFinish(){
        this.first_turn = 0;
        this.turn = 0;
        this.event_turn = 0;
        this.actionOrder = [0,0,0,0,0,0];
        this.actions = [];
        this.scene.stop();
    }
    YOUWIN(){
        this.battleFinish();
        this.MAIN?.toAdventure();
    }
    GAMEOVER(){
        this.battleFinish();
        this.MAIN?.GAMEOVER();
    }
    nextTurn(){
        //console.log(this.player?.Item?.battleItemList);
        const ft = this.turn;
        this.turn++;
        while(this.turn <= 6){
            if(this.actionOrder[this.turn-1] != -1)break;
            this.turn++;
        }
        if(this.turn > 6){
            this.nextEventTurn();
            //this.scene.stop("battleThinking");
            //this.scene.launch("battleEvent",{main:this.MAIN,battle:this});
        }else{
            this.scene.launch("battleThinking",{main:this.MAIN,battle:this});
        }
    }
    backTurn(){
        if(this.turn == this.first_turn)return;
        this.turn--;
        while(this.turn > 0){
            if(this.actionOrder[this.turn-1] != -1)break;
            this.turn--;
        }
        this.scene.launch("battleThinking",{main:this.MAIN,battle:this});
    }
    preload() {
        this.enemy?.load(this);
        this.battleInitialize();
    }
    initialize(): void {
        this.player = this.MAIN?.PINF;//init()後でないとMAINが入らない
        
    }
    battleInitialize(){
        this.actions = [];
        this.updateCommands();
        this.nextTurn();
        this.first_turn = this.turn;
    }
    updateCommands(){
        if(!this.player)return;
        if(!this.enemy)return;
        let player_sp_table:number[] = [];
        let enemy_sp_table:number[] = [];
        const status = this.player?.getBattleStatus();
        for(let i = 0; i < 6; i++){
            const d = Math.pow(i+1,2);
            player_sp_table.push(status.status.SP/d);
            enemy_sp_table.push(this.enemy.SP/d);
        }
        let index_player = 0;
        let index_enemy = 0;
        for(let i = 0; i < 6; i++){
            let ans = 0;
            if(player_sp_table[index_player] < enemy_sp_table[index_enemy]){
                ans = -1;
            }else if(player_sp_table[index_player] > enemy_sp_table[index_enemy]){
                ans = 1;
            }else{
                if(index_player > index_enemy){
                    ans = -1;
                }else if(index_player < index_enemy){
                    ans = 1;
                }else{
                    ans = (Math.random() <= 0.5)?1:-1;
                }
            }
            if(ans == 1){
                index_player ++;
            }else{
                index_enemy ++;
            }
            this.actionOrder[i] = ans;
        }
        this.actions = [];
        for(let i = 0; i < 6; i++){
            if(this.actionOrder[i] == -1){
                this.actions.push(this.enemy.genPComand());
            }else{
                this.actions.push(null);
            }
        }

    }
    create(){
        const graphics = this.add.graphics();
        graphics.fillStyle(0x0000dd, 1.0);
        graphics.fillRect(0, 0,this.scale.width, this.scale.height);
        const A = this.scene.launch('battleThinking',{main:this.MAIN,battle:this});
        this.enemy?.create();
    }
    update(time: number, delta: number): void {
        this.enemy?.update();
    }
}