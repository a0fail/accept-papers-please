
import Phaser from 'phaser';

type Sound = Phaser.Sound.WebAudioSound | Phaser.Sound.HTML5AudioSound;
type Speaker = 'npc' | 'player';

const VOLUME = {
  background: 0.18,
  crowd: 0.10,
  clerk: 0.20,
  player: 0.6,
  npc: 0.38
};

export class AudioManager {
  private background: Sound;
  private crowd: Sound;
  private clerk: Sound;
  private player: Sound;

  private npcTracks: Record<string, Sound>;
  private activeNpc?: Sound;
  private inDialogue = false;
  private playerStartTimer?: Phaser.Time.TimerEvent;

  constructor(private scene: Phaser.Scene) {
    const add = (
      key: string,
      config: Phaser.Types.Sound.SoundConfig
    ): Sound => scene.sound.add(key, config) as Sound;

    this.background = add('audio-background', {
      loop: true,
      volume: VOLUME.background
    });

    this.crowd = add('audio-crowd', {
      loop: true,
      volume: VOLUME.crowd
    });

    this.clerk = add('audio-clerk', {
      loop: false,
      volume: VOLUME.clerk
    });

    this.player = add('audio-player', {
      loop: false,
      volume: VOLUME.player
    });

    this.npcTracks = {
      'visitor-1': add('audio-baroness', {
        loop: true,
        volume: VOLUME.npc
      }),
      'visitor-2': add('audio-zoomer', {
        loop: true,
        volume: VOLUME.npc
      }),
      'visitor-3': add('audio-cat', {
        loop: true,
        volume: VOLUME.npc
      })
    };

    try {
      this.scene.sound.mute =
        localStorage.getItem('papers-sound') === 'off';
    } catch {
      this.scene.sound.mute = false;
    }
  }

  get enabled(): boolean {
    return !this.scene.sound.mute;
  }

  toggle(): void {
    this.scene.sound.mute = !this.scene.sound.mute;

    try {
      localStorage.setItem(
        'papers-sound',
        this.enabled ? 'on' : 'off'
      );
    } catch {
      // Игра продолжит работать без сохранения настройки.
    }

    if (this.enabled) this.startAmbient();
  }

  startAmbient(): void {
    if (!this.background.isPlaying) {
      this.background.play();
    }

    if (!this.crowd.isPlaying) {
      this.crowd.play();
    }

    this.crowd.setVolume(
      this.inDialogue ? 0 : VOLUME.crowd
    );
  }

  playClerk(): void {
    if (this.inDialogue) return;

    this.clerk.stop();
    this.clerk.play();
  }

  beginDialogue(): void {
    this.inDialogue = true;

    this.scene.tweens.killTweensOf(this.background);

    this.scene.tweens.add({
    targets: this.background,
    volume: VOLUME.background * 0.20,
    duration: 350,
    ease: 'Linear'
    });


    this.clerk.stop();
    this.player.stop();
    this.stopNpcNow();

    // На время разговора убираем шум толпы.
    this.scene.tweens.killTweensOf(this.crowd);
    this.crowd.setVolume(0);
  }

  playLine(speaker: Speaker, npcId: string): void {
    if (speaker === 'player') {
    this.playerStartTimer?.remove();
    this.player.stop();

    this.playerStartTimer = this.scene.time.delayedCall(
        500,
        () => {
        this.playerStartTimer = undefined;

        if (!this.inDialogue) return;

        this.player.play();
        }
    );

    return;
    }


    // NPC: тема запускается с самого начала реплики.
    this.stopNpcNow();

    const track = this.npcTracks[npcId];
    if (!track) return;

    track.setVolume(VOLUME.npc);
    track.play();
    this.activeNpc = track;
  }

  advanceLine(fadeDuration = 1000): void {
    // Если герой ещё говорит, прерываем его звук.
    this.playerStartTimer?.remove();
    this.playerStartTimer = undefined;
    this.player.stop();

    if (!this.activeNpc) return;

    const track = this.activeNpc;
    this.activeNpc = undefined;

    this.scene.tweens.killTweensOf(track);

    // Музыка NPC плавно затухает за 1 секунду.
    this.scene.tweens.add({
      targets: track,
      volume: 0,
      duration: fadeDuration,
      ease: 'Linear',
      onComplete: () => {
        track.stop();
        track.setVolume(VOLUME.npc);
      }
    });
  }

  endDialogue(): void {
    if (!this.inDialogue) return;

    this.inDialogue = false;

    this.scene.tweens.killTweensOf(this.background);

    this.scene.tweens.add({
    targets: this.background,
    volume: VOLUME.background,
    duration: 700,
    ease: 'Linear'
    });

    this.player.stop();

    // На случай досрочного завершения разговора.
    if (this.activeNpc) this.advanceLine();

    // Возвращаем шум толпы плавно.
    this.scene.tweens.killTweensOf(this.crowd);

    this.scene.tweens.add({
      targets: this.crowd,
      volume: VOLUME.crowd,
      duration: 700,
      ease: 'Linear'
    });
  }

  private stopNpcNow(): void {
    for (const track of Object.values(this.npcTracks)) {
      this.scene.tweens.killTweensOf(track);
      track.stop();
      track.setVolume(VOLUME.npc);
    }

    this.activeNpc = undefined;
  }

  resetForScreen(): void {
    this.inDialogue = false;

    this.scene.tweens.killTweensOf(this.background);
    this.background.setVolume(VOLUME.background);

    this.player.stop();
    this.clerk.stop();
    this.stopNpcNow();

    this.scene.tweens.killTweensOf(this.crowd);
    this.crowd.setVolume(VOLUME.crowd);
  }
}
