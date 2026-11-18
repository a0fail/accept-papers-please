import { validRunPlan,type RunPlan } from './runPlan';
export interface Save { day: number; completed: number[]; finished: boolean; plan?:RunPlan }
const key='accept-papers-please-v1';
export function readSave(): Save | null { try { const s=JSON.parse(localStorage.getItem(key)??'null') as Save|null; return s && Number.isInteger(s.day) && s.day>=0 && Array.isArray(s.completed) && s.completed.every(n=>Number.isInteger(n)&&n>=0) && typeof s.finished==='boolean'?{...s,plan:validRunPlan(s.plan)?s.plan:undefined}:null; } catch { return null; } }
export function writeSave(save:Save) { try {localStorage.setItem(key,JSON.stringify(save));} catch { /* Private mode: play remains available. */ } }
