import RNFS from 'react-native-fs';

export interface SessionData {
  id: string;
  timestamp: string;
  duration: number;
  maxEMF: number;
  averageEMF: number;
  temperatureReadings: number[];
  anomalies: Array<{
    timestamp: string;
    type: 'emf' | 'audio' | 'temperature';
    value: number;
    description: string;
  }>;
  audioFiles: string[];
  videoFiles: string[];
}

export class StorageService {
  private readonly SESSIONS_DIR = `${RNFS.DocumentDirectoryPath}/sessions`;
  private readonly AUDIO_DIR = `${RNFS.DocumentDirectoryPath}/audio`;
  private readonly VIDEO_DIR = `${RNFS.DocumentDirectoryPath}/video`;

  async initialize(): Promise<void> {
    try {
      await this.ensureDirectoryExists(this.SESSIONS_DIR);
      await this.ensureDirectoryExists(this.AUDIO_DIR);
      await this.ensureDirectoryExists(this.VIDEO_DIR);
    } catch (error) {
      console.error('Storage initialization error:', error);
    }
  }

  private async ensureDirectoryExists(path: string): Promise<void> {
    const exists = await RNFS.exists(path);
    if (!exists) {
      await RNFS.mkdir(path);
    }
  }

  async saveSession(sessionData: SessionData): Promise<void> {
    try {
      const filePath = `${this.SESSIONS_DIR}/${sessionData.id}.json`;
      await RNFS.writeFile(filePath, JSON.stringify(sessionData, null, 2));
    } catch (error) {
      console.error('Session save error:', error);
      throw error;
    }
  }

  async loadSession(sessionId: string): Promise<SessionData | null> {
    try {
      const filePath = `${this.SESSIONS_DIR}/${sessionId}.json`;
      const exists = await RNFS.exists(filePath);

      if (!exists) {
        return null;
      }

      const content = await RNFS.readFile(filePath);
      return JSON.parse(content);
    } catch (error) {
      console.error('Session load error:', error);
      return null;
    }
  }

  async getAllSessions(): Promise<SessionData[]> {
    try {
      const files = await RNFS.readDir(this.SESSIONS_DIR);
      const sessions: SessionData[] = [];

      for (const file of files) {
        if (file.name.endsWith('.json')) {
          const sessionId = file.name.replace('.json', '');
          const session = await this.loadSession(sessionId);
          if (session) {
            sessions.push(session);
          }
        }
      }

      return sessions.sort((a, b) => 
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );
    } catch (error) {
      console.error('Load all sessions error:', error);
      return [];
    }
  }

  async deleteSession(sessionId: string): Promise<void> {
    try {
      const filePath = `${this.SESSIONS_DIR}/${sessionId}.json`;
      const exists = await RNFS.exists(filePath);

      if (exists) {
        await RNFS.unlink(filePath);
      }
    } catch (error) {
      console.error('Session delete error:', error);
      throw error;
    }
  }

  async exportSession(sessionId: string): Promise<string> {
    try {
      const session = await this.loadSession(sessionId);
      if (!session) {
        throw new Error('Session not found');
      }

      const exportData = {
        session,
        exportedAt: new Date().toISOString(),
        version: '1.0',
      };

      const exportPath = `${RNFS.DocumentDirectoryPath}/export_${sessionId}.json`;
      await RNFS.writeFile(exportPath, JSON.stringify(exportData, null, 2));

      return exportPath;
    } catch (error) {
      console.error('Session export error:', error);
      throw error;
    }
  }

  getAudioDirectory(): string {
    return this.AUDIO_DIR;
  }

  getVideoDirectory(): string {
    return this.VIDEO_DIR;
  }
}

export default new StorageService();