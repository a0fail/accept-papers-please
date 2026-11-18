export const replies = [
  'Да, сейчас.',
  'Одну секунду, пожалуйста.',
  'Сейчас достану.',
  'Минутку, он где-то здесь.',
  'Так, сейчас посмотрим...',
  'Кажется, я его взял.',
  'Подождите немного, пожалуйста.',
  'Сейчас найду нужную страницу.',
  'Так, это вроде то, что нужно...',
  'Прошу прощения, бумаги перепутались.',
  'Секунду, я проверю.',
  'По-моему, всё на месте.',
  'Он точно должен быть здесь.',
  'Погодите, разве он обязателен..?',
  'Ага, понял, сейчас найду...',
  'Так, а куда же я его положил...',
  'Я всё подготовил заранее, одну минуту.',
  'Вот, держите... Ой, это другой...',
  'Да, конечно, сейчас передам.',
  'Извините, тут всё вперемешку.',
  'Подождите, у меня тут бумаг, как грязи.',
  'Так, кажется, это то, что нужно...',
  'Сейчас-сейчас, я почти нашёл.'
];

export interface DialogueLine { speaker:'npc'|'player'; text:string }
export const dialogues:Record<string,DialogueLine[]>={ impatience:[
 {speaker:'npc',text:'Вы долго ещё?'},{speaker:'player',text:'Сейчас, одну минутку.'},
 {speaker:'npc',text:'Вы то же самое десять минут назад говорили.'},
 {speaker:'player',text:'Тогда ещё одну минутку.'},{speaker:'npc',text:'Очень содержательно.'}
]};
export interface QueueNPC {
 id:string; name:string; sprite:string; frames:string[]; frameRate:number; dialogues:string[];
}
// Add/remove entries freely. Frame counts are independent for each visitor.
export const npcs:Record<string,QueueNPC>={
 'visitor-1':{id:'visitor-1',name:'Baroness de Sinyak',sprite:'npc-1',frames:['npc-1','npc-1-step'],frameRate:2,dialogues:['visitor-1']},
 'visitor-2':{id:'visitor-2',name:'Эталонный зумер',sprite:'npc-2',frames:['npc-2','npc-2-step'],frameRate:2,dialogues:['visitor-2']},
 'visitor-3':{id:'visitor-3',name:'Загадочный посетитель',sprite:'npc-3',frames:['npc-3','npc-3-step','npc-3-2','npc-3-3'],frameRate:5,dialogues:['visitor-3']},
 'visitor-4':{id:'visitor-4',name:'Посетитель 4',sprite:'npc-4',frames:['npc-4','npc-4-step'],frameRate:2,dialogues:['visitor-4']},
};
// for(const [id,opening] of Object.entries({'visitor-1':'Вы долго ещё?','visitor-2':'А можно как-нибудь побыстрее?','visitor-3':'Вы один на всё окно записались?','visitor-4':'Простите, вы скоро закончите?'}))
//  dialogues[id]=[{speaker:'npc',text:opening},{speaker:'player',text:'Сейчас, одну минутку.'},{speaker:'npc',text:'Ваша минутка уже получила собственный талон.'},{speaker:'player',text:'Тогда пусть проходит за мной.'},{speaker:'npc',text:'Будем считать, что договорились.'}];

dialogues['visitor-1'] = [
  { speaker: 'npc', text: 'Молодой человек, вы намерены заставить Баронессу де Синяк состариться в этой очереди?' },
  { speaker: 'player', text: 'Вы не можете спокойно подождать?' },
  { speaker: 'npc', text: 'Какая дерзость! Я титулованная гражданка республики Биркин!' },
  { speaker: 'player', text: 'Боюсь, ваш титул тут не поможет...' },
  { speaker: 'npc', text: 'Я напишу жалобу! На гербовой бумаге! С вензелем!' }
];

dialogues['visitor-2'] = [
  { speaker: 'npc', text: 'Бро, ну сколько можно афк стоять? У меня талон 67, а я уже полжизни в этой очереди заспидранил.' },
  { speaker: 'player', text: 'Я документы подаю, отвали, БРО.' },
  { speaker: 'npc', text: 'Чел, ты буквально NPC с бесконечным диалогом. Где кнопка скипа?' },
  { speaker: 'player', text: 'У меня справки перепутались, я ищу нужную...' },
  { speaker: 'npc', text: 'АХАХ, имба. Ты инвентарь перед квестом не чекнул? Скилл issue, получается. Ладно, отваливаю.' }
];

dialogues['visitor-3'] = [
  { speaker: 'npc', text: 'Meow' },
  { speaker: 'player', text: 'Простите, что?' },
  { speaker: 'npc', text: 'Oiiaioiiiai, oiiiaiooooiiai!' },
  { speaker: 'player', text: 'Я вас не совсем понимаю... Вы тоже в очереди?' },
  { speaker: 'npc', text: 'OIIA OIIA OIIA OIIA OIIA!' },
  { speaker: 'player', text: '...' },
  { speaker: 'npc', text: 'OIIAIOIIIAIOIIIAOOO! OIIAIOIIIAIOIIIAOOO!' }
];

dialogues['visitor-4'] = [
  { speaker: 'npc', text: 'Простите, вы скоро закончите?' },
  { speaker: 'player', text: 'Почти закончил.' },
  { speaker: 'npc', text: 'А то мне ещё в другой кабинет нужно.' },
  { speaker: 'player', text: 'Понимаю, сейчас освобожу окно.' },
  { speaker: 'npc', text: 'Спасибо, буду ждать.' }
];
