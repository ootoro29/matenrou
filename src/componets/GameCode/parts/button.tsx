interface ButtonInfo{
    width:number;
    height:number;
    onClick: Function;
}

export class Button extends Phaser.GameObjects.Container { 
    seKey: string = "";
    contents:string = "";
    text?: Phaser.GameObjects.Text;
    container?: Phaser.GameObjects.Rectangle;
    constructor(scene: Phaser.Scene,x:number,y:number,text:string,info:ButtonInfo,{ align = 'center', fontSize = 15, textcolor = "#000000",strokeWeight = 5,rectcolor = 0x000000,strokecolor=0xffffff } = {}) { 
        super(scene,x,y)
        const {
            width,
            height,
            onClick
        } = info;
        this.scene = scene
        this.scene.add.existing(this);

        this.setSize(width,height).setInteractive();

        const alignLeft = align === 'left';
        if(alignLeft){
            this.x += width/2;
            this.y += height/2;
        }

        this.contents = text;
        this.text = scene.add.text(0,0,this.contents,{align,fontSize,color:textcolor,fontFamily:"Arial"}).setOrigin(0.5,0.5).setPadding(0, 2, 0, 0)
        this.text.setVisible(this.contents != 'X');
        

        this.container = scene.add.rectangle(0,0,width,height);
        this.container.setFillStyle(rectcolor).setStrokeStyle(strokeWeight,strokecolor).setOrigin(0.5,0.5)

        this.add([this.container, this.text])

        this.on('pointerup', () => {
            onClick && onClick()
        })
    }

    setFunction(onClick:Function){
        this.off('pointerup');
        this.on('pointerup',() => {
            onClick()
        })
    }

    setSeKey(key: string) {
        this.seKey = key
        return this
    }
    setText(text:string) {
        if(!this.container || !this.text)return;
        this.contents = text;
        this.text?.setText(this.contents);
        this.text?.setVisible(this.contents != 'X');
        return this
    }
    setStyle({align = 'center',fontSize = 15, textcolor = "#000000",strokeWeight = 5,rectcolor = 0x000000,strokecolor=0xffffff } = {}){
        if(!this.text)return;
        this.text.setStyle({align,fontSize,textcolor});
        this.container?.setFillStyle(rectcolor);
        this.container?.setStrokeStyle(strokeWeight,strokecolor);
    }
    getText():string{
        return this.contents;
    }
}