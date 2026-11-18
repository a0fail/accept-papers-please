import { describe,it,expect } from 'vitest';
import { attemptDay,remainingPages,submissionKey,matchesName,photoPixels,bounce,inside,queueDue } from '../src/game/systems/mechanics';
import { days } from '../src/game/data/days';
import { documents } from '../src/game/data/documents';
import { character } from '../src/game/data/character';
import { photoConfig,signatureConfig } from '../src/game/data/minigames';
import { dialogues,npcs } from '../src/game/data/dialogues';
describe('folders and stable requests',()=>{
 it('exposes 4 and 3 independent sheets with document numbers, dates and stamps',()=>{
  expect(documents.folder1.pages).toHaveLength(4);
  expect(documents.folder2.pages).toHaveLength(3);
  const pages=[...documents.folder1.pages,...documents.folder2.pages];
  expect(new Set(pages.map(p=>p.sheetId)).size).toBe(7);
  for(const p of pages){
   expect(p.sheetId).toBeTruthy();
   expect(p.text).toMatch(/№\s*\S+/);
   expect(p.text).toMatch(/\b\d{2}\.\d{2}\.\d{4}\b/);
   expect(p.text).toMatch(/\[ (ПЕЧАТЬ|ШТАМП): .+ \]/);
  }
  for(const p of documents.folder1.pages) expect(p.text).toContain(character.fullName);
 });
 it('removes only the submitted sheet',()=>{const accepted=new Set([submissionKey('folder1',2)]);expect(remainingPages('folder1',accepted)).toEqual([0,1,3]);expect(remainingPages('folder2',accepted)).toEqual([0,1,2]);});
 it('selects all possible sheets without changing config or rerolling',()=>{for(let i=0;i<4;i++){const day=attemptDay(days[0],()=>i/4);expect(day.requests[1].page).toBe(i);expect(day.requests[1].speech).toContain(documents.folder1.pages[i].title);for(let n=0;n<10;n++)expect(day.requests[1].page).toBe(i);}expect(days[0].requests[1].page).toBe(0);});
 it('second folder supports all sheets',()=>{for(let i=0;i<3;i++)expect(attemptDay(days[1],()=>i/3).requests[2].page).toBe(i);});
});
describe('measurement, typing and signature',()=>{
 it('uses the same physical scale as eighth-vershok ruler ticks',()=>{expect(photoPixels(0)).toEqual({width:48,height:60});expect(photoPixels(1).width-photoPixels(0).width).toBe(photoConfig.pixelsPerVershok/8);expect(photoPixels(2)).toEqual({width:72,height:84});});
 it('accepts Cyrillic FIO, case and repeated spaces, but not missing hard sign',()=>{expect(matchesName('  '+character.fullName.toUpperCase().replaceAll(' ','   ')+' ')).toBe(true);expect(matchesName(character.fullName.replace('ъ',''))).toBe(false);expect(matchesName(character.fullName.slice(0,-1))).toBe(false);});
 it('reflects with overshoot and preserves speed',()=>{const b={x:0,y:0,width:100,height:100};expect(bounce({x:95,y:5,vx:20,vy:-20},b,1)).toEqual({x:85,y:15,vx:-20,vy:20});const result=bounce({x:10,y:20,vx:1000,vy:-1000},b,10);expect(result.x).toBeGreaterThanOrEqual(0);expect(result.x).toBeLessThanOrEqual(100);expect(Math.abs(result.vx)).toBe(1000);});
 it('pen tip reaches target repeatedly without random trajectory changes',()=>{let motion={...signatureConfig.initial};let hits=0;for(let i=0;i<60*45;i++){motion=bounce(motion,signatureConfig.bounds,1/60);if(inside(motion.x,motion.y,signatureConfig.target))hits++;}expect(hits).toBeGreaterThan(180);});
 it('uses pen tip rather than sprite center',()=>{const target=signatureConfig.target;expect(inside(target.x-1,target.y+30,target)).toBe(false);expect(inside(target.x+1,target.y+30,target)).toBe(true);});
});
describe('queue scheduling',()=>{
 it('defers while dragging/checking/minigame, triggers once at safe moment',()=>{expect(queueDue(22,18,false,false)).toBe(false);expect(queueDue(22,18,false,true)).toBe(true);expect(queueDue(23,18,true,true)).toBe(false);expect(queueDue(10,18,false,true)).toBe(false);});
 it('configures four replaceable NPCs and player/NPC replies',()=>{expect(Object.keys(npcs)).toHaveLength(4);expect(dialogues.impatience[0].speaker).toBe('npc');expect(dialogues.impatience.some(l=>l.speaker==='player')).toBe(true);});
});
