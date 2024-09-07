import { initialize } from "next/dist/server/lib/render-server";
import { ActionScene } from "./scene";
import BBCodeText from "phaser3-rex-plugins/plugins/gameobjects/tagtext/bbcodetext/BBCodeText";

export abstract class Area extends Phaser.GameObjects.Container { 
    areaBoard?:Phaser.GameObjects.Rectangle;
    contents?:Phaser.GameObjects.Container;
    constructor(scene: Phaser.Scene) { 
        super(scene,75,350)
        this.scene = scene
    }
    create(){
        this.scene.add.existing(this);
        this.setSize(this.scene.scale.width-150, 950).setInteractive();
        this.areaBoard = this.scene.add.rectangle(0,0,this.scene.scale.width-150, 950).setOrigin(0,0); 
        this.areaBoard.setFillStyle(0xaaaaaa).setStrokeStyle(10,0x000000);
        this.initialize();
        if(!this.contents){
            console.log("contents error [Area class]");
            return;
        }
        this.add([this.areaBoard,this.contents])
    }
    abstract initialize():void;
}

export abstract class EventArea extends Area{
    key:string = "";
    path:string = "";
    discription?:string;
    image?:Phaser.GameObjects.Image;
    parents?:ActionScene;
    text?:BBCodeText;
    constructor(scene:ActionScene,discription:string,{key="",image = ""} = {}){
        super(scene);
        this.parents = scene;
        this.key = key;
        this.path = image;
        this.discription = discription;
    }
    initialize(): void {
        if(!this.discription)return;
        this.contents = this.scene.add.container(0,0);
        const textStyle = { font: '64px Arial', fill: '#ffffff' };
        this.text = new BBCodeText(this.scene,50,this.width,`${this.discription}`,{
            fontFamily:"Arial",
            fontSize:"48px",
            fill:"#ffffff",
            wrap:{
                mode:"char",
                width:this.width-100,
            
            }
        })
        //this.contents.add(this.scene.add.text(50,this.width,`${this.discription}`,textStyle))
        this.contents.add(
            this.text
        );
        if(this.key != ""){
            this.contents.add(this.scene.add.image(50,50,this.key).setOrigin(0,0))
        }else{
            this.contents.add(this.scene.add.rectangle(50,50,this.width-100,this.width-100,0x5E7D76).setOrigin(0,0));
        }
    }
    async load(): Promise<void> {
        if(this.path != ""){
            this.scene.load.image(this.key,this.path);
        }
    }
    abstract genSelections(): string[];
    abstract opeClick(click:number): void;
}

