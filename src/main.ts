import Phaser from 'phaser';
import { Boot } from './game/scenes/Boot';
import { Pause } from './game/scenes/Pause';
import { Game } from './game/scenes/Game';
import './style.css';
// Integer magnification on desktop; fit-to-screen fallback only below the logical resolution.
function sizeStage(){
 const fit=Math.min(window.innerWidth/960,window.innerHeight/540);
 const zoom=fit>=1?Math.floor(fit):fit;
 const host=document.getElementById('game')!;
 host.style.width=`${Math.floor(960*zoom)}px`;
 host.style.height=`${Math.floor(540*zoom)}px`;
}
sizeStage();window.addEventListener('resize',sizeStage);
new Phaser.Game({type:Phaser.AUTO,parent:'game',width:960,height:540,backgroundColor:'#1c2925',dom:{createContainer:true},pixelArt:true,roundPixels:true,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH},scene:[Boot,Game,Pause],input:{activePointers:2}});
