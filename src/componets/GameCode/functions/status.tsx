
export function calNormalPAT(lv:number):number{
    return Math.floor(4+lv*0.15+0.006*lv*lv);
}
export function calNormalMAT(lv:number):number{
    return Math.floor(lv*0.1+0.01*lv*lv);
}
export function calNormalPDF(lv:number):number{
    return Math.floor(5-lv*0.1+0.028*lv*lv);
}
export function calNormalMDF(lv:number):number{
    return Math.floor(lv*0.15+0.02*lv*lv);
}
export function calNormalSP(lv:number):number{
    return Math.floor(8+lv*0.8+0.03*lv*lv);
}
export function calTransformPAT(lv:number):number{
    return Math.floor(8+lv*1.4+0.033*lv*lv);
}
export function calTransformMAT(lv:number):number{
    return Math.floor(12+lv*2.1+0.06*lv*lv);
}
export function calTransformPDF(lv:number):number{
    return Math.floor(18+lv*0.9+0.042*lv*lv);
}
export function calTransformMDF(lv:number):number{
    return Math.floor(24+lv*1.7+0.12*lv*lv);
}
export function calTransformSP(lv:number):number{
    return Math.floor(40+lv*1.65+0.092*lv*lv);
}
export function calHP(lv:number):number{
    return Math.floor(99+1.2*lv+0.25*lv*lv);
}
export function calMP(lv:number):number{
    return Math.floor(57+3*lv+0.2*lv*lv);
}
export function calCP(lv:number):number{
    return Math.floor(29+1.5*lv+0.102*lv*lv);
}
export function calEXP(lv:number):number{
    return Math.floor(0.05*lv*lv*lv+0.6*lv*lv+lv*2+3);
}
export function calStage(stage:number):number{
    if(stage < 0)return 6/(6-stage);
    if(stage > 0)return (6+stage)/6;
    else return 1;
}
export function calNumberFromBit(n:number,bit:number):number[]{
    let ans:number[] = []
    for(let i = 0; i < n; i++){
        ans.push(bit&(1 << i));
    }
    return ans;
}
export function calBitOr(ind:number,bit:number):number{
    let ans = bit;
    const mask = Math.pow(2,ind);
    ans |= mask;
    return ans;
}
export function calBitFromNumber(number:number[]):number{
    let ans = 0;
    for(let i = 0; i < number.length; i++){
        ans += number[i]*Math.pow(2,i);
    }
    return ans;
}