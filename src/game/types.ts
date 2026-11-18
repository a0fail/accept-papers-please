export type DocumentId = 'passport' | 'folder1' | 'folder2' | 'photo' | 'consent' | 'queueConsent';
export type DocumentKind = 'passport' | 'folder' | 'photos' | 'form';
export type PhotoSet = {width:number;height:number}[];
export interface Page { paperColor?:number; title: string; text: string; asset: string; sheetId?: string }
export interface DocumentDefinition { id: DocumentId; kind: DocumentKind; name: string; color: number; pages: Page[] }
export interface Request { document: DocumentId; page: number; speech: string; choices?: number[]; minigame?: 'signature' | 'name'; issueRuler?: boolean; replyPool?: string[] }
export interface QueueConfig { at: number; npc: string; dialogue: string }
export interface DayConfig { photos?:PhotoSet; id: string; number: number; name: string; intro: string; documents: DocumentId[]; requests: Request[]; duration: number; queue?: QueueConfig; announcement?: string; outcome: 'refusal' | 'success'; decision: string; finalTitle?: string; finalSubtitle?: string }
export type GameState = 'loading' | 'menu' | 'intro' | 'active' | 'checking' | 'announcement' | 'dayEnd' | 'transition' | 'gameEnd' | 'timeout';
export type DocumentState = 'available' | 'open' | 'dragging' | 'accepted';
export type Activity = 'signature' | 'name' | 'inspect' | null;
