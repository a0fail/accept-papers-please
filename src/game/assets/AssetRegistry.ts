import Phaser from 'phaser';
import { npcs } from '../data/dialogues';
import { documents } from '../data/documents';
export interface AssetSpec { path?: string; x:number; y:number; width:number; height:number; depth:number; color:number; kind?:'person'|'glass'|'watch'|'hand'|'folder'|'perforation'|'plane'|'pen'|'portrait'|'fabric'|'tray'|'cabinet'|'silhouette' }
// Coordinates are centers. PNGs fit inside width × height, keeping their aspect ratio.
export const assets: Record<string,AssetSpec> = {
 clerkBackground:{x:320,y:90,width:640,height:180,depth:0,color:0x6b473e},
 clerk:{x:280,y:97,width:144,height:160,depth:2,color:0x354653,kind:'person'},
 counter:{x:320,y:173,width:640,height:18,depth:3,color:0x292f2d},
 glass:{x:320,y:90,width:628,height:180,depth:4,color:0xacc8c5,kind:'glass'},
 table:{x:320,y:360,width:640,height:360,depth:0,color:0x376346,kind:'fabric'},
 tray:{x:325,y:211,width:220,height:54,depth:4,color:0x969e98,kind:'tray'},
 waitingBackground:{x:800,y:270,width:320,height:540,depth:0,color:0x93988a},
//  
queue:{
  x:737,y:365,
  width:48,height:156,
  depth:2,
  color:0x263b3c,
  kind:'silhouette'
},
 queue2:{x:794,y:378,width:32,height:72,depth:2,color:0x253b32,kind:'silhouette'},
 chairs:{x:808,y:449,width:220,height:25,depth:1,color:0x494d46},
 player:{
  x:947, y:430,
  width:180, height:345,
  depth:3,
  color:0x263b3c,
  kind:'person'
},
 
hand:{
  x:585, y:460,
  width:104, height:160,
  depth:3, color:0xb6a38a, kind:'hand'
},

watch:{
  x:585, y:481,
  width:42, height:40,
  depth:4, color:0xe1dcbf, kind:'watch'
},

watchHand:{
  x:585, y:481,
  width:2, height:13,
  depth:5, color:0x262e2c
},

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
for(let i=0;i<4;i++)assets[`passport-${i}`]={x:0,y:0,width:i?228:152,height:i?264:198,depth:30,color:i?0xdedbd0:0x672e35};
Object.assign(assets,{

crowd1: {
  x: 686, y: 379,
  width: 44, height: 144,
  depth: 2, color: 0x1b2928,
  kind: 'silhouette'
},
crowd2: {
  x: 733, y: 383,
  width: 44, height: 144,
  depth: 2, color: 0x25302e,
  kind: 'silhouette'
},
crowd3: {
  x: 780, y: 375,
  width: 44, height: 144,
  depth: 2, color: 0x182522,
  kind: 'silhouette'
},
crowd4: {
  x: 827, y: 380,
  width: 44, height: 144,
  depth: 2, color: 0x253431,
  kind: 'silhouette'
},
crowd5: {
  x: 874, y: 378,
  width: 44, height: 144,
  depth: 2, color: 0x1b2928,
  kind: 'silhouette'
},

 passportLogo:{x:0,y:0,width:72,height:72,depth:30,color:0xa09365},
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
assets.passportPortrait.path = 'assets/documents/photo1.png';
assets['photo-0'].path = 'assets/documents/photo1.png';
assets['photo-1'].path = 'assets/documents/photo1.png';
assets['photo-2'].path = 'assets/documents/photo1.png';
assets.passportSignature.path = 'assets/documents/signature.png';
assets.signature.path = assets.passportSignature.path;

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

assets.clerk.path = 'assets/characters/clerk2.png';
assets.clerkStep.path = 'assets/characters/clerk-mouth2.png';

// Дополнительный неподвижный ряд посетителей
const backgroundCrowd = [
  { x: 668, y: 345 },
  { x: 718, y: 350 },
  { x: 768, y: 340 },
  { x: 818, y: 348 },
  { x: 868, y: 343 }
];

backgroundCrowd.forEach((position, i) => {
  assets[`crowdBack${i + 1}`] = {
    x: position.x,
    y: position.y,
    width: 44,
    height: 144,
    depth: 1,
    color: i % 2 === 0 ? 0x25302e : 0x1b2928,
    kind: 'silhouette'
  };
});


 // Светлый прямоугольный вход в конце очереди

assets.queueEntrance = {
  x: 780,
  y: 228,
  width: 33,
  height: 88,
  depth: 0.25,
  color: 0xf1f5e7
};


// Пять рядов толпы, уходящих вдаль
const distantCrowdRows = [
  { row: 3, y: 319, width: 36, height: 114, gap: 36, color: 0x1e2927 },
  { row: 4, y: 294, width: 30, height: 96,  gap: 28, color: 0x1b2623 },
  { row: 5, y: 271, width: 27, height: 78,  gap: 18, color: 0x18221f },
  { row: 6, y: 251, width: 21, height: 60,  gap: 13, color: 0x141e1b },
  { row: 7, y: 230, width: 15, height: 45,  gap: 9, color: 0x101917 }
];

for (const row of distantCrowdRows) {
  for (let i = 0; i < 5; i++) {
    assets[`crowdFar${row.row}-${i + 1}`] = {
      x: 780 + (i - 2) * row.gap,
      y: row.y,
      width: row.width,
      height: row.height,
      depth: 1 - (row.row - 2) * 0.1,
      color: row.color,
      kind: 'silhouette'
    };
  }
}


 // Немного увеличиваем только передний ряд
for (let i = 1; i <= 5; i++) {
  const person = assets[`crowd${i}`];

  person.width = 48;   // Было 44
  person.height = 156; // Было 144
  person.y -= 6;       // Сохраняем положение ног
}




// assets.hand.path = 'assets/characters/hand.png';
export function preloadAssets(scene:Phaser.Scene) { for(const [key,s] of Object.entries(assets)) if(s.path) scene.load.image(key,`${import.meta.env.BASE_URL}${s.path}`); }
export const placeholderKeys = new Set<string>();
export function createPlaceholders(scene:Phaser.Scene) {
 for(const [key,s] of Object.entries(assets)) {
  if(scene.textures.exists(key)) continue;
  placeholderKeys.add(key);
  const g=scene.make.graphics({x:0,y:0}); const w=s.width,h=s.height;
  if(s.kind==='fabric'){g.fillStyle(s.color);g.fillRect(0,0,w,h);for(let y=0;y<h;y+=4)for(let x=0;x<w;x+=4){g.fillStyle(((x/4+y/4)%3)?0x7c7f61:0x36545a);g.fillRect(x+(y%8?1:0),y,1,1);}}
  else if(s.kind==='tray'){g.fillStyle(0x293b35);g.fillRect(3,3,w-3,h-3);g.fillStyle(0x5c6662);g.fillRect(0,0,w-4,h-4);g.fillStyle(0xb0b6ae);g.fillRect(5,6,w-14,h-14);g.fillStyle(0x727c75);g.fillRect(5,6,w-14,5);g.fillRect(5,6,4,h-14);}
  else if(s.kind==='cabinet'){g.fillStyle(0x34443e);g.fillRect(0,0,w,h);g.fillStyle(s.color);g.fillRect(3,3,w-7,h-6);for(let y=7;y<h-20;y+=29){g.fillStyle(0x838d86);g.fillRect(6,y,w-16,25);g.fillStyle(0xc6c8b6);g.fillRect(11,y+4,23,6);g.fillStyle(0x394b43);g.fillRect(22,y+16,20,3);}}
  

else if (s.kind === 'silhouette' && key.startsWith('crowdFar')) {
  const match = key.match(/^crowdFar(\d+)-(\d+)$/);
  const row = Number(match?.[1] ?? 3);
  const person = Number(match?.[2] ?? 1);

  const px = 3;
  const cw = Math.floor(w / px);
  const ch = Math.floor(h / px);

  // Рисуем строго квадратными пикселями
  const rect = (
    x: number, y: number,
    width: number, height: number
  ) => {
    if (width > 0 && height > 0) {
      g.fillRect(
        x * px, y * px,
        width * px, height * px
      );
    }
  };

  g.fillStyle(s.color);

  const bodyW = Math.max(3, cw - 4);
  const bodyX = Math.floor((cw - bodyW) / 2);

  const headW = Math.max(2, Math.round(cw * 0.42));
  const headH = Math.max(3, Math.round(ch * 0.17));
  const headX = Math.floor((cw - headW) / 2);
  const headY = 2;

  const torsoY = headY + headH + 2;
  const waistY = Math.floor(ch * 0.74);
  const legsY = Math.floor(ch * 0.79);

  // Ноги
  const legW = Math.max(1, Math.floor(bodyW * 0.28));
  rect(bodyX, legsY, legW, ch - legsY);
  rect(bodyX + bodyW - legW, legsY, legW, ch - legsY);

  // Туловище
  rect(bodyX, torsoY, bodyW, legsY - torsoY + 1);

  // Короткие руки до пояса
  const armsY = torsoY + 1;
  rect(bodyX - 1, armsY, 1, waistY - armsY);
  rect(bodyX + bodyW, armsY, 1, waistY - armsY);

  // Шея
  rect(Math.floor(cw / 2), headY + headH, 1, 2);

  // Голова
  rect(headX, headY, headW, headH);

  // Разные упрощённые причёски
  const style = (row + person) % 5;

  if (style === 0) {
    // Небольшая шляпа
    rect(headX - 1, headY + 1, headW + 2, 1);
  } else if (style === 1) {
    // Высокая причёска
    rect(headX, headY - 1, headW, 2);
  } else if (style === 2) {
    // Пышные волосы
    rect(headX - 1, headY, headW + 2, 2);
  } else if (style === 3) {
    // Волосы по бокам
    rect(headX - 1, headY + 1, 1, headH + 2);
    rect(headX + headW, headY + 1, 1, headH + 2);
  } else {
    // Причёска с выступом
    rect(headX - 1, headY + 1, headW + 2, 1);
    rect(headX + headW - 1, headY - 1, 2, 2);
  }
}


else if (s.kind === 'silhouette' && key.startsWith('crowdBack')) {
  const v = Number(key.match(/\d+$/)?.[0] ?? 1) - 1;

  const headY = [9, 11, 5, 10, 8][v];
  const headW = [20, 17, 23, 21, 18][v];
  const headX = Math.floor((w - headW) / 2);
  const shoulders = headY + 43;
  const waist = Math.floor(h * 0.72);

  g.fillStyle(s.color);

  // Ноги
  g.fillRect(9, h - 40, 11, 40);
  g.fillRect(w - 20, h - 40, 11, 40);

  // Туловище
  g.fillRect(7, shoulders, w - 14, h - shoulders - 34);

  // Руки до пояса
  g.fillRect(3, shoulders + 10, 9, waist - shoulders - 10);
  g.fillRect(w - 12, shoulders + 10, 9, waist - shoulders - 10);

  // Шея
  g.fillRect(headX + 5, headY + 32, headW - 10, 15);

  // Голова
  g.fillRect(headX, headY + 7, headW, 27);

  if (v === 0) {
    // Мужчина в широкополой шляпе
    g.fillRect(headX - 6, headY + 5, headW + 12, 4);
    g.fillRect(headX - 2, headY - 1, headW + 4, 8);
  } else if (v === 1) {
    // Каре с прямыми краями
    g.fillRect(headX - 4, headY + 5, headW + 8, 8);
    g.fillRect(headX - 4, headY + 10, 5, 32);
    g.fillRect(headX + headW - 1, headY + 10, 5, 32);
  } else if (v === 2) {
    // Объёмные кудри
    g.fillRect(headX - 4, headY - 2, headW + 8, 10);
    g.fillRect(headX - 5, headY + 5, 7, 20);
    g.fillRect(headX + headW - 2, headY + 5, 7, 20);
  } else if (v === 3) {
    // Капюшон
    g.fillRect(headX - 5, headY + 1, headW + 10, 9);
    g.fillRect(headX - 5, headY + 9, 5, 30);
    g.fillRect(headX + headW, headY + 9, 5, 30);
  } else {
    // Высокий пучок
    g.fillRect(headX - 1, headY + 3, headW + 2, 6);
    g.fillRect(headX + 5, headY - 8, 10, 13);
  }
}

else if (s.kind === 'silhouette' && key.startsWith('crowd')) {
  const v = Number(key.match(/\d+$/)?.[0] ?? 1) - 1;

  const headY = [11, 3, 15, 6, 10][v];
  const headW = [18, 20, 17, 19, 18][v];
  const headX = Math.floor((w - headW) / 2);

  const shoulders = headY + 43;
  const waist = Math.floor(h * 0.72);

  // Весь силуэт одного цвета
  g.fillStyle(s.color, 1);

  // Ноги
  g.fillRect(9, h - 37, 12, 37);
  g.fillRect(w - 21, h - 37, 12, 37);

  // Удлинённое туловище
  g.fillRect(
    7, shoulders,
    w - 14,
    h - shoulders - 30
  );

  // Плечи
  g.fillRect(10, shoulders - 5, w - 20, 12);

  // Руки — заканчиваются около пояса
  g.fillRect(
    3, shoulders + 10,
    9, waist - shoulders - 10
  );
  g.fillRect(
    w - 12, shoulders + 10,
    9, waist - shoulders - 10
  );

  // Шея
  g.fillRect(headX + 4, headY + 30, headW - 8, 17);

  // Голова
  g.fillRect(headX, headY + 9, headW, 25);
  g.fillRect(headX + 2, headY + 5, headW - 4, 5);

  // Разные причёски — того же цвета

  if (v === 0) {
    // Короткая стрижка
    g.fillRect(headX - 2, headY + 7, headW + 4, 5);
    g.fillRect(headX - 2, headY + 10, 4, 12);
  }

  if (v === 1) {
    // Пышная причёска
    g.fillRect(headX - 2, headY, headW + 4, 10);
    g.fillRect(headX - 4, headY + 8, 5, 13);
    g.fillRect(headX + headW - 1, headY + 8, 5, 13);
  }

  if (v === 2) {
    // Длинные волосы
    g.fillRect(headX - 3, headY + 6, 5, 41);
    g.fillRect(headX + headW - 2, headY + 6, 5, 41);
    g.fillRect(headX, headY + 2, headW, 7);
  }

  if (v === 3) {
    // Пучок
    g.fillRect(headX - 1, headY + 4, headW + 2, 7);
    g.fillRect(headX + headW - 2, headY - 2, 8, 12);
  }

  if (v === 4) {
    // Кепка
    g.fillRect(headX - 2, headY + 3, headW + 4, 8);
    g.fillRect(headX - 7, headY + 9, 12, 4);
  }
}


else if (key === 'queue') {
  // Аморфный силуэт подбегающего посетителя
  g.fillStyle(s.color, 1);

  const rect = (
    x: number,
    y: number,
    width: number,
    height: number
  ) => g.fillRect(x, y, width, height);

  // Ноги — немного разной формы
  rect(9, 120, 12, 36);
  rect(27, 123, 12, 33);

  // Ступенчатые края ног
  rect(6, 144, 15, 12);
  rect(27, 147, 15, 9);

  // Основное удлинённое туловище
  rect(9, 63, 30, 72);
  rect(6, 78, 36, 45);
  rect(9, 120, 33, 15);

  // Неровные плечи
  rect(9, 57, 18, 15);
  rect(6, 63, 15, 15);

  rect(27, 54, 15, 21);
  rect(33, 60, 12, 18);

  // Левая рука — массивная
  rect(3, 81, 9, 42);
  rect(0, 93, 9, 24);
  rect(3, 117, 9, 12);

  // Правая рука — более узкая
  rect(39, 75, 6, 45);
  rect(42, 90, 6, 21);
  rect(39, 117, 6, 9);

  // Шея
  rect(18, 45, 12, 21);

  // Голова неправильной формы
  rect(12, 21, 24, 27);
  rect(9, 27, 27, 18);
  rect(12, 42, 24, 12);
  rect(15, 51, 18, 6);

  // Неровная верхняя часть головы
  rect(15, 15, 18, 12);
  rect(21, 9, 12, 9);
  rect(24, 6, 9, 6);

  // Боковые выступы
  rect(9, 33, 6, 15);
  rect(36, 24, 6, 12);
  rect(33, 36, 6, 12);

  // Небольшая асимметрия силуэта
  rect(6, 42, 9, 9);
  rect(33, 48, 9, 6);
}

  else if(s.kind==='silhouette'){g.fillStyle(s.color);g.fillRect(10,0,12,17);g.fillRect(6,19,20,33);g.fillRect(2,23,6,31);g.fillRect(25,23,5,31);g.fillRect(8,49,6,23);g.fillRect(19,49,6,23);}
//   else if(s.kind==='hand'){g.fillStyle(0x8e7966);g.fillRect(26,102,57,58);g.fillRect(31,64,45,54);g.fillRect(26,24,54,55);g.fillRect(18,48,16,30);g.fillStyle(s.color);g.fillRect(33,104,45,56);g.fillRect(36,65,35,50);g.fillRect(30,26,43,48);for(let i=0;i<4;i++)g.fillRect(30+i*11,7+(i===0?8:0),9,35);g.fillStyle(0xc7b79c);g.fillRect(36,35,7,55);}
else if (key === 'queueEntrance') {
  g.fillStyle(s.color, 1);
  g.fillRect(0, 0, w, h);
}

else if (s.kind === 'hand') {
  
const outline = 0x86725f;
const shadow = 0xa88b70;
const skin = 0xc2a789;
const light = 0xd3b79a;
const highlight = 0xe0c5a5;
const crease = 0x9a816e;
const nail = 0xe0bca9;


  // Контуры четырёх пальцев
  g.fillStyle(outline);
  g.fillRect(30, 8, 11, 49);
  g.fillRect(42, 3, 11, 55);
  g.fillRect(54, 7, 11, 51);
  g.fillRect(66, 16, 10, 43);

  // Ладонь
  g.fillRect(27, 50, 52, 43);

  // Большой палец — ступенчатый, с плавным сужением
  g.fillRect(26, 69, 14, 21);
  g.fillRect(20, 62, 14, 17);
  g.fillRect(14, 56, 14, 13);

// Узкое запястье
g.fillRect(35, 89, 36, 38);

// Широкое предплечье — начинается выше
g.fillRect(27, 108, 50, 52);

  // Основной цвет пальцев
  g.fillStyle(skin);
  g.fillRect(33, 11, 7, 43);
  g.fillRect(45, 6, 7, 49);
  g.fillRect(57, 10, 7, 45);
  g.fillRect(69, 19, 6, 37);

  // Основной цвет ладони
  g.fillRect(30, 53, 46, 36);

  // Большой палец
  g.fillRect(28, 72, 10, 15);
  g.fillRect(22, 64, 11, 12);
  g.fillRect(16, 58, 10, 9);

// Запястье и предплечье
g.fillRect(38, 89, 30, 35);
g.fillRect(30, 110, 44, 50);

  // Светлые участки пальцев
  g.fillStyle(light);
  g.fillRect(35, 14, 3, 33);
  g.fillRect(47, 9, 3, 38);
  g.fillRect(59, 13, 3, 34);
  g.fillRect(71, 22, 2, 26);

  // Блики на ладони
  g.fillRect(34, 56, 34, 17);
  g.fillRect(35, 76, 25, 7);

  g.fillStyle(highlight);
  g.fillRect(37, 57, 19, 4);
  g.fillRect(36, 80, 13, 3);

  // Ногти
  g.fillStyle(nail);
  g.fillRect(34, 12, 5, 6);
  g.fillRect(46, 7, 5, 6);
  g.fillRect(58, 11, 5, 6);
  g.fillRect(70, 20, 4, 5);
  g.fillRect(17, 59, 6, 4); // Большой палец

  // Светлые края ногтей
  g.fillStyle(highlight);
  g.fillRect(35, 12, 3, 2);
  g.fillRect(47, 7, 3, 2);
  g.fillRect(59, 11, 3, 2);
  g.fillRect(71, 20, 2, 2);

  // Суставы и складки пальцев
  g.fillStyle(crease);
  g.fillRect(34, 39, 5, 2);
  g.fillRect(46, 41, 5, 2);
  g.fillRect(58, 40, 5, 2);
  g.fillRect(70, 42, 4, 2);

  // Тени между пальцами
  g.fillStyle(shadow);
  g.fillRect(40, 50, 2, 8);
  g.fillRect(52, 51, 2, 7);
  g.fillRect(64, 51, 2, 7);

  // Складка и тени большого пальца
  g.fillStyle(crease);
  g.fillRect(25, 69, 3, 7);
  g.fillRect(30, 80, 4, 2);

  g.fillStyle(shadow);
  g.fillRect(29, 78, 3, 8);

  // Тени узкого запястья
  g.fillRect(38, 91, 3, 27);
  g.fillRect(65, 94, 3, 23);

// Тени предплечья
g.fillRect(30, 111, 5, 49);
g.fillRect(70, 113, 4, 47);

// Подсветка предплечья
g.fillStyle(light);
g.fillRect(39, 114, 24, 46);

  // Тень у основания ладони
  g.fillStyle(shadow);
  g.fillRect(37, 86, 28, 3);
}


else if(s.kind==='folder'){g.fillStyle(s.color,.15);g.fillRect(0,0,w,h);g.lineStyle(3,s.color,.8);g.strokeRect(2,2,w-4,h-4);g.lineStyle(1,0xffffff,.5);g.lineBetween(25,10,60,45);g.lineBetween(w-12,20,w-12,h-15);}
  else if(s.kind==='perforation'){g.fillStyle(s.color,.8);g.fillRect(0,0,w,h);g.fillStyle(0x455b50);for(let y=12;y<h;y+=24)g.fillRect(5,y,6,9);}
  else if(s.kind==='plane'){g.fillStyle(s.color);g.fillRect(0,16,w,12);g.fillRect(35,5,20,32);g.fillRect(5,3,8,23);}
  


else if (s.kind === 'pen') {
  const outline = 0x86725f;
  const shadow = 0xa88b70;
  const skin = 0xc2a789;
  const light = 0xd3b79a;
  const highlight = 0xe0c5a5;
  const nail = 0xe0bca9;

  const rect = (
    x: number, y: number,
    width: number, height: number
  ) => g.fillRect(x, y, width, height);

  // ===== РУЧКА =====
  // Сначала рисуем ручку под пальцами

  g.fillStyle(0x253e4a);

  for (let i = 0; i < 12; i++) {
    rect(9 + i * 3, 52 - i * 3, 6, 5);
  }

  // Светлая грань ручки
  g.fillStyle(0x526d78);

  for (let i = 3; i < 10; i++) {
    rect(11 + i * 3, 52 - i * 3, 2, 3);
  }

  // Металлический наконечник
  g.fillStyle(0x849394);
  rect(10, 51, 5, 5);

  // Пишущий кончик
  g.fillStyle(0x172a30);
  rect(8, 54, 3, 3);


  // ===== КОНТУР РУКИ =====

  g.fillStyle(outline);

  // Предплечье из верхнего правого угла
  rect(60, 0, 12, 29);
  rect(57, 6, 15, 27);
  rect(54, 12, 15, 28);
  rect(48, 18, 18, 27);
  rect(42, 24, 19, 22);

  // Ладонь
  rect(35, 20, 23, 26);
  rect(30, 26, 26, 23);
  rect(26, 31, 24, 19);

  // Указательный палец, согнутый вокруг ручки
  rect(27, 19, 15, 10);
  rect(21, 25, 15, 10);
  rect(18, 31, 12, 12);

  // Большой палец поверх ручки
  rect(28, 32, 16, 12);
  rect(25, 38, 15, 12);

  // Средний и безымянный пальцы
  rect(32, 39, 16, 12);
  rect(39, 43, 15, 10);


  // ===== ОСНОВНОЙ ЦВЕТ КОЖИ =====

  g.fillStyle(skin);

  // Предплечье
  rect(63, 0, 9, 27);
  rect(60, 9, 11, 23);
  rect(56, 16, 12, 23);
  rect(50, 24, 13, 18);

  // Ладонь
  rect(36, 23, 19, 20);
  rect(32, 29, 21, 17);

  // Указательный палец
  rect(29, 21, 11, 7);
  rect(23, 27, 11, 7);
  rect(20, 33, 9, 8);

  // Большой палец
  rect(30, 34, 12, 8);
  rect(27, 40, 11, 8);

  // Остальные согнутые пальцы
  rect(34, 41, 12, 8);
  rect(41, 45, 11, 6);


  // ===== СВЕТ И ОБЪЁМ =====

  g.fillStyle(light);

  // Освещённая часть ладони
  rect(39, 25, 13, 8);
  rect(42, 33, 9, 6);

  // Указательный палец
  rect(25, 28, 7, 4);
  rect(21, 34, 5, 4);

  // Большой палец
  rect(31, 35, 8, 4);

  // Предплечье
  rect(64, 5, 6, 18);
  rect(58, 18, 6, 12);

  g.fillStyle(highlight);
  rect(41, 26, 7, 3);
  rect(32, 35, 5, 3);


  // ===== НОГТИ =====

  g.fillStyle(nail);

  rect(20, 34, 6, 5);
  rect(27, 41, 7, 5);
  rect(35, 43, 6, 4);


  // ===== СКЛАДКИ ПАЛЬЦЕВ =====

  g.fillStyle(shadow);

  rect(34, 30, 5, 3);
  rect(39, 40, 5, 3);
  rect(44, 47, 5, 3);
}



  else if(s.kind==='portrait'){g.fillStyle(0xcdd2c7);g.fillRect(0,0,w,h);g.fillStyle(s.color);g.fillRect(w*.2,h*.5,w*.6,h*.5);g.fillRect(w*.32,h*.12,w*.36,h*.33);}
  


else if (key === 'player') {
  // Однотонный пиксельный силуэт в кепке
  g.fillStyle(s.color, 1);

  const rect = (
    x: number, y: number,
    width: number, height: number
  ) => g.fillRect(x, y, width, height);

  // ===== НОГИ =====

  // Левая нога
  rect(49, 260, 37, 76);
  rect(51, 336, 35, 9);

  // Правая нога
  rect(99, 260, 37, 76);
  rect(99, 336, 35, 9);

  // ===== ТУЛОВИЩЕ =====

  // Основное тело, удлинённое
  rect(46, 133, 88, 139);
  rect(43, 153, 94, 117);

  // Нижняя часть одежды
  rect(43, 260, 94, 21);
  rect(47, 278, 86, 8);

  // ===== ПЛЕЧИ =====

  // Левое плечо — ступенчатое
  rect(43, 130, 36, 19);
  rect(35, 138, 44, 20);
  rect(29, 147, 45, 22);
  rect(25, 161, 42, 17);

  // Правое плечо
  rect(101, 130, 36, 19);
  rect(101, 138, 44, 20);
  rect(106, 147, 45, 22);
  rect(113, 161, 42, 17);

  // ===== РУКИ =====

  // Левый рукав
  rect(23, 172, 27, 72);
  rect(25, 238, 28, 19);
  rect(29, 253, 24, 12);

  // Правый рукав
  rect(130, 172, 27, 72);
  rect(127, 238, 28, 19);
  rect(127, 253, 24, 12);

  // Небольшие ступеньки на локтях
  rect(20, 183, 7, 44);
  rect(153, 183, 7, 44);

  // ===== ШЕЯ =====

  rect(79, 101, 25, 39);
  rect(76, 114, 31, 17);

  // ===== ГОЛОВА =====

  // Основная форма головы
  rect(71, 49, 43, 49);
  rect(67, 59, 51, 30);
  rect(74, 94, 37, 12);
  rect(79, 104, 25, 5);

  // Небольшие ступеньки по краям лица
  rect(65, 67, 5, 17);
  rect(116, 67, 5, 17);
  rect(70, 88, 6, 10);
  rect(112, 88, 6, 10);

  // ===== УШИ =====

  // Левое ухо
  rect(58, 70, 9, 17);
  rect(61, 65, 7, 25);
  rect(63, 88, 6, 5);

  // Правое ухо
  rect(119, 70, 9, 17);
  rect(117, 65, 7, 25);
  rect(117, 88, 6, 5);

  // ===== КЕПКА =====

  // Верх кепки — более узкий и округлый
  rect(72, 15, 33, 7);
  rect(66, 21, 45, 8);
  rect(63, 28, 51, 8);
  rect(60, 35, 57, 9);

  // Основная тулья
  rect(58, 43, 62, 10);
  rect(61, 51, 57, 6);

  // Ступенчатый козырёк влево
  rect(48, 43, 39, 7);
  rect(43, 48, 47, 8);
  rect(38, 54, 49, 7);
  rect(42, 61, 37, 5);

  // Нижний край козырька
  rect(47, 65, 24, 4);
}


else if(s.kind==='person') { g.fillStyle(s.color);g.fillRect(w*.12,h*.35,w*.76,h*.65);g.fillStyle(0xb8ad96);g.fillRect(w*.3,0,w*.4,h*.3); }
//   else if(s.kind==='glass') {
//    g.fillStyle(s.color,.13);g.fillRect(0,0,w,h-34);g.fillRect(0,h-34,w/2-48,34);g.fillRect(w/2+48,h-34,w/2-48,34);
//    g.lineStyle(2,0xc7d4c6,.55);g.beginPath();g.arc(w/2,h,48,Math.PI,Math.PI*2);g.strokePath();g.lineBetween(30,15,60,70);g.lineBetween(45,15,75,70);
//   } 

else if (s.kind === 'glass') {

const radius = 48;
const cx = w / 2;
const pixel = 3;
const top = h - radius;

// Основная поверхность стекла
g.fillStyle(s.color, 0.13);
g.fillRect(0, 0, w, top);

// Стекло по бокам проёма
g.fillRect(0, top, cx - radius, radius);
g.fillRect(cx + radius, top, cx - radius, radius);

// Симметричная пиксельная арка
let previousY = top;

for (let offset = 0; offset < radius; offset += pixel) {
  const dx = offset + pixel / 2;

  const arcY = h - Math.sqrt(
    Math.max(0, radius * radius - dx * dx)
  );

  const y = top + Math.round((arcY - top) / pixel) * pixel;

  // Симметричные координаты слева и справа
  const leftX = cx - offset - pixel;
  const rightX = cx + offset;

  // Заполняем стекло над аркой
  g.fillStyle(s.color, 0.13);
  g.fillRect(leftX, top, pixel, y - top);
  g.fillRect(rightX, top, pixel, y - top);

  // Рисуем ступенчатый контур
  g.fillStyle(0xc7d4c6, 0.65);

  const contourTop = Math.min(previousY, y);
  const contourHeight = Math.abs(y - previousY) + pixel;

  g.fillRect(leftX, contourTop, pixel, contourHeight);
  g.fillRect(rightX, contourTop, pixel, contourHeight);

  previousY = y;
}

// Дорисовываем обе ножки арки до нижнего края
g.fillStyle(0xc7d4c6, 0.65);

g.fillRect(
  cx - radius,
  previousY,
  pixel,
  h - previousY
);

g.fillRect(
  cx + radius - pixel,
  previousY,
  pixel,
  h - previousY
);


//   const radius = 48;
//   const cx = w / 2;

//   // Основная полупрозрачная поверхность стекла
//   g.fillStyle(s.color, 0.13);
//   g.fillRect(0, 0, w, h - radius);

//   // Полукруглый прозрачный проём
//   for (let y = h - radius; y < h; y++) {
//     const dy = h - (y + 0.5);
//     const dx = Math.sqrt(radius * radius - dy * dy);

//     const left = Math.floor(cx - dx);
//     const right = Math.ceil(cx + dx);

//     g.fillRect(0, y, left, 1);
//     g.fillRect(right, y, w - right, 1);
//   }

//   const pixel = 3;

//   // Основная поверхность стекла
//   g.fillStyle(s.color, 0.13);
//   g.fillRect(0, 0, w, h - radius);

//   // Пиксельный полукруглый проём
//   let prevLeft: number | null = null;
//   let prevRight: number | null = null;

//   for (let y = h - radius; y < h; y += pixel) {
//     const dy = h - (y + pixel / 2);
//     const dx = Math.sqrt(Math.max(0, radius * radius - dy * dy));

//     const left = Math.round((cx - dx) / pixel) * pixel;
//     const right = Math.round((cx + dx) / pixel) * pixel;

//     // Стекло по бокам проёма
//     g.fillStyle(s.color, 0.13);
//     g.fillRect(0, y, left, pixel);
//     g.fillRect(right, y, w - right, pixel);

//     // Ступенчатый контур из квадратных пикселей
//     g.fillStyle(0xc7d4c6, 0.65);

//     if (prevLeft !== null && prevRight !== null) {
//       g.fillRect(
//         Math.min(prevLeft, left), y,
//         Math.abs(prevLeft - left) + pixel, pixel
//       );

//       g.fillRect(
//         Math.min(prevRight, right), y,
//         Math.abs(prevRight - right) + pixel, pixel
//       );
//     } else {
//       g.fillRect(left, y, pixel, pixel);
//       g.fillRect(right, y, pixel, pixel);
//     }

//     prevLeft = left;
//     prevRight = right;
//   }


//   // Контур полукруглого окошка
//   g.lineStyle(2, 0xc7d4c6, 0.65);
//   g.beginPath();
//   g.arc(cx, h, radius, Math.PI, Math.PI * 2);
//   g.strokePath();

  
//   // Блики слева — один длинный, второй короткий
//   g.lineStyle(3, 0xe7f6ff, 0.4);
//   g.lineBetween(33, 21, 55, 65);
//   g.lineBetween(44, 21, 60, 52);

//   // Центральные блики — строго параллельные
//     g.lineStyle(2, 0xe7f6ff, 0.4);
//     g.lineBetween(182, 105, 201, 143); // Длинный
//     g.lineBetween(193, 105, 206, 131); // Короткий

  
  
//   // Блики справа 
//   g.lineStyle(2, 0xe7f6ff, 0.4);
//   g.lineBetween(w - 122, 81, w - 103, 119); // Длинный
//   g.lineBetween(w - 105, 81, w - 92, 107);  // Короткий


  // Функция рисования пиксельных бликов
  const pixelGlint = (
    x1: number, y1: number,
    x2: number, y2: number,
    alpha: number,
    pixel = 3
  ) => {
    g.fillStyle(0xe8fff1, alpha);

    const steps = Math.ceil(
      Math.max(Math.abs(x2 - x1), Math.abs(y2 - y1)) / pixel
    );

    for (let i = 0; i <= steps; i++) {
      const t = i / steps;

      const x = Math.round(
        (x1 + (x2 - x1) * t) / pixel
      ) * pixel;

      const y = Math.round(
        (y1 + (y2 - y1) * t) / pixel
      ) * pixel;

      g.fillRect(x, y, pixel, pixel);
    }
  };

  // Блики слева
  pixelGlint(33, 21, 55, 65, 0.6);
  pixelGlint(44, 21, 60, 52, 0.6);

  // Блики ближе к центру
  pixelGlint(182, 105, 201, 143, 0.7);
  pixelGlint(193, 105, 206, 131, 0.7);

  // Блики справа
  pixelGlint(w - 122, 81, w - 103, 119, 0.6);
  pixelGlint(w - 105, 81, w - 92, 107, 0.6);




}

  else if(s.kind==='watch') {g.fillStyle(0x293832);g.fillRect(0,h*.3,w,h*.4);g.fillStyle(s.color);g.fillCircle(w/2,h/2,h*.43);g.lineStyle(2,0x293832);for(let i=0;i<12;i++){const a=i*Math.PI/6;g.lineBetween(w/2+Math.sin(a)*13,h/2+Math.cos(a)*13,w/2+Math.sin(a)*16,h/2+Math.cos(a)*16);}}
  else {g.fillStyle(s.color);g.fillRect(0,0,w,h);g.lineStyle(2,0x202d29,.45);g.strokeRect(1,1,w-2,h-2);}
  g.generateTexture(key,w,h);g.destroy();
 }
}
export function sprite(scene:Phaser.Scene,key:string,x?:number,y?:number) {
 const s=assets[key];const image=scene.add.image(x??s.x,y??s.y,key).setDepth(s.depth);
 const ratio=Math.min(s.width/image.width,s.height/image.height);image.setScale(ratio);return image;
}
