import Phaser from 'phaser';
import { photoConfig } from '../data/minigames';
import { label } from './ui';
import { sprite } from '../assets/AssetRegistry';
export class PhotoRuler {
 readonly root:Phaser.GameObjects.Container;
 dragging=false;
 constructor(private scene:Phaser.Scene,private enabled:()=>boolean){
  const unit=photoConfig.pixelsPerVershok;
  this.root=scene.add.container(300,204).setDepth(38);
  const wood=sprite(scene,'ruler',48,-12);this.root.add(wood);
  const g=scene.add.graphics();g.fillStyle(0xcdbb83);g.fillRect(-24,-24,24,unit*2+48);g.lineStyle(1,0x354336);
  for(let i=0;i<=16;i++){const p=i*unit/8,l=i%8===0?18:i%4===0?13:7;g.lineBetween(p,0,p,-l);g.lineBetween(0,p,-l,p);if(i%8===0){this.root.add(label(scene,p+3,-22,`${i/8}`,16,'#26352f'));this.root.add(label(scene,-20,p+3,`${i/8}`,16,'#26352f'));}}
  this.root.addAt(g,1);this.root.add(label(scene,5,-47,'вершки · 1/8',16,'#eee6ce'));
  const grip=scene.add.rectangle(40,-12,120,24,0xffffff,0).setInteractive({useHandCursor:true});this.root.add(grip);scene.input.setDraggable(grip);
  grip.on('dragstart',()=>{if(enabled()){scene.tweens.killTweensOf(this.root);this.dragging=true;}});
  grip.on('drag',(_p:Phaser.Input.Pointer,_x:number,_y:number)=>{if(!this.dragging||!enabled())return;this.root.setPosition(Phaser.Math.Clamp(_p.x-40,180,410),Phaser.Math.Clamp(_p.y+12,245,380));});
  grip.on('dragend',()=>{this.dragging=false;});
  scene.tweens.add({targets:this.root,y:232,duration:350});
 }
 cancel(){this.dragging=false;}
 destroy(){this.scene.tweens.killTweensOf(this.root);this.root.destroy();}
}
