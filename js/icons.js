// ============================================
// LUCIDE ICON SYSTEM
// ============================================

class IconSystem {
    constructor() {
        this.icons = {
            // App Icons
            about: 'user-circle',
            resume: 'file-text',
            github: 'github',
            linkedin: 'linkedin',
            youtube: 'youtube',
            contact: 'mail',
            game: 'gamepad-2',
            vault: 'vault',
            
            // Taskbar & System
            start: 'hexagon',
            search: 'search',
            sound_on: 'volume-2',
            sound_off: 'volume-x',
            clock: 'clock',
            
            // Window Controls
            minimize: 'minus',
            maximize: 'square',
            close: 'x',
            
            // Start Menu
            restart: 'rotate-cw',
            shutdown: 'power',
            
            // Actions
            download: 'download',
            print: 'printer',
            view: 'eye',
            external: 'external-link',
            play: 'play',
            info: 'info',
            send: 'send',
            
            // Status
            success: 'check-circle',
            error: 'alert-circle',
            warning: 'alert-triangle',
            
            // Navigation
            chevron: 'chevron-right',
            
            // Features
            code: 'code-2',
            star: 'star',
            folder: 'folder',
            
            // Misc
            help: 'help-circle',
            loading: 'loader-2',
            check: 'check',
            refresh: 'refresh-cw',
            search_x: 'search-x'
        };
        
        this.iconSizes = {
            sm: 14,
            md: 18,
            lg: 24,
            xl: 32,
            xxl: 48
        };
    }
    
    getIconName(name) {
        return this.icons[name] || name;
    }
    
    getIconHTML(name, size = 'md', className = '') {
        const iconName = this.icons[name] || name;
        const iconSize = this.iconSizes[size] || this.iconSizes.md;
        const classAttr = className ? ` class="${className}"` : '';
        return `<i data-lucide="${iconName}" width="${iconSize}" height="${iconSize}"${classAttr}></i>`;
    }
    
    refresh() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }
}

window.iconSystem = new IconSystem();