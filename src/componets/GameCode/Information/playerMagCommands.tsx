import { CancelTransform, Command, PlayerMagicCommand, PlayerPhysicalAttack, Transform } from "./commands";

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


export const PlayserMagCommands:PlayerMagicCommand[] = [
    new TransformMagicalGirl(),
    new CancelTransformMagicalGirl()
];
