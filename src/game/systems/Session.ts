import type { DayConfig, DocumentId, GameState, Activity } from '../types';
import { attemptDay, submissionKey } from './mechanics';
export type Verdict = 'accepted' | 'document' | 'page' | 'duplicate' | 'locked' | 'incomplete';
const edges: Record<GameState, GameState[]> = {
 loading:['menu'], menu:['intro'], intro:['active','menu'], active:['checking','timeout','menu'],
 checking:['active','announcement','dayEnd','gameEnd','timeout','menu'], announcement:['dayEnd','gameEnd','menu'],
 dayEnd:['transition','menu'], transition:['intro'], gameEnd:['menu','intro'], timeout:['intro','menu']
};
export class Session {
 paused=false;
 state: GameState = 'loading'; day!: DayConfig; elapsed=0; index=0; accepted = new Set<string>(); activity:Activity=null; eventActive=false; completedForms=new Set<DocumentId>();
 move(next: GameState) { if(!edges[this.state].includes(next)) return false; this.state=next; return true; }
 start(day: DayConfig, random=Math.random) { if(!this.move('intro')) return false; this.paused=false;this.day=attemptDay(day,random);this.activity=null;this.eventActive=false;this.completedForms.clear(); this.elapsed=0; this.index=0; this.accepted.clear(); return true; }
 get canInteract(){return !this.paused&&this.state==='active'&&!this.activity&&!this.eventActive;}
 get request() { return this.day.requests[this.index]; }
 submit(id: DocumentId,page:number): Verdict {
  if(this.accepted.has(submissionKey(id,page))) return 'duplicate';
  if(!this.canInteract) return 'locked';
  if(this.request.minigame && id===this.request.document && !this.completedForms.has(id)) return 'incomplete';
  this.move('checking');
  if(id!==this.request.document) return 'document';
  if(page!==this.request.page) return 'page';
  this.accepted.add(submissionKey(id,page)); this.index++; return 'accepted';
 }
 resolve() { if(this.state!=='checking') return; this.move(this.index<this.day.requests.length?'active':this.day.announcement?'announcement':this.day.outcome==='success'?'gameEnd':'dayEnd'); }
 finishAnnouncement() { if(this.state==='announcement') this.move(this.day.outcome==='success'?'gameEnd':'dayEnd'); }
 tick(seconds:number,hidden=false) { if(this.paused || hidden || !['active','checking'].includes(this.state) || this.index>=this.day.requests.length) return; this.elapsed=Math.min(this.day.duration,this.elapsed+Math.max(0,seconds)); if(this.elapsed>=this.day.duration) this.move('timeout'); }
}
