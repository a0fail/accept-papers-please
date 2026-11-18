import {it,expect} from 'vitest';
import {createRunPlan,plannedDay,validRunPlan} from '../src/game/systems/runPlan';
import {days} from '../src/game/data/days';
import {Session} from '../src/game/systems/Session';
import {photoPixels} from '../src/game/systems/mechanics';

it('plans three days without repetitions and survives serialization',()=>{
 for(let seed=1;seed<80;seed++){
  let x=seed;const plan=createRunPlan(()=>{x=(x*16807)%2147483647;return x/2147483647;});
  expect(validRunPlan(JSON.parse(JSON.stringify(plan)))).toBe(true);
  const resolved=days.map((day,i)=>plannedDay(day,plan.days[i]));
  for(const id of ['passport','folder1'])expect(new Set(resolved.map(d=>d.requests.find(r=>r.document===id)!.page)).size).toBe(3);
  expect(resolved[1].requests.find(r=>r.document==='folder2')!.page).not.toBe(resolved[2].requests.find(r=>r.document==='folder2')!.page);
  const sizes=resolved.map(d=>{const r=d.requests.find(r=>r.document==='photo')!;const p=photoPixels(r.page,d.photos);return `${p.width}x${p.height}`;});expect(new Set(sizes).size).toBe(3);
  expect(plannedDay(days[0],plan.days[0])).toEqual(resolved[0]);
 }
});
it('new runs can produce different requests and damaged saves are rejected',()=>{
 expect(createRunPlan(()=>0)).not.toEqual(createRunPlan(()=>.99));expect(validRunPlan({version:1,days:[{}]})).toBe(false);
 const p=createRunPlan();p.days[1].passport=p.days[0].passport;expect(validRunPlan(p)).toBe(false);
});
it('pause preserves time, requests, activity and accepted documents',()=>{
 const s=new Session();s.move('menu');s.start(days[1],()=>0);s.move('active');s.submit('passport',1);s.resolve();s.tick(12);s.activity='signature';s.eventActive=true;
 const request=s.request; s.paused=true;s.tick(500);expect(s.elapsed).toBe(12);expect(s.state).toBe('active');expect(s.request).toBe(request);expect(s.accepted.has('passport')).toBe(true);expect(s.canInteract).toBe(false);
 s.paused=false;s.tick(2);expect(s.elapsed).toBe(14);expect(s.activity).toBe('signature');expect(s.eventActive).toBe(true);
});
it('each planned scenario remains finishable after pause and resume',()=>{
 const plan=createRunPlan(()=>.6);
 for(let i=0;i<3;i++){const s=new Session();s.move('menu');s.start(plannedDay(days[i],plan.days[i]));s.move('active');for(const r of s.day.requests){s.paused=true;s.tick(99);s.paused=false;if(r.minigame)s.completedForms.add(r.document);expect(s.submit(r.document,r.page)).toBe('accepted');s.resolve();}s.finishAnnouncement();expect(s.state).toBe(i===2?'gameEnd':'dayEnd');}
});
