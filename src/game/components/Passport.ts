import Phaser from 'phaser';
import { character } from '../data/character';
import { sprite,placeholderKeys } from '../assets/AssetRegistry';
// Larger passport text: 12 px instead of 8 px; the cover title is 24 px instead of 16 px.
function text(scene:Phaser.Scene,x:number,y:number,value:string,width:number,size=13){return scene.add.text(x,y,value,{fontFamily:'Tiny5',fontSize:size,color:'#29342f',wordWrap:{width},lineSpacing:2,padding:{bottom:2}}).setResolution(1);}
export function passportView(scene:Phaser.Scene,page:number){
 const c=scene.add.container(0,0),w=page?228:152,h=page?264:198;
 c.add(sprite(scene,`passport-${page}`,0,0));
 if(!placeholderKeys.has(`passport-${page}`))return {root:c,width:w,height:h};
 const border=scene.add.graphics();border.lineStyle(3,0x4d262d);border.strokeRect(-w/2+2,-h/2+2,w-4,h-4);c.add(border);
 if(page===0){
  c.add(sprite(scene,'passportLogo',0,-31));
  c.add(text(scene,0,36,'Passport',136,24).setOrigin(.5,0).setColor('#ddcda2'));
  return {root:c,width:w,height:h};
 }
 c.add(scene.add.rectangle(0,0,w-6,2,0x938e7c));
 if(page===1){
  c.add(text(scene,-98,-117,'Выдан:\nОтделом Министерства Хранения Территориальных Описей и Этнических Табелей Обитания (ХТОЭТО) № 42',196));
  c.add(sprite(scene,'passportPortrait',-78,43));
  c.add(text(scene,-46,14,`${character.fullName.split(' ').join('\n')}\n${character.birthday}\n${character.birthplace}\n${character.passport}`,148));
 }else if(page===2){
  c.add(text(scene,-98,-117,'Семейный статус: гол как сокол\nГруппа крови: на рукаве\n\nПодпись владельца:',196));
  c.add(sprite(scene,'passportSignature',20,-27));
  c.add(text(scene,-98,14,`Гражданство: Бумагия\nМесто рождения: ${character.birthplace}\nАдрес прописки: ${character.address}\n\n${character.passport}`,196));
 }else{
  c.add(text(scene,-98,-115,'ВИЗОВЫЕ ОТМЕТКИ',196));
  c.add(text(scene,-98,-78,'Здесь могло быть море. Пока только бумага',196));
  c.add(text(scene,-98,102,character.passport,196));
 }
 return {root:c,width:w,height:h};
}
