import Phaser from 'phaser';
import { npcs,dialogues } from '../data/dialogues';
import type { QueueConfig } from '../types';
import { assets } from '../assets/AssetRegistry';
import { PixelDialog,button } from './ui';
import { conversationLayout,dialogueColumn } from '../systems/dialogueLayout';
import { AudioManager } from '../systems/AudioManager';
export class QueueEvent {
 private root?:Phaser.GameObjects.Container;
 private bubbles:PixelDialog[]=[];
 private mask?:Phaser.Display.Masks.GeometryMask;
 private maskShape?:Phaser.GameObjects.Graphics;
 private index=0;private ready=false;
 constructor(
  private scene: Phaser.Scene,
  private done: () => void,
  private audio: AudioManager
 ) {}
 start(config:QueueConfig){
    this.audio.beginDialogue();
  const npc=npcs[config.npc],lines=dialogues[config.dialogue];this.index=0;
  this.root=this.scene.add.container(0,0).setDepth(80);const root=this.root;
  root.add(this.scene.add.rectangle(480,270,960,540,0x15251f,.40).setInteractive());
  const person=this.scene.add.sprite(794,378,'queue');root.add(person);let npcScale=.9;
  const history=this.scene.add.container(0,0);root.add(history);
  const c=dialogueColumn;
  this.maskShape=this.scene.make.graphics({x:0,y:0});this.maskShape.fillRect(c.x,c.y,c.width+6,c.bottom-c.y-c.buttonHeight-c.gap);
  this.mask=this.maskShape.createGeometryMask();history.setMask(this.mask);
  const animation=`walk-${npc.id}`;
  if(!this.scene.anims.exists(animation))this.scene.anims.create({key:animation,frames:npc.frames.map(key=>({key})),frameRate:npc.frameRate,repeat:-1});
  const next=()=>{
   if(!this.ready)return;this.ready=false;
   const nextSpeaker = lines[this.index]?.speaker;

    this.audio.advanceLine(
    nextSpeaker === 'player' ? 350 : 1000
    );
   if(this.index>=lines.length){continueButton.setVisible(false);this.scene.tweens.add({targets:person,x:830,y:365,scale:npcScale*.65,alpha:0,duration:500,onComplete:()=>{this.destroy();this.done();}});return;}
   const line=lines[this.index++];
   this.audio.playLine(line.speaker, config.npc);
   const bubble=new PixelDialog(this.scene,c.x,c.y,c.width,44,line.speaker==='player'?'player':'npc',85);
   bubble.show(`${line.speaker==='player'?'ВЫ':npc.name.toUpperCase()}\n${line.text}`);
   this.bubbles.push(bubble);history.add(bubble.root);
   const layout=conversationLayout(this.bubbles.map(b=>b.height));
   this.bubbles.forEach((b,i)=>b.root.y=layout.positions[i]);
   continueButton.setPosition(c.x+c.width/2,layout.buttonY).setVisible(true);
   this.scene.time.delayedCall(180,()=>{if(this.root)this.ready=true;});
  };
  const continueButton=button(this.scene,c.x+c.width/2,110,'Далее →',next,230).setVisible(false);root.add(continueButton);
  this.scene.tweens.add({targets:person,x:800,y:395,scale:1.5,duration:400,onComplete:()=>{
   person.setTexture(npc.sprite);
   const spec=assets[npc.sprite];
//    npcScale=.9*Math.min(spec.width/person.width,spec.height/person.height);
   person.setScale(npcScale).play(animation);
   this.scene.tweens.add({targets:person,y:410,duration:Math.max(600,npc.frames.length/npc.frameRate*1000),onComplete:()=>{this.ready=true;next();}});
  }});
 }
 destroy(){
    if (this.root) this.audio.endDialogue();
    this.bubbles=[];this.root?.destroy();this.root=undefined;this.mask?.destroy();this.mask=undefined;this.maskShape?.destroy();this.maskShape=undefined;this.ready=false;}
}
