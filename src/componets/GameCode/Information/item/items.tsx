import { Command } from "../commands";
import { HPDrinkCommand, HPTankCommand, MATCrystalCommand, MDFCrystalCommand, MPBinCommand, MPDrinkCommand, MPTankCommand, PATCrystalCommand, PDFCrystalCommand, SPCrystalCommand } from "../playerItemCommands";
import {Item } from "./item";

export class HPDrink extends Item {
    initialize(): void {
        this.power = 80;
        this.name = "HPドリンク";
        this.description = "HPを80回復する。";
    }
    genCommand(): Command {
        return new HPDrinkCommand();
    }
}

export class HPTank extends Item {
    initialize(): void {
        this.power = 300;
        this.name = "HPタンク";
        this.description = "HPを300回復する。";
    }
    genCommand(): Command {
        return new HPTankCommand();
    }
}

export class MPBin extends Item {
    initialize(): void {
        this.power = 50;
        this.name = "MPビン";
        this.description = "MPを50回復する。";
    }
    genCommand(): Command {
        return new MPBinCommand();
    }
}

export class MPDrink extends Item {
    initialize(): void {
        this.power = 150;
        this.name = "MPドリンク";
        this.description = "MPを150回復する。";
    }
    genCommand(): Command {
        return new MPDrinkCommand();
    }
}

export class MPTank extends Item {
    initialize(): void {
        this.power = 400;
        this.name = "MPタンク";
        this.description = "MPを400回復する。";
    }
    genCommand(): Command {
        return new MPTankCommand();
    }
}

export class PATCrystal extends Item {
    initialize(): void {
        this.power = 400;
        this.name = "剛力の結晶";
        this.description = "PATを1段階上げる";
    }
    genCommand(): Command {
        return new PATCrystalCommand();
    }
}

export class MATCrystal extends Item {
    initialize(): void {
        this.power = 400;
        this.name = "魔力の結晶";
        this.description = "MATを1段階上げる";
    }
    genCommand(): Command {
        return new MATCrystalCommand();
    }
}

export class PDFCrystal extends Item {
    initialize(): void {
        this.power = 400;
        this.name = "鉄壁の結晶";
        this.description = "PDFを1段階上げる";
    }
    genCommand(): Command {
        return new PDFCrystalCommand();
    }
}

export class MDFCrystal extends Item {
    initialize(): void {
        this.power = 400;
        this.name = "魔防の結晶";
        this.description = "MDFを1段階上げる";
    }
    genCommand(): Command {
        return new MDFCrystalCommand();
    }
}

export class SPCrystal extends Item {
    initialize(): void {
        this.power = 400;
        this.name = "俊敏の結晶";
        this.description = "SPを1段階上げる";
    }
    genCommand(): Command {
        return new SPCrystalCommand();
    }
}