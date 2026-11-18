import Phaser from 'phaser';
import { assets } from '../assets/AssetRegistry';
export const colors={ink:0x1d2928,paper:0xe4dfc7,player:0x96b4af,green:0x52684f,red:0x8d483d};
export function label(s:Phaser.Scene,x:number,y:number,text:string,size=20,color='#eee6ce',width?:number) {
 return s.add.text(Math.round(x),Math.round(y),text,{fontFamily:'Tiny5, monospace',fontSize:Math.max(16,Math.floor(size/8)*8),color,wordWrap:width?{width,useAdvancedWrap:true}:undefined,lineSpacing:3,padding:{bottom:3}}).setResolution(1).setDepth(20);
}
// Stepped corners, one-pixel keyline and a hard offset shadow. Coordinates are top-left.
export function panel(s:Phaser.Scene,x:number,y:number,w:number,h:number,color=colors.green,depth=18){
 if(assets.dialogPanel.path&&s.textures.exists('dialogPanel')){const image=s.add.image(x+w/2,y+h/2,'dialogPanel').setDepth(depth);image.setScale(Math.min(w/image.width,h/image.height));return image;}
 const g=s.add.graphics().setDepth(depth);g.fillStyle(colors.ink);g.fillRect(x+5,y+5,w,h);g.fillRect(x+3,y,w-6,h);g.fillRect(x,y+3,w,h-6);g.fillStyle(color);g.fillRect(x+4,y+4,w-8,h-8);return g;
}
export function button(s:Phaser.Scene,x:number,y:number,text:string,action:()=>void,width=220){
 const c=s.add.container(x,y).setDepth(50);const frame=panel(s,-width/2,-19,width,38,colors.green);const bg=s.add.rectangle(0,0,width-8,30,colors.green).setInteractive({useHandCursor:true});
 const t=label(s,0,0,text,20).setOrigin(.5);c.add([frame,bg,t]);bg.on('pointerover',()=>bg.setFillStyle(0x6a8262));bg.on('pointerout',()=>bg.setFillStyle(colors.green));bg.on('pointerdown',action);return c;
}
export class PixelDialog {
 readonly root:Phaser.GameObjects.Container; readonly text:Phaser.GameObjects.Text;
 height=44;
 private frame?:Phaser.GameObjects.Graphics|Phaser.GameObjects.Image;private resize?:()=>void;
 constructor(scene:Phaser.Scene,x:number,y:number,w:number,h:number,kind:'clerk'|'player'|'npc'|'error',depth=60){
  this.root=scene.add.container(x,y).setDepth(depth);const fill=kind==='clerk'?colors.paper:kind==='player'?colors.player:kind==='error'?colors.red:colors.green;
  this.text=label(scene,12,10,'',20,kind==='clerk'||kind==='player'?'#1d2928':'#eee6ce',w-24);
  this.frame=panel(scene,0,0,w,h,fill);this.root.add([this.frame,this.text]);
  this.resize=()=>{this.frame?.destroy();const height=Math.max(44,this.text.height+20);this.height=height;this.frame=panel(scene,0,0,w,height,fill);this.root.addAt(this.frame,0);};
 }
 show(text:string){this.text.setText(text);this.resize?.();this.root.setVisible(true);}
 hide(){this.root.setVisible(false);}
 destroy(){this.root.destroy();}
}
