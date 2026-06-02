// ============================================
// MAIN APPLICATION ENTRY POINT
// ============================================

class SakibOS {
    constructor() {
        this.bootScreen = document.getElementById('boot-screen');
        this.osShell = document.getElementById('os-shell');
        this.bootMessages = document.querySelector('.boot-messages');
        this.isMobile = window.innerWidth <= 768;

        this.init();
    }

    async init() {
        await this.waitForReady();
        await this.bootSequence();
        this.setupEventListeners();
        this.setupWindowCloseListener();
        this.startSystemClock();
        this.startIdleDetection();
        this.startParticleSystem();
        this.setupShutdownScreen();
        this.initializeLucideIcons();
    }

    async waitForReady() {
        let attempts = 0;
        while (!window.windowManager && attempts < 50) {
            await this.sleep(100);
            attempts++;
        }
    }

    initializeLucideIcons() {
        if (window.lucide) {
            window.lucide.createIcons();
        }
        setTimeout(() => {
            if (window.lucide) window.lucide.createIcons();
        }, 500);
    }

    async bootSequence() {
        const messages = [
            'Initializing kernel...',
            'Loading system modules...',
            'Starting window manager...',
            'Loading desktop environment...',
            'Initializing sound engine...',
            'Starting network services...',
            'Loading user profile...',
            'System ready.'
        ];

        for (let i = 0; i < messages.length; i++) {
            this.bootMessages.textContent = messages[i];
            await this.sleep(250);
        }

        window.soundEngine.playBoot();
        await this.sleep(400);

        this.bootScreen.style.opacity = '0';
        this.bootScreen.style.transition = 'opacity 0.5s ease';
        await this.sleep(500);

        this.bootScreen.classList.add('hidden');
        this.osShell.classList.remove('hidden');

        window.systemState.state.isBooted = true;
        window.systemState.emit('systemBooted');

        if (window.lucide) window.lucide.createIcons();

        console.log(
            '%c⬡ SakibOS v2.0.26 Ready %c| Type commands or click icons to begin',
            'color: #a78bfa; font-weight: bold;',
            'color: #8b8898;'
        );
    }

    setupEventListeners() {
        const startButton = document.getElementById('start-button');
        const startMenu = document.getElementById('start-menu');

        if (startButton) {
            startButton.addEventListener('click', (e) => {
                e.stopPropagation();
                this.toggleStartMenu();
                window.soundEngine.playClick();
            });
        }

        document.addEventListener('click', (e) => {
            if (window.systemState.state.startMenuOpen &&
                !startMenu?.contains(e.target) &&
                !startButton?.contains(e.target)) {
                this.closeStartMenu();
            }
            
            // Clear icon selection when clicking on empty desktop area
            if (e.target.closest('#desktop-layer') && !e.target.closest('.desktop-icon')) {
                this.clearAllIconSelections();
            }
        });

        document.querySelectorAll('.start-menu-item[data-app]').forEach(item => {
            item.addEventListener('click', () => {
                const app = item.dataset.app;
                window.commandSystem.executeCommand(app);
                this.closeStartMenu();
                window.soundEngine.playClick();
            });
        });

        document.querySelectorAll('.system-action[data-action]').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action === 'restart') this.restartSystem();
                else if (action === 'shutdown') this.shutdownSystem();
                this.closeStartMenu();
            });
        });

        // Desktop icons - Fixed selection behavior
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            let clickTimer = null;

            icon.addEventListener('click', (e) => {
                e.stopPropagation();
                
                // Clear all other selections first
                this.clearAllIconSelections();
                
                // Select this icon
                icon.classList.add('selected');
                window.soundEngine.playClick();

                // Handle double click vs single click
                if (clickTimer) {
                    clearTimeout(clickTimer);
                    clickTimer = null;
                    // Double click - open app
                    const app = icon.dataset.app;
                    window.commandSystem.executeCommand(app);
                    window.soundEngine.playWindowOpen();
                    // Clear selection after opening
                    setTimeout(() => {
                        this.clearAllIconSelections();
                    }, 500);
                } else {
                    clickTimer = setTimeout(() => {
                        clickTimer = null;
                        // Single click - keep selected (will clear on next click or window close)
                    }, 300);
                }
            });

            // Touch events for mobile
            icon.addEventListener('touchend', (e) => {
                e.preventDefault();
                const app = icon.dataset.app;
                window.commandSystem.executeCommand(app);
                window.soundEngine.playWindowOpen();
                // Clear selection after opening
                setTimeout(() => {
                    this.clearAllIconSelections();
                }, 500);
            });
        });

        const soundToggle = document.getElementById('sound-toggle');
        if (soundToggle) {
            soundToggle.addEventListener('click', () => {
                window.soundEngine.toggleSound();
                window.soundEngine.playClick();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && window.systemState.state.startMenuOpen) {
                this.closeStartMenu();
            }
            // Escape also clears icon selection
            if (e.key === 'Escape') {
                this.clearAllIconSelections();
            }
        });
    }

    setupWindowCloseListener() {
        // Listen for window removal to clear icon selection
        window.systemState.on('windowRemoved', () => {
            // If no more windows are open, clear all selections
            if (window.systemState.state.openWindows.size === 0) {
                this.clearAllIconSelections();
            }
        });
    }

    clearAllIconSelections() {
        document.querySelectorAll('.desktop-icon.selected').forEach(icon => {
            icon.classList.remove('selected');
        });
    }

    toggleStartMenu() {
        const startMenu = document.getElementById('start-menu');
        if (window.systemState.state.startMenuOpen) {
            this.closeStartMenu();
        } else {
            startMenu?.classList.remove('hidden');
            window.systemState.state.startMenuOpen = true;
            if (window.lucide) window.lucide.createIcons();
        }
    }

    closeStartMenu() {
        const startMenu = document.getElementById('start-menu');
        startMenu?.classList.add('hidden');
        window.systemState.state.startMenuOpen = false;
    }

    async restartSystem() {
        window.soundEngine.playBoot();
        window.windowManager?.closeAllWindows();
        window.systemState.resetSystem();
        this.clearAllIconSelections();

        this.osShell.style.opacity = '0';
        this.osShell.style.transition = 'opacity 0.3s ease';
        await this.sleep(300);

        document.getElementById('window-container').innerHTML = '';
        document.getElementById('running-apps').innerHTML = '';
        this.osShell.style.opacity = '1';
        document.getElementById('shutdown-screen')?.classList.add('hidden');
        console.log('%c⬡ System Restarted', 'color: #a78bfa;');
    }

    shutdownSystem() {
        window.soundEngine.playWindowClose();
        window.windowManager?.closeAllWindows();
        this.clearAllIconSelections();

        this.osShell.style.opacity = '0';
        this.osShell.style.transition = 'opacity 0.5s ease';

        setTimeout(() => {
            this.osShell.classList.add('hidden');
            document.getElementById('shutdown-screen')?.classList.remove('hidden');
            window.systemState.state.isShutdown = true;
        }, 500);
    }

    setupShutdownScreen() {
        const shutdownScreen = document.getElementById('shutdown-screen');
        if (shutdownScreen) {
            shutdownScreen.addEventListener('click', () => {
                this.restartSystem();
            });
        }
    }

    startSystemClock() {
        const updateClock = () => {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            const clockEl = document.getElementById('system-clock');
            if (clockEl) clockEl.textContent = `${hours}:${minutes}`;
        };

        updateClock();
        setInterval(updateClock, 30000);
    }

    startIdleDetection() {
        setInterval(() => {
            window.systemState.checkSystemIdle();
        }, 10000);

        ['mousemove', 'keydown', 'click', 'touchstart'].forEach(event => {
            document.addEventListener(event, () => {
                window.systemState.checkIdle();
            });
        });
    }

    startParticleSystem() {
        const canvas = document.getElementById('particle-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = this.isMobile ? 20 : 50;

        class Particle {
            constructor() {
                this.reset();
            }

            reset() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 2 + 0.5;
                this.speedX = (Math.random() - 0.5) * 0.5;
                this.speedY = (Math.random() - 0.5) * 0.5;
                this.opacity = Math.random() * 0.3 + 0.1;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;
                this.opacity += Math.random() * 0.02 - 0.01;
                this.opacity = Math.max(0.05, Math.min(0.3, this.opacity));

                if (this.x < 0 || this.x > canvas.width ||
                    this.y < 0 || this.y > canvas.height) {
                    this.reset();
                }
            }

            draw(ctx) {
                const accent = getComputedStyle(document.documentElement)
                    .getPropertyValue('--accent-primary').trim() || '#a78bfa';
                ctx.fillStyle = accent;
                ctx.globalAlpha = this.opacity;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            if (!window.systemState.state.isShutdown) {
                particles.forEach(particle => {
                    particle.update();
                    particle.draw(ctx);
                });
            }
            requestAnimationFrame(animate);
        };

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.sakibOS = new SakibOS();
});