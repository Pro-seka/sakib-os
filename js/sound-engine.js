// ============================================
// SOUND ENGINE - FIXED AUDIO CONTEXT
// ============================================

class SoundEngine {
    constructor() {
        this.audioContext = null;
        this.enabled = true;
        this.lastPlayTime = {};
        this.cooldowns = {
            click: 50,
            hover: 100,
            open: 200,
            close: 200,
            minimize: 150,
            focus: 150,
            boot: 500,
            error: 300
        };
        this.initAudioContext();
    }

    initAudioContext() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported');
            this.enabled = false;
        }
    }

    ensureContext() {
        if (!this.audioContext) return;
        if (this.audioContext.state === 'suspended') {
            this.audioContext.resume().catch(() => {});
        }
        // If context is closed, create a new one
        if (this.audioContext.state === 'closed') {
            this.initAudioContext();
        }
    }

    canPlay(soundType) {
        if (!this.enabled || !this.audioContext) return false;
        const now = Date.now();
        const cooldown = this.cooldowns[soundType] || 100;
        if (this.lastPlayTime[soundType] && now - this.lastPlayTime[soundType] < cooldown) {
            return false;
        }
        this.lastPlayTime[soundType] = now;
        return true;
    }

    playClick() {
        if (!this.canPlay('click')) return;
        this.ensureContext();
        const ctx = this.audioContext;
        if (!ctx) return;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.04);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.04);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.04);
    }

    playHover() {
        if (!this.canPlay('hover')) return;
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1200, ctx.currentTime);
        gain.gain.setValueAtTime(0.02, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.03);
    }

    playWindowOpen() {
        if (!this.canPlay('open')) return;
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(300, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(1200, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.15);
    }

    playWindowClose() {
        if (!this.canPlay('close')) return;
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.1);
    }

    playMinimize() {
        if (!this.canPlay('minimize')) return;
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sine';
        osc.frequency.setValueAtTime(600, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.06);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.06);
    }

    playBoot() {
        if (!this.canPlay('boot')) return;
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        [261.63, 329.63, 392.00].forEach((freq, i) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.connect(gain);
            gain.connect(ctx.destination);
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq / 2, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(freq, ctx.currentTime + 0.5);
            gain.gain.setValueAtTime(0, ctx.currentTime);
            gain.gain.linearRampToValueAtTime(0.03, ctx.currentTime + 0.2);
            gain.gain.linearRampToValueAtTime(0.01, ctx.currentTime + 0.5);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
            osc.start(ctx.currentTime + i * 0.05);
            osc.stop(ctx.currentTime + 0.8);
        });
    }

    playError() {
        if (!this.canPlay('error')) return;
        this.ensureContext();
        if (!this.audioContext) return;
        const ctx = this.audioContext;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(150, ctx.currentTime);
        osc.frequency.setValueAtTime(100, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.12);
    }

    toggleSound() {
        this.enabled = !this.enabled;
        const btn = document.getElementById('sound-toggle');
        if (btn) {
            btn.innerHTML = this.enabled
                ? '<i data-lucide="volume-2" width="16" height="16"></i>'
                : '<i data-lucide="volume-x" width="16" height="16"></i>';
            if (window.lucide) {
                window.lucide.createIcons({ attrs: { 'stroke-width': '1.5' } });
            }
        }
        return this.enabled;
    }
}

window.soundEngine = new SoundEngine();