import type { DayConfig, PhotoSet } from '../types';
import { documents } from '../data/documents';
import { photoSets } from '../data/minigames';
export interface RunDay { passport:number; folder1:number; folder2:number; photoSet:number; photoPage:number }
export interface RunPlan { version:1; days:RunDay[] }
function shuffle<T>(items:T[],random:()=>number){const a=[...items];for(let i=a.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;}
export function createRunPlan(random=Math.random):RunPlan{
 const passports=shuffle([1,2,3],random),first=shuffle([0,1,2,3],random),second=shuffle([0,1,2],random),photos=shuffle([0,1,2],random);
 return {version:1,days:passports.map((passport,i)=>({passport,folder1:first[i],folder2:second[i],photoSet:photos[i],photoPage:Math.floor(random()*2)}))};
}
export function validRunPlan(value:unknown):value is RunPlan{
 const p=value as RunPlan|undefined;if(!p||p.version!==1||!Array.isArray(p.days)||p.days.length!==3)return false;
 if(!p.days.every(d=>d&&Number.isInteger(d.passport)&&d.passport>=1&&d.passport<=3&&Number.isInteger(d.folder1)&&d.folder1>=0&&d.folder1<4&&Number.isInteger(d.folder2)&&d.folder2>=0&&d.folder2<3&&Number.isInteger(d.photoSet)&&d.photoSet>=0&&d.photoSet<photoSets.length&&[0,1].includes(d.photoPage)))return false;
 return ['passport','folder1','folder2','photoSet'].every(k=>new Set(p.days.map(d=>d[k as keyof RunDay])).size===3);
}
export function plannedDay(day:DayConfig,plan:RunDay):DayConfig{
 const photos:PhotoSet=photoSets[plan.photoSet],size=photos[plan.photoPage];
 return {...day,photos,requests:day.requests.map(r=>{
    if (r.document === 'passport') {
    const pageNames = [
        '',
        'разворот с фотографией',
        'разворот с адресом прописки',
        'разворот с визами'
    ];

    return {
        ...r,
        choices: undefined,
        page: plan.passport,
        speech: `Загранпаспорт - ${pageNames[plan.passport]}.`
    };
    }
//   if(r.document==='folder1'||r.document==='folder2'){const page=plan[r.document];return {...r,choices:undefined,page,speech:`${documents[r.document].name}: ${documents[r.document].pages[page].title}.`};}

if (r.document === 'folder1' || r.document === 'folder2') {
  const page = plan[r.document];

  const name = documents[r.document].name;
  const title = documents[r.document].pages[page].title
    .toLocaleLowerCase('ru-RU');

  return {
    ...r,
    choices: undefined,
    page,
    speech: `${name} - ${title}.`
  };
}

  if(r.document==='photo')return {...r,page:plan.photoPage,speech:`Фотографию: ${String(size.width).replace('.',',')} × ${String(size.height).replace('.',',')} вершка. Линейка в лотке.`};
  return {...r};
 })};
}
