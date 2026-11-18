import { describe,it,expect } from 'vitest';
import { Session } from '../src/game/systems/Session';
import { days } from '../src/game/data/days';
const active=(day=0)=>{const s=new Session();s.move('menu');s.start(days[day],()=>0);s.move('active');return s;};
describe('document processing',()=>{
 it('accepts correct page, prevents duplicate and advances request',()=>{const s=active();expect(s.submit('passport',1)).toBe('accepted');expect(s.index).toBe(1);expect(s.submit('passport',1)).toBe('duplicate');expect(s.submit('folder1',0)).toBe('locked');s.resolve();expect(s.request.document).toBe('folder1');});
 it('rejects another document without advancing',()=>{const s=active();expect(s.submit('photo',0)).toBe('document');s.resolve();expect(s.index).toBe(0);expect(s.state).toBe('active');});
 it('rejects incorrect page',()=>{const s=active();expect(s.submit('passport',0)).toBe('page');s.resolve();expect(s.accepted.size).toBe(0);});
 for(const [index,day] of days.entries())it(`day ${day.number}: full scenario ${day.outcome}`,()=>{const s=active(index);for(const r of s.day.requests){if(r.minigame){expect(s.submit(r.document,r.page)).toBe('incomplete');s.activity=r.minigame;s.tick(5);expect(s.canInteract).toBe(false);s.activity=null;s.completedForms.add(r.document);}expect(s.submit(r.document,r.page)).toBe('accepted');s.resolve();}if(day.announcement){expect(s.state).toBe('announcement');s.finishAnnouncement();}expect(s.state).toBe(day.outcome==='success'?'gameEnd':'dayEnd');const elapsed=s.elapsed;s.tick(999);expect(s.elapsed).toBe(elapsed);});
 it('rejects incorrect photograph and preserves requested size',()=>{const s=active();for(let i=0;i<2;i++){s.submit(s.request.document,s.request.page);s.resolve();}expect(s.submit('photo',1)).toBe('page');s.resolve();expect(s.request.page).toBe(0);expect(s.submit('photo',0)).toBe('accepted');});
});
describe('clock and guards',()=>{
 it('expires and restarts cleanly',()=>{const s=active();s.tick(s.day.duration);expect(s.state).toBe('timeout');s.tick(20);expect(s.elapsed).toBe(s.day.duration);s.start(days[0]);expect(s.elapsed).toBe(0);expect(s.accepted.size).toBe(0);expect(s.state).toBe('intro');});
 it('pauses while hidden and during intro',()=>{const s=active();s.tick(30,true);expect(s.elapsed).toBe(0);s.tick(30);expect(s.elapsed).toBe(30);s.move('menu');s.start(days[0]);s.tick(10);expect(s.elapsed).toBe(0);});
 it('continues during all minigames and NPC, blocking submissions',()=>{const s=active();for(const a of ['inspect','signature','name'] as const){s.activity=a;s.tick(10);expect(s.submit('passport',1)).toBe('locked');}s.activity=null;s.eventActive=true;s.tick(10);expect(s.submit('passport',1)).toBe('locked');expect(s.elapsed).toBe(40);s.eventActive=false;expect(s.canInteract).toBe(true);});
 it('times out during nonfinal checking, stops after final submission',()=>{const s=active();s.submit('passport',1);s.tick(s.day.duration);s.resolve();expect(s.state).toBe('timeout');const f=active();for(const r of f.day.requests){f.submit(r.document,r.page);if(f.index<f.day.requests.length)f.resolve();}f.tick(999);expect(f.elapsed).toBe(0);f.resolve();expect(f.state).toBe('announcement');});
 it('guards conflicting transitions',()=>{const s=active();expect(s.move('intro')).toBe(false);expect(s.start(days[1])).toBe(false);expect(s.day.number).toBe(1);});
});
