import { Command, PlayerMagicalAndMATAttack, PlayerMagicalAndMDFAttack, PlayerMagicalAndPATAttack, PlayerMagicalAndPDFAttack, PlayerMagicalAndSPAttack, PlayerMagicalAttack, PlayerMagicalShield} from "./commands";
import { Shield } from "./shield/shield";
import { FireShield, GroundShield, IceShield, NormalShield, ThunderShield, WindShield } from "./shield/shields";

export class FireBall extends PlayerMagicalAndMDFAttack{
    initialize(): void {
        this.name = "ファイアーボール";
        this.type = "Fire";
        this.mp = 25;
        this.mei = 100;
        this.power = 100;
        this.description = "火の玉をぶつけて攻撃する。確率で魔法の防御力低下";
        this.key = "PlayerFireBall"
        this.path = "/assets/player/ファイアーボール";
    }
}

export class IceWorld extends PlayerMagicalAndMATAttack{
    initialize(): void {
        this.name = "アイスワールド";
        this.type = "Ice";
        this.mp = 25;
        this.mei = 100;
        this.power = 100;
        this.description = "空間を凍てつかせる。確率で魔法の攻撃力低下";
        this.key = "PlayerIceWorld"
        this.path = "/assets/player/アイスワールド";
    }
}

export class Spark extends PlayerMagicalAndSPAttack{
    initialize(): void {
        this.name = "スパーク";
        this.type = "Thunder";
        this.mp = 25;
        this.mei = 100;
        this.power = 100;
        this.description = "電撃を発生させる。確率で速度低下";
        this.key = "PlayerSpark"
        this.path = "/assets/player/スパーク";
    }
}

export class Tornado extends PlayerMagicalAndPATAttack{
    initialize(): void {
        this.name = "トルネード";
        this.type = "Wind";
        this.mp = 25;
        this.mei = 100;
        this.power = 100;
        this.description = "竜巻を発生させ。確率で物理の攻撃力低下";
        this.key = "PlayerTornado"
        this.path = "/assets/player/トルネード";
    }
}

export class StoneStar extends PlayerMagicalAndPDFAttack{
    initialize(): void {
        this.name = "ストーンスター";
        this.type = "Rock";
        this.mp = 25;
        this.mei = 100;
        this.power = 100;
        this.description = "星型の石をいくつも投げ飛ばす。確率で物理の防御力低下";
        this.key = "PlayerStoneStar"
        this.path = "/assets/player/ストーンスター";
    }
}

export class ExpandNormalShield extends PlayerMagicalShield{
    initialize(): void {
        this.name = this.genSheild().name;
        this.mp = 40;
        this.description = "シールドを展開する。耐久50、耐久が1でも残っていれば全ての攻撃を吸収する。";
    }
    genSheild(): Shield {
        return new NormalShield();
    }
}


export class ExpandFireShield extends PlayerMagicalShield{
    initialize(): void {
        this.name = this.genSheild().name;
        this.mp = 80;
        this.description = "火属性に強いシールドを展開する。耐久20、火属性の攻撃は1に抑える。";
    }
    genSheild(): Shield {
        return new FireShield();
    }
}

export class ExpandIceShield extends PlayerMagicalShield{
    initialize(): void {
        this.name = this.genSheild().name;
        this.mp = 80;
        this.description = "氷属性に強いシールドを展開する。耐久20、氷属性の攻撃は1に抑える。";
    }
    genSheild(): Shield {
        return new IceShield();
    }
}

export class ExpandThunderShield extends PlayerMagicalShield{
    initialize(): void {
        this.name = this.genSheild().name;
        this.mp = 80;
        this.description = "雷属性に強いシールドを展開する。耐久20、雷属性の攻撃は1に抑える。";
    }
    genSheild(): Shield {
        return new ThunderShield();
    }
}

export class ExpandWindShield extends PlayerMagicalShield{
    initialize(): void {
        this.name = this.genSheild().name;
        this.mp = 80;
        this.description = "風属性に強いシールドを展開する。耐久20、風属性の攻撃は1に抑える。";
    }
    genSheild(): Shield {
        return new WindShield();
    }
}

export class ExpandGroundShield extends PlayerMagicalShield{
    initialize(): void {
        this.name = this.genSheild().name;
        this.mp = 80;
        this.description = "土属性に強いシールドを展開する。耐久20、土属性の攻撃は1に抑える。";
    }
    genSheild(): Shield {
        return new GroundShield();
    }
}


export const PlayerMagCommands:Command[] = [
    new ExpandNormalShield(),
    new FireBall(),
    new IceWorld(),
    new Spark(),
    new Tornado(),
    new StoneStar(),
    //new ExpandFireShield(),
    //new ExpandIceShield(),
    //new ExpandThunderShield(),
    //new ExpandWindShield(),
    //new ExpandGroundShield(),
];
