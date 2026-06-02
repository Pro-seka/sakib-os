// ============================================
// GITHUB DASHBOARD APP
// ============================================

class GithubApp {
    constructor() {
        this.appName = 'github';
        this.windowId = null;
    }
    
    open() {
        if (this.windowId && window.windowManager?.windowInstances.has(this.windowId)) {
            window.windowManager.focusWindow(this.windowId);
            return;
        }
        
        const content = this.generateContent();
        
        const instance = window.windowManager?.createWindow({
            id: `github-${Date.now()}`,
            title: 'GitHub Dashboard',
            icon: '⌨',
            width: 850,
            height: 620,
            app: this.appName,
            content: content
        });
        
        if (instance) this.windowId = instance.id;
    }
    
    generateContent() {
        return `
            <div class="github-app-mc">
                <div class="github-layout">
                    <div class="github-profile-side">
                        <div class="section-number-mc">03 / 08</div>
                        <div class="section-label-mc" style="color:#22d3ee;"><span class="label-line" style="background:#22d3ee;"></span>GitHub · Engineering</div>
                        <div class="github-profile-card-mc">
                            <div class="github-avatar-mc">
                                <svg viewBox="0 0 24 24" fill="#22d3ee" width="36" height="36"><path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                            </div>
                            <h2 class="github-username-mc">Sakib Hasan</h2>
                            <p class="github-bio-mc">Pro-seka · he/him</p>
                            <div class="github-stats-row-mc">
                                <div class="github-stat-mc"><div class="github-stat-val-mc">10+</div><div class="github-stat-label-mc">Repositories</div></div>
                                <div class="github-stat-mc"><div class="github-stat-val-mc">Active</div><div class="github-stat-label-mc">Contributions</div></div>
                            </div>
                            <a href="https://github.com/Pro-seka" target="_blank" rel="noopener" class="github-visit-btn-mc"><span>Visit GitHub ↗</span></a>
                        </div>
                    </div>
                    <div class="github-repos-side">
                        <p class="github-section-desc-mc">This is where I build, experiment, and share the projects I'm working on. </p>
                        <div class="github-info-card-mc">
                            <div class="github-info-header-mc"><span class="github-info-icon-mc">🗃️</span><h3 class="github-info-title-mc">Repositories & Work</h3></div>
                            <div class="github-info-content-mc">
                                <div class="github-info-item-mc"><div class="github-info-bullet-mc"></div><div class="github-info-text-mc"><strong> - - - </strong><p> - - - </p></div></div>
                                <div class="github-info-item-mc"><div class="github-info-bullet-mc"></div><div class="github-info-text-mc"><strong> - - - </strong><p> - - -</p></div></div>
                                <div class="github-info-item-mc"><div class="github-info-bullet-mc"></div><div class="github-info-text-mc"><strong> - - - </strong><p> - - - </p></div></div>
                            </div>
                        </div>
                        <div class="github-tech-stack-mc">
                            <h3 class="github-stack-title-mc">Tech Stack</h3>
                            <div class="github-stack-grid-mc">
                                <div class="github-stack-item-mc"><span class="stack-label-mc">Frontend</span><span class="stack-value-mc">React · JavaScript · HTML/CSS</span></div>
                                <div class="github-stack-item-mc"><span class="stack-label-mc">Backend</span><span class="stack-value-mc">Node.js · Python · Express</span></div>
                                <div class="github-stack-item-mc"><span class="stack-label-mc">Database</span><span class="stack-value-mc">MongoDB · MySQL</span></div>
                                <div class="github-stack-item-mc"><span class="stack-label-mc">Tools</span><span class="stack-value-mc">Git · Docker · Linux · VS Code</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .github-app-mc{height:100%;overflow-y:auto;padding:10px;color:#e8e6f0;font-family:'Instrument Sans',sans-serif}
                .github-layout{display:grid;grid-template-columns:1fr 1.1fr;gap:2.5rem;align-items:start}
                .github-profile-side{position:sticky;top:0}
                .section-number-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#6b6878;margin-bottom:.5rem;letter-spacing:.15em}
                .section-label-mc{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem;opacity:.8}
                .label-line{display:block;width:2.5rem;height:1px}
                .github-profile-card-mc{border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:2rem;background:rgba(255,255,255,.015);transition:all .4s ease;position:relative}
                .github-profile-card-mc:hover{border-color:rgba(34,211,238,.3);box-shadow:0 20px 40px rgba(0,0,0,.4);transform:translateY(-4px)}
                .github-avatar-mc{width:56px;height:56px;border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;background:rgba(34,211,238,.08);border:1px solid rgba(34,211,238,.15);transition:all .3s ease}
                .github-username-mc{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:700;color:#fff;margin:0 0 .3rem}
                .github-bio-mc{font-size:.85rem;color:rgba(232,230,240,.55);margin-bottom:1.5rem}
                .github-stats-row-mc{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1.5rem}
                .github-stat-mc{padding:12px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);border-radius:4px;text-align:center}
                .github-stat-val-mc{font-family:'Syne',sans-serif;font-size:1.2rem;font-weight:700;color:#22d3ee}
                .github-stat-label-mc{font-family:'JetBrains Mono',monospace;font-size:.55rem;color:#6b6878;text-transform:uppercase;letter-spacing:.1em;margin-top:4px}
                .github-visit-btn-mc{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;padding:.7rem;background:#22d3ee;color:#000;border-radius:2px;text-decoration:none;font-weight:600;transition:all .3s ease}
                .github-visit-btn-mc:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(34,211,238,.3)}
                .github-section-desc-mc{font-size:.9rem;line-height:1.8;color:rgba(232,230,240,.55);margin-bottom:1.5rem}
                .github-info-card-mc{border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:1.5rem;background:rgba(255,255,255,.015);margin-bottom:1.5rem;transition:all .3s ease}
                .github-info-card-mc:hover{border-color:rgba(34,211,238,.2);background:rgba(255,255,255,.025)}
                .github-info-header-mc{display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,.04)}
                .github-info-icon-mc{font-size:20px}
                .github-info-title-mc{font-family:'Syne',sans-serif;font-size:1rem;font-weight:600;color:#fff;margin:0}
                .github-info-content-mc{display:flex;flex-direction:column;gap:1rem}
                .github-info-item-mc{display:flex;gap:1rem;padding:.7rem;border-radius:4px;transition:all .3s ease}
                .github-info-item-mc:hover{background:rgba(34,211,238,.03);transform:translateX(4px)}
                .github-info-bullet-mc{width:6px;height:6px;border-radius:50%;background:#22d3ee;margin-top:5px;flex-shrink:0;box-shadow:0 0 8px rgba(34,211,238,.3)}
                .github-info-text-mc strong{font-family:'Syne',sans-serif;font-size:.85rem;font-weight:600;color:#fff;display:block;margin-bottom:3px}
                .github-info-text-mc p{font-size:.78rem;line-height:1.5;color:rgba(232,230,240,.5);margin:0}
                .github-tech-stack-mc{border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:1.5rem;background:rgba(255,255,255,.015)}
                .github-stack-title-mc{font-family:'Syne',sans-serif;font-size:1rem;font-weight:600;color:#fff;margin:0 0 1rem}
                .github-stack-grid-mc{display:flex;flex-direction:column;gap:.7rem}
                .github-stack-item-mc{display:flex;justify-content:space-between;align-items:center;padding:.4rem 0;border-bottom:1px solid rgba(255,255,255,.03)}
                .github-stack-item-mc:last-child{border-bottom:none}
                .stack-label-mc{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.1em;text-transform:uppercase;color:#6b6878}
                .stack-value-mc{font-family:'JetBrains Mono',monospace;font-size:.65rem;color:rgba(232,230,240,.7);text-align:right}
                @media(max-width:768px){.github-layout{grid-template-columns:1fr;gap:2rem}.github-profile-side{position:static}}
            </style>
        `;
    }
}

window.githubApp = new GithubApp();