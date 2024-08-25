import { BattleStatus, Status } from "@/types/game";
import { Area } from "../area";



export class confirmStatusArea extends Area{
    status?:Status;
    constructor(scene:Phaser.Scene,data:Status){
        super(scene);
        this.status = data;
        this.create();
    }
    initialize(): void {
        if(!this.status)return;
        this.contents = this.scene.add.container(0,0);
        const textStyle = { font: '64px Arial', fill: '#ffffff' };
        this.contents.add(this.scene.add.text(50,50,`Lv: ${this.status.lv}`,textStyle))
        const textStyle2 = { font: '36px Arial', fill: '#ffffff' };
        this.contents.add(this.scene.add.text(250,70,`次のLvまであと${this.status.exp_MAX-this.status.exp}`,textStyle2))

        const textStyle3 = { font: '64px', fill: '#ffffff' };
        this.contents.add(this.scene.add.text(50,120,`PAT: ${this.status.normalStatus.PAT}`,textStyle3))
        this.contents.add(this.scene.add.text(50,180,`PDF: ${this.status.normalStatus.PDF}`,textStyle3))
        this.contents.add(this.scene.add.text(50,240,`MAT: ${this.status.normalStatus.MAT}`,textStyle3))
        this.contents.add(this.scene.add.text(50,300,`MDF: ${this.status.normalStatus.MDF}`,textStyle3))
    }
}

export class confirmBattleStatusArea extends Area{
    status?:BattleStatus;
    constructor(scene:Phaser.Scene,data:BattleStatus){
        super(scene);
        this.status = data;
        this.create();
    }
    initialize(): void {
        if(!this.status)return;
        this.contents = this.scene.add.container(0,0);
        const textStyle = { font: '64px Arial', fill: '#ffffff' };
        this.contents.add(this.scene.add.text(50,50,`Lv: ${this.status.lv}`,textStyle))
        const textStyle2 = { font: '36px Arial', fill: '#ffffff' };
        this.contents.add(this.scene.add.text(250,70,`次のLvまであと${this.status.exp_MAX-this.status.exp}`,textStyle2))
        const textStyle3 = { font: '64px', fill: '#ffffff' };
        this.contents.add(this.scene.add.text(70,120,`HP :${this.status.HP}/${this.status.HP_MAX}`,textStyle3))
        this.contents.add(this.scene.add.text(70,180,`MP :${this.status.MP}/${this.status.MP_MAX}`,textStyle3))
        this.contents.add(this.scene.add.text(70,240,`CP :${this.status.CP}/${this.status.CP_MAX}`,textStyle3))
        this.contents.add(this.scene.add.text(70,300,`PAT:${this.status.status.PAT}`,textStyle3))
        this.contents.add(this.scene.add.text(70,360,`PDF:${this.status.status.PDF}`,textStyle3))
        this.contents.add(this.scene.add.text(70,420,`MAT:${this.status.status.MAT}`,textStyle3))
        this.contents.add(this.scene.add.text(70,480,`MDF:${this.status.status.MDF}`,textStyle3))
        this.contents.add(this.scene.add.text(70,540,`SP :${this.status.status.SP}`,textStyle3))
    }
}