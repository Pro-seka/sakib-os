// ============================================
// YOUTUBE CHANNEL APP
// ============================================

class YouTubeApp {
    constructor() {
        this.appName = 'youtube';
        this.windowId = null;
    }
    
    open() {
        if (this.windowId && window.windowManager?.windowInstances.has(this.windowId)) {
            window.windowManager.focusWindow(this.windowId);
            return;
        }
        
        const content = this.generateContent();
        
        const instance = window.windowManager?.createWindow({
            id: `youtube-${Date.now()}`,
            title: 'YouTube Channel',
            icon: '▶',
            width: 850,
            height: 620,
            app: this.appName,
            content: content
        });
        
        if (instance) this.windowId = instance.id;
    }
    
    generateContent() {
        return `
            <div class="youtube-app-mc">
                <div class="youtube-layout">
                    <div class="youtube-channel-side">
                        <div class="section-number-mc">05 / 08</div>
                        <div class="section-label-mc" style="color:#f87171;"><span class="label-line" style="background:#f87171;"></span>YouTube · Content</div>
                        <div class="youtube-channel-card-mc">
                            <div class="youtube-channel-avatar-mc">
                                <svg viewBox="0 0 24 24" fill="#f87171" width="28" height="28"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                            </div>
                            <h2 class="youtube-channel-name-mc">SakibVerse</h2>
                            <p class="youtube-channel-sub-mc">Learning in Public</p>
                            <div class="youtube-stats-row-mc">
                                <div class="youtube-stat-mc"><div class="youtube-stat-val-mc">AI/ML</div><div class="youtube-stat-label-mc">Focus Area</div></div>
                                <div class="youtube-stat-mc"><div class="youtube-stat-val-mc">DevLogs</div><div class="youtube-stat-label-mc">Content Style</div></div>
                            </div>
                            <p class="youtube-channel-desc-mc">Sharing my learning journey and cool stuff I find along the way.</p>
                            <a href="https://www.youtube.com/@thesakiib" target="_blank" rel="noopener" class="youtube-subscribe-btn-mc"><span>Watch Channel ↗</span></a>
                        </div>
                    </div>
                    <div class="youtube-videos-side">
                        <p class="youtube-section-desc-mc">Sharing is caring.</p>
                        <div class="youtube-content-card-mc">
                            <div class="youtube-content-header-mc"><span class="youtube-content-icon-mc">🎥</span><h3 class="youtube-content-title-mc">Content & Topics</h3></div>
                            <div class="youtube-topics-grid-mc">
                                <div class="youtube-topic-item-mc"><div class="topic-number-mc">01</div><div class="topic-content-mc"><h4 class="topic-title-mc"> - - - </h4><p class="topic-desc-mc"> - - - </p></div></div>
                                <div class="youtube-topic-item-mc"><div class="topic-number-mc">02</div><div class="topic-content-mc"><h4 class="topic-title-mc"> - - - </h4><p class="topic-desc-mc"> - - -</p></div></div>
                                <div class="youtube-topic-item-mc"><div class="topic-number-mc">03</div><div class="topic-content-mc"><h4 class="topic-title-mc"> - - - </h4><p class="topic-desc-mc"> - - - </p></div></div>
                            </div>
                        </div>
                        <div class="youtube-style-card-mc">
                            <h3 class="youtube-style-title-mc">Content Style</h3>
                            <div class="youtube-style-content-mc">
                                <div class="style-item-mc"><span class="style-icon-mc">💭</span><span class="style-text-mc"> . . . </span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .youtube-app-mc{height:100%;overflow-y:auto;padding:10px;color:#e8e6f0;font-family:'Instrument Sans',sans-serif}
                .youtube-layout{display:grid;grid-template-columns:1fr 1.1fr;gap:2.5rem;align-items:start}
                .section-number-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#6b6878;margin-bottom:.5rem;letter-spacing:.15em}
                .section-label-mc{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem;opacity:.8}
                .label-line{display:block;width:2.5rem;height:1px}
                .youtube-channel-card-mc{position:relative;border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:2rem;background:rgba(255,255,255,.015);transition:all .4s ease}
                .youtube-channel-card-mc:hover{border-color:rgba(248,113,113,.3);box-shadow:0 20px 40px rgba(0,0,0,.4);transform:translateY(-4px)}
                .youtube-channel-avatar-mc{width:52px;height:52px;border-radius:4px;display:flex;align-items:center;justify-content:center;margin-bottom:1rem;background:rgba(248,113,113,.08);border:1px solid rgba(248,113,113,.15);transition:all .3s ease}
                .youtube-channel-card-mc:hover .youtube-channel-avatar-mc{background:rgba(248,113,113,.15);transform:scale(1.05)}
                .youtube-channel-name-mc{font-family:'Syne',sans-serif;font-size:1.3rem;font-weight:700;color:#fff;margin:0 0 .3rem}
                .youtube-channel-sub-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.12em;color:#f87171;text-transform:uppercase;margin-bottom:1.5rem}
                .youtube-stats-row-mc{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-bottom:1.5rem}
                .youtube-stat-mc{padding:12px;background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.04);border-radius:4px;text-align:center}
                .youtube-stat-val-mc{font-family:'Syne',sans-serif;font-size:1rem;font-weight:700;color:#f87171}
                .youtube-stat-label-mc{font-family:'JetBrains Mono',monospace;font-size:.55rem;color:#6b6878;text-transform:uppercase;letter-spacing:.1em;margin-top:4px}
                .youtube-channel-desc-mc{font-size:.8rem;line-height:1.6;color:rgba(232,230,240,.5);margin-bottom:1.5rem}
                .youtube-subscribe-btn-mc{display:block;text-align:center;font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;padding:.7rem;background:#f87171;color:#fff;border-radius:2px;text-decoration:none;font-weight:600;transition:all .3s ease}
                .youtube-subscribe-btn-mc:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(248,113,113,.3)}
                .youtube-section-desc-mc{font-size:.9rem;line-height:1.8;color:rgba(232,230,240,.55);margin-bottom:1.5rem}
                .youtube-content-card-mc{border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:1.5rem;background:rgba(255,255,255,.015);margin-bottom:1.5rem;transition:all .3s ease}
                .youtube-content-card-mc:hover{border-color:rgba(248,113,113,.2);background:rgba(255,255,255,.025)}
                .youtube-content-header-mc{display:flex;align-items:center;gap:.75rem;margin-bottom:1.5rem;padding-bottom:1rem;border-bottom:1px solid rgba(255,255,255,.04)}
                .youtube-content-icon-mc{font-size:20px}
                .youtube-content-title-mc{font-family:'Syne',sans-serif;font-size:1rem;font-weight:600;color:#fff;margin:0}
                .youtube-topics-grid-mc{display:flex;flex-direction:column;gap:1rem}
                .youtube-topic-item-mc{display:flex;gap:1rem;padding:.7rem;border-radius:4px;transition:all .3s ease}
                .youtube-topic-item-mc:hover{background:rgba(248,113,113,.03);transform:translateX(4px)}
                .topic-number-mc{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:700;color:#f87171;opacity:.5;flex-shrink:0;width:28px}
                .topic-title-mc{font-family:'Syne',sans-serif;font-size:.85rem;font-weight:600;color:#fff;margin:0 0 3px}
                .topic-desc-mc{font-size:.78rem;line-height:1.5;color:rgba(232,230,240,.5);margin:0}
                .youtube-style-card-mc{border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:1.5rem;background:rgba(255,255,255,.015)}
                .youtube-style-title-mc{font-family:'Syne',sans-serif;font-size:1rem;font-weight:600;color:#fff;margin:0 0 1rem}
                .youtube-style-content-mc{display:flex;flex-direction:column;gap:.7rem}
                .style-item-mc{display:flex;align-items:center;gap:.75rem;padding:.4rem 0}
                .style-icon-mc{font-size:16px;width:24px;text-align:center}
                .style-text-mc{font-family:'JetBrains Mono',monospace;font-size:.65rem;color:rgba(232,230,240,.7)}
                @media(max-width:768px){.youtube-layout{grid-template-columns:1fr;gap:2rem}}
            </style>
        `;
    }
}

window.youtubeApp = new YouTubeApp();