// ============================================
// CONTACT TERMINAL APP
// ============================================

class ContactApp {
    constructor() {
        this.appName = 'contact';
        this.windowId = null;
    }
    
    open() {
        if (this.windowId && window.windowManager?.windowInstances.has(this.windowId)) {
            window.windowManager.focusWindow(this.windowId);
            return;
        }
        
        const content = this.generateContent();
        
        const instance = window.windowManager?.createWindow({
            id: `contact-${Date.now()}`,
            title: 'Contact Terminal',
            icon: '✉',
            width: 850,
            height: 600,
            app: this.appName,
            content: content
        });
        
        if (instance) this.windowId = instance.id;
        setTimeout(() => this.initializeContactForm(), 200);
    }
    
    generateContent() {
        return `
            <div class="contact-app-mc">
                <div class="contact-layout">
                    <div class="contact-info-side">
                        <div class="section-number-mc">06 / 08</div>
                        <div class="section-label-mc" style="color:#d1d5db;"><span class="label-line" style="background:#d1d5db;"></span>Contact · Connect</div>
                        <h2 class="contact-title-mc">Let's<br>Connect</h2>
                        <p class="contact-desc-mc">Have a project, a question, or just want to say hi? Reach out directly. I'm always open to interesting conversations and collaborations.</p>
                        <a href="mailto:sakib.hsn44@gmail.com" class="contact-email-mc">sakib.hsn44@gmail.com</a>
                        <div class="contact-social-label-mc">Find me on</div>
                        <div class="contact-social-links-mc">
                            <a href="https://github.com/Pro-seka" target="_blank" rel="noopener" class="contact-social-pill-mc">GitHub</a>
                            <a href="https://www.linkedin.com/in/sakibhasan-dev/" target="_blank" rel="noopener" class="contact-social-pill-mc">LinkedIn</a>
                            <a href="https://www.youtube.com/@thesakiib" target="_blank" rel="noopener" class="contact-social-pill-mc">YouTube</a>
                            <a href="https://www.facebook.com/sakib.hasan.319945" target="_blank" rel="noopener" class="contact-social-pill-mc">Facebook</a>
                            <a href="https://t.me/Sakib_hi" target="_blank" rel="noopener" class="contact-social-pill-mc">Telegram</a>
                            <a href="https://x.com/Sakiiiiiiiib" target="_blank" rel="noopener" class="contact-social-pill-mc">X/Twitter</a>
                        </div>
                    </div>
                    <div class="contact-form-side">
                        <div class="contact-form-card-mc">
                            <div class="form-field-mc"><label class="form-label-mc" for="contact-name">Full Name</label><input class="form-input-mc" id="contact-name" type="text" placeholder="Your name" autocomplete="name"></div>
                            <div class="form-field-mc"><label class="form-label-mc" for="contact-email">Email Address</label><input class="form-input-mc" id="contact-email" type="email" placeholder="you@email.com" autocomplete="email"></div>
                            <div class="form-field-mc"><label class="form-label-mc" for="contact-message">Message</label><textarea class="form-textarea-mc" id="contact-message" placeholder="Tell me about your project or question..." rows="5"></textarea></div>
                            <div id="contact-form-status-mc" class="form-status-mc" style="display:none;"></div>
                            <button class="contact-submit-btn-mc" onclick="window.contactApp.handleSubmit()"><span>Send Transmission ↗</span></button>
                        </div>
                    </div>
                </div>
            </div>
            <style>
                .contact-app-mc{height:100%;overflow-y:auto;padding:10px;color:#e8e6f0;font-family:'Instrument Sans',sans-serif}
                .contact-layout{display:grid;grid-template-columns:1fr 1fr;gap:2.5rem;align-items:start}
                .section-number-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;color:#6b6878;margin-bottom:.5rem;letter-spacing:.15em}
                .section-label-mc{font-family:'JetBrains Mono',monospace;font-size:.62rem;letter-spacing:.25em;text-transform:uppercase;margin-bottom:1.5rem;display:flex;align-items:center;gap:.75rem;opacity:.8}
                .label-line{display:block;width:2.5rem;height:1px}
                .contact-title-mc{font-family:'Syne',sans-serif;font-size:2.5rem;font-weight:700;line-height:.95;color:#fff;letter-spacing:-.03em;margin-bottom:1.5rem}
                .contact-desc-mc{font-size:.9rem;line-height:1.8;color:rgba(232,230,240,.55);margin-bottom:2rem}
                .contact-email-mc{font-family:'Syne',sans-serif;font-size:1.1rem;font-weight:600;color:#fff;margin-bottom:2rem;display:block;text-decoration:none;transition:all .3s ease}
                .contact-email-mc:hover{color:#d1d5db;transform:translateX(4px)}
                .contact-social-label-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.18em;text-transform:uppercase;color:#6b6878;margin-bottom:1rem}
                .contact-social-links-mc{display:flex;flex-wrap:wrap;gap:8px}
                .contact-social-pill-mc{font-family:'JetBrains Mono',monospace;font-size:.6rem;letter-spacing:.1em;text-transform:uppercase;padding:6px 14px;border:1px solid rgba(255,255,255,.08);border-radius:2px;text-decoration:none;color:#6b6878;transition:all .3s ease}
                .contact-social-pill-mc:hover{border-color:#d1d5db;color:#e8e6f0;background:rgba(255,255,255,.04);transform:translateY(-3px);box-shadow:0 8px 20px rgba(0,0,0,.3)}
                .contact-form-card-mc{border:1px solid rgba(255,255,255,.06);border-radius:4px;padding:2rem;background:rgba(255,255,255,.015);transition:all .4s ease}
                .contact-form-card-mc:hover{border-color:rgba(255,255,255,.1);box-shadow:0 20px 40px rgba(0,0,0,.4)}
                .form-field-mc{display:flex;flex-direction:column;gap:.4rem;margin-bottom:1.2rem}
                .form-label-mc{font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:#6b6878}
                .form-input-mc,.form-textarea-mc{background:rgba(255,255,255,.02);border:1px solid rgba(255,255,255,.06);border-radius:2px;color:#e8e6f0;font-family:'Instrument Sans',sans-serif;font-size:.85rem;padding:.8rem 1rem;outline:none;transition:all .3s ease;width:100%;resize:vertical}
                .form-input-mc:focus,.form-textarea-mc:focus{border-color:#d1d5db;box-shadow:0 0 0 3px rgba(209,213,219,.05);background:rgba(255,255,255,.04)}
                .form-textarea-mc{min-height:120px}
                .form-status-mc{font-family:'JetBrains Mono',monospace;font-size:.65rem;padding:.7rem;border-radius:2px;margin-bottom:1rem}
                .form-status-mc.success{background:rgba(34,197,94,.08);border:1px solid rgba(34,197,94,.2);color:#22c55e}
                .form-status-mc.error{background:rgba(239,68,68,.08);border:1px solid rgba(239,68,68,.2);color:#ef4444}
                .contact-submit-btn-mc{width:100%;font-family:'JetBrains Mono',monospace;font-size:.65rem;letter-spacing:.12em;text-transform:uppercase;padding:.8rem;background:#d1d5db;color:#000;border:none;border-radius:2px;cursor:pointer;font-weight:600;transition:all .3s ease}
                .contact-submit-btn-mc:hover{transform:translateY(-2px);box-shadow:0 10px 25px rgba(209,213,219,.2)}
                @media(max-width:768px){.contact-layout{grid-template-columns:1fr;gap:2rem}.contact-title-mc{font-size:2rem}}
            </style>
        `;
    }
    
    initializeContactForm() {
        const input = document.getElementById('contact-name');
        if (input) {
            input.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') {
                    document.getElementById('contact-email')?.focus();
                }
            });
        }
    }
    
    handleSubmit() {
        const name = document.getElementById('contact-name')?.value.trim();
        const email = document.getElementById('contact-email')?.value.trim();
        const message = document.getElementById('contact-message')?.value.trim();
        const status = document.getElementById('contact-form-status-mc');
        
        if (!name || !email || !message) {
            if (status) {
                status.className = 'form-status-mc error';
                status.textContent = '⚠ Please fill in all fields';
                status.style.display = 'block';
            }
            window.soundEngine.playError();
            return;
        }
        
        window.location.href = `mailto:sakib.hsn44@gmail.com?subject=Portfolio Contact: ${encodeURIComponent(name)}&body=${encodeURIComponent(message)}%0A%0AFrom: ${encodeURIComponent(email)}`;
        
        if (status) {
            status.className = 'form-status-mc success';
            status.textContent = '✓ Opening email client...';
            status.style.display = 'block';
        }
        
        window.soundEngine.playClick();
        
        setTimeout(() => {
            if (status) status.style.display = 'none';
        }, 3000);
    }
}

window.contactApp = new ContactApp();