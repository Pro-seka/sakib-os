// ============================================
// GLOBAL SYSTEM STATE MANAGER
// ============================================

class SystemState {
    constructor() {
        this.state = {
            openWindows: new Map(),
            activeWindowId: null,
            minimizedWindows: new Set(),
            systemMode: 'exploration',
            isBooted: false,
            isShutdown: false,
            theme: {
                accentColor: '#a78bfa',
                accentSecondary: '#8b5cf6',
                glowIntensity: 0.4,
                currentApp: null
            },
            deviceMode: this.detectDevice(),
            isMobile: window.innerWidth <= 768,
            isTablet: window.innerWidth > 768 && window.innerWidth <= 1024,
            soundEnabled: true,
            startMenuOpen: false,
            animationFrameId: null,
            appUsageCount: new Map(),
            lastInteraction: Date.now(),
            idleThreshold: 30000,
            zIndexCounter: 20,
            eventListeners: new Map()
        };

        this.initDeviceDetection();
    }

    detectDevice() {
        const width = window.innerWidth;
        if (width <= 768) return 'mobile';
        if (width <= 1024) return 'tablet';
        return 'desktop';
    }

    initDeviceDetection() {
        window.addEventListener('resize', () => {
            const prevMode = this.state.deviceMode;
            this.state.deviceMode = this.detectDevice();
            this.state.isMobile = window.innerWidth <= 768;
            this.state.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

            if (prevMode !== this.state.deviceMode) {
                this.emit('deviceModeChanged', this.state.deviceMode);
            }
        });
    }

    addWindow(windowId, windowData) {
        this.state.openWindows.set(windowId, {
            ...windowData,
            zIndex: ++this.state.zIndexCounter,
            createdAt: Date.now()
        });
        this.state.activeWindowId = windowId;
        this.state.minimizedWindows.delete(windowId);
        this.emit('windowAdded', windowId);
        this.checkIdle();
    }

    removeWindow(windowId) {
        this.state.openWindows.delete(windowId);
        this.state.minimizedWindows.delete(windowId);

        if (this.state.activeWindowId === windowId) {
            const windows = Array.from(this.state.openWindows.keys());
            this.state.activeWindowId = windows.length > 0 ? windows[windows.length - 1] : null;
        }

        this.emit('windowRemoved', windowId);
        this.checkIdle();
    }

    setActiveWindow(windowId) {
        if (this.state.openWindows.has(windowId)) {
            this.state.activeWindowId = windowId;
            const window = this.state.openWindows.get(windowId);
            window.zIndex = ++this.state.zIndexCounter;
            this.state.minimizedWindows.delete(windowId);
            this.emit('windowFocused', windowId);
            this.checkIdle();
        }
    }

    minimizeWindow(windowId) {
        if (this.state.openWindows.has(windowId)) {
            this.state.minimizedWindows.add(windowId);

            if (this.state.activeWindowId === windowId) {
                const visibleWindows = Array.from(this.state.openWindows.keys())
                    .filter(id => !this.state.minimizedWindows.has(id));
                this.state.activeWindowId = visibleWindows.length > 0 ? visibleWindows[visibleWindows.length - 1] : null;
            }

            this.emit('windowMinimized', windowId);
            this.checkIdle();
        }
    }

    restoreWindow(windowId) {
        if (this.state.openWindows.has(windowId)) {
            this.state.minimizedWindows.delete(windowId);
            this.setActiveWindow(windowId);
            this.emit('windowRestored', windowId);
        }
    }

    checkIdle() {
        this.state.lastInteraction = Date.now();
        if (this.state.systemMode === 'idle') {
            this.state.systemMode = 'exploration';
        }
    }

    checkSystemIdle() {
        const idleTime = Date.now() - this.state.lastInteraction;
        if (idleTime >= this.state.idleThreshold && this.state.systemMode !== 'idle') {
            this.state.systemMode = 'idle';
            this.emit('systemModeChanged', 'idle');
        }
    }

    trackAppUsage(appType) {
        const count = this.state.appUsageCount.get(appType) || 0;
        this.state.appUsageCount.set(appType, count + 1);
    }

    updateTheme(appType) {
        const themes = {
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

        const theme = themes[appType] || themes.about;
        this.state.theme = { ...theme, currentApp: appType };

        document.documentElement.style.setProperty('--accent-primary', theme.accent);
        document.documentElement.style.setProperty('--accent-secondary', theme.secondary);
        document.documentElement.style.setProperty('--accent-glow', `rgba(${this.hexToRgb(theme.accent)}, ${theme.glow})`);

        this.emit('themeChanged', this.state.theme);
    }

    hexToRgb(hex) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '167, 139, 250';
    }

    on(event, callback) {
        if (!this.state.eventListeners.has(event)) {
            this.state.eventListeners.set(event, []);
        }
        this.state.eventListeners.get(event).push(callback);
    }

    emit(event, data) {
        const listeners = this.state.eventListeners.get(event) || [];
        listeners.forEach(callback => callback(data));
    }

    resetSystem() {
        this.state.openWindows.clear();
        this.state.activeWindowId = null;
        this.state.minimizedWindows.clear();
        this.state.startMenuOpen = false;
        this.state.systemMode = 'exploration';
        this.state.zIndexCounter = 20;
        this.emit('systemReset');
    }
}

window.systemState = new SystemState();