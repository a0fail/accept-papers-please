import Phaser from 'phaser';
import { button,label,panel } from '../components/ui';
interface PauseOptions { confirm:boolean; resume:()=>void; exit:()=>void; soundEnabled: () => boolean;
  toggleSound: () => void; }
export class Pause extends Phaser.Scene {
 private options!:PauseOptions;
 constructor(){super('pause');}
 create(options:PauseOptions){this.options=options;this.draw(options.confirm);}
 private leave(exit:boolean){this.scene.stop();(exit?this.options.exit:this.options.resume)();}
 private draw(confirm:boolean){
  this.children.removeAll(true);this.add.rectangle(480,270,960,540,0x13231d,.85).setInteractive();
  panel(this,205,130,550,290);
  label(this,245,157,confirm?'ВЫЙТИ В ГЛАВНОЕ МЕНЮ?':'ПАУЗА',32);
  label(this,245,215,confirm?'Текущий незавершённый день будет начат заново. Выйти?':'Документы, очередь и часы ждут вас.',20,'#eee6ce',470);
  
    button(
    this,
    480, 275,
    confirm ? 'Остаться' : 'Продолжить',
    () => this.leave(false),
    300
    );

    button(
    this,
    480, 325,
    confirm ? 'Выйти' : 'В главное меню',
    () => {
        if (confirm) {
        this.leave(true);
        } else {
        this.draw(true);
        }
    },
    300
    );

    button(
    this,
    480, 375,
    this.options.soundEnabled()
        ? 'ЗВУК: ВКЛ'
        : 'ЗВУК: ВЫКЛ',
    () => {
        this.options.toggleSound();
        this.draw(confirm);
    },
    300
    );

 }
}
