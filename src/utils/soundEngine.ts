// Client-side synthesized ambient sound generator using Web Audio API
// No external MP3 downloads required - generates soothing procedural audio!

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private currentTrack: string | null = null;
  private nodes: (AudioNode | number)[] = [];

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  public play(track: 'rain' | 'waves' | 'breeze' | 'birds'): void {
    this.stop();
    const ctx = this.getContext();
    this.currentTrack = track;

    if (track === 'rain') {
      // Pink/Brown noise rain simulation
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(800, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.18, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      this.nodes.push(noise, filter, gain);
    } else if (track === 'waves') {
      // Ocean wave cycles: low noise modulated by slow LFO
      const bufferSize = ctx.sampleRate * 3;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(450, ctx.currentTime);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.05, ctx.currentTime);

      // LFO for wave swelling
      const osc = ctx.createOscillator();
      osc.frequency.setValueAtTime(0.12, ctx.currentTime);
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.12, ctx.currentTime);
      osc.connect(lfoGain);
      lfoGain.connect(gain.gain);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      osc.start();
      this.nodes.push(noise, filter, gain, osc, lfoGain);
    } else if (track === 'breeze') {
      // Gentle wind breeze
      const bufferSize = ctx.sampleRate * 2;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.12, ctx.currentTime);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      noise.start();
      this.nodes.push(noise, filter, gain);
    } else if (track === 'birds') {
      // Birds chirping: occasional frequency swept sine chirps
      const gain = ctx.createGain();
      gain.gain.setValueAtTime(0.15, ctx.currentTime);
      gain.connect(ctx.destination);
      this.nodes.push(gain);

      const chirpInterval = window.setInterval(() => {
        if (!this.ctx || this.currentTrack !== 'birds') return;
        const osc = this.ctx.createOscillator();
        const chirpGain = this.ctx.createGain();
        const baseFreq = 2200 + Math.random() * 1200;
        osc.frequency.setValueAtTime(baseFreq, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 900, this.ctx.currentTime + 0.08);
        osc.frequency.exponentialRampToValueAtTime(baseFreq - 300, this.ctx.currentTime + 0.16);

        chirpGain.gain.setValueAtTime(0.01, this.ctx.currentTime);
        chirpGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 0.04);
        chirpGain.gain.linearRampToValueAtTime(0.001, this.ctx.currentTime + 0.18);

        osc.connect(chirpGain);
        chirpGain.connect(gain);
        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.2);
      }, 1400);

      this.nodes.push(chirpInterval);
    }
  }

  public stop(): void {
    this.nodes.forEach((node) => {
      if (typeof node === 'number') {
        clearInterval(node);
      } else {
        try {
          if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
            (node as AudioScheduledSourceNode).stop();
          }
          node.disconnect();
        } catch {
          // ignore already stopped
        }
      }
    });
    this.nodes = [];
    this.currentTrack = null;
  }

  public getCurrentTrack(): string | null {
    return this.currentTrack;
  }
}

export const soundEngine = new AmbientSoundEngine();
