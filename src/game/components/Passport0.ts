import Phaser from 'phaser';
import { character } from '../data/character';
import { sprite,placeholderKeys } from '../assets/AssetRegistry';
// Eight logical pixels is the native small-text grid; no fractional text scaling.
function text(scene:Phaser.Scene,x:number,y:number,value:string,width:number,size=8){return scene.add.text(x,y,value,{fontFamily:'Tiny5',fontSize:size,color:'#29342f',wordWrap:{width},lineSpacing:2,padding:{bottom:2}}).setResolution(1);}
export function passportView(scene:Phaser.Scene,page:number){
 const c=scene.add.container(0,0),w=152,h=page?264:132;
 c.add(sprite(scene,`passport-${page}`,0,0));
 if(!placeholderKeys.has(`passport-${page}`))return {root:c,width:w,height:h};
 const border=scene.add.graphics();border.lineStyle(3,0x4d262d);border.strokeRect(-75,-h/2+1,150,h-2);c.add(border);
 if(page===0){c.add(sprite(scene,'passportLogo',0,-16));c.add(text(scene,-50,35,'ПАСПОРТ',100,16).setColor('#ddcda2'));return {root:c,width:w,height:h};}
 c.add(scene.add.rectangle(0,0,146,2,0x938e7c));
 if(page===1){
  c.add(text(scene,-64,-117,'Выдан Отделом Министерства Хранения Территориальных Описей и Этнических Табелей Обитания (ХТОЭТО) № 42',128));
  c.add(sprite(scene,'passportPortrait',-46,43));
  c.add(text(scene,-20,14,`${character.fullName.split(' ').join('\n')}\n\n${character.birthday}\n${character.birthplace}\n${character.passport}`,86));
 }else if(page===2){
  c.add(text(scene,-64,-117,'Семейный статус: гол как сокол\n\nГруппа крови: на рукаве\n\nПодпись владельца:',128));c.add(sprite(scene,'passportSignature',-15,-31));
  c.add(text(scene,-64,14,`Гражданство: Бумагия\n\nМесто рождения: ${character.birthplace}\n\nАдрес прописки: ${character.address}\n\n${character.passport}`,128));
 }else{c.add(text(scene,-64,-115,'ВИЗОВЫЕ ОТМЕТКИ',128));c.add(text(scene,-64,-78,'Здесь могло быть море. Пока только бумага',128));c.add(text(scene,-64,102,character.passport,128));}
 return {root:c,width:w,height:h};
}
