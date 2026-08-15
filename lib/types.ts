export type CountMode="exact"|"one-percent"|"three-percent"|"custom";
export type Register="preserve"|"academic"|"professional"|"technical"|"creative";
export type FidelityReport={meaningPreserved:boolean;unsupportedAdditions:string[];materialOmissions:string[];notes:string[]};
export type ProtectionReport={total:number;retained:number;missing:string[]};
