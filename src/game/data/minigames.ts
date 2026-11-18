export const photoConfig = {
 pixelsPerVershok: 48,
 sizes: [{width:1,height:1.25},{width:1.125,height:1.25},{width:1.5,height:1.75}],
 required: 0,
};
export const signatureConfig = {
 bounds: {x:190,y:240,width:570,height:180},
 target: {x:430,y:320,width:250,height:92},
 initial: {x:230,y:260,vx:265,vy:170},
 tipOffset: {x:-28,y:25},
};

export const photoSets = [photoConfig.sizes, [{width:1.125,height:1.375},{width:1.25,height:1.375},{width:.75,height:1}], [{width:1,height:1.5},{width:1.125,height:1.5},{width:1.5,height:2}]];
export const playerReplyDurationMs=3000;
