import { Command } from "../commands";
import { HPDrinkCommand } from "../playerItemCommands";
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
        return new HPDrinkCommand();
    }
}

export class MPBin extends Item {
    initialize(): void {
        this.power = 50;
        this.name = "MPビン";
        this.description = "MPを50回復する。";
    }
    genCommand(): Command {
        return new HPDrinkCommand();
    }
}

export class MPDrink extends Item {
    initialize(): void {
        this.power = 150;
        this.name = "MPドリンク";
        this.description = "MPを150回復する。";
    }
    genCommand(): Command {
        return new HPDrinkCommand();
    }
}

export class MPTank extends Item {
    initialize(): void {
        this.power = 400;
        this.name = "MPタンク";
        this.description = "MPを400回復する。";
    }
    genCommand(): Command {
        return new HPDrinkCommand();
    }
}