import React, {createContext, useState, ReactNode} from 'react';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

interface AudioContextType {
  isRecording: boolean;
  isPlaying: boolean;
  recordTime: string;
  playTime: string;
  audioRecorderPlayer: AudioRecorderPlayer;
  startRecording: () => Promise<void>;
  stopRecording: () => Promise<void>;
  startPlaying: (path: string) => Promise<void>;
  stopPlaying: () => Promise<void>;
  recordings: string[];
}

export const AudioContext = createContext<AudioContextType>({
  isRecording: false,
  isPlaying: false,
  recordTime: '00:00',
  playTime: '00:00',
  audioRecorderPlayer: new AudioRecorderPlayer(),
  startRecording: async () => {},
  stopRecording: async () => {},
  startPlaying: async () => {},
  stopPlaying: async () => {},
  recordings: [],
});

interface AudioProviderProps {
  children: ReactNode;
}

export const AudioProvider: React.FC<AudioProviderProps> = ({children}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordTime, setRecordTime] = useState('00:00');
  const [playTime, setPlayTime] = useState('00:00');
  const [recordings, setRecordings] = useState<string[]>([]);
  const [audioRecorderPlayer] = useState(new AudioRecorderPlayer());

  const startRecording = async () => {
    try {
      const path = `recording_${Date.now()}.m4a`;
      const result = await audioRecorderPlayer.startRecorder(path);
      setIsRecording(true);

      audioRecorderPlayer.addRecordBackListener((e) => {
        setRecordTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));
      });
    } catch (error) {
      console.error('Start recording error:', error);
    }
  };

  const stopRecording = async () => {
    try {
      const result = await audioRecorderPlayer.stopRecorder();
      setIsRecording(false);
      audioRecorderPlayer.removeRecordBackListener();
      setRecordTime('00:00');

      if (result) {
        setRecordings(prev => [...prev, result]);
      }
    } catch (error) {
      console.error('Stop recording error:', error);
    }
  };

  const startPlaying = async (path: string) => {
    try {
      await audioRecorderPlayer.startPlayer(path);
      setIsPlaying(true);

      audioRecorderPlayer.addPlayBackListener((e) => {
        setPlayTime(audioRecorderPlayer.mmssss(Math.floor(e.currentPosition)));

        if (e.currentPosition === e.duration) {
          setIsPlaying(false);
          setPlayTime('00:00');
        }
      });
    } catch (error) {
      console.error('Start playing error:', error);
    }
  };

  const stopPlaying = async () => {
    try {
      await audioRecorderPlayer.stopPlayer();
      setIsPlaying(false);
      audioRecorderPlayer.removePlayBackListener();
      setPlayTime('00:00');
    } catch (error) {
      console.error('Stop playing error:', error);
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isRecording,
        isPlaying,
        recordTime,
        playTime,
        audioRecorderPlayer,
        startRecording,
        stopRecording,
        startPlaying,
        stopPlaying,
        recordings,
      }}>
      {children}
    </AudioContext.Provider>
  );
};