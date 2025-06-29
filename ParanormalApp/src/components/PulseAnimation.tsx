import React, {useEffect} from 'react';
import {View, StyleSheet, Animated} from 'react-native';

const PulseAnimation: React.FC = () => {
  const pulseAnim = new Animated.Value(1);
  const opacityAnim = new Animated.Value(0.3);

  useEffect(() => {
    const startAnimation = () => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.timing(pulseAnim, {
              toValue: 1.5,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(pulseAnim, {
              toValue: 1,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.timing(opacityAnim, {
              toValue: 0.8,
              duration: 2000,
              useNativeDriver: true,
            }),
            Animated.timing(opacityAnim, {
              toValue: 0.3,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ).start();
    };

    startAnimation();
  }, []);

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.pulse,
          {
            transform: [{scale: pulseAnim}],
            opacity: opacityAnim,
          },
        ]}
      />
      <Animated.View
        style={[
          styles.pulse,
          styles.pulse2,
          {
            transform: [{scale: pulseAnim}],
            opacity: opacityAnim,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pulse: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#ff6b6b',
    position: 'absolute',
  },
  pulse2: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderColor: '#4ecdc4',
  },
});

export default PulseAnimation;