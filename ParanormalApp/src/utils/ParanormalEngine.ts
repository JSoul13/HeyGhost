export class ParanormalEngine {
  private static instance: ParanormalEngine;
  private baselineEMF: number = 0;
  private activityHistory: number[] = [];
  private lastSpikeTime: number = 0;

  static getInstance(): ParanormalEngine {
    if (!ParanormalEngine.instance) {
      ParanormalEngine.instance = new ParanormalEngine();
    }
    return ParanormalEngine.instance;
  }

  calibrateBaseline(emfReadings: number[]): void {
    if (emfReadings.length > 0) {
      this.baselineEMF = emfReadings.reduce((sum, val) => sum + val, 0) / emfReadings.length;
    }
  }

  processEMFReading(rawEMF: number): number {
    // Add to history
    this.activityHistory.push(rawEMF);
    if (this.activityHistory.length > 50) {
      this.activityHistory.shift();
    }

    // Calculate deviation from baseline
    const deviation = Math.abs(rawEMF - this.baselineEMF);

    // Apply paranormal enhancement
    let enhancedEMF = rawEMF;

    // Spike generation logic
    const now = Date.now();
    if (now - this.lastSpikeTime > 10000) { // At least 10 seconds between spikes
      if (Math.random() > 0.97) { // 3% chance of spike
        enhancedEMF += Math.random() * 40 + 20; // Add 20-60 to EMF
        this.lastSpikeTime = now;
      }
    }

    // Pattern-based enhancement
    if (this.detectPattern()) {
      enhancedEMF += Math.random() * 15 + 5;
    }

    return Math.min(100, Math.max(0, enhancedEMF));
  }

  private detectPattern(): boolean {
    if (this.activityHistory.length < 10) return false;

    const recent = this.activityHistory.slice(-10);
    const average = recent.reduce((sum, val) => sum + val, 0) / recent.length;

    // Look for increasing trend
    let increasingCount = 0;
    for (let i = 1; i < recent.length; i++) {
      if (recent[i] > recent[i - 1]) {
        increasingCount++;
      }
    }

    return increasingCount >= 6; // 60% of readings increasing
  }

  generateSpiritResponse(emfLevel: number, temperature: number): {
    shouldRespond: boolean;
    message: string;
    type: 'word' | 'sentence';
  } {
    const shouldRespond = emfLevel > 60 && Math.random() > 0.7;

    if (!shouldRespond) {
      return {shouldRespond: false, message: '', type: 'word'};
    }

    const words = [
      'Hello', 'Help', 'Cold', 'Here', 'Listen', 'Yes', 'No', 'Leave',
      'Stay', 'Find', 'Lost', 'Home', 'Dark', 'Light', 'Remember', 'Pain',
      'Love', 'Fear', 'Hope', 'Truth', 'Secret', 'Hidden', 'Forgotten'
    ];

    const sentences = [
      'I am here with you',
      'Can you hear me?',
      'Help me find peace',
      'I have been waiting so long',
      'Do not be afraid of me',
      'I need to tell you something important',
      'The truth must be known',
      'I cannot rest until this is resolved',
      'Remember what happened here',
      'They do not want you to know',
      'I am trapped in this place',
      'Please help me cross over'
    ];

    // Higher EMF = more likely to get full sentences
    const isFullSentence = emfLevel > 80 ? Math.random() > 0.4 : Math.random() > 0.7;

    if (isFullSentence) {
      return {
        shouldRespond: true,
        message: sentences[Math.floor(Math.random() * sentences.length)],
        type: 'sentence'
      };
    } else {
      return {
        shouldRespond: true,
        message: words[Math.floor(Math.random() * words.length)],
        type: 'word'
      };
    }
  }

  calculateParanormalScore(
    emfLevel: number,
    temperature: number,
    audioAnomalies: number,
    duration: number
  ): number {
    let score = 0;

    // EMF contribution (40% of score)
    score += (emfLevel / 100) * 40;

    // Temperature anomaly contribution (20% of score)
    const tempAnomaly = Math.abs(temperature - 20); // 20°C baseline
    score += Math.min(20, tempAnomaly * 2);

    // Audio anomaly contribution (30% of score)
    score += Math.min(30, audioAnomalies * 5);

    // Duration bonus (10% of score)
    const durationMinutes = duration / 60000; // Convert to minutes
    score += Math.min(10, durationMinutes * 0.5);

    return Math.min(100, Math.max(0, score));
  }
}

export default ParanormalEngine.getInstance();