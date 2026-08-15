import type{Register}from"./types.ts";
const registers:Record<Register,string>={preserve:"Preserve the source register, formality, technical depth and seriousness.",academic:"Use rigorous academic prose without canned scholarly phrasing or inflated abstraction.",professional:"Use clear professional prose with deliberate emphasis rather than corporate boilerplate.",technical:"Use precise technical prose and preserve necessary domain terminology.",creative:"Use distinctive natural prose with stronger rhythm while preserving meaning."};
export function reconstructionPrompt(a:{protectedText:string;targetWords:number;register:Register}){return`Reconstruct the passage from its meaning rather than paraphrasing its sentences.

Before writing, silently identify the passage's factual claims, qualifications, causal links, stance, hierarchy of importance, and the point the writer is actually making. Then express that same thought afresh.

RULES
- Preserve every material claim, qualification, citation, number, name, causal relationship, uncertainty and stance.
- Do not invent evidence, facts, examples, implications or opinions.
- Do not add deliberate mistakes, misspellings, bad grammar, fake slang or arbitrary fragments. Natural writing can be flawless.
- Do not use synonym substitution as the main rewriting method. Rebuild clause order, emphasis, sentence boundaries and paragraph movement where meaning permits.
- Allow selective emphasis. Do not make every sentence equally polished, equally long, equally explicit or rhetorically symmetrical.
- Prefer concrete, context-sensitive wording over generic abstractions. Avoid canned transitions, automatic summaries, repetitive sentence templates and predictable "claim-explain-conclude" rhythm.
- Vary sentence architecture for a reason, not randomly. Keep the writing coherent and controlled.
- Keep every token shaped like ⟦P0001⟧ exactly unchanged and appropriately placed.
- ${registers[a.register]}
- Aim closely for ${a.targetWords} words, but natural expression and fidelity are more important than forcing the count inside this generation step.

Return ONLY valid JSON in this shape:
{"candidates":["candidate one","candidate two","candidate three"]}

The three candidates must communicate the same meaning but make genuinely different structural and expressive choices. They must not simply swap synonyms.

PASSAGE
${a.protectedText}`;}
export function precisionPrompt(a:{unit:string;targetWords:number;delta:number}){return`Edit ONLY the text unit below. Preserve its exact meaning and every ⟦P0001⟧-style token. Return only the revised unit, with no explanation.

Current change required: ${a.delta>0?`add exactly ${a.delta} word${a.delta===1?"":"s"}`:`remove exactly ${Math.abs(a.delta)} word${a.delta===-1?"":"s"}`}.
Target length for this unit: EXACTLY ${a.targetWords} words.

Use a natural local edit: compress or expand phrasing, alter a clause, or make an implicit connection explicit only when it is already entailed. Do not introduce a new factual claim. Do not rewrite the surrounding passage.

UNIT
${a.unit}`;}
export function fidelityPrompt(original:string,rewritten:string){return`Compare ORIGINAL and REWRITE for semantic fidelity only. Check claims, qualifications, causality, stance, scope, uncertainty, named entities, numbers and citations. Return ONLY JSON: {"meaningPreserved":true,"unsupportedAdditions":[],"materialOmissions":[],"notes":[]}\n\nORIGINAL:\n${original}\n\nREWRITE:\n${rewritten}`;}
