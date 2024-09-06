import { Command, PlayerMagicalAttack} from "./commands";

export class FireBall extends PlayerMagicalAttack{
    initialize(): void {
        this.name = "ファイアーボール";
        this.mp = 30;
        this.mei = 100;
        this.power = 60;
        this.description = "火の玉をぶつけて攻撃する。確率で火傷ダメージ";
    }
}

export class IceWorld extends PlayerMagicalAttack{
    initialize(): void {
        this.name = "アイスワールド";
        this.mp = 30;
        this.mei = 100;
        this.power = 60;
        this.description = "空間を凍り付かせる。確率で魔法の攻撃力低下";
    }
}

export class Spark extends PlayerMagicalAttack{
    initialize(): void {
        this.name = "スパーク";
        this.mp = 30;
        this.mei = 100;
        this.power = 60;
        this.description = "電撃を発生させる。確率で速度低下";
    }
}

export class Tornado extends PlayerMagicalAttack{
    initialize(): void {
        this.name = "トルネード";
        this.mp = 30;
        this.mei = 100;
        this.power = 60;
        this.description = "竜巻を発生させ。確率で物理の攻撃力低下";
    }
}

export class StoneStar extends PlayerMagicalAttack{
    initialize(): void {
        this.name = "ストーンスター";
        this.mp = 30;
        this.mei = 100;
        this.power = 60;
        this.description = "星型の石をいくつも投げ飛ばす。確率で命中低下";
    }
}


export const PlayerMagCommands:Command[] = [
    new FireBall(),
    new IceWorld(),
    new Spark(),
    new Tornado(),
    new StoneStar(),
];
