import React, {createContext, useState, useEffect, ReactNode} from 'react';
import {magnetometer, accelerometer, gyroscope} from 'react-native-sensors';

interface SensorContextType {
  emfLevel: number;
  temperature: number;
  accelerometerData: {x: number; y: number; z: number};
  magnetometerData: {x: number; y: number; z: number};
  gyroscopeData: {x: number; y: number; z: number};
  isMonitoring: boolean;
  startMonitoring: () => void;
  stopMonitoring: () => void;
}

export const SensorContext = createContext<SensorContextType>({
  emfLevel: 0,
  temperature: 20,
  accelerometerData: {x: 0, y: 0, z: 0},
  magnetometerData: {x: 0, y: 0, z: 0},
  gyroscopeData: {x: 0, y: 0, z: 0},
  isMonitoring: false,
  startMonitoring: () => {},
  stopMonitoring: () => {},
});

interface SensorProviderProps {
  children: ReactNode;
}

export const SensorProvider: React.FC<SensorProviderProps> = ({children}) => {
  const [emfLevel, setEmfLevel] = useState(0);
  const [temperature, setTemperature] = useState(20);
  const [accelerometerData, setAccelerometerData] = useState({x: 0, y: 0, z: 0});
  const [magnetometerData, setMagnetometerData] = useState({x: 0, y: 0, z: 0});
  const [gyroscopeData, setGyroscopeData] = useState({x: 0, y: 0, z: 0});
  const [isMonitoring, setIsMonitoring] = useState(false);

  let magnetometerSubscription: any;
  let accelerometerSubscription: any;
  let gyroscopeSubscription: any;

  const startMonitoring = () => {
    setIsMonitoring(true);

    // Magnetometer for EMF simulation
    magnetometerSubscription = magnetometer.subscribe(({x, y, z}) => {
      setMagnetometerData({x, y, z});

      // Calculate EMF level based on magnetic field strength
      const magnitude = Math.sqrt(x * x + y * y + z * z);
      const normalizedEMF = Math.min(100, Math.max(0, (magnitude - 25) * 2));

      // Add some randomness for paranormal effect
      const paranormalBoost = Math.random() > 0.95 ? Math.random() * 30 : 0;
      setEmfLevel(Math.min(100, normalizedEMF + paranormalBoost));
    });

    // Accelerometer
    accelerometerSubscription = accelerometer.subscribe(({x, y, z}) => {
      setAccelerometerData({x, y, z});
    });

    // Gyroscope
    gyroscopeSubscription = gyroscope.subscribe(({x, y, z}) => {
      setGyroscopeData({x, y, z});
    });

    // Simulate temperature fluctuations
    const temperatureInterval = setInterval(() => {
      const baseTemp = 20;
      const variation = (Math.random() - 0.5) * 4;
      const paranormalDrop = emfLevel > 70 ? -Math.random() * 5 : 0;
      setTemperature(baseTemp + variation + paranormalDrop);
    }, 2000);
  };

  const stopMonitoring = () => {
    setIsMonitoring(false);

    if (magnetometerSubscription) {
      magnetometerSubscription.unsubscribe();
    }
    if (accelerometerSubscription) {
      accelerometerSubscription.unsubscribe();
    }
    if (gyroscopeSubscription) {
      gyroscopeSubscription.unsubscribe();
    }
  };

  useEffect(() => {
    return () => {
      stopMonitoring();
    };
  }, []);

  return (
    <SensorContext.Provider
      value={{
        emfLevel,
        temperature,
        accelerometerData,
        magnetometerData,
        gyroscopeData,
        isMonitoring,
        startMonitoring,
        stopMonitoring,
      }}>
      {children}
    </SensorContext.Provider>
  );
};