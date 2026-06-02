// ============================================
// SAKIB'S VAULT - PROJECTS & EXPERIMENTS HUB
// ============================================

class VaultApp {
    constructor() {
        this.appName = 'vault';
        this.windowId = null;
        this.vaultUrl = 'https://pro-seka.github.io/Sakib-s-Vault/'; // ← CHANGE THIS TO YOUR VAULT URL

        this.features = [
            { icon: '🎮', title: 'Mini Games', description: 'Collection of browser-based games and interactive experiences', color: '#8b5cf6' },
            { icon: '🛠️', title: 'Tools & Utilities', description: 'Handy web tools, calculators, and utility applications', color: '#3b82f6' },
            { icon: '🧪', title: 'Experiments', description: 'Creative coding experiments and interactive prototypes', color: '#10b981' },
            { icon: '🎨', title: 'Creative Projects', description: 'Visual projects, animations, and artistic experiments', color: '#f59e0b' },
            { icon: '📚', title: 'Learning Projects', description: 'Educational tools and learning-focused applications', color: '#06b6d4' },
            { icon: '💡', title: 'Ideas Lab', description: 'Proof of concepts and experimental ideas in development', color: '#ec4899' }
        ];

        this.techStack = ['React', 'JavaScript', 'HTML/CSS', 'Node.js', 'Python', 'Express', 'MongoDB', 'MySQL', 'Git', 'Docker', 'Linux', 'VS Code'];
    }

    open() {
        if (this.windowId && window.windowManager?.windowInstances.has(this.windowId)) {
            window.windowManager.focusWindow(this.windowId);
            return;
        }

        const content = this.generateContent();

        const instance = window.windowManager?.createWindow({
            id: `vault-${Date.now()}`,
            title: "Sakib's Vault",
            icon: 'vault',
            width: 900,
            height: 650,
            app: this.appName,
            content: content
        });

        if (instance) {
            this.windowId = instance.id;
            setTimeout(() => this.initializeVault(), 200);
        }
    }

    generateContent() {
        return `
            <div class="vault-app-mc">
                <!-- Hero Section -->
                <div class="vault-hero">
                    <div class="vault-hero-bg"></div>
                    <div class="vault-hero-content">
                        <div class="vault-lock-icon"><i data-lucide="vault" width="48" height="48"></i></div>
                        <div class="vault-hero-text">
                            <h1 class="vault-hero-title">Sakib's Vault</h1>
                            <p class="vault-hero-subtitle">A home for all my projects.</p>
                            <p class="vault-hero-desc">*NOT READY YET</p>
                        </div>
                    </div>
                    <div class="vault-stats-row">
                        <div class="vault-stat-item"><div class="vault-stat-value">${this.features.length}+</div><div class="vault-stat-label">Categories</div></div>
                        <div class="vault-stat-item"><div class="vault-stat-value">20+</div><div class="vault-stat-label">Projects</div></div>
                        <div class="vault-stat-item"><div class="vault-stat-value">Live</div><div class="vault-stat-label">Status</div></div>
                        <div class="vault-stat-item"><div class="vault-stat-value">Open</div><div class="vault-stat-label">Source</div></div>
                    </div>
                </div>

                <!-- ═══════════════════════════════════════ -->
                <!-- LAUNCH SECTION - MOVED TO TOP -->
                <!-- ═══════════════════════════════════════ -->
                <div class="vault-launch-section">
                    <div class="vault-launch-card">
                        <div class="vault-launch-content">
                            <div class="vault-launch-icon"><i data-lucide="rocket" width="40" height="40"></i></div>
                            <div class="vault-launch-text">
                                <h3 class="vault-launch-title">Ready to Explore?</h3>
                                <p class="vault-launch-desc">Open the full vault experience in a new window. Browse through projects, play games, try tools, and explore experiments — all in one place.</p>
                            </div>
                        </div>
                        <div class="vault-launch-actions">
                            <button class="vault-launch-btn primary" onclick="window.vaultApp.openVault()">
                                <i data-lucide="unlock" width="16" height="16"></i> Open Vault in OS
                            </button>
                            <button class="vault-launch-btn secondary" onclick="window.open('${this.vaultUrl}','_blank')">
                                <i data-lucide="external-link" width="16" height="16"></i> Open in Browser
                            </button>
                        </div>
                    </div>
                </div>

                <!-- ═══════════════════════════════════════ -->
                <!-- CATEGORIES SECTION -->
                <!-- ═══════════════════════════════════════ -->
                <div class="vault-categories-section">
                    <h3 class="vault-section-title"><i data-lucide="folder" width="18" height="18"></i> What's Inside the Vault</h3>
                    <div class="vault-categories-grid">
                        ${this.features.map((feature, i) => `
                            <div class="vault-category-card" style="--card-color:${feature.color};animation-delay:${i*0.1}s">
                                <div class="category-card-glow" style="background:${feature.color}"></div>
                                <div class="category-icon-wrap" style="background:${feature.color}20;border-color:${feature.color}40;">
                                    <span class="category-icon">${feature.icon}</span>
                                </div>
                                <h4 class="category-title">${feature.title}</h4>
                                <p class="category-desc">${feature.description}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Tech Stack -->
                <div class="vault-tech-section">
                    <h3 class="vault-section-title"><i data-lucide="zap" width="18" height="18"></i> Technologies Used</h3>
                    <div class="vault-tech-cloud">
                        ${this.techStack.map(tech => `<span class="vault-tech-tag">${tech}</span>`).join('')}
                    </div>
                </div>
            </div>

            <style>
                .vault-app-mc{height:100%;overflow-y:auto;padding:5px;color:#e8e6f0;font-family:'Instrument Sans',sans-serif}
                .vault-hero{position:relative;background:linear-gradient(135deg,rgba(139,92,246,.1),rgba(59,130,246,.1),rgba(16,185,129,.1));border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:2rem;margin-bottom:1.5rem;overflow:hidden}
                .vault-hero-bg{position:absolute;inset:0;background:radial-gradient(circle at 20% 50%,rgba(139,92,246,.15) 0%,transparent 50%),radial-gradient(circle at 80% 50%,rgba(59,130,246,.15) 0%,transparent 50%);pointer-events:none}
                .vault-hero-content{position:relative;display:flex;gap:2rem;align-items:center;margin-bottom:2rem}
                .vault-lock-icon{width:80px;height:80px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border-radius:16px;border:2px solid rgba(255,255,255,.1);flex-shrink:0;animation:vaultPulse 3s ease-in-out infinite}
                .vault-lock-icon [data-lucide]{width:48px;height:48px;stroke-width:1.5;color:var(--accent-primary)}
                @keyframes vaultPulse{0%,100%{transform:scale(1);box-shadow:0 0 20px rgba(139,92,246,.2)}50%{transform:scale(1.05);box-shadow:0 0 40px rgba(139,92,246,.4)}}
                .vault-hero-title{font-family:'Syne',sans-serif;font-size:2rem;font-weight:800;color:#fff;margin:0 0 .5rem;background:linear-gradient(135deg,#c4b5fd,#93c5fd,#6ee7b7);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
                .vault-hero-subtitle{font-family:'JetBrains Mono',monospace;font-size:.72rem;color:rgba(232,230,240,.6);letter-spacing:.08em;margin:0 0 .8rem}
                .vault-hero-desc{font-size:.88rem;line-height:1.7;color:rgba(232,230,240,.5);margin:0}
                .vault-stats-row{position:relative;display:grid;grid-template-columns:repeat(4,1fr);gap:1rem}
                .vault-stat-item{text-align:center;padding:1rem;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.06);border-radius:8px;transition:all .3s ease}
                .vault-stat-item:hover{background:rgba(255,255,255,.06);transform:translateY(-2px)}
                .vault-stat-value{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:700;background:linear-gradient(135deg,#c4b5fd,#93c5fd);-webkit-background-clip:text;-webkit-text-fill-color:transparent;margin-bottom:.3rem}
                .vault-stat-label{font-family:'JetBrains Mono',monospace;font-size:.58rem;color:#6b6878;text-transform:uppercase;letter-spacing:.1em}

                /* Launch Section */
                .vault-launch-section{margin-bottom:1.5rem}
                .vault-launch-card{background:linear-gradient(135deg,rgba(139,92,246,.15),rgba(59,130,246,.15));border:1px solid rgba(139,92,246,.2);border-radius:12px;padding:1.5rem;position:relative;overflow:hidden}
                .vault-launch-card::before{content:'';position:absolute;inset:0;background:radial-gradient(circle at 50% 50%,rgba(139,92,246,.1),transparent 70%);pointer-events:none}
                .vault-launch-content{position:relative;display:flex;gap:1.5rem;align-items:center;margin-bottom:1.2rem}
                .vault-launch-icon{width:60px;height:60px;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.05);border-radius:12px;border:1px solid rgba(255,255,255,.1);flex-shrink:0}
                .vault-launch-icon [data-lucide]{width:40px;height:40px;stroke-width:1.5;color:var(--accent-primary)}
                .vault-launch-title{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:600;color:#fff;margin:0 0 .4rem}
                .vault-launch-desc{font-size:.82rem;line-height:1.6;color:rgba(232,230,240,.5);margin:0}
                .vault-launch-actions{position:relative;display:flex;gap:1rem}
                .vault-launch-btn{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.08em;text-transform:uppercase;padding:.7rem 1.5rem;border-radius:8px;cursor:pointer;font-weight:600;transition:all .3s ease;display:flex;align-items:center;gap:.5rem;border:none}
                .vault-launch-btn [data-lucide]{width:16px;height:16px;stroke-width:2.5}
                .vault-launch-btn.primary{background:linear-gradient(135deg,#8b5cf6,#6366f1);color:#fff;box-shadow:0 4px 20px rgba(139,92,246,.3)}
                .vault-launch-btn.primary:hover{transform:translateY(-2px);box-shadow:0 8px 30px rgba(139,92,246,.4)}
                .vault-launch-btn.secondary{background:transparent;border:1px solid rgba(255,255,255,.2);color:#e8e6f0}
                .vault-launch-btn.secondary:hover{border-color:rgba(255,255,255,.4);background:rgba(255,255,255,.05);transform:translateY(-2px)}

                /* Categories */
                .vault-categories-section{margin-bottom:1.5rem}
                .vault-section-title{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:600;color:#fff;margin:0 0 1.2rem;display:flex;align-items:center;gap:.6rem}
                .vault-section-title [data-lucide]{width:18px;height:18px;stroke-width:2;color:var(--accent-primary)}
                .vault-categories-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:.8rem}
                .vault-category-card{position:relative;padding:1.2rem;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:10px;transition:all .4s cubic-bezier(.22,1,.36,1);overflow:hidden;animation:fadeInUp .5s ease forwards;opacity:0}
                @keyframes fadeInUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
                .vault-category-card:hover{transform:translateY(-4px);border-color:var(--card-color);box-shadow:0 12px 30px rgba(0,0,0,.4);background:rgba(255,255,255,.04)}
                .category-card-glow{position:absolute;top:-50%;right:-50%;width:100%;height:100%;border-radius:50%;filter:blur(40px);opacity:0;transition:opacity .4s ease;pointer-events:none}
                .vault-category-card:hover .category-card-glow{opacity:.15}
                .category-icon-wrap{width:44px;height:44px;border-radius:10px;display:flex;align-items:center;justify-content:center;margin-bottom:.8rem;border:1px solid;font-size:20px;transition:all .3s ease}
                .vault-category-card:hover .category-icon-wrap{transform:scale(1.1) rotate(-5deg)}
                .category-title{font-family:'Syne',sans-serif;font-size:.9rem;font-weight:600;color:#fff;margin:0 0 .4rem}
                .category-desc{font-size:.75rem;line-height:1.5;color:rgba(232,230,240,.5);margin:0}

                /* Tech Stack */
                .vault-tech-section{padding:1.2rem;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:10px}
                .vault-tech-cloud{display:flex;flex-wrap:wrap;gap:6px}
                .vault-tech-tag{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.06em;padding:5px 12px;background:rgba(255,255,255,.03);border:1px solid rgba(255,255,255,.08);border-radius:6px;color:rgba(232,230,240,.6);transition:all .3s ease}
                .vault-tech-tag:hover{background:rgba(139,92,246,.1);border-color:rgba(139,92,246,.3);color:#c4b5fd;transform:translateY(-2px)}

                @media(max-width:768px){
                    .vault-hero-content{flex-direction:column;text-align:center}
                    .vault-stats-row{grid-template-columns:repeat(2,1fr)}
                    .vault-categories-grid{grid-template-columns:1fr}
                    .vault-launch-content{flex-direction:column;text-align:center}
                    .vault-launch-actions{flex-direction:column}
                    .vault-launch-btn{justify-content:center}
                }
            </style>
        `;
    }

    openVault() {
        window.soundEngine.playWindowOpen();
        const vaultContent = `
            <div style="height:100%;display:flex;flex-direction:column;background:#0a0a1a;">
                <div style="padding:10px 16px;background:rgba(0,0,0,.5);border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:10px;flex-shrink:0;">
                    <i data-lucide="vault" width="16" height="16"></i>
                    <span style="font-family:'Syne',sans-serif;font-size:13px;font-weight:600;color:#fff;flex:1;">Sakib's Vault</span>
                    <button onclick="window.open('${this.vaultUrl}','_blank')" style="font-family:'JetBrains Mono',monospace;font-size:.6rem;padding:6px 12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);border-radius:4px;color:#e8e6f0;cursor:pointer;"><i data-lucide="external-link" width="12" height="12"></i> Open in Browser</button>
                </div>
                <iframe src="${this.vaultUrl}" style="flex:1;border:none;width:100%;height:100%;background:#0a0a1a;" allow="accelerometer;autoplay;clipboard-write;encrypted-media;gyroscope;picture-in-picture" sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals" title="Sakib's Vault"></iframe>
            </div>
        `;
        window.windowManager?.createWindow({
            id: `vault-browser-${Date.now()}`,
            title: "🔐 Sakib's Vault",
            icon: 'vault',
            width: 1000,
            height: 700,
            app: 'vault-browser',
            content: vaultContent
        });
        setTimeout(() => { if (window.lucide) window.lucide.createIcons(); }, 100);
    }

    initializeVault() {
        const cards = document.querySelectorAll('.vault-category-card');
        cards.forEach((card, i) => {
            card.style.animationDelay = `${i * 0.1}s`;
        });
        if (window.lucide) window.lucide.createIcons();
    }
}

window.vaultApp = new VaultApp();