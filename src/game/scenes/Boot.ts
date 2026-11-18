import Phaser from 'phaser';
import { preloadAssets,createPlaceholders } from '../assets/AssetRegistry';
import { label } from '../components/ui';
export class Boot extends Phaser.Scene {
 constructor(){super('boot');}
 preload(){label(this,245,180,'Accept Papers, Please',36);label(this,246,235,'Проверяем наличие необходимых справок…',18);const bar=this.add.rectangle(245,290,0,14,0x9db598).setOrigin(0);const percent=label(this,450,320,'0%',18);this.load.on('progress',(n:number)=>{bar.width=470*n;percent.setText(`${Math.round(n*100)}%`);});this.load.on('loaderror',(file:Phaser.Loader.File)=>{console.warn('Не загружен ресурс; используется заглушка:',file.key);});preloadAssets(this);
 
const audioPath = `${import.meta.env.BASE_URL}assets/audio/`;

this.load.audio('audio-background', audioPath + 'background.mp3');
this.load.audio('audio-crowd', audioPath + 'crowd.wav');
this.load.audio('audio-clerk', audioPath + 'clerk.mp3');
this.load.audio('audio-player', audioPath + 'player.mp3');
this.load.audio('audio-baroness', audioPath + 'baroness.mp3');
this.load.audio('audio-zoomer', audioPath + 'zoomer.mp3');
this.load.audio('audio-cat', audioPath + 'cat.mp3');
this.load.audio(
  'audio-takeoff',
  `${import.meta.env.BASE_URL}assets/audio/takeoff.mp3`
);

 this.load.json('local-manifest',`${import.meta.env.BASE_URL}assets/manifest.json`);}
 async create(){createPlaceholders(this);try{await document.fonts.load('20px Tiny5');}catch{console.warn('Pixel font unavailable');}this.scene.start('game');}
}
