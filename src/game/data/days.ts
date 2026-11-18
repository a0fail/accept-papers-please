import type { DayConfig, Request } from '../types';
import { photoConfig } from './minigames';
const passport:Request={document:'passport',page:1,speech:'Загранпаспорт. Страница с фотографией.'};
const first:Request={document:'folder1',page:0,choices:[0,1,2,3],speech:'Из первого файлика: '};
const second:Request={document:'folder2',page:0,choices:[0,1,2],speech:'Из второго файлика: '};
const photoSize=photoConfig.sizes[photoConfig.required];
const photo:Request={document:'photo',page:photoConfig.required,issueRuler:true,speech:`Фотографию: ${String(photoSize.width).replace('.',',')} × ${String(photoSize.height).replace('.',',')} вершка. Возьмите линейку из лотка.`};
const sign:Request={document:'consent',page:0,minigame:'signature',speech:'Подпишите согласие. Бланк в лотке.',replyPool:['Где тут подписать?','Рука немного дрожит.']};
export const days:DayConfig[]=[
 {id:'first',number:1,name:'Первая подача',intro:'Паспорт, файлик, фотографии. Вроде всё.',documents:['passport','folder1','photo'],requests:[passport,first,photo],duration:90,queue:{at:22,npc:'visitor-1',dialogue:'visitor-1'},announcement:'ВНИМАНИЕ! Для подачи заявления на визу необходимо предоставить комплект справок о получении ранее предоставленных справок.',outcome:'refusal',decision:'Без справок о справках процедура невозможна. Приходите завтра.'},
 {id:'second',number:2,name:'Справки о справках',intro:'Две папки. Всё предусмотрено. Почти.',documents:['passport','folder1','folder2','photo'],requests:[passport,first,second,photo,sign],duration:120,queue:{at:22,npc:'visitor-2',dialogue:'visitor-2'},announcement:'ВНИМАНИЕ! В целях оптимизации очередей гражданам необходимо заранее предоставить распечатанную форму согласия на участие в очереди.\nНахождение в очереди без согласия не допускается.',outcome:'refusal',decision:'Нет согласия на очередь — нет обслуживания. Завтра принесите заполненную форму.'},
 {id:'third',number:3,name:'Согласие на очередь',intro:'Сначала докажите, что согласны стоять здесь.',documents:['queueConsent','passport','folder1','folder2','photo'],requests:[{document:'queueConsent',page:0,minigame:'name',speech:'Для начала обслуживания заполните согласие на нахождение в очереди.'},passport,first,second,photo,sign],duration:150,queue:{at:35,npc:'visitor-3',dialogue:'visitor-3'},outcome:'success',decision:'Виза одобрена. Ваше терпение занесено в личное дело.',finalTitle:'ТРИ ДНЯ. ДВЕ ПАПКИ. ОДНА ВИЗА.',finalSubtitle:'Осталось только найти выгодные билеты на Aviasales.'}
];
