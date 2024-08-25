import { Enemy } from "../Information/enemy/enemy";
import PlayerINFO from "../Information/playerInformation";
import { PartScene } from "../parts/scene";
import AdventureThinking from "./actions/adventureThinking";
import main from "./main";

export default class AdventureScene extends PartScene{
    first = true;
    player?:PlayerINFO;
    constructor() {
        super("adventure");
    }
    init(data:{main:main,first:boolean}){
        this.MAIN = data.main;
        this.first = data.first;
        this.initialize()
    }
    initialize(): void {
        this.player = this.MAIN?.PINF
        //console.log(this.scene.manager.getScenes())
    }
    create(){
        const graphics = this.add.graphics();
        graphics.fillStyle(0x00dd00, 1.0);
        graphics.fillRect(0, 0,this.scale.width, this.scale.height);
        const A = this.scene.launch('adventureThinking',{main:this.MAIN,adventure:this,first:this.first});
    }
    toCombat(enemy:Enemy){
        this.scene.stop();
        this.MAIN?.toCombat(enemy);
    }
    update(time: number, delta: number): void {
        
    }
}