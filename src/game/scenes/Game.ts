import Phaser from 'phaser';
import { Session } from '../systems/Session';
import { readSave,writeSave,type Save } from '../systems/save';
import { createRunPlan,plannedDay } from '../systems/runPlan';
import { queueDue } from '../systems/mechanics';
import { days } from '../data/days';
import { documents } from '../data/documents';
import { sprite } from '../assets/AssetRegistry';
import { Desk } from '../components/Desk';
import { PhotoRuler } from '../components/PhotoRuler';
import { Minigames } from '../components/Minigames';
import { QueueEvent } from '../components/QueueEvent';
import { PlayerReply } from '../components/PlayerReply';
import { label,button,panel,PixelDialog,colors } from '../components/ui';
import type { DocumentId } from '../types';
import { AudioManager } from '../systems/AudioManager';
import { openCreatorPage } from '../data/creator';

export class Game extends Phaser.Scene {

private addSoundToggle(x: number, y: number) {
  let control: Phaser.GameObjects.Container | undefined;

  const render = () => {
    control?.destroy();

    control = button(
      this,
      x,
      y,
      this.audio.enabled ? 'ЗВУК: ВКЛ' : 'ЗВУК: ВЫКЛ',
      () => {
        this.audio.toggle();
        render();
      },
      190
    );
  };

  render();
}

 private audio!: AudioManager;
 private session=new Session();private dayIndex=0;private save:Save={day:0,completed:[],finished:false};
 private desk?:Desk;private clerk?:Phaser.GameObjects.Image;private hand?:Phaser.GameObjects.Image;
 private speech?:PixelDialog;private board?:Phaser.GameObjects.Text;private notice?:Phaser.GameObjects.Container;private introNotice=true;
 private counter?:Phaser.GameObjects.Text;private ruler?:PhotoRuler;private mini!:Minigames;
 private queue!:QueueEvent;private reply?:PlayerReply;private queueOccurred=false;
 private issued?:Phaser.GameObjects.Container;private shownEnd=false;private suspended=false;
 constructor(){super('game');}
 create(){
//   this.mini=new Minigames(this,success=>this.finishMinigame(success));
//   this.queue=new QueueEvent(this,()=>{this.session.eventActive=false;if(this.session.state==='active')this.speech?.root.setVisible(true);});
  
    this.mini = new Minigames(
        this,
        success => this.finishMinigame(success)
    );

    this.audio = new AudioManager(this);

    this.queue = new QueueEvent(
        this,
        () => {
            this.session.eventActive = false;

            if (this.session.state === 'active') {
            this.speech?.root.setVisible(true);
            }
        },
        this.audio
    );

    this.session.move('menu');this.menu();
  window.addEventListener('blur',this.pauseClock);window.addEventListener('focus',this.resumeClock);document.addEventListener('visibilitychange',this.visibility);
  this.events.once('shutdown',()=>{this.clear();window.removeEventListener('blur',this.pauseClock);window.removeEventListener('focus',this.resumeClock);document.removeEventListener('visibilitychange',this.visibility);});
 }
 private pauseClock=()=>{this.suspended=true;this.ruler?.cancel();};
 private resumeClock=()=>{this.suspended=false;this.game.loop.resetDelta();};
 private visibility=()=>{if(document.hidden)this.pauseClock();else this.resumeClock();};
 private clear(){
  this.events.emit('screen-clear');this.reply?.destroy();this.reply=undefined;this.ruler?.destroy();this.ruler=undefined;
  this.mini?.reset();this.queue?.destroy();this.speech?.destroy();this.speech=undefined;
  this.audio?.resetForScreen();
  this.tweens.killAll();this.time.removeAllEvents();this.children.removeAll(true);
  this.notice=undefined;this.board=undefined;this.desk=undefined;this.hand=undefined;this.issued=undefined;this.shownEnd=false;
 }
 private backdrop(){this.cameras.main.setBackgroundColor('#1c2925');panel(this,35,35,890,470);label(this,70,55,'МИНИСТЕРСТВО ПЕРЕМЕЩЕНИЙ / ОКНО 04',16,'#bbc2a5');}
 private menu(){
  this.clear();this.backdrop();this.session.state='menu';this.session.activity=null;this.session.eventActive=false;
  const saved=readSave();label(this,78,125,'Accept Papers,\nPlease',48);label(this,80,260,'По эту сторону стекла.',24,'#c4c8ab');
  label(this,650,160,'04',80,'#b3b69a');label(this,600,265,'ПАПКИ • СПРАВКИ • ОЧЕРЕДЬ',16,'#b3b69a');
//   button(this,200,335,'Начать',()=>{this.audio.startAmbient();this.save={day:0,completed:[],finished:false,plan:createRunPlan()};writeSave(this.save);this.intro(0);});
//   if(saved)button(this,200,385,'Продолжить',()=>{this.audio.startAmbient();this.save=saved;this.intro(Math.min(saved.day,days.length-1));});
    
    button(this, 200, 335, 'Начать', () => {
    // Автоматически включаем звук
    if (!this.audio.enabled) {
        this.audio.toggle();
    }

    this.audio.startAmbient();

    this.save = {
        day: 0,
        completed: [],
        finished: false,
        plan: createRunPlan()
    };

    writeSave(this.save);
    this.intro(0);
    });

    if (saved) {
    button(this, 200, 385, 'Продолжить', () => {
        // Автоматически включаем звук
        if (!this.audio.enabled) {
        this.audio.toggle();
        }

        this.audio.startAmbient();

        this.save = saved;
        this.intro(Math.min(saved.day, days.length - 1));
    });
    }

  button(this,200,435,'Как играть',()=>this.help());
  this.addSoundToggle(750, 385);
  button(this,750,435,'О создателе — a0fail',openCreatorPage,190);
 }
 private help(){this.clear();this.backdrop();label(this,85,106,'ПОРЯДОК ПОДАЧИ',32);label(this,85,163,
  '1. Нажмите на паспорт или файлик. Стрелки меняют лист.\n2. «Читать» открывает документ крупно. Часы продолжают идти.\n3. Отпустите нужный лист внутри лотка под стеклом.\n4. Фото измеряйте линейкой: её ноль совмещается с краем.\n5. Согласие подпишите кликом или Space, когда кончик в поле.\n6. Перепечатайте ФИО из паспорта. Ъ имеет значение.\n7. Посетителям отвечайте кнопкой «Далее». Время идёт!\n\nНа приём: 1½, 2 и 2½ минуты. Скрытая вкладка ставит часы на паузу.',16,'#eee6ce',780);button(this,230,455,'В главное меню',()=>this.menu(),280);}
 private intro(index:number){
  this.save.plan??=createRunPlan();
  if(!this.session.start(plannedDay(days[index],this.save.plan.days[index])))return;this.dayIndex=index;this.save.day=index;writeSave(this.save);this.clear();this.queueOccurred=false;this.backdrop();
  label(this,100,130,`ДЕНЬ ${days[index].number}`,48);label(this,100,208,days[index].name,32);label(this,100,266,days[index].intro,24,'#c4c6aa',730);
  label(this,100,318,`Время приёма: ${this.session.day.duration} секунд`,16,'#c4c6aa');
  button(this,240,390,'Подойти к окну',()=>{if(this.session.move('active'))this.play();},280);this.cameras.main.fadeIn(240);
  this.addSoundToggle(750, 385);
  button(this,750,435,'О создателе — a0fail',openCreatorPage,190);
}

private animateCrowd(
  image: Phaser.GameObjects.Image,
  distance = 8,
  speed = 110
) {
  const startX = Math.round(image.x);

  let offset = 0;
  let direction = 1;

  this.time.addEvent({
    delay: speed,
    loop: true,
    callback: () => {
      if (!image.active) return;

      offset += direction;

      if (offset >= distance) {
        direction = -1;
      } else if (offset <= 0) {
        direction = 1;
      }

      image.x = startX + offset;
    }
  });
}

 private play(){
  this.clear();for(const key of ['clerkBackground','cabinet1','cabinet2','table','waitingBackground','crowdBack1',
'crowdBack2',
'crowdBack3',
'crowdBack4',
'crowdBack5', 
// 'chairs',
'crowd1',
'crowd2',
'crowd3',
'crowd4',
'crowd5','player','clerk','counter','glass','tray','hand','watch']){
   const image=sprite(this,key);if(key==='clerk')this.clerk=image;
   
if (/^crowd[1-5]$/.test(key)) {
  this.animateCrowd(image, 4, 320);
}

  }

  // Вход в конце очереди
  sprite(this, 'queueEntrance');

  // Дальние ряды толпы
  for (let row = 7; row >= 3; row--) {
    for (let i = 1; i <= 5; i++) {
      const key = `crowdFar${row}-${i}`;
      const person = sprite(this, key);

      // Движутся только нечётные ряды
      if (row % 2 === 1) {
        const distance =
          row === 3 ? 6 :
          row === 5 ? 4 : 3;

        const speed =
          row === 3 ? 170 :
          row === 5 ? 220 : 270;

        this.animateCrowd(person, distance, speed);
      }
    }
  }

  this.add.rectangle(640,270,8,540,0x23352f).setDepth(6);


  this.add.rectangle(640,270,8,540,0x23352f).setDepth(6);
  panel(this,20,26,190,58,0x253c34,6);
  label(this,32,35,'ВИЗОВЫЙ ЦЕНТР\nПорядок прежде всего',16,'#adbc9a');
  panel(this,680,20,260,88,0x253c34,6);label(this,700,33,'ЭЛЕКТРОННАЯ ОЧЕРЕДЬ',16,'#adbc9a');label(this,707,60,'ТАЛОН: 65',32,'#d5dbad');
  this.introNotice=true;this.showNotice('Просьба соблюдать очередь.\nСправочное окно временно закрыто.');
  label(this,325,211,'ЛОТОК ПОДАЧИ ↓',16,'#263831').setOrigin(.5).setDepth(5);
  label(this,470,200,'ПОРЯДОК ПОДАЧИ:\n1. Выберите док-т →\n2. Найдите стр-цу →\n3. Положите в лоток',16,'#e6e6c8',156).setDepth(3);
  this.speech=new PixelDialog(this,334,28,292,82,'clerk',60);
  this.counter=label(this,20,200,'',16,'#e6e6c8',190).setDepth(3);

  this.hand=sprite(this,'watchHand').setOrigin(.5,1);
  this.desk=new Desk(this,this.session.day.documents,()=>this.session.canInteract,(id,p)=>this.submit(id,p),(id,p)=>this.inspect(id,p),id=>this.openForm(id),this.session.day.photos);
  this.reply=new PlayerReply(this,()=>this.session.canInteract&&!this.desk?.dragging,()=>28+(this.speech?.height??82)+8);
//   button(this,890,467,'МЕНЮ',()=>this.pause(true),110).setDepth(200);
//   button(this,890,513,'ПАУЗА',()=>this.pause(false),110).setDepth(200);
  button(
    this, 890, 510,
    'МЕНЮ',
    () => this.pause(false),
    110
    );
  const credit=label(this,890,478,'by a0fail',16).setOrigin(.5).setAlpha(.55).setDepth(50).setInteractive({useHandCursor:true});
  credit.on('pointerover',()=>credit.setAlpha(.85));
  credit.on('pointerout',()=>credit.setAlpha(.55));
  credit.on('pointerdown',openCreatorPage);
  this.request();this.cameras.main.fadeIn(200);
 }
 private showNotice(message:string){
  this.notice?.destroy();this.notice=this.add.container(660,120).setDepth(20);
  const heading=label(this,16,12,'ОБЪЯВЛЕНИЯ',16),body=label(this,16,42,message,16,'#e4e5d0',248);
  this.board=body;this.notice.add([panel(this,0,0,282,Math.max(90,body.height+58),0x697c62),heading,body]);
 }
//  private pause(confirm:boolean){
//   if(this.session.paused||!['active','checking','announcement'].includes(this.session.state))return;
//   this.desk?.cancel();this.ruler?.cancel();this.session.paused=true;this.mini.setPaused(true);
//   const resume=()=>{this.session.paused=false;this.mini.setPaused(false);this.scene.resume('game');this.game.loop.resetDelta();};
//   this.scene.launch('pause',{confirm,resume,exit:()=>{resume();this.session.move('menu');this.menu();}});this.scene.pause('game');
//  }

private pause(confirm: boolean) {
  if (
    this.session.paused ||
    !['active', 'checking', 'announcement'].includes(
      this.session.state
    )
  ) {
    return;
  }

  this.desk?.cancel();
  this.ruler?.cancel();

  this.session.paused = true;
  this.mini.setPaused(true);

  const resume = () => {
    this.session.paused = false;
    this.mini.setPaused(false);
    this.scene.resume('game');
    this.game.loop.resetDelta();
  };

  this.scene.launch('pause', {
    confirm,
    resume,

    exit: () => {
      resume();
      this.session.move('menu');
      this.menu();
    },

    soundEnabled: () => this.audio.enabled,

    toggleSound: () => {
      this.audio.toggle();
    }
  });

  this.scene.pause('game');
}

 private clerkTalkTimer?: Phaser.Time.TimerEvent;
 private clerkTalkEnd?: Phaser.Time.TimerEvent;
//  private say(text:string){this.speech?.show(text);if(this.clerk)this.tweens.add({targets:this.clerk,y:this.clerk.y-3,yoyo:true,duration:100});}
 
private say(text: string) {
  this.speech?.show(text);
  this.audio.playClerk();

  if (this.clerk) {
    this.tweens.add({
      targets: this.clerk,
      y: this.clerk.y - 3,
      yoyo: true,
      duration: 100
    });
  }

  if (!this.clerk) return;

  // Останавливаем предыдущую анимацию
  this.clerkTalkTimer?.remove();
  this.clerkTalkEnd?.remove();

  let mouthOpen = false;

  // Чередуем два кадра
  this.clerkTalkTimer = this.time.addEvent({
    delay: 200,
    loop: true,
    callback: () => {
      if (!this.clerk?.active) return;

      mouthOpen = !mouthOpen;
      this.clerk.setTexture(
        mouthOpen ? 'clerkStep' : 'clerk'
      );
    }
  });

  // Заканчиваем разговор через 1.5 секунды
  this.clerkTalkEnd = this.time.delayedCall(1500, () => {
    this.clerkTalkTimer?.remove();
    this.clerk?.setTexture('clerk');
  });

  // Сохраняем старую анимацию движения
  this.tweens.add({
    targets: this.clerk,
    y: this.clerk.y - 3,
    yoyo: true,
    duration: 100
  });
}

private request(){
  const r=this.session.request;if(!r)return;this.say(r.speech);
  this.counter?.setText(`ДЕНЬ ${this.dayIndex+1} • ${this.session.index}/${this.session.day.requests.length}`);
  this.reply?.schedule(r.replyPool);
  if(r.issueRuler&&!this.ruler)this.ruler=new PhotoRuler(this,()=>this.session.canInteract);
  if(!r.issueRuler&&this.ruler){this.ruler.destroy();this.ruler=undefined;}
  if(r.minigame==='signature'&&!this.issued){this.issued=this.add.container(325,185).setDepth(45);const paper=sprite(this,'traySlide',0,0).setInteractive({useHandCursor:true});this.issued.add([paper,label(this,-80,-10,'Подписать согласие',16,'#24362d')]);paper.on('pointerdown',()=>this.openForm(r.document));this.tweens.add({targets:this.issued,y:215,duration:350});}
  if(r.minigame==='name')this.openForm(r.document);
 }
 private inspect(id:DocumentId,page:number){if(!this.session.canInteract)return;this.reply?.clear();this.session.activity='inspect';this.mini.inspect(id,page);}
 private openForm(id:DocumentId){
  if(!this.session.canInteract)return false;const r=this.session.request;
  if(r.document!==id||!r.minigame||this.session.completedForms.has(id))return false;
  this.reply?.clear();this.session.activity=r.minigame;if(r.minigame==='name')this.mini.name();else this.mini.signature();return true;
 }
 private finishMinigame(success:boolean){
  if(this.session.state!=='active')return;const activity=this.session.activity;this.mini.destroy();this.session.activity=null;
  if(!success||activity==='inspect')return;
  const id=this.session.request.document;this.session.completedForms.add(id);this.issued?.destroy();this.issued=undefined;
  const verdict=this.session.submit(id,0);if(verdict!=='accepted')return;
  this.desk?.covers.get(id)?.setVisible(false);this.say('Бланк заполнен. Принимаю.');
  const paper=sprite(this,documents[id].pages[0].asset,340,370).setDepth(45);
  this.tweens.add({targets:paper,x:325,y:211,duration:350,onComplete:()=>{
   this.tweens.add({targets:paper,y:175,scale:.2,alpha:0,duration:260,
    onComplete: () => {
    paper.destroy();

    this.time.delayedCall(3600, () => {
        if (this.session.state !== 'checking') return;

        this.session.resolve();
        this.afterCheck();
    });
    }
    });
  }});
 }
 private submit(id:DocumentId,page:number){
  const verdict=this.session.submit(id,page);this.reply?.clear();
  if(verdict==='locked'||verdict==='duplicate'){this.desk?.returnPaper();return;}
  if(verdict==='incomplete'){this.desk?.returnPaper();this.openForm(id);return;}
//   if(verdict==='accepted'){this.say('Документ принят.');this.desk?.accept(()=>{this.session.resolve();this.afterCheck();});}
  
    if (verdict === 'accepted') {
    this.say('Документ принят.');

    this.desk?.accept(() => {
        this.time.delayedCall(2500, () => {
        if (this.session.state !== 'checking') return;

        this.session.resolve();
        this.afterCheck();
        });
    });
    }

   else {this.say(verdict==='page'?(id==='photo'?'Размер не подходит. Приложите-ка линейку ещё раз.':'Вы открыли не ту страницу. Вимательнее смотреть надо!'):'Я же у вас просила другой документ.');this.desk?.returnPaper();this.time.delayedCall(2500,()=>{this.session.resolve();if(this.session.state==='active')this.request();});}
 }
 private afterCheck(){
  this.counter?.setText(`ДЕНЬ ${this.dayIndex+1} • ${this.session.index}/${this.session.day.requests.length}`);
  if(this.session.state==='active'){this.request();return;}
  this.reply?.clear();this.ruler?.destroy();this.ruler=undefined;
  if(this.session.state==='announcement'){
   this.introNotice=false;this.showNotice(this.session.day.announcement!);
   if(this.board)this.tweens.add({targets:this.board,alpha:{from:0,to:1},duration:300,ease:'Stepped',easeParams:[3]});this.say('Минуточку. Новое распоряжение.');
   this.time.delayedCall(4200,()=>{if(this.session.state!=='announcement')return;this.say(this.session.day.decision);button(this,766,423,'Ознакомлен',()=>{this.session.finishAnnouncement();this.result();},230);});
  }else if(this.session.state==='gameEnd'||this.session.state==='dayEnd')this.result();
 }
 private result(){
  if(this.shownEnd)return;this.shownEnd=true;const state=this.session.state;
  this.mini.destroy();this.session.activity=null;this.queue.destroy();this.session.eventActive=false;this.reply?.clear();
  if(state!=='timeout'){if(!this.save.completed.includes(this.dayIndex))this.save.completed.push(this.dayIndex);this.save.finished=state==='gameEnd';this.save.day=state==='gameEnd'?this.dayIndex:Math.min(this.dayIndex+1,days.length-1);writeSave(this.save);}
  
if (state === 'gameEnd') {
  // Ровная пиксельная табличка с цветом электронного табло
  const stamp = panel(
    this,
    215, 307,
    220, 65,
    0x253c34,
    30
  );

  // Светло-жёлтая надпись
  const text = label(
    this,
    325, 340,
    'ОДОБРЕНО',
    32,
    '#d5dbad'
  ).setOrigin(0.5).setDepth(31);

  // Плавное появление
  this.tweens.add({
    targets: [stamp, text],
    alpha: { from: 0, to: 1 },
    duration: 300
  });

  // Дольше показываем одобрение
  this.time.delayedCall(1800, () => {
    this.resultScreen(state);
  });
} else {
  this.resultScreen(state);
}
 }

 private resultScreen(state:string){
  this.clear();this.shownEnd=true;this.backdrop();
  if(state==='gameEnd'){this.victory();return;}
  label(this,90,130,state==='timeout'?'ВРЕМЯ ПРИЁМА ИСТЕКЛО':'ПРИЁМ ОКОНЧЕН',32);
  label(this,90,210,state==='timeout'?'Окно закрывается. Попробуйте ещё раз — документы останутся при вас.':this.session.day.decision,24,'#d3d5b7',760);
  if(state==='timeout')button(this,240,370,'Повторить день',()=>this.intro(this.dayIndex),280);
  else button(this,240,370,'Вернуться завтра',()=>{if(this.session.move('transition')){this.cameras.main.fadeOut(200);this.time.delayedCall(210,()=>this.intro(this.dayIndex+1));}},280);
  button(this,240,430,'В главное меню',()=>{if(this.session.move('menu'))this.menu();},280);
 }
 private victory(){

    this.sound.play('audio-takeoff', {
    volume: 0.45,
    loop: false
    });

  label(this,85,120,this.session.day.finalTitle??'ВИЗА ОДОБРЕНА',32,'#e2e4c7',790);
  label(this,85,185,this.session.day.finalSubtitle??this.session.day.decision,24,'#c5d0b3',790);
  this.add.rectangle(480,366,780,6,0xaab49d).setDepth(20);const plane=sprite(this,'plane-0',115,340);
  const frames=this.time.addEvent({delay:160,loop:true,callback:()=>plane.setTexture(`plane-${Math.floor(this.time.now/160)%3}`)});
  this.tweens.add({targets:plane,x:470,duration:1400,ease:'Quad.In',onComplete:()=>{this.tweens.add({targets:plane,x:920,y:245,angle:-16,duration:1300,onComplete:()=>{frames.remove();plane.destroy();
   button(this,300,435,'Играть снова',()=>{this.save={day:0,completed:[],finished:false,plan:createRunPlan()};writeSave(this.save);this.intro(0);},270);
   button(this,650,435,'Главное меню',()=>{if(this.session.move('menu'))this.menu();},270);
  }});}});
 }
 update(_time:number,delta:number){
  const paused=document.hidden||this.suspended;this.session.tick(delta/1000,paused);
  if(this.hand)this.hand.rotation=this.session.elapsed/this.session.day.duration*Math.PI*2;
  if(this.session.state==='timeout'&&!this.shownEnd){this.result();return;}
  if(this.session.state!=='active')return;
  if(this.introNotice&&this.session.elapsed>=15){this.notice?.destroy();this.notice=undefined;this.introNotice=false;}
  this.mini.update(delta/1000,this.session.day.duration-this.session.elapsed,paused,this.session.activity);
  const q=this.session.day.queue;
  if(q&&!paused&&queueDue(this.session.elapsed,q.at,this.queueOccurred,this.session.canInteract&&!this.desk?.dragging&&!this.ruler?.dragging)){
   this.queueOccurred=true;this.session.eventActive=true;this.reply?.clear();this.speech?.hide();this.queue.start(q);
  }
 }
}
