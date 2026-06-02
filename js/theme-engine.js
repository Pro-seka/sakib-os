// ============================================
// DYNAMIC THEME ENGINE
// ============================================

class ThemeEngine {
    constructor() {
        this.currentTheme = 'default';
        this.themes = {
            default: { accent: '#a78bfa', secondary: '#8b5cf6', glow: 0.4 },
            about: { accent: '#a78bfa', secondary: '#8b5cf6', glow: 0.4 },
            resume: { accent: '#60a5fa', secondary: '#3b82f6', glow: 0.35 },
            github: { accent: '#22d3ee', secondary: '#06b6d4', glow: 0.35 },
            linkedin: { accent: '#3b82f6', secondary: '#2563eb', glow: 0.3 },
            youtube: { accent: '#f87171', secondary: '#ef4444', glow: 0.4 },
            contact: { accent: '#d1d5db', secondary: '#9ca3af', glow: 0.3 },
            game: { accent: '#8b5cf6', secondary: '#7c3aed', glow: 0.4 },
            'game-player': { accent: '#8b5cf6', secondary: '#7c3aed', glow: 0.4 },
            vault: { accent: '#a78bfa', secondary: '#8b5cf6', glow: 0.35 },
            'vault-browser': { accent: '#a78bfa', secondary: '#8b5cf6', glow: 0.35 },
            'resume-viewer': { accent: '#60a5fa', secondary: '#3b82f6', glow: 0.35 }
        };

        this.applyTheme('default');
    }

    applyTheme(themeName) {
        const theme = this.themes[themeName] || this.themes.default;
        this.currentTheme = themeName;

        const root = document.documentElement;
        root.style.setProperty('--accent-primary', theme.accent);
        root.style.setProperty('--accent-secondary', theme.secondary);
        root.style.setProperty('--accent-glow', this.hexToRgba(theme.accent, theme.glow));
        root.style.setProperty('--border-primary', this.hexToRgba(theme.accent, 0.3));
    }

    hexToRgba(hex, alpha) {
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

    getAccentColor() {
        return this.themes[this.currentTheme]?.accent || this.themes.default.accent;
    }
}

window.themeEngine = new ThemeEngine();