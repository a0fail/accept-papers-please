import Phaser from 'phaser';
import { npcs } from '../data/dialogues';
import { documents } from '../data/documents';
export interface AssetSpec { path?: string; x:number; y:number; width:number; height:number; depth:number; color:number; kind?:'person'|'glass'|'watch'|'hand'|'folder'|'perforation'|'plane'|'pen'|'portrait'|'fabric'|'tray'|'cabinet'|'silhouette' }
// Coordinates are centers. PNGs fit inside width × height, keeping their aspect ratio.
export const assets: Record<string,AssetSpec> = {
 clerkBackground:{x:320,y:90,width:640,height:180,depth:0,color:0x50443e},
 clerk:{x:280,y:97,width:144,height:160,depth:2,color:0x354653,kind:'person'},
 counter:{x:320,y:173,width:640,height:18,depth:3,color:0x292f2d},
 glass:{x:320,y:90,width:628,height:180,depth:4,color:0xacc8c5,kind:'glass'},
 table:{x:320,y:360,width:640,height:360,depth:0,color:0x56685e,kind:'fabric'},
 tray:{x:325,y:211,width:220,height:54,depth:4,color:0x969e98,kind:'tray'},
 waitingBackground:{x:800,y:270,width:320,height:540,depth:0,color:0x93988a},
 queue:{x:737,y:365,width:32,height:72,depth:2,color:0x253b32,kind:'silhouette'},
 queue2:{x:794,y:378,width:32,height:72,depth:2,color:0x253b32,kind:'silhouette'},
 chairs:{x:808,y:449,width:220,height:25,depth:1,color:0x494d46},
 player:{x:936,y:460,width:120,height:230,depth:3,color:0x263b3c,kind:'person'},
 hand:{x:570,y:460,width:104,height:160,depth:3,color:0xb6a38a,kind:'hand'},
 watch:{x:570,y:473,width:40,height:40,depth:4,color:0xe1dcbf,kind:'watch'},
 watchHand:{x:570,y:473,width:2,height:13,depth:5,color:0x262e2c},
 stamp:{x:325,y:340,width:220,height:65,depth:30,color:0x426d4a}
};
// Each new visual is independently replaceable. Mechanics use logical bounds, not PNG dimensions.
Object.assign(assets, {
 folderShell:{x:0,y:0,width:244,height:236,depth:16,color:0xb8d8dd,kind:'folder'},
 folderBlue:{x:0,y:0,width:244,height:236,depth:16,color:0x68aab9,kind:'folder'},
 perforation:{x:0,y:0,width:16,height:236,depth:17,color:0xd9ded1,kind:'perforation'},
 paper:{x:0,y:0,width:230,height:224,depth:15,color:0xe9e0c4},
 ruler:{x:0,y:0,width:120,height:24,depth:26,color:0xcdbb83},
 traySlide:{x:325,y:210,width:200,height:46,depth:18,color:0x9ca39b},
 penHand:{x:0,y:0,width:72,height:60,depth:100,color:0xb9a78e,kind:'pen'},
 signature:{x:0,y:0,width:140,height:28,depth:101,color:0x3d5365},
 consentBlank:{x:480,y:270,width:750,height:442,depth:90,color:0xe9e0c4},
 queueBlank:{x:350,y:270,width:520,height:410,depth:90,color:0xe9e0c4},
 portrait:{x:0,y:0,width:64,height:90,depth:16,color:0x586f71,kind:'portrait'},
 dialogPanel:{x:0,y:0,width:280,height:110,depth:60,color:0xe4dfc7},
});
for(const npc of Object.values(npcs)) for(const frame of npc.frames) assets[frame]={x:800,y:380,width:120,height:180,depth:65,color:0x526369,kind:'person'};
for(let i=0;i<3;i++)assets[`plane-${i}`]={x:0,y:0,width:100,height:40,depth:70,color:0xdfe5d6,kind:'plane'};
for(const doc of Object.values(documents)) assets[`${doc.id}-cover`]={x:0,y:0,width:144,height:51,depth:10,color:doc.color};
for(const doc of Object.values(documents)) for(const page of doc.pages) assets[page.asset]={x:0,y:0,width:230,height:224,depth:10,color:page.paperColor??0xe9e0c4};
for(let i=0;i<4;i++)assets[`passport-${i}`]={x:0,y:0,width:152,height:i?264:132,depth:30,color:i?0xdedbd0:0x672e35};
Object.assign(assets,{
 passportLogo:{x:0,y:0,width:48,height:48,depth:30,color:0xa09365},
 passportPortrait:{x:0,y:0,width:40,height:52,depth:30,color:0x586f71,kind:'portrait'},
 passportSignature:{x:0,y:0,width:88,height:22,depth:30,color:0x687c82},
 cabinet1:{x:70,y:91,width:62,height:164,depth:1,color:0x626f6b,kind:'cabinet'},
 cabinet2:{x:151,y:91,width:62,height:164,depth:1,color:0x626f6b,kind:'cabinet'},
 clerkStep:{x:280,y:97,width:144,height:160,depth:2,color:0x354653,kind:'person'},
 queueStep:{x:850,y:362,width:32,height:72,depth:2,color:0x253b32,kind:'silhouette'},
});
// Собственные изображения. Генерацию заглушек выше не удаляем.
// assets.clerk.path = 'assets/characters/clerk.png';
assets.passportLogo.path = 'assets/documents/logo.png';

// assets['npc-1'].path = 'assets/characters/sixseven1.png';
// assets['npc-1-step'].path = 'assets/characters/sixseven2.png';

assets['npc-1'].path = 'assets/characters/baron1.png';
assets['npc-1-step'].path = 'assets/characters/baron22.png';

assets['npc-2'].path = 'assets/characters/sixseven1.png';
assets['npc-2-step'].path = 'assets/characters/sixseven2.png';

assets['npc-3'].path = 'assets/characters/cat0.png';
assets['npc-3-step'].path = 'assets/characters/caty1.png';
assets['npc-3-2'].path = 'assets/characters/caty2.png';
assets['npc-3-3'].path = 'assets/characters/caty3.png';

// assets.hand.path = 'assets/characters/hand.png';
export function preloadAssets(scene:Phaser.Scene) { for(const [key,s] of Object.entries(assets)) if(s.path) scene.load.image(key,`${import.meta.env.BASE_URL}${s.path}`); }
export const placeholderKeys = new Set<string>();
export function createPlaceholders(scene:Phaser.Scene) {
 for(const [key,s] of Object.entries(assets)) {
  if(scene.textures.exists(key)) continue;
  placeholderKeys.add(key);
  const g=scene.make.graphics({x:0,y:0}); const w=s.width,h=s.height;
  if(s.kind==='fabric'){g.fillStyle(s.color);g.fillRect(0,0,w,h);for(let y=0;y<h;y+=4)for(let x=0;x<w;x+=4){g.fillStyle(((x/4+y/4)%3)?0x596b61:0x52645a);g.fillRect(x+(y%8?1:0),y,1,1);}}
  else if(s.kind==='tray'){g.fillStyle(0x293b35);g.fillRect(3,3,w-3,h-3);g.fillStyle(0x5c6662);g.fillRect(0,0,w-4,h-4);g.fillStyle(0xb0b6ae);g.fillRect(5,6,w-14,h-14);g.fillStyle(0x727c75);g.fillRect(5,6,w-14,5);g.fillRect(5,6,4,h-14);}
  else if(s.kind==='cabinet'){g.fillStyle(0x34443e);g.fillRect(0,0,w,h);g.fillStyle(s.color);g.fillRect(3,3,w-7,h-6);for(let y=7;y<h-20;y+=29){g.fillStyle(0x838d86);g.fillRect(6,y,w-16,25);g.fillStyle(0xc6c8b6);g.fillRect(11,y+4,23,6);g.fillStyle(0x394b43);g.fillRect(22,y+16,20,3);}}
  else if(s.kind==='silhouette'){g.fillStyle(s.color);g.fillRect(10,0,12,17);g.fillRect(6,19,20,33);g.fillRect(2,23,6,31);g.fillRect(25,23,5,31);g.fillRect(8,49,6,23);g.fillRect(19,49,6,23);}
  else if(s.kind==='hand'){g.fillStyle(0x8e7966);g.fillRect(26,102,57,58);g.fillRect(31,64,45,54);g.fillRect(26,24,54,55);g.fillRect(18,48,16,30);g.fillStyle(s.color);g.fillRect(33,104,45,56);g.fillRect(36,65,35,50);g.fillRect(30,26,43,48);for(let i=0;i<4;i++)g.fillRect(30+i*11,7+(i===0?8:0),9,35);g.fillStyle(0xc7b79c);g.fillRect(36,35,7,55);}
  else if(s.kind==='folder'){g.fillStyle(s.color,.15);g.fillRect(0,0,w,h);g.lineStyle(3,s.color,.8);g.strokeRect(2,2,w-4,h-4);g.lineStyle(1,0xffffff,.5);g.lineBetween(25,10,60,45);g.lineBetween(w-12,20,w-12,h-15);}
  else if(s.kind==='perforation'){g.fillStyle(s.color,.8);g.fillRect(0,0,w,h);g.fillStyle(0x455b50);for(let y=12;y<h;y+=24)g.fillRect(5,y,6,9);}
  else if(s.kind==='plane'){g.fillStyle(s.color);g.fillRect(0,16,w,12);g.fillRect(35,5,20,32);g.fillRect(5,3,8,23);}
  else if(s.kind==='pen'){g.fillStyle(s.color);g.fillRect(24,0,48,38);g.fillStyle(0x253e4a);g.fillTriangle(8,50,36,5,43,9);}
  else if(s.kind==='portrait'){g.fillStyle(0xcdd2c7);g.fillRect(0,0,w,h);g.fillStyle(s.color);g.fillRect(w*.2,h*.5,w*.6,h*.5);g.fillRect(w*.32,h*.12,w*.36,h*.33);}
  else if(s.kind==='person') { g.fillStyle(s.color);g.fillRect(w*.12,h*.35,w*.76,h*.65);g.fillStyle(0xb8ad96);g.fillRect(w*.3,0,w*.4,h*.3); }
  else if(s.kind==='glass') {
   g.fillStyle(s.color,.13);g.fillRect(0,0,w,h-34);g.fillRect(0,h-34,w/2-48,34);g.fillRect(w/2+48,h-34,w/2-48,34);
   g.lineStyle(2,0xc7d4c6,.55);g.beginPath();g.arc(w/2,h,48,Math.PI,Math.PI*2);g.strokePath();g.lineBetween(30,15,60,70);g.lineBetween(45,15,75,70);
  } else if(s.kind==='watch') {g.fillStyle(0x293832);g.fillRect(0,h*.3,w,h*.4);g.fillStyle(s.color);g.fillCircle(w/2,h/2,w*.43);g.lineStyle(2,0x293832);for(let i=0;i<12;i++){const a=i*Math.PI/6;g.lineBetween(w/2+Math.sin(a)*13,h/2+Math.cos(a)*13,w/2+Math.sin(a)*16,h/2+Math.cos(a)*16);}}
  else {g.fillStyle(s.color);g.fillRect(0,0,w,h);g.lineStyle(2,0x202d29,.45);g.strokeRect(1,1,w-2,h-2);}
  g.generateTexture(key,w,h);g.destroy();
 }
}
export function sprite(scene:Phaser.Scene,key:string,x?:number,y?:number) {
 const s=assets[key];const image=scene.add.image(x??s.x,y??s.y,key).setDepth(s.depth);
 const ratio=Math.min(s.width/image.width,s.height/image.height);image.setScale(ratio);return image;
}
