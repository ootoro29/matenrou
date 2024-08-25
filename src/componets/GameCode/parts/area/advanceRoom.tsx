import { Area, EventArea } from "../area";
import { Room } from "../../Information/room/room";
import { Button } from "../button";
import { areaManager } from "../areaManager";
import AdvanceRoom from "../../scenes/actions/advanceRoom";
import AdventureThinking from "../../scenes/actions/adventureThinking";
import { BattleSlime } from "../../Information/enemy/battleSlime";
import { Enemy } from "../../Information/enemy/enemy";



export class advanceRoom extends Area{
    room?:Room;
    roomSelections:Button[] = []
    index = 0;
    constructor(scene:Phaser.Scene,room:Room){
        super(scene);
        this.room = room;
        this.load();
    }
    initialize(): void {
        if(!this.room)return;
        const nextRooms = this.room.nextRoomList();
        for(let i = 0; i < nextRooms.length; i++){
            const button = new Button(this.scene,30,50+150*i,`ルーム${i}`,{
                width:this.width-60,
                height:120,
                onClick: () => {
                    this.setIndex(i);
                },
            },{
                align:"left",
                fontSize:50,
                textcolor:"#000000",
                rectcolor:0xaaaa00,
                strokecolor:0x555500
            })

            this.roomSelections.push(button);
        }
        this.updateStyle();
        this.contents = this.scene.add.container(0,0);
        for(let i = 0; i < this.roomSelections.length; i++){
            this.contents.add(this.roomSelections[i]);
        }
        
    }
    setIndex(index:number){
        if(index <= -1 || index >= this.roomSelections.length)return;
        this.downStyle();
        this.index = index;
        this.updateStyle();
    }
    upIndex(){
        if(this.index-1 >= 0){
            this.setIndex(this.index-1);
        }
    }
    downIndex(){
        if(this.index+1 < this.roomSelections.length){
            this.setIndex(this.index+1);
        }
    }
    downStyle(){
        if(this.index <= -1 || this.index >= this.roomSelections.length)return;
        this.roomSelections[this.index].setStyle({
            align:"left",
            fontSize:50,
            textcolor:"#000000",
            rectcolor:0xaaaa00,
            strokecolor:0x555500
        });
    }
    updateStyle(){
        if(this.index <= -1 || this.index >= this.roomSelections.length)return;
        this.roomSelections[this.index].setStyle({
            align:"left",
            fontSize:50,
            textcolor:"#000000",
            rectcolor:0xcccc00,
            strokecolor:0xffff00,
            strokeWeight:10,
        });
    }
    nextRoom():Room|null{
        if(!this.room)return null;
        return this.room.nextRoom(this.index);
    }
}

export class advanceRoomAreaManager extends areaManager{
    AreaList?:advanceRoomEventArea[];
    index = 0;
    constructor(AreaList:advanceRoomEventArea[]){
        super(AreaList);
    }
    currentArea():advanceRoomEventArea | null{
        if(!this.AreaList)return null;
        if(this.isEmpty())return null;
        return this.AreaList[this.index];
    }
}


export abstract class advanceRoomEventArea extends EventArea{
    parents?:AdventureThinking;
    constructor(scene:AdventureThinking,discription:string,{key="",image = ""} = {}){
        super(scene,discription,{key:key,image:image});
    }
    abstract genSelections(): string[];
    abstract opeClick(click:number): void;
}

export class NormalAdvanceRoomArea extends advanceRoomEventArea {
    genSelections(): string[] {
        return ["OK","X","X","X","X","X"];
    }
    opeClick(click: number): void {
        if(!this.parents)return;
        if(click == 0){
            if(this.parents.AM?.isLast()){
                this.parents.AM?.nextArea();
                this.parents.thinking();
            }else{
                this.parents.AM?.nextArea();
                this.parents.changeBMText();
            }
        }
    }
}

export class BattleAdvanceRoomArea extends advanceRoomEventArea {
    enemy?:Enemy;
    constructor(scene:AdventureThinking,enemy:Enemy,{key="",image = ""} = {}){
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