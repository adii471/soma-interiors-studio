// Architectural ambient sound engine using Web Audio API
class AmbientSoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.gainNode = null;
    this.oscillators = [];
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return;
    this.ctx = new AudioContext();

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(0, this.ctx.currentTime);

    // Warm resonant low-pass filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(320, this.ctx.currentTime);
    filter.Q.setValueAtTime(2.5, this.ctx.currentTime);

    this.gainNode.connect(filter);
    filter.connect(this.ctx.destination);

    // Harmonic frequencies for warm architectural drone: D2 (73.42Hz), A2 (110Hz), D3 (146.83Hz), F#3 (185Hz)
    const freqs = [73.42, 110.0, 146.83, 185.0];

    freqs.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Subtle LFO for breathing movement
      const lfo = this.ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08 + idx * 0.03, this.ctx.currentTime);
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.setValueAtTime(1.5, this.ctx.currentTime);
      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);
      lfo.start();

      const oscGain = this.ctx.createGain();
      oscGain.gain.setValueAtTime(0.06 / (idx + 1), this.ctx.currentTime);
      osc.connect(oscGain);
      oscGain.connect(this.gainNode);

      osc.start();
      this.oscillators.push(osc);
    });
  }

  toggle() {
    this.init();
    if (!this.ctx) return false;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    if (this.isPlaying) {
      this.gainNode.gain.setTargetAtTime(0, this.ctx.currentTime, 0.6);
      this.isPlaying = false;
    } else {
      this.gainNode.gain.setTargetAtTime(0.12, this.ctx.currentTime, 1.2);
      this.isPlaying = true;
    }
    return this.isPlaying;
  }
}

export const soundEngine = new AmbientSoundEngine();
