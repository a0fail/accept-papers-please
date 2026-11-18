import Phaser from 'phaser';
import { label,button,panel,colors } from './ui';
import { sprite,assets } from '../assets/AssetRegistry';
import { documents,consentTitle } from '../data/documents';
import { character } from '../data/character';
import { signatureConfig } from '../data/minigames';
import { bounce,inside,matchesName,type Motion } from '../systems/mechanics';
import type { Activity,DocumentId } from '../types';
export class Minigames {
 private root?:Phaser.GameObjects.Container;private input?:HTMLTextAreaElement;
 private hand?:Phaser.GameObjects.Image;private motion:Motion={...signatureConfig.initial};private locked=false;
 private attempt?:()=>void;private clock?:Phaser.GameObjects.Text;
 constructor(private scene:Phaser.Scene,private finish:(success:boolean)=>void){}
 get active(){return !!this.root;}
 private begin(){this.destroy();this.locked=false;this.root=this.scene.add.container(0,0).setDepth(100);const shield=this.scene.add.rectangle(480,270,960,540,0x182722,.98).setInteractive();this.root.add(shield);return this.root;}
 private scrollCleanup?:()=>void;
 setPaused(paused:boolean){if(this.input)this.input.style.visibility=paused?'hidden':'visible';}
 inspect(id:DocumentId,page:number){
  const root=this.begin(),p=documents[id].pages[page];
  if(id==='passport'){
   root.add(panel(this.scene,245,160,470,165,colors.paper));root.add(label(this.scene,270,192,'Всё и так видно. Или у вас близорукость?',24,'#24362d',420));
  }else{
   root.add(panel(this.scene,321,34,318,450,assets[p.asset].color));
   const title=label(this.scene,337,50,p.title,16,'#24362d',286);root.add(title);
   const y=50+title.height+14,height=466-y;
   const body=label(this.scene,337,y,p.text,16,'#24362d',286);root.add(body);
   const maskShape=this.scene.make.graphics({x:0,y:0});maskShape.fillRect(337,y,286,height);const mask=maskShape.createGeometryMask();body.setMask(mask);
   let offset=0;const scroll=(amount:number)=>{offset=Phaser.Math.Clamp(offset+amount,0,Math.max(0,body.height-height));body.y=y-offset;};
   const wheel=(pointer:Phaser.Input.Pointer,_over:unknown,_dx:number,dy:number)=>{if(pointer.x>=321&&pointer.x<=639)scroll(dy);};
   this.scene.input.on('wheel',wheel);this.scrollCleanup=()=>{this.scene.input.off('wheel',wheel);body.clearMask();mask.destroy();maskShape.destroy();};
   root.add(button(this.scene,687,235,'↑',()=>scroll(-100),52));root.add(button(this.scene,687,295,'↓',()=>scroll(100),52));
  }
  root.add(button(this.scene,480,510,'Вернуться к столу',()=>this.finish(false),280));this.addClock(root);
 }
 
signature() {
  const root = this.begin();
  const paper = sprite(this.scene, 'consentBlank');
  root.add(paper);

  root.add(label(this.scene, 140, 66, consentTitle, 24, '#24362d', 680));
  root.add(label(this.scene, 140, 156, documents.consent.pages[0].text, 16, '#24362d', 680));

  const r = signatureConfig.target;

  root.add(
    this.scene.add.rectangle(
      r.x + r.width / 2,
      r.y + r.height / 2,
      r.width,
      r.height,
      0xb7c4a3
    ).setStrokeStyle(3, 0x405b43)
  );

  root.add(label(this.scene, r.x + 12, r.y + 12, 'ПОДПИСЬ ЗАЯВИТЕЛЯ', 16, '#24362d'));

  this.motion = {...signatureConfig.initial};
  this.hand = sprite(this.scene, 'penHand');
  root.add(this.hand);
  this.positionHand();

  const feedback = label(
    this.scene, 125, 459,
    'НАЖМИТЕ ИЛИ SPACE, КОГДА КОНЧИК РУЧКИ В ПОЛЕ',
    16, '#26362c', 730
  );
  root.add(feedback);

  this.attempt = () => {
    if (this.locked) return;

    if (!inside(this.motion.x, this.motion.y, r)) {
      feedback.setText('Мимо поля. Рука продолжает движение — попробуйте ещё раз.');
      return;
    }

    this.locked = true;
    this.hand?.setVisible(false);

    // Только подпись из PNG, без инициалов
    root.add(sprite(this.scene, 'signature', r.x + 130, r.y + 60));

    feedback.setText('ПОДПИСАНО. Передаём через лоток…');

    this.scene.time.delayedCall(450, () => {
      if (this.root === root) this.finish(true);
    });
  };

  paper.setInteractive().on('pointerdown', () => this.attempt?.());

  this.scene.input.keyboard?.on('keydown-SPACE', this.space, this);

  root.add(button(this.scene, 480, 513, 'Отложить бланк', () => this.finish(false), 250));
  this.addClock(root);
}



 private space(event:KeyboardEvent){event.preventDefault();this.attempt?.();}
 private positionHand(){if(this.hand){this.hand.x=Math.round(this.motion.x-signatureConfig.tipOffset.x);this.hand.y=Math.round(this.motion.y-signatureConfig.tipOffset.y);}}
 name(){const root=this.begin();root.add(sprite(this.scene,'queueBlank',320,265));root.add(panel(this.scene,610,85,295,340,colors.paper));root.add(label(this.scene,78,78,'СОГЛАСИЕ НА УЧАСТИЕ В ОЧЕРЕДИ',24,'#24362d',480));root.add(label(this.scene,78,146,documents.queueConsent.pages[0].text,16,'#24362d',470));root.add(label(this.scene,632,110,'ПАСПОРТ / ФИО',24,'#24362d',250));root.add(label(this.scene,632,180,character.fullName,24,'#24362d',245));root.add(label(this.scene,632,326,`${character.passport}\n${character.birthday}`,16,'#24362d',245));root.add(label(this.scene,78,235,'ПЕРЕПЕЧАТАЙТЕ ФИО ИЗ ПАСПОРТА',16,'#24362d',480));
  const input=document.createElement('textarea');input.className='name-entry';input.setAttribute('aria-label','ФИО из паспорта');input.setAttribute('autocomplete','off');input.spellcheck=false;input.maxLength=120;input.value=this.savedName;this.input=input;
  const field=this.scene.add.dom(320,315,input);root.add(field);input.addEventListener('input',()=>{this.savedName=input.value;});input.addEventListener('keydown',e=>e.stopPropagation());
  const feedback=label(this.scene,78,378,'Регистр и лишние пробелы не учитываются.',16,'#405b43',470);root.add(feedback);
  root.add(button(this.scene,320,438,'Подтвердить ФИО',()=>{if(this.locked)return;if(!matchesName(input.value)){feedback.setText('ФИО не соответствует паспорту. Проверьте буквы, включая Ъ.').setColor('#863e36');return;}this.locked=true;input.disabled=true;feedback.setText('ФИО СОВПАДАЕТ. БЛАНК ЗАПОЛНЕН.').setColor('#405b43');this.scene.time.delayedCall(400,()=>{if(this.root===root)this.finish(true);});},280));root.add(button(this.scene,480,513,'Отложить бланк',()=>this.finish(false),250));this.addClock(root);input.focus();
 }
 private savedName='';
 reset(){this.savedName='';this.destroy();}
 private addClock(root:Phaser.GameObjects.Container){this.clock=label(this.scene,20,10,'',16);root.add(this.clock);}
 update(dt:number,remaining:number,paused:boolean,activity:Activity){this.clock?.setText(`ВРЕМЯ ПРИЁМА: ${Math.ceil(remaining)} с${paused?' • ПАУЗА':''}`);if(activity==='signature'&&!paused&&!this.locked){this.motion=bounce(this.motion,signatureConfig.bounds,dt);this.positionHand();}}
 destroy(){this.scrollCleanup?.();this.scrollCleanup=undefined;this.scene.input.keyboard?.off('keydown-SPACE',this.space,this);this.root?.destroy();this.root=undefined;this.input?.remove();this.input=undefined;this.hand=undefined;this.clock=undefined;this.attempt=undefined;}
}
