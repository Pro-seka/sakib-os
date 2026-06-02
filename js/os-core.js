// ============================================
// OS CORE SYSTEM
// ============================================

class OSCore {
    constructor() {
        this.version = '2.0.26';
        this.build = '2026.06.02';
        this.modules = new Map();
    }

    registerModule(name, instance) {
        this.modules.set(name, instance);
    }

    getModule(name) {
        return this.modules.get(name);
    }

    getSystemInfo() {
        return {
            version: this.version,
            build: this.build,
            userAgent: navigator.userAgent,
            platform: navigator.platform,
            language: navigator.language,
            screenResolution: `${window.screen.width}x${window.screen.height}`,
            hardwareConcurrency: navigator.hardwareConcurrency || 'Unknown'
        };
    }
}

window.osCore = new OSCore();