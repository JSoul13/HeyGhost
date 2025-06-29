import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';

interface SessionTimerProps {
  isActive: boolean;
}

const SessionTimer: React.FC<SessionTimerProps> = ({isActive}) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => prev + 1);
      }, 1000);
    } else {
      setSeconds(0);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [isActive]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>SESSION TIME</Text>
      <Text style={styles.time}>{formatTime(seconds)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  label: {
    color: '#888',
    fontSize: 12,
    fontWeight: 'bold',
  },
  time: {
    color: '#4ecdc4',
    fontSize: 32,
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
});

export default SessionTimer;