import { Command, PlayerMagicalAttack, PlayerMagicalShield} from "./commands";
import { Shield } from "./shield/shield";
import { FireShield, GroundShield, IceShield, NormalShield, ThunderShield, WindShield } from "./shield/shields";

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

export class ExpandNormalShield extends PlayerMagicalShield{
    initialize(): void {
        this.shield = new NormalShield();
        this.name = this.shield.name;
        this.mp = 50;
        this.description = "シールドを展開する。耐久50、耐久が1でも残っていれば全ての攻撃を吸収する。";
    }
}


export class ExpandFireShield extends PlayerMagicalShield{
    initialize(): void {
        this.shield = new FireShield();
        this.name = this.shield.name;
        this.mp = 80;
        this.description = "火属性に強いシールドを展開する。耐久20、火属性の攻撃は1に抑える。";
    }
}

export class ExpandIceShield extends PlayerMagicalShield{
    initialize(): void {
        this.shield = new IceShield();
        this.name = this.shield.name;
        this.mp = 80;
        this.description = "氷属性に強いシールドを展開する。耐久20、氷属性の攻撃は1に抑える。";
    }
}

export class ExpandThunderShield extends PlayerMagicalShield{
    initialize(): void {
        this.shield = new ThunderShield();
        this.name = this.shield.name;
        this.mp = 80;
        this.description = "雷属性に強いシールドを展開する。耐久20、雷属性の攻撃は1に抑える。";
    }
}

export class ExpandWindShield extends PlayerMagicalShield{
    initialize(): void {
        this.shield = new WindShield();
        this.name = this.shield.name;
        this.mp = 80;
        this.description = "風属性に強いシールドを展開する。耐久20、風属性の攻撃は1に抑える。";
    }
}

export class ExpandGroundShield extends PlayerMagicalShield{
    initialize(): void {
        this.shield = new GroundShield();
        this.name = this.shield.name;
        this.mp = 80;
        this.description = "土属性に強いシールドを展開する。耐久20、土属性の攻撃は1に抑える。";
    }
}


export const PlayerMagCommands:Command[] = [
    new ExpandNormalShield(),
    new FireBall(),
    new IceWorld(),
    new Spark(),
    new Tornado(),
    new StoneStar(),
    new ExpandFireShield(),
    new ExpandIceShield(),
    new ExpandThunderShield(),
    new ExpandWindShield(),
    new ExpandGroundShield(),
];
