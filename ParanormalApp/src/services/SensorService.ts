import {magnetometer, accelerometer, gyroscope} from 'react-native-sensors';

export class SensorService {
  private magnetometerSubscription: any;
  private accelerometerSubscription: any;
  private gyroscopeSubscription: any;

  startMonitoring(callbacks: {
    onMagnetometerData: (data: {x: number; y: number; z: number}) => void;
    onAccelerometerData: (data: {x: number; y: number; z: number}) => void;
    onGyroscopeData: (data: {x: number; y: number; z: number}) => void;
  }) {
    // Magnetometer
    this.magnetometerSubscription = magnetometer.subscribe(callbacks.onMagnetometerData);

    // Accelerometer
    this.accelerometerSubscription = accelerometer.subscribe(callbacks.onAccelerometerData);

    // Gyroscope
    this.gyroscopeSubscription = gyroscope.subscribe(callbacks.onGyroscopeData);
  }

  stopMonitoring() {
    if (this.magnetometerSubscription) {
      this.magnetometerSubscription.unsubscribe();
    }
    if (this.accelerometerSubscription) {
      this.accelerometerSubscription.unsubscribe();
    }
    if (this.gyroscopeSubscription) {
      this.gyroscopeSubscription.unsubscribe();
    }
  }

  calculateEMFLevel(magnetometerData: {x: number; y: number; z: number}): number {
    const {x, y, z} = magnetometerData;
    const magnitude = Math.sqrt(x * x + y * y + z * z);

    // Normalize to 0-100 scale
    const normalizedEMF = Math.min(100, Math.max(0, (magnitude - 25) * 2));

    // Add paranormal simulation
    const paranormalBoost = Math.random() > 0.95 ? Math.random() * 30 : 0;

    return Math.min(100, normalizedEMF + paranormalBoost);
  }
}

export default new SensorService();