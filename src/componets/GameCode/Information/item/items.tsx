import { Command } from "../commands";
import { HPDrinkCommand } from "../playerItemCommands";
import {Item } from "./item";

export class HPDrink extends Item {
    initialize(): void {
        this.power = 80;
        this.name = "HPドリンク";
        this.discription = "HPを80回復する。";
    }
    genCommand(): Command {
        return new HPDrinkCommand();
    }
}

export class HPTank extends Item {
    initialize(): void {
        this.power = 300;
        this.name = "HPタンク";
        this.discription = "HPを300回復する。";
    }
    genCommand(): Command {
        return new HPDrinkCommand();
    }
}

export class MPBin extends Item {
    initialize(): void {
        this.power = 50;
        this.name = "MPビン";
        this.discription = "MPを50回復する。";
    }
    genCommand(): Command {
        return new HPDrinkCommand();
    }
}

export class MPDrink extends Item {
    initialize(): void {
        this.power = 150;
        this.name = "MPドリンク";
        this.discription = "MPを150回復する。";
    }
    genCommand(): Command {
        return new HPDrinkCommand();
    }
}

export class MPTank extends Item {
    initialize(): void {
        this.power = 400;
        this.name = "MPタンク";
        this.discription = "MPを400回復する。";
    }
    genCommand(): Command {
        return new HPDrinkCommand();
    }
}