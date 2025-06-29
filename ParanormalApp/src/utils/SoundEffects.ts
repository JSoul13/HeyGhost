import Sound from 'react-native-sound';

export class SoundEffects {
  private static instance: SoundEffects;
  private sounds: Map<string, Sound> = new Map();
  private isEnabled: boolean = true;

  static getInstance(): SoundEffects {
    if (!SoundEffects.instance) {
      SoundEffects.instance = new SoundEffects();
    }
    return SoundEffects.instance;
  }

  constructor() {
    Sound.setCategory('Playback');
    this.loadSounds();
  }

  private loadSounds(): void {
    // Note: In a real app, you would load actual sound files
    // For now, we'll use system sounds or generate tones

    const soundFiles = [
      'emf_spike.wav',
      'spirit_whisper.wav',
      'temperature_drop.wav',
      'evp_detected.wav',
      'session_start.wav',
      'session_end.wav',
      'glitch.wav',
      'ambient_drone.wav'
    ];

    soundFiles.forEach(filename => {
      // In production, load from bundle
      // const sound = new Sound(filename, Sound.MAIN_BUNDLE, (error) => {
      //   if (error) {
      //     console.log('Failed to load sound', filename, error);
      //   }
      // });
      // this.sounds.set(filename.replace('.wav', ''), sound);
    });
  }

  playEMFSpike(): void {
    if (!this.isEnabled) return;
    this.playSound('emf_spike');
  }

  playSpiritWhisper(): void {
    if (!this.isEnabled) return;
    this.playSound('spirit_whisper');
  }

  playTemperatureDrop(): void {
    if (!this.isEnabled) return;
    this.playSound('temperature_drop');
  }

  playEVPDetected(): void {
    if (!this.isEnabled) return;
    this.playSound('evp_detected');
  }

  playSessionStart(): void {
    if (!this.isEnabled) return;
    this.playSound('session_start');
  }

  playSessionEnd(): void {
    if (!this.isEnabled) return;
    this.playSound('session_end');
  }

  playGlitch(): void {
    if (!this.isEnabled) return;
    this.playSound('glitch');
  }

  startAmbientDrone(): void {
    if (!this.isEnabled) return;
    const sound = this.sounds.get('ambient_drone');
    if (sound) {
      sound.setNumberOfLoops(-1); // Loop indefinitely
      sound.play();
    }
  }

  stopAmbientDrone(): void {
    const sound = this.sounds.get('ambient_drone');
    if (sound) {
      sound.stop();
    }
  }

  private playSound(soundName: string): void {
    const sound = this.sounds.get(soundName);
    if (sound) {
      sound.play((success) => {
        if (!success) {
          console.log('Sound playback failed for', soundName);
        }
      });
    } else {
      // Fallback: generate a tone or use system sound
      console.log('Playing fallback sound for', soundName);
    }
  }

  setEnabled(enabled: boolean): void {
    this.isEnabled = enabled;
    if (!enabled) {
      this.stopAllSounds();
    }
  }

  private stopAllSounds(): void {
    this.sounds.forEach(sound => {
      sound.stop();
    });
  }

  // Generate synthetic tones for paranormal effects
  generateParanormalTone(frequency: number, duration: number): void {
    if (!this.isEnabled) return;

    // This would require a tone generator library or native module
    // For now, just log the request
    console.log(`Generating ${frequency}Hz tone for ${duration}ms`);
  }

  // Create binaural beats for enhanced paranormal experience
  playBinauralBeats(baseFreq: number, beatFreq: number): void {
    if (!this.isEnabled) return;

    // This would create two slightly different frequency tones
    // to create a binaural beat effect
    console.log(`Playing binaural beats: ${baseFreq}Hz base, ${beatFreq}Hz beat`);
  }
}

export default SoundEffects.getInstance();