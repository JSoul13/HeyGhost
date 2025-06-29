import AudioRecorderPlayer from 'react-native-audio-recorder-player';
import RNFS from 'react-native-fs';

export class AudioService {
  private audioRecorderPlayer: AudioRecorderPlayer;

  constructor() {
    this.audioRecorderPlayer = new AudioRecorderPlayer();
  }

  async startRecording(filename?: string): Promise<string> {
    const path = filename || `recording_${Date.now()}.m4a`;
    const fullPath = `${RNFS.DocumentDirectoryPath}/${path}`;

    try {
      const result = await this.audioRecorderPlayer.startRecorder(fullPath);
      return result;
    } catch (error) {
      console.error('Recording start error:', error);
      throw error;
    }
  }

  async stopRecording(): Promise<string> {
    try {
      const result = await this.audioRecorderPlayer.stopRecorder();
      this.audioRecorderPlayer.removeRecordBackListener();
      return result;
    } catch (error) {
      console.error('Recording stop error:', error);
      throw error;
    }
  }

  async startPlaying(path: string): Promise<void> {
    try {
      await this.audioRecorderPlayer.startPlayer(path);
    } catch (error) {
      console.error('Playback start error:', error);
      throw error;
    }
  }

  async stopPlaying(): Promise<void> {
    try {
      await this.audioRecorderPlayer.stopPlayer();
      this.audioRecorderPlayer.removePlayBackListener();
    } catch (error) {
      console.error('Playback stop error:', error);
      throw error;
    }
  }

  addRecordBackListener(callback: (e: any) => void) {
    this.audioRecorderPlayer.addRecordBackListener(callback);
  }

  addPlayBackListener(callback: (e: any) => void) {
    this.audioRecorderPlayer.addPlayBackListener(callback);
  }

  mmssss(milisec: number): string {
    return this.audioRecorderPlayer.mmssss(milisec);
  }

  // EVP Analysis (placeholder for future ML implementation)
  analyzeForEVP(audioPath: string): Promise<{hasAnomaly: boolean; confidence: number}> {
    return new Promise((resolve) => {
      // Simulate EVP detection
      setTimeout(() => {
        const hasAnomaly = Math.random() > 0.8;
        const confidence = hasAnomaly ? Math.random() * 0.4 + 0.6 : Math.random() * 0.3;
        resolve({hasAnomaly, confidence});
      }, 1000);
    });
  }
}

export default new AudioService();