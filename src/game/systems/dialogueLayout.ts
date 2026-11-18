export const dialogueColumn={x:334,y:28,width:292,bottom:500,gap:8,buttonHeight:38};
export function conversationLayout(heights:number[]){
 const c=dialogueColumn,total=heights.reduce((n,h)=>n+h+c.gap,0);
 const offset=Math.max(0,total+c.buttonHeight-(c.bottom-c.y));
 let y=c.y-offset;const positions=heights.map(h=>{const current=y;y+=h+c.gap;return current;});
 return {positions,buttonY:y+c.buttonHeight/2};
}
