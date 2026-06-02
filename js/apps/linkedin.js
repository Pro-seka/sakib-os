// ============================================
// LINKEDIN PANEL APP
// ============================================

class LinkedInApp {
    constructor() {
        this.appName = 'linkedin';
        this.windowId = null;
    }
    
    open() {
        if (this.windowId && window.windowManager?.windowInstances.has(this.windowId)) {
            window.windowManager.focusWindow(this.windowId);
            return;
        }
        
        const content = this.generateContent();
        
        const instance = window.windowManager?.createWindow({
            id: `linkedin-${Date.now()}`,
            title: 'LinkedIn Profile',
            icon: '💼',
            width: 850,
            height: 620,
            app: this.appName,
            content: content
        });
        
        if (instance) this.windowId = instance.id;
    }
    
    generateContent() {
        return `
            <div class="linkedin-app-mc">
                <div class="linkedin-layout">
                    <div class="linkedin-profile-side">
                        <div class="section-number-mc">04 / 08</div>
                        <div class="section-label-mc" style="color:#3b82f6;"><span class="label-line" style="background:#3b82f6;"></span>LinkedIn · Career</div>
                        <div class="linkedin-card-mc">
                            <div class="linkedin-card-glow-mc"></div>
                            <div class="linkedin-avatar-mc">
                                <svg viewBox="0 0 24 24" fill="#3b82f6" width="28" height="28"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                            </div>
                            <h2 class="linkedin-name-mc">Md. Sakib Hasan</h2>
                            <p class="linkedin-headline-mc">Software Engineering Student</p>
                            <p class="linkedin-location-mc">Daffodil International University</p>
                            <div class="linkedin-stats-mc">
                                <div class="linkedin-stat-mc"><div class="linkedin-stat-val-mc">DIU</div><div class="linkedin-stat-label-mc">University</div></div>
                                <div class="linkedin-stat-mc"><div class="linkedin-stat-val-mc">SWE</div><div class="linkedin-stat-label-mc">Degree Program</div></div>
                            </div>
                            <a href="https://www.linkedin.com/in/sakibhasan-dev/" target="_blank" rel="noopener" class="linkedin-connect-btn-mc"><span>Connect on LinkedIn ↗</span></a>
                        </div>
                    </div>
                    <div class="linkedin-content-side">
                        <p class="linkedin-desc-mc">LET's CONNECT! I share what I'm building, learning, and interesting things I come across in tech and AI.
</p>
                        <div class="linkedin-section-mc">
                            <h3 class="linkedin-section-title-mc">About</h3>
                            <p class="linkedin-section-text-mc">I work on building software systems with a focus on AI, machine learning concepts, automation, and application development.</p>
                        </div>
                        <div class="linkedin-section-mc">
                            <h3 class="linkedin-section-title-mc">Education</h3>
                            <div class="linkedin-edu-item-mc">
                                <div class="edu-logo-mc">DIU</div>
                                <div class="edu-content-mc">
                                    <h4 class="edu-title-mc">Daffodil International University</h4>
                                    <p class="edu-degree-mc">B.Sc. in Software Engineering</p>
                                    <p class="edu-date-mc">2022 - Present</p>
                                    <p class="edu-desc-mc">Expected graduation: mid 2028</p>
                                </div>
                            </div>
                        </div>
                        <div class="linkedin-section-mc">
                            <h3 class="linkedin-section-title-mc">Skills & Expertise</h3>
                            <div class="skills-cloud-mc">
                                <span class="linkedin-skill-mc">JavaScript</span><span class="linkedin-skill-mc">Python</span><span class="linkedin-skill-mc">React.js</span><span class="linkedin-skill-mc">Node.js</span><span class="linkedin-skill-mc">Machine Learning</span><span class="linkedin-skill-mc">System Design</span><span class="linkedin-skill-mc">Git</span><span class="linkedin-skill-mc">UI/UX Design</span><span class="linkedin-skill-mc">Problem Solving</span><span class="linkedin-skill-mc">Automation</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .linkedin-app-mc{height:100%;overflow-y:auto;padding:10px;color:#e8e6f0;font-family:'Instrument Sans',sans-serif}
                .linkedin-layout{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start}
                .section-number-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#6b6878;margin-bottom:.5rem;letter-spacing:.15em}
                .section-label-mc{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem;opacity:.8}
                .label-line{display:block;width:2.5rem;height:1px}
                .linkedin-card-mc{position:relative;border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:2rem;background:rgba(255,255,255,.015);transition:all .4s ease}
                .linkedin-card-mc:hover{border-color:rgba(59,130,246,.3);box-shadow:0 20px 40px rgba(0,0,0,.4);transform:translateY(-4px)}
                .linkedin-card-glow-mc{position:absolute;inset:0;border-radius:4px;box-shadow:0 0 60px rgba(59,130,246,.08);pointer-events:none}
                .linkedin-avatar-mc{width:52px;height:52px;border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;background:rgba(59,130,246,.08);border:1px solid rgba(59,130,246,.15)}
                .linkedin-name-mc{font-family:'Syne',sans-serif;font-size:1.4rem;font-weight:700;color:#fff;margin:0 0 .3rem}
                .linkedin-headline-mc{font-size:.85rem;color:rgba(232,230,240,.55);margin:0 0 .3rem}
                .linkedin-location-mc{font-size:.75rem;color:#6b6878;margin-bottom:1.5rem}
                .linkedin-stats-mc{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1.5rem}
                .linkedin-stat-mc{padding:12px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);border-radius:4px;text-align:center}
                .linkedin-stat-val-mc{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:#3b82f6}
                .linkedin-stat-label-mc{font-family:'JetBrains Mono',monospace;font-size:.55rem;color:#6b6878;text-transform:uppercase;letter-spacing:.1em;margin-top:4px}
                .linkedin-connect-btn-mc{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;padding:.7rem;background:#3b82f6;color:#fff;border-radius:2px;text-decoration:none;font-weight:600;transition:all .3s ease}
                .linkedin-connect-btn-mc:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(59,130,246,.3)}
                .linkedin-desc-mc{font-size:.9rem;line-height:1.8;color:rgba(232,230,240,.55);margin-bottom:1.5rem}
                .linkedin-section-mc{margin-bottom:1.5rem;padding:1.5rem;background:rgba(255,255,255,.015);border:1px solid rgba(255,255,255,.04);border-radius:4px;transition:all .3s ease}
                .linkedin-section-mc:hover{border-color:rgba(255,255,255,.1);background:rgba(255,255,255,.025)}
                .linkedin-section-title-mc{font-family:'Syne',sans-serif;font-size:.95rem;font-weight:600;color:#fff;margin:0 0 1rem}
                .linkedin-section-text-mc{font-size:.82rem;line-height:1.6;color:rgba(232,230,240,.55);margin:0}
                .linkedin-edu-item-mc{display:flex;gap:1rem}
                .edu-logo-mc{width:42px;height:42px;border-radius:4px;background:rgba(59,130,246,.1);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:.65rem;font-weight:600;color:#3b82f6;flex-shrink:0}
                .edu-title-mc{font-size:.88rem;font-weight:600;color:#fff;margin:0 0 .2rem}
                .edu-degree-mc{font-size:.78rem;color:#3b82f6;margin:0 0 .2rem}
                .edu-date-mc{font-size:.68rem;color:#6b6878;font-family:'JetBrains Mono',monospace;margin:0 0 .4rem}
                .edu-desc-mc{font-size:.78rem;line-height:1.5;color:rgba(232,230,240,.5);margin:0}
                .skills-cloud-mc{display:flex;flex-wrap:wrap;gap:8px}
                .linkedin-skill-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.08em;padding:5px 12px;border:1px solid rgba(255,255,255,.06);border-radius:2px;color:#6b6878;transition:all .3s ease}
                .linkedin-skill-mc:hover{border-color:#3b82f6;color:#3b82f6;background:rgba(59,130,246,.05);transform:translateY(-2px)}
                @media(max-width:768px){.linkedin-layout{grid-template-columns:1fr;gap:2rem}}
            </style>
        `;
    }
}

window.linkedinApp = new LinkedInApp();