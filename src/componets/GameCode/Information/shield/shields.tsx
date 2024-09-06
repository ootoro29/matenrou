import { Shield } from "./shield";

export class BarrierShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 50;
        this.name = "バリア"
    }
}
export class FireBarrierShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 20;
        this.name = "ファイアバリア"
    }
}
export class IceBarrierShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 20;
        this.name = "アイスバリア"
    }
}
export class ThunderBarrierShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 20;
        this.name = "サンダーバリア"
    }
}
export class WindBarrierShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 20;
        this.name = "ウィンドバリア"
    }
}
export class GroundBarrierShield extends Shield{
    constructor(){
        super()
        this.HP = this.HP_MAX = 20;
        this.name = "グランドバリア"
    }
}