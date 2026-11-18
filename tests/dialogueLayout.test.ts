import {it,expect} from 'vitest';
import {conversationLayout,dialogueColumn as c} from '../src/game/systems/dialogueLayout';
it('grows a column downward with Next immediately below the last reply',()=>{const a=conversationLayout([64,84]);expect(a.positions).toEqual([28,100]);expect(a.buttonY).toBe(211);});
it('scrolls long conversations upward while keeping last reply and Next visible',()=>{const heights=Array(8).fill(84),a=conversationLayout(heights);expect(a.positions[0]).toBeLessThan(c.y);expect(a.buttonY+c.buttonHeight/2).toBe(c.bottom);expect(a.positions[7]+84+c.gap).toBe(a.buttonY-c.buttonHeight/2);});
