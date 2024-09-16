export default class game extends Phaser.Scene {
    
    constructor() {
      super("loading");
    }
    init() {
    }
    preload() {
    }
    create() {
        const graphics = this.add.graphics();
        // 四角形を描画
        graphics.fillStyle(0x3221ad, 1.0);
        graphics.fillRect(0, 0, this.scale.width, 300);

        /*
        // 円を描画
        graphics.fillStyle(0xff0000, 1.0);
        graphics.fillCircle(400, 300, 50);
        */

        // テキストを追加
        this.add.text(20, 20, `Loading`, { fontSize: '50px', color: '#ffffff' });
    }
    update(): void {
    }
  }
  