export default class load extends Phaser.Scene {
    parent?:Phaser.Scene
    percent:number = 0;
    loadingBoard?:Phaser.GameObjects.Rectangle;
    percentText?:Phaser.GameObjects.Text;
    P_Rect?: Phaser.GameObjects.Rectangle;
    constructor() {
      super("loading");
    }
    init(data:{parent:Phaser.Scene}) {
        this.parent = data.parent;
        this.parent.load.on('progress', (value: number) => {
            this.percent = value*100;
            console.log(this.percent);
        });

        this.parent.load.on('complete', () => {
            this.scene.stop("loading");
        });
    }
    preload() {
    }
    create() {
        this.loadingBoard = this.add.rectangle(75,350,this.scale.width-150, 950).setOrigin(0,0); 
        this.loadingBoard.setFillStyle(0xaaaaaa).setStrokeStyle(10,0x000000);
        this.add.rectangle(125,1150,this.scale.width-250, 60).setOrigin(0,0).setFillStyle(0x00aaaa).setStrokeStyle(10,0x000000); 
        this.P_Rect = this.add.rectangle(125,1150,this.scale.width-250, 60).setOrigin(0,0); 
        this.P_Rect.setFillStyle(0x00ffff).setStrokeStyle(10,0x000000);
        this.percentText = this.add.text(this.scale.width/2,1050,'Loading... 0%',{ fontSize: '70px', color: '#ffffff',fontFamily:"Arial" }).setOrigin(0.5,0);
    }
    update(): void {
        if(this.percent != 100)return;
        if(!this.P_Rect)return;
        if(!this.percentText)return;
        this.P_Rect.setSize((this.scale.width-250)*(this.percent/100),60);
        let body = 'Loading';
        const D = Math.floor(this.time.now/500) % 4;
        if(D == 0)body += '.  ';
        else if(D == 1 || D == 3)body += '.. ';
        else body += '...';
        this.percentText.setText(`${body} ${this.percent}%`);
    }
  }
  

export function loadingScene(scene:Phaser.Scene){
    scene.load.on('progress',(value:number) => {
        if(!scene.scene.manager.isActive('loading')){
            scene.scene.launch('loading',{parent:scene});
        }
    })
}