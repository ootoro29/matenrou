export function calDamage(AT:number,DF:number,Power:number):number{
    AT *= 0.9+(Math.random()*0.2);
    DF *= 0.9+(Math.random()*0.2);
    const d = (((AT+10)/(DF+10))*Power*0.5 - Math.sqrt(DF));
    if(d >= 0){
        return Math.floor(d);
    }
    return 0;
}

export function calHit(ASP:number,DSP:number,MEI:number,lock:boolean):boolean{
    if(lock)return false;
    const p = MEI + (ASP-DSP)/2;
    let ans:boolean = false;
    if(p <= 0){
        ans = false;
    }else{
        ans = (Math.random()*100 <= p);
    }
    return ans;
}