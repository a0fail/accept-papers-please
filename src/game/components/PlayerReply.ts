import Phaser from 'phaser';
import { PixelDialog } from './ui';
import { playerReplyDurationMs } from '../data/minigames';
import { dialogueColumn } from '../systems/dialogueLayout';
import { replies } from '../data/dialogues';
export class PlayerReply {
 private dialog:PixelDialog;private pending?:Phaser.Time.TimerEvent;private hideTimer?:Phaser.Time.TimerEvent;
 constructor(private scene:Phaser.Scene,private allowed:()=>boolean,private anchor:()=>number){this.dialog=new PixelDialog(scene,dialogueColumn.x,0,dialogueColumn.width,70,'player',62);this.dialog.hide();}
 schedule(pool=replies){this.clear();this.pending=this.scene.time.delayedCall(700+Math.random()*700,()=>{if(!this.allowed())return;this.dialog.root.y=this.anchor();this.dialog.show(pool[Math.floor(Math.random()*pool.length)]);this.hideTimer=this.scene.time.delayedCall(playerReplyDurationMs,()=>this.dialog.hide());});}
 clear(){this.pending?.remove();this.hideTimer?.remove();this.dialog.hide();}
 destroy(){this.clear();this.dialog.destroy();}
}
