let fxrand;export const FXInit=function(n){"function"==typeof n&&(fxrand=n)};const check=function(){if("function"!=typeof fxrand)throw new Error("fxhash has not been defined, did you call FXInit?")};export const FXRandomBetween=(n,t)=>(check(),n+(t-n)*fxrand());export const FXRandomIntBetween=(n,t)=>(check(),Math.floor(FXRandomBetween(n,t)));export const FXRandomOption=function(n){return check(),n[Math.floor(fxrand()*n.length)]};export const FXRandomBool=function(n){return check(),isNaN(n)&&(n=.5),fxrand()<n};export const FXRandVec2=()=>(check(),[fxrand(),fxrand()]);export const FXRandVec3=()=>(check(),[fxrand(),fxrand(),fxrand()]);export const FXRandVec4=()=>(check(),[fxrand(),fxrand(),fxrand(),fxrand()]);const pick=n=>n[fxrand()*n.length|0];export const getWeightedOption=function(n){check();let t=[];for(let e in n)t=t.concat(new Array(n[e][1]).fill(n[e][0]));return(e=t)[fxrand()*e.length|0];var e};