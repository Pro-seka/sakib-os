// ============================================
// RESUME VIEWER APP - LOCAL PREVIEW + DRIVE DOWNLOAD
// ============================================

class ResumeApp {
    constructor() {
        this.appName = 'resume';
        this.windowId = null;
        
        // ═══════════════════════════════════════
        // CONFIGURATION
        // ═══════════════════════════════════════
        
        // Local preview image (shown in the resume section)
        this.resumePreviewPath = 'assets/resume-preview.png';
        
        // Google Drive FILE_ID for PDF download
        this.driveFileId = 'YOUR_FILE_ID_HERE'; // ← REPLACE WITH YOUR GOOGLE DRIVE FILE ID
        
        // Google Drive direct download link
        this.driveDownloadPath = `https://drive.google.com/uc?export=download&id=${this.driveFileId}`;
    }
    
    open() {
        if (this.windowId && window.windowManager?.windowInstances.has(this.windowId)) {
            window.windowManager.focusWindow(this.windowId);
            return;
        }
        
        const content = this.generateContent();
        
        const instance = window.windowManager?.createWindow({
            id: `resume-${Date.now()}`,
            title: 'Resume Viewer',
            icon: '📄',
            width: 900,
            height: 650,
            app: this.appName,
            content: content
        });
        
        if (instance) this.windowId = instance.id;
        setTimeout(() => this.initializeResume(), 200);
    }
    
    generateContent() {
        return `
            <div class="resume-app-mc">
                <div class="resume-layout">
                    <!-- Left Column -->
                    <div class="resume-summary">
                        <div class="section-number-mc">02 / 08</div>
                        <div class="section-label-mc">
                            <span class="label-line"></span>
                            Resume · Credentials
                        </div>
                        <h2 class="resume-title-mc">Professional<br>Profile</h2>
                        <p class="resume-desc-mc">A concise overview of my academic background, technical skill set, and project experience as a software engineering student with a focus on intelligent systems and automation.</p>
                        
                        <!-- HUD Card -->
                        <div class="hud-card-mc">
                            <div class="hud-card-glow-mc"></div>
                            <div class="hud-header-mc">
                                <div class="hud-dot-mc"></div>
                                <span class="hud-title-mc">resume.pdf — System Record</span>
                            </div>
                            <div class="hud-body-mc">
                                <div class="hud-row-mc"><span class="hud-key-mc">Institution</span><span class="hud-val-mc">Daffodil Intl. University</span></div>
                                <div class="hud-row-mc"><span class="hud-key-mc">Program</span><span class="hud-val-mc accent-mc">Software Engineering</span></div>
                                <div class="hud-row-mc"><span class="hud-key-mc">Status</span><span class="hud-val-mc accent-mc">Active Student</span></div>
                                <div class="hud-row-mc"><span class="hud-key-mc">Focus</span><span class="hud-val-mc">AI · ML · Systems</span></div>
                            </div>
                        </div>
                        
                        <!-- Action Buttons -->
                        <div class="btn-group-mc">
                            <button class="btn-mc btn-primary-mc" onclick="window.resumeApp.viewResumeInOS()"><span>👁 View Resume</span></button>
                            <button class="btn-mc btn-download-mc" onclick="window.resumeApp.downloadResumePDF()"><span>⬇ Download PDF</span></button>
                            <button class="btn-mc btn-ghost-mc" onclick="window.resumeApp.printResume()"><span>🖨 Print Resume</span></button>
                        </div>
                        <div id="resume-status" class="resume-status-mc" style="display:none;"></div>
                    </div>
                    
                    <!-- Right Column -->
                    <div class="resume-preview-side">
                        <div class="resume-preview-wrapper">
                            <div class="resume-preview-label"><span class="preview-dot"></span>Resume Preview</div>
                            <div class="resume-preview-container" onclick="window.resumeApp.viewResumeInOS()" title="Click to view full resume">
                                <img src="${this.resumePreviewPath}" alt="Resume Preview" style="width:100%;height:100%;object-fit:contain;display:block;" loading="lazy"
                                    onerror="this.style.display='none';document.getElementById('resume-preview-fb').style.display='flex';">
                                <div id="resume-preview-fb" class="resume-preview-fallback" style="display:none;">
                                    <div class="preview-fallback-content">
                                        <div class="preview-fallback-icon">📄</div>
                                        <p class="preview-fallback-text">Resume Preview</p>
                                        <p class="preview-fallback-sub">Add resume-preview.png to /assets/ folder</p>
                                    </div>
                                </div>
                                <div class="preview-hover-overlay"><span class="preview-hover-icon">🔍</span><span class="preview-hover-text">Click to View Full Resume</span></div>
                            </div>
                        </div>
                        
                        <!-- Experience Timeline -->
                        <div class="resume-timeline">
                            <div class="timeline-item-mc">
                                <div class="timeline-dot-mc"></div>
                                <div class="timeline-content-mc">
                                    <div class="timeline-header-mc"><h4 class="timeline-title-mc">Software Engineering Student</h4><span class="timeline-date-mc">2022 - Present</span></div>
                                    <div class="timeline-org-mc">Daffodil International University</div>
                                    <p class="timeline-desc-mc">Pursuing B.Sc. in Software Engineering with focus on artificial intelligence, machine learning, and modern software development practices.</p>
                                    <div class="timeline-tags-mc"><span class="tag-mc">AI/ML</span><span class="tag-mc">Python</span><span class="tag-mc">JavaScript</span></div>
                                </div>
                            </div>
                            <div class="timeline-item-mc">
                                <div class="timeline-dot-mc"></div>
                                <div class="timeline-content-mc">
                                    <div class="timeline-header-mc"><h4 class="timeline-title-mc">Project Developer</h4><span class="timeline-date-mc">2023 - Present</span></div>
                                    <div class="timeline-org-mc">Personal & Academic Projects</div>
                                    <p class="timeline-desc-mc">Developed multiple software projects including browser-based applications, AI experiments, and automation tools.</p>
                                    <div class="timeline-tags-mc"><span class="tag-mc">System Design</span><span class="tag-mc">Git</span><span class="tag-mc">Automation</span></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .resume-app-mc{height:100%;overflow-y:auto;padding:10px;color:#e8e6f0;font-family:'Instrument Sans',sans-serif}
                .resume-layout{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start}
                .resume-summary{position:sticky;top:0}
                .section-number-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#6b6878;margin-bottom:.5rem;letter-spacing:.15em}
                .section-label-mc{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;color:#60a5fa;margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem;opacity:.8}
                .label-line{display:block;width:2.5rem;height:1px;background:#60a5fa}
                .resume-title-mc{font-family:'Syne',sans-serif;font-size:2.5rem;font-weight:700;line-height:.95;color:#fff;letter-spacing:-.03em;margin-bottom:1.5rem}
                .resume-desc-mc{font-size:.9rem;line-height:1.8;color:rgba(232,230,240,.6);margin-bottom:2rem}
                .hud-card-mc{position:relative;border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:1.5rem;background:rgba(255,255,255,.015);backdrop-filter:blur(10px);margin-bottom:2rem;transition:all .4s ease}
                .hud-card-mc:hover{border-color:rgba(255,255,255,.12);transform:translateY(-2px);box-shadow:0 12px 30px rgba(0,0,0,.4)}
                .hud-card-glow-mc{position:absolute;inset:0;border-radius:4px;box-shadow:0 0 60px rgba(96,165,250,.08);pointer-events:none}
                .hud-header-mc{display:flex;align-items:center;gap:.6rem;margin-bottom:1.2rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,.05)}
                .hud-dot-mc{width:6px;height:6px;border-radius:50%;background:#60a5fa;box-shadow:0 0 8px #60a5fa}
                .hud-title-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:#6b6878;flex:1}
                .hud-body-mc{display:flex;flex-direction:column;gap:.8rem}
                .hud-row-mc{display:flex;justify-content:space-between;align-items:flex-start;gap:1rem}
                .hud-key-mc{font-family:'JetBrains Mono',monospace;font-size:.62rem;color:#6b6878;text-transform:uppercase;letter-spacing:.1em}
                .hud-val-mc{font-family:'JetBrains Mono',monospace;font-size:.7rem;color:#e8e6f0;text-align:right;font-weight:500}
                .hud-val-mc.accent-mc{color:#60a5fa}
                .btn-group-mc{display:flex;flex-direction:column;gap:.75rem}
                .btn-mc{font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;padding:.8rem 1.5rem;border-radius:4px;display:flex;align-items:center;justify-content:center;gap:.5rem;cursor:pointer;transition:all .3s cubic-bezier(.22,1,.36,1);border:1px solid transparent;font-weight:500;width:100%}
                .btn-primary-mc{background:#60a5fa;color:#000;border-color:#60a5fa;font-weight:600}
                .btn-primary-mc:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(96,165,250,.3);background:#3b82f6}
                .btn-download-mc{background:#10b981;color:#fff;border-color:#10b981;font-weight:600}
                .btn-download-mc:hover{transform:translateY(-3px);box-shadow:0 12px 30px rgba(16,185,129,.3);background:#059669}
                .btn-ghost-mc{background:transparent;color:#e8e6f0;border-color:rgba(255,255,255,.15)}
                .btn-ghost-mc:hover{border-color:#60a5fa;color:#60a5fa;transform:translateY(-3px);box-shadow:0 8px 25px rgba(96,165,250,.15)}
                .resume-status-mc{font-family:'JetBrains Mono',monospace;font-size:.65rem;padding:.8rem;border-radius:4px;text-align:center;margin-top:.5rem;animation:fadeIn .3s ease}
                @keyframes fadeIn{from{opacity:0;transform:translateY(-5px)}to{opacity:1;transform:translateY(0)}}
                .resume-status-mc.success{background:rgba(34,197,94,.1);border:1px solid rgba(34,197,94,.2);color:#22c55e}
                .resume-status-mc.info{background:rgba(96,165,250,.1);border:1px solid rgba(96,165,250,.2);color:#60a5fa}
                .resume-status-mc.error{background:rgba(239,68,68,.1);border:1px solid rgba(239,68,68,.2);color:#ef4444}
                .resume-preview-wrapper{margin-bottom:2rem}
                .resume-preview-label{display:flex;align-items:center;gap:.5rem;margin-bottom:.8rem;font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.15em;text-transform:uppercase;color:#6b6878}
                .preview-dot{width:5px;height:5px;border-radius:50%;background:#60a5fa;box-shadow:0 0 6px rgba(96,165,250,.4)}
                .resume-preview-container{position:relative;width:100%;aspect-ratio:3/4;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.08);border-radius:6px;overflow:hidden;cursor:pointer;transition:all .3s ease}
                .resume-preview-container:hover{border-color:#60a5fa;box-shadow:0 8px 25px rgba(0,0,0,.4)}
                .resume-preview-container:hover .preview-hover-overlay{opacity:1}
                .preview-hover-overlay{position:absolute;inset:0;background:rgba(0,0,0,.6);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.5rem;opacity:0;transition:opacity .3s ease;pointer-events:none}
                .preview-hover-icon{font-size:32px}.preview-hover-text{font-family:'JetBrains Mono',monospace;font-size:.65rem;color:#fff;letter-spacing:.08em}
                .resume-preview-fallback{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;background:rgba(255,255,255,.02)}
                .preview-fallback-content{text-align:center;padding:2rem}
                .preview-fallback-icon{font-size:48px;margin-bottom:1rem}
                .preview-fallback-text{font-family:'Syne',sans-serif;font-size:1rem;font-weight:600;color:#fff;margin:0 0 .5rem}
                .preview-fallback-sub{font-size:.8rem;color:rgba(232,230,240,.5);margin:0}
                .resume-timeline{position:relative;padding-left:30px}
                .resume-timeline::before{content:'';position:absolute;left:0;top:0;bottom:0;width:1px;background:linear-gradient(180deg,rgba(96,165,250,.3) 0%,rgba(96,165,250,.1) 50%,transparent 100%)}
                .timeline-item-mc{position:relative;margin-bottom:2rem;padding-left:2rem}
                .timeline-dot-mc{position:absolute;left:-34px;top:8px;width:8px;height:8px;border-radius:50%;background:#60a5fa;box-shadow:0 0 12px rgba(96,165,250,.4)}
                .timeline-content-mc{background:rgba(255,255,255,.015);border:1px solid rgba(255,255,255,.04);border-radius:4px;padding:1.2rem;transition:all .3s ease}
                .timeline-content-mc:hover{border-color:rgba(255,255,255,.1);background:rgba(255,255,255,.025);transform:translateX(4px)}
                .timeline-header-mc{display:flex;justify-content:space-between;align-items:flex-start;margin-bottom:.5rem;gap:1rem}
                .timeline-title-mc{font-family:'Syne',sans-serif;font-size:1rem;font-weight:600;color:#fff;margin:0}
                .timeline-date-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#6b6878;white-space:nowrap}
                .timeline-org-mc{font-size:.8rem;color:#60a5fa;margin-bottom:.5rem}
                .timeline-desc-mc{font-size:.8rem;line-height:1.6;color:rgba(232,230,240,.55);margin-bottom:.8rem}
                .timeline-tags-mc{display:flex;flex-wrap:wrap;gap:6px}
                .tag-mc{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.1em;text-transform:uppercase;padding:3px 10px;border:1px solid rgba(255,255,255,.06);border-radius:2px;color:#6b6878}
                @media(max-width:768px){.resume-layout{grid-template-columns:1fr;gap:2rem}.resume-summary{position:static}.resume-title-mc{font-size:2rem}}
            </style>
        `;
    }
    
    initializeResume() {
        const items = document.querySelectorAll('.timeline-item-mc');
        items.forEach((item, i) => {
            item.style.opacity = '0';
            item.style.transform = 'translateX(-20px)';
            item.style.transition = 'all 0.5s cubic-bezier(0.22,1,0.36,1)';
            setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'translateX(0)'; }, 150 + i * 150);
        });
    }
    
    viewResumeInOS() {
        window.soundEngine.playWindowOpen();
        const resumeViewContent = `
            <div style="height:100%;display:flex;flex-direction:column;background:rgba(0,0,0,.3);">
                <div style="padding:10px 16px;background:rgba(0,0,0,.4);border-bottom:1px solid rgba(255,255,255,.06);display:flex;align-items:center;gap:10px;flex-shrink:0;">
                    <span style="font-size:16px;">📄</span>
                    <span style="font-family:'Syne',sans-serif;font-size:13px;font-weight:600;color:#fff;flex:1;">Sakib Hasan - Resume</span>
                    <button onclick="window.resumeApp.downloadResumePDF()" style="font-family:'JetBrains Mono',monospace;font-size:.6rem;padding:6px 12px;background:#10b981;border:none;border-radius:4px;color:#fff;cursor:pointer;letter-spacing:.05em;font-weight:600;">⬇ Download PDF</button>
                </div>
                <div style="flex:1;overflow:auto;display:flex;align-items:flex-start;justify-content:center;padding:20px;background:rgba(0,0,0,.2);">
                    <img src="${this.resumePreviewPath}" alt="Resume" style="max-width:100%;height:auto;box-shadow:0 8px 32px rgba(0,0,0,.5);border-radius:4px;"
                        onerror="this.style.display='none';document.getElementById('rv-fb').style.display='flex';">
                    <div id="rv-fb" style="display:none;flex-direction:column;align-items:center;justify-content:center;padding:3rem;text-align:center;min-height:400px;">
                        <div style="font-size:64px;margin-bottom:1.5rem;">📄</div>
                        <h3 style="font-family:'Syne',sans-serif;font-size:1.3rem;color:#fff;margin:0 0 .8rem;">Resume Preview Not Available</h3>
                        <p style="font-size:.9rem;color:rgba(232,230,240,.5);margin:0 0 2rem;">Add your resume preview as assets/resume-preview.png</p>
                        <button onclick="window.resumeApp.downloadResumePDF()" style="font-family:'JetBrains Mono',monospace;font-size:.7rem;padding:.8rem 2rem;background:#10b981;border:none;border-radius:6px;color:#fff;cursor:pointer;">⬇ Download PDF Instead</button>
                    </div>
                </div>
            </div>
        `;
        window.windowManager?.createWindow({
            id: `resume-view-${Date.now()}`,
            title: '📄 Resume - Sakib Hasan',
            icon: '📄',
            width: 750,
            height: 700,
            app: 'resume-viewer',
            content: resumeViewContent
        });
    }
    
    downloadResumePDF() {
        this.showStatus('⬇ Downloading resume...', 'info');
        window.soundEngine.playClick();
        const link = document.createElement('a');
        link.href = this.driveDownloadPath;
        link.download = 'Sakib_Hasan_Resume.pdf';
        link.target = '_blank';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => this.showStatus('✓ Download started! Check your downloads folder.', 'success'), 1000);
    }
    
    printResume() {
        this.showStatus('🖨 Opening for printing...', 'info');
        window.soundEngine.playClick();
        const printWindow = window.open(this.resumePreviewPath, '_blank');
        if (printWindow) {
            printWindow.addEventListener('load', () => printWindow.print());
            this.showStatus('✓ Print dialog opened', 'success');
        } else {
            this.showStatus('⚠ Pop-up blocked. Please allow pop-ups.', 'error');
        }
    }
    
    showStatus(message, type) {
        const statusEl = document.getElementById('resume-status');
        if (statusEl) {
            statusEl.textContent = message;
            statusEl.className = `resume-status-mc ${type}`;
            statusEl.style.display = 'block';
            clearTimeout(this.statusTimeout);
            this.statusTimeout = setTimeout(() => { statusEl.style.display = 'none'; }, 4000);
        }
    }
}

window.resumeApp = new ResumeApp();