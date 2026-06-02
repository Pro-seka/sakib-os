// ============================================
// GAME HUB APP - GAME LAUNCHER & LIBRARY
// ============================================

class GameApp {
    constructor() {
        this.appName = 'game';
        this.windowId = null;
        this.toastTimer = null; // Track toast timer
        
        // Game Library
        this.games = [
            {
                id: 'sakibs-galaxy',
                title: "Sakib's Galaxy",
                subtitle: 'Cosmic Shooter',
                description: 'A thrilling cosmic shooter game where you defend the galaxy from incoming threats. Navigate through space, dodge asteroids, and destroy enemy ships.',
                icon: '🌌',
                banner: '🚀',
                genre: 'Shooter',
                difficulty: 'Medium',
                playTime: '10-15 min',
                url: 'https://pro-seka.github.io/Sakibs-Galaxy/', // ← CHANGE THIS
                features: [
                    'Fast-paced space combat',
                    'Multiple enemy types',
                    'Power-up system',
                    'Score tracking',
                    'Responsive controls'
                ],
                isNew: true,
                detailsText: 'Move: WASD or Arrow Keys | Shoot: Spacebar | Goal: Survive waves of enemies and collect power-ups!'
            }
        ];
    }
    
    open() {
        if (this.windowId && window.windowManager?.windowInstances.has(this.windowId)) {
            window.windowManager.focusWindow(this.windowId);
            return;
        }
        
        const content = this.generateContent();
        
        const instance = window.windowManager?.createWindow({
            id: `game-hub-${Date.now()}`,
            title: 'Game Hub',
            icon: 'gamepad-2',
            width: 900,
            height: 650,
            app: this.appName,
            content: content
        });
        
        if (instance) {
            this.windowId = instance.id;
            setTimeout(() => this.initializeGameHub(), 200);
        }
    }
    
    generateContent() {
        return `
            <div class="game-hub-mc">
                <div class="game-hub-header">
                    <div class="game-hub-header-content">
                        <div class="game-hub-logo"><i data-lucide="gamepad-2" width="40" height="40"></i></div>
                        <div class="game-hub-title-section">
                            <h1 class="game-hub-title">Game Hub</h1>
                            <p class="game-hub-subtitle">Your Personal Game Library</p>
                        </div>
                        <div class="game-hub-stats">
                            <div class="game-hub-stat"><span class="game-stat-value">${this.games.length}</span><span class="game-stat-label">Games</span></div>
                            <div class="game-hub-stat"><span class="game-stat-value">1</span><span class="game-stat-label">Installed</span></div>
                        </div>
                    </div>
                </div>
                <div class="game-grid" id="game-grid">
                    ${this.games.map(game => this.generateGameCard(game)).join('')}
                </div>
                <div class="coming-soon-section">
                    <div class="coming-soon-header"><span class="coming-soon-icon"><i data-lucide="clock" width="20" height="20"></i></span><h3 class="coming-soon-title">More Games Coming Soon</h3></div>
                    <p class="coming-soon-text">New games are in development. Stay tuned for updates!</p>
                </div>
            </div>
            <style>
                .game-hub-mc{height:100%;overflow-y:auto;padding:5px;color:#e8e6f0;font-family:'Instrument Sans',sans-serif}
                .game-hub-header{background:linear-gradient(135deg,rgba(139,92,246,.1),rgba(96,165,250,.1));border:1px solid rgba(255,255,255,.08);border-radius:8px;padding:1.5rem;margin-bottom:2rem}
                .game-hub-header-content{display:flex;align-items:center;gap:1.5rem}
                .game-hub-logo{width:60px;height:60px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border-radius:12px;border:1px solid rgba(255,255,255,.1)}
                .game-hub-logo [data-lucide]{width:40px;height:40px;stroke-width:1.5;color:var(--accent-primary)}
                .game-hub-title-section{flex:1}
                .game-hub-title{font-family:'Syne',sans-serif;font-size:2rem;font-weight:700;color:#fff;margin:0 0 .3rem;letter-spacing:-.02em}
                .game-hub-subtitle{font-size:.85rem;color:rgba(232,230,240,.5);margin:0}
                .game-hub-stats{display:flex;gap:2rem}
                .game-hub-stat{text-align:center}
                .game-stat-value{display:block;font-family:'Syne',sans-serif;font-size:1.5rem;font-weight:700;color:var(--accent-primary)}
                .game-stat-label{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#6b6878;text-transform:uppercase;letter-spacing:.1em}
                .game-grid{display:grid;gap:1.5rem;margin-bottom:2rem}
                .game-card-mc{border:1px solid rgba(255,255,255,.08);border-radius:8px;overflow:hidden;background:rgba(255,255,255,.02);transition:all .4s cubic-bezier(.22,1,.36,1);cursor:pointer}
                .game-card-mc:hover{border-color:rgba(139,92,246,.4);transform:translateY(-4px);box-shadow:0 20px 40px rgba(0,0,0,.5)}
                .game-card-inner{display:flex;gap:1.5rem;padding:1.5rem}
                .game-card-banner{width:200px;height:150px;background:linear-gradient(135deg,rgba(139,92,246,.2),rgba(96,165,250,.2));border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:64px;flex-shrink:0;position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.1)}
                .game-card-banner::after{content:'';position:absolute;inset:0;background:linear-gradient(45deg,transparent 30%,rgba(255,255,255,.05) 50%,transparent 70%);animation:shimmer 3s ease-in-out infinite}
                @keyframes shimmer{0%,100%{transform:translateX(-100%)}50%{transform:translateX(100%)}}
                .new-badge{position:absolute;top:8px;right:8px;background:#22c55e;color:#000;font-family:'JetBrains Mono',monospace;font-size:.55rem;font-weight:700;padding:3px 8px;border-radius:3px;letter-spacing:.08em;text-transform:uppercase;z-index:2}
                .game-card-info{flex:1;display:flex;flex-direction:column;gap:.8rem}
                .game-card-title{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:700;color:#fff;margin:0}
                .game-card-subtitle{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:var(--accent-primary);letter-spacing:.1em;text-transform:uppercase}
                .game-card-description{font-size:.82rem;line-height:1.6;color:rgba(232,230,240,.55);margin:0}
                .game-card-meta{display:flex;gap:1.2rem;flex-wrap:wrap}
                .game-meta-item{display:flex;align-items:center;gap:.4rem}
                .game-meta-icon{font-size:13px}
                .game-meta-text{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#6b6878;letter-spacing:.05em}
                .game-card-features{display:flex;flex-wrap:wrap;gap:6px}
                .game-feature-tag{font-family:'JetBrains Mono',monospace;font-size:.56rem;letter-spacing:.06em;padding:3px 10px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:3px;color:rgba(232,230,240,.5)}
                .game-card-actions{display:flex;gap:.75rem;margin-top:auto;padding-top:.5rem}
                .play-btn{font-family:'JetBrains Mono',monospace;font-size:.68rem;letter-spacing:.1em;text-transform:uppercase;padding:.7rem 2rem;background:linear-gradient(135deg,#8b5cf6,#6366f1);color:#fff;border:none;border-radius:6px;cursor:pointer;font-weight:600;transition:all .3s ease;display:flex;align-items:center;gap:.5rem;box-shadow:0 4px 15px rgba(139,92,246,.3)}
                .play-btn:hover{transform:translateY(-2px);box-shadow:0 8px 25px rgba(139,92,246,.4)}
                .info-btn{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;padding:.7rem 1.5rem;background:transparent;border:1px solid rgba(255,255,255,.15);border-radius:6px;color:#6b6878;cursor:pointer;transition:all .3s ease}
                .info-btn:hover{border-color:rgba(255,255,255,.3);color:#e8e6f0}
                .coming-soon-section{border:1px dashed rgba(255,255,255,.08);border-radius:8px;padding:2rem;text-align:center;background:rgba(255,255,255,.01)}
                .coming-soon-header{display:flex;align-items:center;justify-content:center;gap:.75rem;margin-bottom:.8rem}
                .coming-soon-icon [data-lucide]{width:20px;height:20px;stroke-width:1.5;color:#6b6878}
                .coming-soon-title{font-family:'Syne',sans-serif;font-size:1rem;font-weight:600;color:#6b6878;margin:0}
                .coming-soon-text{font-size:.8rem;color:rgba(232,230,240,.3);margin:0}
                @media(max-width:768px){.game-hub-header-content{flex-direction:column;text-align:center}.game-card-inner{flex-direction:column}.game-card-banner{width:100%;height:120px}.game-card-actions{flex-direction:column}.play-btn,.info-btn{justify-content:center}}
            </style>
        `;
    }
    
    generateGameCard(game) {
        return `
            <div class="game-card-mc" data-game-id="${game.id}">
                <div class="game-card-inner">
                    <div class="game-card-banner">
                        ${game.banner}
                        ${game.isNew ? '<div class="new-badge">New</div>' : ''}
                    </div>
                    <div class="game-card-info">
                        <h3 class="game-card-title">${game.title}</h3>
                        <div class="game-card-subtitle">${game.subtitle}</div>
                        <p class="game-card-description">${game.description}</p>
                        <div class="game-card-meta">
                            <div class="game-meta-item"><span class="game-meta-icon">🎯</span><span class="game-meta-text">${game.genre}</span></div>
                            <div class="game-meta-item"><span class="game-meta-icon">📊</span><span class="game-meta-text">${game.difficulty}</span></div>
                            <div class="game-meta-item"><span class="game-meta-icon">⏱️</span><span class="game-meta-text">${game.playTime}</span></div>
                        </div>
                        <div class="game-card-features">
                            ${game.features.map(f => `<span class="game-feature-tag">${f}</span>`).join('')}
                        </div>
                        <div class="game-card-actions">
                            <button class="play-btn" onclick="window.gameApp.launchGame('${game.id}')">
                                <i data-lucide="play" width="14" height="14"></i> Play Now
                            </button>
                            <button class="info-btn" onclick="window.gameApp.showGameInfo('${game.id}')">
                                <i data-lucide="info" width="14" height="14"></i> Details
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    launchGame(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) return;
        window.soundEngine.playWindowOpen();
        const gameWindowContent = `
            <div style="height:100%;display:flex;flex-direction:column;background:#000;">
                <iframe src="${game.url}" style="flex:1;border:none;width:100%;height:100%;" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals" title="${game.title}"></iframe>
            </div>
        `;
        window.windowManager?.createWindow({
            id: `game-play-${gameId}-${Date.now()}`,
            title: `🎮 ${game.title}`,
            icon: 'play-circle',
            width: 950,
            height: 680,
            app: 'game-player',
            content: gameWindowContent
        });
    }
    
    // ═══════════════════════════════════════
    // SHOW GAME INFO - FIXED TOAST
    // ═══════════════════════════════════════
    showGameInfo(gameId) {
        const game = this.games.find(g => g.id === gameId);
        if (!game) return;
        
        const toast = document.getElementById('toast');
        if (!toast) return;
        
        // Clear any existing timer
        if (this.toastTimer) {
            clearTimeout(this.toastTimer);
            this.toastTimer = null;
        }
        
        // Remove show class first (reset animation)
        toast.classList.remove('show');
        
        // Force reflow
        void toast.offsetWidth;
        
        // Set the message
        const message = game.detailsText || `🎮 ${game.title} | ${game.genre} | ${game.difficulty} | ${game.playTime}`;
        toast.textContent = message;
        
        // Show toast
        toast.classList.add('show');
        
        // Auto hide after 4 seconds
        this.toastTimer = setTimeout(() => {
            toast.classList.remove('show');
            this.toastTimer = null;
        }, 4000);
        
        window.soundEngine.playClick();
    }
    
    initializeGameHub() {
        const cards = document.querySelectorAll('.game-card-mc');
        cards.forEach((card, i) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            card.style.transition = 'all 0.5s cubic-bezier(0.22,1,0.36,1)';
            setTimeout(() => { 
                card.style.opacity = '1'; 
                card.style.transform = 'translateY(0)'; 
            }, 100 + i * 150);
        });
        
        if (window.lucide) window.lucide.createIcons();
    }
}

window.gameApp = new GameApp();