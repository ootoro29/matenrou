import { PComand } from "@/types/game";
import { Command } from "./commands"

export abstract class ProbCommand{
    O = 0;//1:player, -1:enemy
    prob:number[] = []
    commands:Command[] = []
    constructor(commands:Command[],{prob = [100]} = {}){
        this.commands = commands;
        for(let i = 0; i < this.commands.length; i++){
            this.prob.push(prob[i]);
        }
    }
    sample():Command{
        let index = 0;
        let p = 0;
        let rand = Math.random()*100;
        for(let i = 0; i < this.commands.length; i++){
            p += this.prob[i];
            index = i;
            if(p >= rand)break;
        }
        return this.commands[index];
    }
    show():PComand[]{
        let P:PComand[] = [];
        for(let i = 0; i < this.commands.length; i++){
            P.push({command:this.commands[i],prob:this.prob[i]});
        }
        const sorted_P = [...P].sort((a,b) => {
            return -a.prob+b.prob
        });
        return [sorted_P[0],sorted_P[1]];
    }
}

export class PlayerProbCommand extends ProbCommand {
    constructor(commands:Command){
        super([commands],{prob:[100]})
        this.O = 1;
    }
}

export class EnemyProbCommand extends ProbCommand {
    constructor(commands:Command[],{prob = [100]} = {}){
        super(commands,{prob:prob})
        this.O = -1;
    }
}