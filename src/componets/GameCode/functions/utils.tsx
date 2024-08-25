export function D100(){
    return Math.random()*100;
}

export function DPN(P:number[]){
    let sum = 0;
    for(let i = 0; i < P.length; i++){
        sum += P[i];
    }
    const rnd = Math.random()*sum;
    let p = 0;
    let index = -1;
    for(let i = 0; i < P.length; i++){
        p+= P[i];
        if(rnd < p){
            index = i;
            break;
        }
    }
    return index;
}