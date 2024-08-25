import { PlayerItemHPHeel, PlayerItemMPHeel } from "./commands";

export class HPDrinkCommand extends PlayerItemHPHeel{
    initialize(): void {
        this.index = 0;
    }
}

export class HPTankCommand extends PlayerItemHPHeel{
    initialize(): void {
        this.index = 1;
    }
}

export class MPBinCommand extends PlayerItemMPHeel{
    initialize(): void {
        this.index = 2;
    }
}

export class MPDrinkCommand extends PlayerItemMPHeel{
    initialize(): void {
        this.index = 3;
    }
}

export class MPTankCommand extends PlayerItemMPHeel{
    initialize(): void {
        this.index = 4;
    }
}
