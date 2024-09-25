import { BattleStatus, Status } from "@/types/game";
import { Area } from "../area";
import PlayerINFO from "../../Information/playerInformation";



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
        this.contents.add(this.scene.add.text(50,120,`PAT: ${Math.floor(this.status.normalStatus.PAT)}`,textStyle3))
        this.contents.add(this.scene.add.text(50,180,`PDF: ${Math.floor(this.status.normalStatus.PDF)}`,textStyle3))
        this.contents.add(this.scene.add.text(50,240,`MAT: ${Math.floor(this.status.normalStatus.MAT)}`,textStyle3))
        this.contents.add(this.scene.add.text(50,300,`MDF: ${Math.floor(this.status.normalStatus.MDF)}`,textStyle3))
    }
}

export class confirmBattleStatusArea extends Area{
    player?:PlayerINFO;
    constructor(scene:Phaser.Scene,player:PlayerINFO){
        super(scene);
        this.player = player;
        this.create();
    }
    initialize(): void {
        if(!this.player)return;
        const status = this.player.getBattleStatus();
        this.contents = this.scene.add.container(0,0);
        const textStyle = { font: '64px Arial', fill: '#ffffff' };
        this.contents.add(this.scene.add.text(50,50,`Lv: ${status.lv}`,textStyle))
        const textStyle2 = { font: '36px Arial', fill: '#ffffff' };
        this.contents.add(this.scene.add.text(250,70,`次のLvまであと${status.exp_MAX-status.exp}`,textStyle2))
        const textStyle3 = { font: '64px', fill: '#ffffff' };
        const textStyle3Plus = { font: '64px', fill: '#ffcc22' };
        const textStyle3Minus = { font: '64px', fill: '#22ccff' };
        this.contents.add(this.scene.add.text(70,120,`HP :${Math.floor(status.HP)}/${status.HP_MAX}`,textStyle3))
        this.contents.add(this.scene.add.text(70,180,`MP :${Math.floor(status.MP)}/${status.MP_MAX}`,textStyle3))
        this.contents.add(this.scene.add.text(70,240,`CP :${Math.floor(status.CP)}/${status.CP_MAX}`,textStyle3))
        this.contents.add(this.scene.add.text(70,300,`PAT${(this.player.PATstage==0)?"":(this.player.PATstage > 0)?`(+${this.player.PATstage})`:`(${this.player.PATstage})`}:${Math.floor(status.status.PAT)}`,(this.player.PATstage==0)?textStyle3:(this.player.PATstage > 0)?textStyle3Plus:textStyle3Minus))
        this.contents.add(this.scene.add.text(70,360,`PDF${(this.player.PDFstage==0)?"":(this.player.PDFstage > 0)?`(+${this.player.PDFstage})`:`(${this.player.PDFstage})`}:${Math.floor(status.status.PDF)}`,(this.player.PDFstage==0)?textStyle3:(this.player.PDFstage > 0)?textStyle3Plus:textStyle3Minus))
        this.contents.add(this.scene.add.text(70,420,`MAT${(this.player.MATstage==0)?"":(this.player.MATstage > 0)?`(+${this.player.MATstage})`:`(${this.player.MATstage})`}:${Math.floor(status.status.MAT)}`,(this.player.MATstage==0)?textStyle3:(this.player.MATstage > 0)?textStyle3Plus:textStyle3Minus))
        this.contents.add(this.scene.add.text(70,480,`MDF${(this.player.MDFstage==0)?"":(this.player.MDFstage > 0)?`(+${this.player.MDFstage})`:`(${this.player.MDFstage})`}:${Math.floor(status.status.MDF)}`,(this.player.PATstage==0)?textStyle3:(this.player.MDFstage > 0)?textStyle3Plus:textStyle3Minus))
        this.contents.add(this.scene.add.text(70,540,`SP${(this.player.SPstage==0)?"":(this.player.SPstage > 0)?`(+${this.player.SPstage})`:`(${this.player.SPstage})`} :${Math.floor(status.status.SP)}`,(this.player.SPstage==0)?textStyle3:(this.player.SPstage > 0)?textStyle3Plus:textStyle3Minus))
    }
}