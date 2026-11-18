import Phaser from 'phaser';
import { passportView } from './Passport';
import { photoConfig } from '../data/minigames';
import { documents } from '../data/documents';
import { label,button } from './ui';
import { assets,sprite,placeholderKeys } from '../assets/AssetRegistry';
import { photoPixels,remainingPages,submissionKey } from '../systems/mechanics';
import type { DocumentId,PhotoSet } from '../types';
export class Desk {
 selected?:DocumentId;page=0;view?:Phaser.GameObjects.Container;dragging=false;
 private previous:Phaser.GameObjects.Container;private next:Phaser.GameObjects.Container;
 covers=new Map<DocumentId,Phaser.GameObjects.Container>();accepted=new Set<string>();
 // Keep the tray's horizontal tolerance and bottom edge; accept drops up to the top of the glass.
 readonly tray=new Phaser.Geom.Rectangle(
  assets.tray.x-assets.tray.width/2-10,
  assets.glass.y-assets.glass.height/2,
  assets.tray.width+20,
  assets.tray.y+assets.tray.height/2+10-(assets.glass.y-assets.glass.height/2),
 );
 constructor(private scene:Phaser.Scene,ids:DocumentId[],private enabled:()=>boolean,private submit:(id:DocumentId,page:number)=>void,private inspect:(id:DocumentId,page:number)=>void,private form:(id:DocumentId)=>boolean,private photos:PhotoSet=photoConfig.sizes){
  label(scene,20,260,'ВАШИ ДОКУМЕНТЫ',16).setDepth(3);
  ids.forEach(id=>this.addCover(id));
  this.previous=button(scene,0,0,'←',()=>this.turn(-1),44).setDepth(25).setVisible(false);
  this.next=button(scene,0,0,'→',()=>this.turn(1),44).setDepth(25).setVisible(false);
  button(scene,384,513,'Читать',()=>{if(this.enabled()&&!this.dragging&&this.selected)this.inspect(this.selected,this.page);},100);
  button(scene,489,513,'Убрать',()=>this.close(),96);
  scene.input.on('dragstart',this.onDragStart,this);scene.input.on('drag',this.onDrag,this);scene.input.on('dragend',this.onDragEnd,this);
  scene.input.on('gameout',this.cancel);window.addEventListener('pointercancel',this.cancel);window.addEventListener('blur',this.cancel);document.addEventListener('visibilitychange',this.cancel);
  scene.events.once('screen-clear',()=>{scene.input.off('gameout',this.cancel);window.removeEventListener('pointercancel',this.cancel);window.removeEventListener('blur',this.cancel);document.removeEventListener('visibilitychange',this.cancel);scene.input.off('dragstart',this.onDragStart,this);scene.input.off('drag',this.onDrag,this);scene.input.off('dragend',this.onDragEnd,this);});
 }
 addCover(id:DocumentId){if(this.covers.has(id))return;const i=this.covers.size,d=documents[id];
  const c=this.scene.add.container(90,320+i*39).setDepth(8+i);
  const r=sprite(this.scene,`${id}-cover`,0,0).setInteractive({useHandCursor:true});const coverText = label(
  this.scene,
  -54, -12,
  id === 'passport' ? 'Паспорт' : d.name,
  16,
  '#192d28',
  118
);

if (id === 'passport') {
  coverText.setColor('#ddcda2');
}

c.add([r, coverText]);
  if(d.kind==='folder'){const line=this.scene.add.rectangle(-65,0,8,43,d.color);c.add(line);for(let y=-15;y<20;y+=12)c.add(this.scene.add.rectangle(-65,y,4,5,0x34483d));}
  r.on('pointerdown',()=>this.open(id));r.on('pointerover',()=>r.setTint(0xffebac));r.on('pointerout',()=>r.clearTint());this.covers.set(id,c);
 }
 open(id:DocumentId){if(!this.enabled()||this.dragging||!remainingPages(id,this.accepted).length)return;if(this.form(id))return;this.close();this.selected=id;this.page=remainingPages(id,this.accepted)[0];this.covers.get(id)?.setAlpha(.45);this.render();}
 close(){if(!this.enabled()||this.dragging)return;if(this.selected)this.covers.get(this.selected)?.setAlpha(1);this.selected=undefined;this.view?.destroy();this.view=undefined;this.previous.setVisible(false);this.next.setVisible(false);}
 turn(step:number){if(!this.enabled()||!this.selected||this.dragging)return;const pages=remainingPages(this.selected,this.accepted);this.page=pages[Phaser.Math.Clamp(pages.indexOf(this.page)+step,0,pages.length-1)];this.render();}
 render(){this.view?.destroy();if(!this.selected)return;const d=documents[this.selected],p=d.pages[this.page];const photo=d.kind==='photos';const center=photo?{x:385,y:367}:{x:340,y:d.kind==='passport'?357:377};const c=this.scene.add.container(center.x,center.y).setDepth(30);this.view=c;
  let w=230,h=224;
  if(photo){({width:w,height:h}=photoPixels(this.page,this.photos));c.add(this.scene.add.rectangle(0,0,w,h,0xe4e0cc).setStrokeStyle(1,0x1b2c27));const portrait=sprite(this.scene,assets[p.asset].path?p.asset:'portrait',0,0);portrait.setScale(Math.min((w-12)/portrait.width,(h-12)/portrait.height));c.add(portrait);c.add(label(this.scene,-w/2,h/2+5,p.title,16));}
  else if(d.kind==='passport'){const book=passportView(this.scene,this.page);w=book.width;h=book.height;c.add(book.root);}
  else {
   if(d.kind==='folder'){c.add(sprite(this.scene,'paper',4,4));c.add(sprite(this.scene,this.selected==='folder1'?'folderShell':'folderBlue',0,0));c.add(sprite(this.scene,'perforation',-120,0));}
   c.add(sprite(this.scene,p.asset,0,0));
   if(placeholderKeys.has(p.asset)){c.add(label(this.scene,-103,-99,p.title,16,'#24362d',206));const titleLines=p.title.length>30?3:2;
    const brief=d.kind==='folder'?p.text.split('\n\n')[0]+'\n\n«Читать» — весь документ':p.text;
    c.add(label(this.scene,-103,-99+titleLines*18,brief,16,'#24362d',206));c.add(label(this.scene,-103,88,`Лист ${this.page+1}/${d.pages.length} · тяните`,16,'#4f6250'));}
  }
  // Controls belong to the desk, so dragging the document never moves them.
  const navigationWidth=photo?Math.max(...this.photos.map(p=>p.width*photoConfig.pixelsPerVershok)):d.kind==='folder'?assets.folderShell.width:w;
  const arrowOffset=navigationWidth/2+34;
  this.previous.setPosition(center.x-arrowOffset,center.y).setVisible(true);
  this.next.setPosition(center.x+arrowOffset,center.y).setVisible(true);
  c.setSize(w,h).setInteractive(new Phaser.Geom.Rectangle(0,0,w,h),Phaser.Geom.Rectangle.Contains);this.scene.input.setDraggable(c);c.input!.cursor='grab';
 }
 private onDragStart(_p:Phaser.Input.Pointer,o:Phaser.GameObjects.GameObject){if(o===this.view&&this.enabled()){this.dragging=true;this.view?.setDepth(55);}}
 private onDrag(_p:Phaser.Input.Pointer,o:Phaser.GameObjects.GameObject,x:number,y:number){if(o===this.view&&this.dragging&&this.enabled())this.view!.setPosition(Phaser.Math.Clamp(x,180,520),Phaser.Math.Clamp(y,190,430));}
 private onDragEnd(p:Phaser.Input.Pointer,o:Phaser.GameObjects.GameObject){if(o!==this.view||!this.dragging)return;this.dragging=false;this.view?.setDepth(30);if(this.enabled()&&this.tray.contains(p.x,p.y)&&this.selected)this.submit(this.selected,this.page);else this.returnPaper();}
 cancel=()=>{if(this.dragging){this.dragging=false;this.returnPaper();}};
 returnPaper(){this.view?.setDepth(30);if(this.view)this.scene.tweens.add({targets:this.view,x:this.selected==='photo'?385:340,y:this.selected==='photo'?367:this.selected==='passport'?357:377,duration:180,ease:'Back.Out'});}
 accept(done:()=>void){if(!this.selected||!this.view)return;this.previous.setVisible(false);this.next.setVisible(false);const id=this.selected;this.accepted.add(submissionKey(id,this.page));if(!remainingPages(id,this.accepted).length)this.covers.get(id)?.setVisible(false);else this.covers.get(id)?.setAlpha(1);
  this.scene.tweens.add({targets:this.view,x:325,y:180,scale:.25,alpha:0,duration:380,onComplete:()=>{this.view?.destroy();this.view=undefined;this.selected=undefined;done();}});
 }
}
