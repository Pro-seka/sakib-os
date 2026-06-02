// ============================================
// ABOUT ME APP
// ============================================

class AboutApp {
    constructor() {
        this.appName = 'about';
        this.windowId = null;
    }
    
    open() {
        if (this.windowId && window.windowManager?.windowInstances.has(this.windowId)) {
            window.windowManager.focusWindow(this.windowId);
            return;
        }
        
        const content = this.generateContent();
        
        const instance = window.windowManager?.createWindow({
            id: `about-${Date.now()}`,
            title: 'About Me',
            icon: '👤',
            width: 850,
            height: 620,
            app: this.appName,
            content: content
        });
        
        if (instance) this.windowId = instance.id;
    }
    
    generateContent() {
        return `
            <div class="about-app-mc">
                <div class="about-layout">
                    <div class="about-identity">
                        <div class="section-number-mc">01 / 08</div>
                        <div class="section-label-mc">
                            <span class="label-line"></span>
                            Identity · Vision
                        </div>
                        
                        <div class="profile-visual">
                            <div class="profile-card-mc">
                                <div class="profile-glow-mc"></div>
                                <div class="profile-frame-mc">
                                    <img src="assets/profile.jpg" alt="Sakib Hasan"
                                        style="width:100%;height:100%;object-fit:cover;display:block;"
                                        onerror="this.style.display='none';document.getElementById('pf-fb').style.display='flex';">
                                    <div id="pf-fb" class="profile-placeholder-mc" style="display:none;position:absolute;inset:0;">
                                        <div class="profile-initials-mc">SH</div>
                                        <div class="profile-tag-mc">sakib@diu.edu</div>
                                    </div>
                                    <div class="profile-corner tl"></div><div class="profile-corner tr"></div>
                                    <div class="profile-corner bl"></div><div class="profile-corner br"></div>
                                </div>
                            </div>
                        </div>
                        
                        <h1 class="hero-name-mc">Sakib<br>Hasan</h1>
                        <div class="hero-role-mc">Software Engineering Student</div>
                    </div>
                    
                    <div class="about-content">
                        <p class="about-bio-mc">Hi, I'm Sakib Hasan, a Software Engineering student at Daffodil International University. I work on building software systems with a focus on AI, machine learning concepts, automation, and application development.</p>
                        <p class="about-bio-secondary-mc">Development? it's about designing structured solutions that are reliable, adaptable, and meaningful in real use cases.</p>
                        
                        <div class="stats-grid-mc">
                            <div class="stat-card-mc"><div class="stat-value-mc">5+</div><div class="stat-label-mc">Projects</div></div>
                            <div class="stat-card-mc"><div class="stat-value-mc">SWE</div><div class="stat-label-mc">Program</div></div>
                            <div class="stat-card-mc"><div class="stat-value-mc">DIU</div><div class="stat-label-mc">University</div></div>
                            <div class="stat-card-mc"><div class="stat-value-mc">AI/ML</div><div class="stat-label-mc">Focus Area</div></div>
                        </div>
                        
                        <blockquote class="philosophy-quote-mc">"Technology should feel like magic — invisible, intuitive, and deeply human. Every system, every interaction serves a purpose."</blockquote>
                        
                        <div class="skills-section-mc">
                            <span class="skill-tag-mc">JavaScript</span><span class="skill-tag-mc">Python</span>
                            <span class="skill-tag-mc">React.js</span><span class="skill-tag-mc">Node.js</span>
                            <span class="skill-tag-mc">Machine Learning</span><span class="skill-tag-mc">System Design</span>
                            <span class="skill-tag-mc">UI/UX</span><span class="skill-tag-mc">Git & GitHub</span>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .about-app-mc{height:100%;overflow-y:auto;padding:10px;color:#e8e6f0;font-family:'Instrument Sans',sans-serif}
                .about-layout{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start}
                .section-number-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#6b6878;margin-bottom:.5rem;letter-spacing:.15em}
                .section-label-mc{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;color:var(--accent-primary);margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem;opacity:.8}
                .label-line{display:block;width:2.5rem;height:1px;background:var(--accent-primary)}
                .profile-card-mc{position:relative;width:180px;height:220px;perspective:1000px}
                .profile-glow-mc{position:absolute;inset:-20px;border-radius:50%;background:radial-gradient(circle,rgba(167,139,250,.2) 0%,transparent 70%);filter:blur(30px);animation:floatMC 6s ease-in-out infinite;z-index:-1}
                .profile-frame-mc{position:relative;width:100%;height:100%;border:1px solid rgba(167,139,250,.25);border-radius:4px;overflow:hidden;background:rgba(255,255,255,.03);animation:floatMC 6s ease-in-out infinite;transition:transform .3s ease}
                .profile-frame-mc:hover{transform:rotateY(-5deg) rotateX(5deg);border-color:rgba(167,139,250,.5);box-shadow:0 20px 40px rgba(167,139,250,.15)}
                @keyframes floatMC{0%,100%{transform:translateY(0)}25%{transform:translateY(-6px)}75%{transform:translateY(3px)}}
                .profile-placeholder-mc{width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1rem;background:linear-gradient(135deg,rgba(167,139,250,.05),rgba(96,165,250,.05))}
                .profile-initials-mc{font-family:'Syne',sans-serif;font-size:4rem;font-weight:800;background:linear-gradient(135deg,#a78bfa,#60a5fa);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
                .profile-tag-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.15em;color:#6b6878;text-transform:uppercase}
                .profile-corner{position:absolute;width:20px;height:20px;border-color:#a78bfa;border-style:solid;opacity:.4;transition:all .3s ease}
                .profile-frame-mc:hover .profile-corner{opacity:.8}
                .profile-corner.tl{top:10px;left:10px;border-width:1px 0 0 1px}
                .profile-corner.tr{top:10px;right:10px;border-width:1px 1px 0 0}
                .profile-corner.bl{bottom:10px;left:10px;border-width:0 0 1px 1px}
                .profile-corner.br{bottom:10px;right:10px;border-width:0 1px 1px 0}
                .hero-name-mc{font-family:'Syne',sans-serif;font-size:2.8rem;font-weight:800;line-height:.9;letter-spacing:-.04em;color:#fff;margin:1.5rem 0 .5rem;background:linear-gradient(135deg,#fff 0%,rgba(255,255,255,.8)100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent}
                .hero-role-mc{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:var(--accent-primary);letter-spacing:.12em;text-transform:uppercase;display:inline-block;padding:.4rem 1rem;border:1px solid rgba(255,255,255,.08);border-radius:2px;font-weight:500}
                .about-content{display:flex;flex-direction:column;gap:1.2rem}
                .about-bio-mc{font-size:.9rem;line-height:1.7;color:rgba(232,230,240,.65);margin:0}
                .about-bio-secondary-mc{font-size:.85rem;line-height:1.6;color:rgba(232,230,240,.45);margin:0}
                .stats-grid-mc{display:grid;grid-template-columns:repeat(2,1fr);gap:10px}
                .stat-card-mc{padding:14px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:4px;text-align:center;transition:all .3s ease}
                .stat-card-mc:hover{background:rgba(167,139,250,.05);border-color:rgba(167,139,250,.2);transform:translateY(-2px)}
                .stat-value-mc{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:700;color:var(--accent-primary);margin-bottom:4px}
                .stat-label-mc{font-family:'JetBrains Mono',monospace;font-size:.55rem;color:#6b6878;text-transform:uppercase;letter-spacing:.1em}
                .philosophy-quote-mc{font-size:.85rem;font-style:italic;line-height:1.6;color:rgba(232,230,240,.5);padding:14px;background:rgba(167,139,250,.03);border-left:2px solid var(--accent-primary);border-radius:2px;margin:0}
                .skills-section-mc{display:flex;flex-wrap:wrap;gap:8px}
                .skill-tag-mc{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.08em;text-transform:uppercase;padding:5px 12px;border:1px solid rgba(255,255,255,.08);border-radius:2px;color:#6b6878;transition:all .3s ease}
                .skill-tag-mc:hover{border-color:var(--accent-primary);color:#e8e6f0;background:rgba(255,255,255,.04);transform:translateY(-2px)}
                @media(max-width:768px){.about-layout{grid-template-columns:1fr}.hero-name-mc{font-size:2rem}.profile-card-mc{width:140px;height:170px}}
            </style>
        `;
    }
}

window.aboutApp = new AboutApp();