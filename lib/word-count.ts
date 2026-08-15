import type{CountMode}from"./types.ts";
const segmenter=new Intl.Segmenter("en",{granularity:"word"});
export function countWords(text:string){if(!text.trim())return 0;return Array.from(segmenter.segment(text)).filter(p=>p.isWordLike).length;}
export function targetFor(input:number,mode:CountMode,custom?:number){if(mode==="custom"){if(!Number.isInteger(custom)||(custom??0)<1)throw new Error("Custom target must be a positive whole number.");return{preferred:custom as number,min:custom as number,max:custom as number};}const tolerance=mode==="one-percent"?.01:mode==="three-percent"?.03:0;const delta=Math.floor(input*tolerance);return{preferred:input,min:Math.max(1,input-delta),max:input+delta};}
export function isWithinTarget(count:number,target:{min:number;max:number}){return count>=target.min&&count<=target.max;}
