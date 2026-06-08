// ============================================
// WINDOW MANAGEMENT SYSTEM
// ============================================

class WindowManager {
    constructor() {
        this.container = document.getElementById('window-container');
        this.dragging = null;
        this.dragOffset = { x: 0, y: 0 };
        this.windowInstances = new Map();
        this.isMobile = window.innerWidth <= 768;
        this.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

        this.setupGlobalListeners();
        this.setupResizeListener();
    }

    setupResizeListener() {
        window.addEventListener('resize', () => {
            const wasMobile = this.isMobile;
            this.isMobile = window.innerWidth <= 768;
            this.isTablet = window.innerWidth > 768 && window.innerWidth <= 1024;

            if (!wasMobile && this.isMobile) {
                this.windowInstances.forEach((instance, id) => {
                    this.makeFullscreen(id);
                });
            }

            this.handleResize();
        });
    }

    getWindowIcon(app) {
        // Using reliable Lucide icons that always render
        const iconMap = {
            'about': 'user-circle',
            'resume': 'file-text',
            'github': 'code-2',           // Changed from 'github' to 'code-2' (reliable)
            'linkedin': 'briefcase',       // Changed from 'linkedin' to 'briefcase' (reliable)
            'youtube': 'play-circle',      // Changed from 'youtube' to 'play-circle' (reliable)
            'contact': 'mail',
            'game': 'gamepad-2',
            'game-player': 'play-circle',
            'vault': 'vault',
            'vault-browser': 'vault',
            'resume-viewer': 'file-text'
        };
        return iconMap[app] || 'folder';
    }

    createWindow(config) {
        const { id, title, width = 800, height = 600, app, content } = config;

        if (this.windowInstances.has(id)) {
            this.focusWindow(id);
            return this.windowInstances.get(id);
        }

        const windowEl = document.createElement('div');
        windowEl.className = 'os-window';
        windowEl.id = `window-${id}`;
        windowEl.dataset.windowId = id;

        if (this.isMobile) {
            windowEl.classList.add('mobile-fullscreen');
            windowEl.style.cssText = `
                position: fixed; top: 0; left: 0; right: 0;
                bottom: var(--taskbar-height); width: 100% !important;
                height: auto !important; border-radius: 0;
            `;
        } else if (this.isTablet) {
            const maxWidth = Math.min(width, window.innerWidth - 40);
            const maxHeight = Math.min(height, window.innerHeight - 100);
            const position = this.calculateInitialPosition(maxWidth, maxHeight);
            windowEl.style.cssText = `
                left: ${position.x}px; top: ${position.y}px;
                width: ${maxWidth}px; height: ${maxHeight}px;
            `;
        } else {
            const position = this.calculateInitialPosition(width, height);
            windowEl.style.cssText = `
                left: ${position.x}px; top: ${position.y}px;
                width: ${width}px; height: ${height}px;
            `;
        }

        const lucideIcon = this.getWindowIcon(app);

        windowEl.innerHTML = `
            <div class="window-titlebar" data-window-id="${id}">
                <div class="window-title">
                    <span class="window-title-icon">
                        <i data-lucide="${lucideIcon}" width="16" height="16" stroke-width="2.5"></i>
                    </span>
                    <span class="window-title-text">${title}</span>
                </div>
                <div class="window-controls">
                    <button class="window-control minimize" data-action="minimize" title="Minimize">
                        <svg width="8" height="8" viewBox="0 0 8 8">
                            <line x1="1" y1="4" x2="7" y2="4" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                    <button class="window-control maximize" data-action="maximize" title="Maximize">
                        <svg width="8" height="8" viewBox="0 0 8 8">
                            <rect x="1" y="1" width="6" height="6" stroke="currentColor" stroke-width="1.5" fill="none"/>
                        </svg>
                    </button>
                    <button class="window-control close" data-action="close" title="Close">
                        <svg width="8" height="8" viewBox="0 0 8 8">
                            <line x1="1" y1="1" x2="7" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                            <line x1="7" y1="1" x2="1" y2="7" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="window-content" data-window-id="${id}">
                ${content || ''}
            </div>
        `;

        this.container.appendChild(windowEl);

        const instance = {
            id,
            element: windowEl,
            app,
            config,
            isFullscreen: this.isMobile
        };
        this.windowInstances.set(id, instance);

        this.setupWindowEvents(windowEl, id);
        window.systemState.addWindow(id, { id, title, app });
        this.focusWindow(id);
        this.updateTaskbar();
        window.systemState.trackAppUsage(app);
        window.soundEngine.playWindowOpen();
        this.animateWindowEntrance(windowEl);

        // Render Lucide icons
        if (window.lucide) window.lucide.createIcons();
        setTimeout(() => { if (window.lucide) window.lucide.createIcons(); }, 100);

        return instance;
    }

    animateWindowEntrance(windowEl) {
        if (this.isMobile) {
            windowEl.style.transform = 'translateY(100%)';
            windowEl.style.transition = 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)';
            requestAnimationFrame(() => {
                windowEl.style.transform = 'translateY(0)';
            });
        } else {
            windowEl.style.opacity = '0';
            windowEl.style.transform = 'scale(0.95)';
            windowEl.style.transition = 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)';
            requestAnimationFrame(() => {
                windowEl.style.opacity = '1';
                windowEl.style.transform = 'scale(1)';
            });
        }
    }

    setupWindowEvents(windowEl, id) {
        const titlebar = windowEl.querySelector('.window-titlebar');

        if (!this.isMobile) {
            titlebar.addEventListener('mousedown', (e) => {
                if (e.target.closest('.window-control')) return;
                this.startDragging(e, id);
            });

            titlebar.addEventListener('dblclick', (e) => {
                if (e.target.closest('.window-control')) return;
                this.toggleMaximize(id);
            });

            titlebar.addEventListener('touchstart', (e) => {
                if (e.target.closest('.window-control')) return;
                this.startDragging(e.touches[0], id);
            }, { passive: false });
        } else {
            let touchStartY = 0;

            titlebar.addEventListener('touchstart', (e) => {
                touchStartY = e.touches[0].clientY;
            });

            titlebar.addEventListener('touchmove', (e) => {
                const deltaY = e.touches[0].clientY - touchStartY;
                if (deltaY > 0) {
                    windowEl.style.transform = `translateY(${deltaY}px)`;
                    windowEl.style.transition = 'none';
                }
            });

            titlebar.addEventListener('touchend', (e) => {
                const deltaY = e.changedTouches[0].clientY - touchStartY;
                if (deltaY > 80) {
                    this.closeWindowWithAnimation(id, 'down');
                } else {
                    windowEl.style.transform = 'translateY(0)';
                    windowEl.style.transition = 'transform 0.3s ease';
                }
            });
        }

        // Minimize button
        const minBtn = windowEl.querySelector('.minimize');
        if (minBtn) {
            minBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.minimizeWindow(id);
            });
        }

        // Maximize button
        const maxBtn = windowEl.querySelector('.maximize');
        if (maxBtn) {
            maxBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.toggleMaximize(id);
            });
        }

        // Close button
        const closeBtn = windowEl.querySelector('.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                e.preventDefault();
                this.closeWindow(id);
            });
        }

        // Focus window on click
        windowEl.addEventListener('mousedown', (e) => {
            this.focusWindow(id);
        });
    }

    startDragging(e, id) {
        const windowEl = document.getElementById(`window-${id}`);
        if (!windowEl || windowEl.classList.contains('maximized')) return;
        if (windowEl.classList.contains('mobile-fullscreen')) return;

        this.dragging = id;
        const rect = windowEl.getBoundingClientRect();
        this.dragOffset = { x: e.clientX - rect.left, y: e.clientY - rect.top };

        windowEl.style.cursor = 'grabbing';
        windowEl.style.transition = 'none';

        const handleMove = (e) => {
            if (!this.dragging) return;
            const clientX = e.clientX || e.touches?.[0]?.clientX;
            const clientY = e.clientY || e.touches?.[0]?.clientY;
            if (clientX === undefined || clientY === undefined) return;
            this.handleDrag(clientX, clientY, id);
        };

        const handleUp = () => {
            this.stopDragging(id);
            document.removeEventListener('mousemove', handleMove);
            document.removeEventListener('mouseup', handleUp);
            document.removeEventListener('touchmove', handleMove);
            document.removeEventListener('touchend', handleUp);
        };

        document.addEventListener('mousemove', handleMove);
        document.addEventListener('mouseup', handleUp);
        document.addEventListener('touchmove', handleMove, { passive: false });
        document.addEventListener('touchend', handleUp);
    }

    handleDrag(clientX, clientY, id) {
        if (!this.dragging) return;
        const windowEl = document.getElementById(`window-${id}`);
        if (!windowEl) return;

        const x = clientX - this.dragOffset.x;
        const y = clientY - this.dragOffset.y;
        const maxX = window.innerWidth - windowEl.offsetWidth;
        const maxY = window.innerHeight - 48 - windowEl.offsetHeight;

        windowEl.style.left = `${Math.max(0, Math.min(x, maxX))}px`;
        windowEl.style.top = `${Math.max(0, Math.min(y, maxY))}px`;
    }

    stopDragging(id) {
        this.dragging = null;
        const windowEl = document.getElementById(`window-${id}`);
        if (windowEl) {
            windowEl.style.cursor = '';
            windowEl.style.transition = '';
        }
    }

    focusWindow(id) {
        const instance = this.windowInstances.get(id);
        if (!instance) return;

        this.windowInstances.forEach((win, winId) => {
            if (winId === id) {
                win.element.classList.add('active');
                win.element.classList.remove('inactive');
                if (this.isMobile) win.element.style.zIndex = 'var(--z-window-active)';
            } else {
                win.element.classList.add('inactive');
                win.element.classList.remove('active');
                if (this.isMobile) win.element.style.zIndex = 'var(--z-window-inactive)';
            }
        });

        window.systemState.setActiveWindow(id);
        window.systemState.updateTheme(instance.app);
        this.updateTaskbar();
        window.soundEngine.playClick();
    }

    minimizeWindow(id) {
        if (this.isMobile) {
            this.closeWindowWithAnimation(id, 'down');
            return;
        }

        const instance = this.windowInstances.get(id);
        if (!instance) return;

        window.systemState.minimizeWindow(id);
        window.soundEngine.playMinimize();
        instance.element.style.display = 'none';
        this.updateTaskbar();
    }

    restoreWindow(id) {
        const instance = this.windowInstances.get(id);
        if (!instance) return;

        instance.element.style.display = 'flex';
        window.systemState.restoreWindow(id);
        this.focusWindow(id);
        this.updateTaskbar();
        window.soundEngine.playWindowOpen();

        if (this.isMobile) this.animateWindowEntrance(instance.element);
    }

    toggleMaximize(id) {
        const instance = this.windowInstances.get(id);
        if (!instance) return;
        if (this.isMobile) return;
        
        const windowEl = instance.element;

        if (windowEl.classList.contains('maximized')) {
            windowEl.classList.remove('maximized');
            windowEl.style.cssText = `
                left: ${instance.config.lastX || 100}px;
                top: ${instance.config.lastY || 100}px;
                width: ${instance.config.lastWidth || 800}px;
                height: ${instance.config.lastHeight || 600}px;
                border-radius: 8px;
            `;
            instance.isFullscreen = false;
        } else {
            const rect = windowEl.getBoundingClientRect();
            instance.config.lastX = rect.left;
            instance.config.lastY = rect.top;
            instance.config.lastWidth = rect.width;
            instance.config.lastHeight = rect.height;
            
            windowEl.classList.add('maximized');
            windowEl.style.cssText = `
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                height: calc(100vh - var(--taskbar-height)) !important;
                border-radius: 0 !important;
            `;
            instance.isFullscreen = true;
        }

        window.soundEngine.playClick();
    }

    makeFullscreen(id) {
        const instance = this.windowInstances.get(id);
        if (!instance) return;

        instance.element.classList.add('mobile-fullscreen');
        instance.element.style.cssText = `
            position: fixed; top: 0; left: 0; right: 0;
            bottom: var(--taskbar-height); width: 100% !important;
            height: auto !important; border-radius: 0;
        `;
        instance.isFullscreen = true;
    }

    closeWindow(id) {
        if (this.isMobile) {
            this.closeWindowWithAnimation(id, 'down');
            return;
        }

        const instance = this.windowInstances.get(id);
        if (!instance) return;

        window.soundEngine.playWindowClose();
        instance.element.style.opacity = '0';
        instance.element.style.transform = 'scale(0.9)';
        instance.element.style.transition = 'all 0.2s ease-in';

        instance.element.addEventListener('transitionend', () => {
            this.removeWindowInstance(id);
        }, { once: true });
    }

    closeWindowWithAnimation(id, direction) {
        const instance = this.windowInstances.get(id);
        if (!instance) return;

        const windowEl = instance.element;
        window.soundEngine.playWindowClose();

        if (direction === 'down') {
            windowEl.style.transform = 'translateY(100%)';
            windowEl.style.transition = 'transform 0.3s ease-in';
        } else {
            windowEl.style.opacity = '0';
            windowEl.style.transform = 'scale(0.9)';
            windowEl.style.transition = 'all 0.2s ease-in';
        }

        windowEl.addEventListener('transitionend', () => {
            this.removeWindowInstance(id);
        }, { once: true });
    }

    removeWindowInstance(id) {
        const instance = this.windowInstances.get(id);
        if (!instance) return;

        if (instance.element.parentNode) {
            instance.element.parentNode.removeChild(instance.element);
        }
        this.windowInstances.delete(id);
        window.systemState.removeWindow(id);
        this.updateTaskbar();
    }

    closeAllWindows() {
        this.windowInstances.forEach((instance) => {
            if (instance.element.parentNode) {
                instance.element.parentNode.removeChild(instance.element);
            }
        });
        this.windowInstances.clear();
    }

    updateTaskbar() {
        const runningApps = document.getElementById('running-apps');
        if (!runningApps) return;

        runningApps.innerHTML = '';

        const iconMap = {
            'about': 'user-circle',
            'resume': 'file-text',
            'github': 'code-2',           // Reliable icon
            'linkedin': 'briefcase',       // Reliable icon
            'youtube': 'play-circle',      // Reliable icon
            'contact': 'mail',
            'game': 'gamepad-2',
            'game-player': 'play-circle',
            'vault': 'vault',
            'vault-browser': 'vault',
            'resume-viewer': 'file-text'
        };

        this.windowInstances.forEach((instance, id) => {
            const isActive = window.systemState.state.activeWindowId === id;
            const isMinimized = window.systemState.state.minimizedWindows.has(id);
            const iconName = iconMap[instance.app] || 'folder';

            const indicator = document.createElement('button');
            indicator.className = `running-app-indicator ${isActive ? 'active' : ''}`;
            indicator.title = instance.config.title;
            indicator.innerHTML = `<i data-lucide="${iconName}" width="18" height="18" stroke-width="2.5"></i>`;

            indicator.addEventListener('click', () => {
                if (isMinimized) {
                    this.restoreWindow(id);
                } else if (isActive && !this.isMobile) {
                    this.minimizeWindow(id);
                } else {
                    this.focusWindow(id);
                }
            });

            runningApps.appendChild(indicator);
        });

        if (window.lucide) window.lucide.createIcons();
    }

    calculateInitialPosition(width, height) {
        const windowCount = this.windowInstances.size;
        const baseX = 50 + (windowCount * 30);
        const baseY = 50 + (windowCount * 30);
        const maxX = Math.max(0, window.innerWidth - width - 20);
        const maxY = Math.max(0, window.innerHeight - 48 - height - 20);

        return {
            x: Math.min(baseX, maxX),
            y: Math.min(baseY, maxY)
        };
    }

    handleResize() {
        this.windowInstances.forEach((instance) => {
            const windowEl = instance.element;

            if (this.isMobile) {
                this.makeFullscreen(instance.id);
                return;
            }

            if (windowEl.classList.contains('maximized') || windowEl.classList.contains('mobile-fullscreen')) {
                return;
            }

            const rect = windowEl.getBoundingClientRect();
            const maxX = window.innerWidth - rect.width;
            const maxY = window.innerHeight - 48 - rect.height;

            if (rect.left > maxX) windowEl.style.left = `${Math.max(0, maxX)}px`;
            if (rect.top > maxY) windowEl.style.top = `${Math.max(0, maxY)}px`;
        });
    }

    setupGlobalListeners() {
        window.systemState.on('windowMinimized', () => this.updateTaskbar());
        window.systemState.on('windowRestored', () => this.updateTaskbar());
        window.systemState.on('windowFocused', () => this.updateTaskbar());
        window.systemState.on('systemReset', () => {
            this.closeAllWindows();
            this.updateTaskbar();
        });
    }
}

window.windowManager = null;
document.addEventListener('DOMContentLoaded', () => {
    window.windowManager = new WindowManager();
});
