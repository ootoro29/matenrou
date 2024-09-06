import { Shield } from "./shield";

export class NormalShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 50;
        this.name = "シールド"
    }
}
export class FireShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 20;
        this.name = "ファイアシールド"
    }
}
export class IceShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 20;
        this.name = "アイスシールド"
    }
}
export class ThunderShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 20;
        this.name = "サンダーシールド"
    }
}
export class WindShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 20;
        this.name = "ウィンドシールド"
    }
}
export class GroundShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 20;
        this.name = "グランドシールド"
    }
}