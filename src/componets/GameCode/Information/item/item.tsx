import AdventureItem from "../../scenes/actions/adventureItem";
import BattleItemSelect from "../../scenes/actions/battleItemSelect";
import { Command} from "../commands";


export abstract class Item{
    name = "";
    description = "";
    image?:Phaser.GameObjects.Image;
    key = "";
    path = "";
    count = 0;
    power = 0;
    command?:Command;
    constructor(count:number){
        this.count = count;
        this.initialize();
    }
    abstract initialize():void;
    loadBattle(scene:BattleItemSelect):void{
        scene.load.image(this.key,this.path);
    }
    loadAdventure(scene:AdventureItem):void{
        scene.load.image(this.key,this.path);
    }
    itemCommand(){
        this.command = this.genCommand();
        this.command.power = this.power;
        this.command.name = this.name;
        this.command.initialize();
        this.description = this.description;
        return this.command;
    }
    abstract genCommand():Command;
}
