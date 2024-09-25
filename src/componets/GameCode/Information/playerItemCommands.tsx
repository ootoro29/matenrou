import { PlayerItemHPHeel, PlayerItemMATUp, PlayerItemMDFUp, PlayerItemMPHeel, PlayerItemPATUp, PlayerItemPDFUp, PlayerItemSPUp } from "./commands";

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

export class PATCrystalCommand extends PlayerItemPATUp{
    initialize(): void {
        this.index = 5;
    }
}

export class MATCrystalCommand extends PlayerItemMATUp{
    initialize(): void {
        this.index = 6;
    }
}

export class PDFCrystalCommand extends PlayerItemPDFUp{
    initialize(): void {
        this.index = 7;
    }
}

export class MDFCrystalCommand extends PlayerItemMDFUp{
    initialize(): void {
        this.index = 8;
    }
}

export class SPCrystalCommand extends PlayerItemSPUp{
    initialize(): void {
        this.index = 9;
    }
}