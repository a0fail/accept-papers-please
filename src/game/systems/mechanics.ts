import type { DayConfig, DocumentId } from '../types';
import { documents } from '../data/documents';
import { character } from '../data/character';
import { photoConfig } from '../data/minigames';
export function attemptDay(day:DayConfig,random= Math.random):DayConfig {
 return {...day,documents:[...day.documents],requests:day.requests.map(r=>{
  const page=r.choices?.[Math.min(r.choices.length-1,Math.floor(random()*r.choices.length))]??r.page;
  return {...r,page,speech:r.choices?`${r.speech}${documents[r.document].pages[page].title}.`:r.speech};
 })};
}
export function submissionKey(id:DocumentId,page:number){return documents[id].kind==='folder'?`${id}:${page}`:id;}
export function remainingPages(id:DocumentId,accepted:ReadonlySet<string>){return documents[id].pages.map((_,i)=>i).filter(i=>!accepted.has(submissionKey(id,i)));}
export function normalizeName(value:string){return value.normalize('NFC').trim().replace(/\s+/g,' ').toLocaleLowerCase('ru');}
export function matchesName(value:string){return normalizeName(value)===normalizeName(character.fullName);}
export function photoPixels(index:number,sizes=photoConfig.sizes){const p=sizes[index];return {width:p.width*photoConfig.pixelsPerVershok,height:p.height*photoConfig.pixelsPerVershok};}
export interface Motion {x:number;y:number;vx:number;vy:number}
export interface Rect {x:number;y:number;width:number;height:number}
function reflect(p:number,v:number,dt:number,min:number,size:number){const raw=p-min+v*dt;const period=2*size;const t=((raw%period)+period)%period;return {p:min+(t<=size?t:period-t),v:v*(t<size?1:-1)};}
export function bounce(m:Motion,b:Rect,dt:number):Motion {const x=reflect(m.x,m.vx,dt,b.x,b.width),y=reflect(m.y,m.vy,dt,b.y,b.height);return {x:x.p,y:y.p,vx:x.v,vy:y.v};}
export function inside(x:number,y:number,r:Rect){return x>=r.x&&x<=r.x+r.width&&y>=r.y&&y<=r.y+r.height;}
export function queueDue(elapsed:number,at:number,occurred:boolean,safe:boolean){return !occurred&&elapsed>=at&&safe;}
