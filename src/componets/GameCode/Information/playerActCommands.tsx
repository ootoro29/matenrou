import { CancelTransform, Command, PlayerPhysicalAttack, Transform } from "./commands";

export class PlayerPunch extends PlayerPhysicalAttack {
    initialize(): void {
        this.name = "パンチ";
        this.power = 50;
        this.mei = 90;
        this.description = "右ストレートでぶっ飛ばす";
        this.key = "PlayerPunch"
        this.path = "/assets/player/パンチ";
    }
}

export class PlayerKick extends PlayerPhysicalAttack {
    initialize(): void {
        this.name = "キック";
        this.power = 60;
        this.mei = 75;
        this.description = "蹴り上げる";
        this.key = "PlayerKick"
        this.path = "/assets/player/キック";
    }
}

export class TransformMagicalGirl extends Transform{
    initialize(): void {
        this.name = "魔法少女に変身";
        this.mp = 1;
        this.description = "魔法少女に変身する";
    }
}

export class CancelTransformMagicalGirl extends CancelTransform{
    initialize(): void {
        this.name = "変身解除";
        this.mp = 0;
        this.description = "魔法少女の変身を解除する";
    }
}


export const PlayserActCommands:Command[] = [
    new PlayerPunch(),
    new PlayerKick(),
    new TransformMagicalGirl(),
    new CancelTransformMagicalGirl()
];
