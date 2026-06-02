// ============================================
// SMART COMMAND SYSTEM - REAL INPUT
// ============================================

class CommandSystem {
    constructor() {
        this.inputField = null;
        this.suggestions = [];
        this.selectedSuggestionIndex = -1;
        this.isFocused = false;

        this.commands = {
            'about': {
                app: 'about',
                aliases: ['me', 'who', 'profile', 'identity', 'bio', 'whoami'],
                description: 'Open About Me',
                icon: 'user-circle'
            },
            'resume': {
                app: 'resume',
                aliases: ['cv', 'curriculum', 'vitae', 'experience', 'education', 'skills'],
                description: 'View Resume',
                icon: 'file-text'
            },
            'github': {
                app: 'github',
                aliases: ['git', 'code', 'repo', 'repos', 'repository', 'projects', 'source'],
                description: 'Open GitHub Dashboard',
                icon: 'github'
            },
            'linkedin': {
                app: 'linkedin',
                aliases: ['linked', 'in', 'professional', 'career', 'network', 'job'],
                description: 'Open LinkedIn Profile',
                icon: 'linkedin'
            },
            'youtube': {
                app: 'youtube',
                aliases: ['yt', 'video', 'videos', 'channel', 'tube', 'content', 'watch'],
                description: 'Open YouTube Channel',
                icon: 'youtube'
            },
            'contact': {
                app: 'contact',
                aliases: ['mail', 'email', 'message', 'msg', 'reach', 'connect', 'hello', 'hi', 'hey'],
                description: 'Open Contact Terminal',
                icon: 'mail'
            },
            'game': {
                app: 'game',
                aliases: ['games', 'play', 'gaming', 'galaxy', 'shooter', 'fun'],
                description: 'Open Game Hub',
                icon: 'gamepad-2'
            },
            'vault': {
                app: 'vault',
                aliases: ['projects', 'tools', 'experiments', 'lab', 'works', 'collection', 'showcase'],
                description: "Open Sakib's Vault",
                icon: 'vault'
            },
            'help': {
                action: 'help',
                aliases: ['?', 'commands', 'list', 'what'],
                description: 'Show all commands',
                icon: 'help-circle'
            },
            'clear': {
                action: 'clear',
                aliases: ['cls', 'reset'],
                description: 'Clear input',
                icon: 'x-circle'
            },
            'restart': {
                action: 'restart',
                aliases: ['reboot', 'reload', 'refresh'],
                description: 'Restart system',
                icon: 'rotate-cw'
            },
            'shutdown': {
                action: 'shutdown',
                aliases: ['exit', 'quit', 'poweroff', 'off', 'close'],
                description: 'Shutdown system',
                icon: 'power'
            },
            'info': {
                action: 'info',
                aliases: ['system', 'version', 'status', 'sys'],
                description: 'System information',
                icon: 'info'
            }
        };

        this.commandLookup = {};
        Object.entries(this.commands).forEach(([name, cmd]) => {
            this.commandLookup[name.toLowerCase()] = cmd;
            cmd.aliases.forEach(alias => {
                this.commandLookup[alias.toLowerCase()] = cmd;
            });
        });

        this.initWhenReady();
    }

    initWhenReady() {
        const checkInterval = setInterval(() => {
            const input = document.getElementById('command-input-real');
            if (input) {
                clearInterval(checkInterval);
                this.inputField = input;
                this.setupInputListeners();
                this.setupGlobalShortcuts();
            }
        }, 100);
    }

    setupInputListeners() {
        if (!this.inputField) return;

        this.inputField.addEventListener('input', () => {
            this.updateSuggestions();
        });

        this.inputField.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'Enter':
                    e.preventDefault();
                    this.executeSelectedOrInput();
                    break;
                case 'Escape':
                    e.preventDefault();
                    this.clearAndBlur();
                    break;
                case 'ArrowDown':
                    e.preventDefault();
                    this.navigateSuggestions(1);
                    break;
                case 'ArrowUp':
                    e.preventDefault();
                    this.navigateSuggestions(-1);
                    break;
                case 'Tab':
                    e.preventDefault();
                    this.autoComplete();
                    break;
            }
        });

        this.inputField.addEventListener('focus', () => {
            this.isFocused = true;
            this.inputField.parentElement.classList.add('focused');
            if (this.inputField.value.length === 0) {
                this.showPopularCommands();
            } else {
                this.updateSuggestions();
            }
        });

        this.inputField.addEventListener('blur', () => {
            setTimeout(() => {
                this.isFocused = false;
                this.inputField.parentElement.classList.remove('focused');
                this.clearSuggestions();
            }, 200);
        });

        this.inputField.parentElement.addEventListener('click', (e) => {
            if (e.target !== this.inputField) {
                this.inputField.focus();
            }
        });

        document.addEventListener('click', (e) => {
            if (this.isFocused &&
                !this.inputField.parentElement.contains(e.target) &&
                !document.getElementById('command-suggestions')?.contains(e.target)) {
                this.clearSuggestions();
            }
        });
    }

    setupGlobalShortcuts() {
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === ' ')) {
                e.preventDefault();
                if (this.inputField) {
                    this.inputField.focus();
                    this.inputField.select();
                }
            }

            if (e.key.length === 1 &&
                !e.ctrlKey && !e.altKey && !e.metaKey &&
                document.activeElement === document.body) {
                if (this.inputField && !this.isFocused) {
                    this.inputField.focus();
                    this.inputField.value = e.key;
                    this.inputField.dispatchEvent(new Event('input'));
                    e.preventDefault();
                }
            }
        });
    }

    updateSuggestions() {
        const input = this.inputField?.value?.trim().toLowerCase() || '';

        this.clearSuggestions();
        this.selectedSuggestionIndex = -1;

        if (input.length === 0) {
            this.showPopularCommands();
            return;
        }

        const matches = [];

        Object.entries(this.commands).forEach(([name, cmd]) => {
            let matchScore = 0;

            if (name === input) matchScore = 100;
            else if (cmd.aliases.includes(input)) matchScore = 95;
            else if (name.startsWith(input)) matchScore = 80;
            else if (cmd.aliases.some(a => a.startsWith(input))) matchScore = 75;
            else if (name.includes(input)) matchScore = 60;
            else if (cmd.aliases.some(a => a.includes(input))) matchScore = 55;
            else if (cmd.description.toLowerCase().includes(input)) matchScore = 40;

            if (matchScore > 0) {
                matches.push({ name, ...cmd, matchScore });
            }
        });

        this.suggestions = matches.sort((a, b) => b.matchScore - a.matchScore).slice(0, 6);

        if (this.suggestions.length > 0) {
            this.renderSuggestions();
        } else {
            this.showNoResults(input);
        }
    }

    showPopularCommands() {
        this.suggestions = [
            { name: 'about', ...this.commands.about },
            { name: 'resume', ...this.commands.resume },
            { name: 'github', ...this.commands.github },
            { name: 'contact', ...this.commands.contact },
            { name: 'game', ...this.commands.game },
            { name: 'vault', ...this.commands.vault }
        ];
        this.renderSuggestions();
    }

    renderSuggestions() {
        this.clearSuggestions();
        if (this.suggestions.length === 0) return;

        const panel = document.createElement('div');
        panel.className = 'command-suggestions';
        panel.id = 'command-suggestions';

        this.suggestions.forEach((suggestion, index) => {
            const item = document.createElement('div');
            item.className = `suggestion-item ${index === this.selectedSuggestionIndex ? 'selected' : ''}`;
            item.innerHTML = `
                <span class="suggestion-icon">
                    <i data-lucide="${suggestion.icon || 'folder'}" width="14" height="14"></i>
                </span>
                <span class="suggestion-name">${suggestion.name}</span>
                <span class="suggestion-desc">${suggestion.description}</span>
                ${suggestion.aliases ? `<span class="suggestion-aliases">${suggestion.aliases.slice(0, 3).join(', ')}</span>` : ''}
            `;

            item.addEventListener('mousedown', (e) => {
                e.preventDefault();
                this.executeCommand(suggestion.name);
            });

            item.addEventListener('mouseenter', () => {
                this.selectedSuggestionIndex = index;
                this.highlightSuggestion();
            });

            panel.appendChild(item);
        });

        const wrapper = this.inputField?.parentElement;
        if (wrapper) {
            const rect = wrapper.getBoundingClientRect();
            panel.style.cssText = `
                position: fixed;
                left: ${rect.left}px;
                bottom: ${window.innerHeight - rect.top + 8}px;
                width: ${rect.width}px;
                z-index: 9999;
            `;
        }

        document.body.appendChild(panel);
        if (window.lucide) window.lucide.createIcons();
    }

    showNoResults(input) {
        const panel = document.createElement('div');
        panel.className = 'command-suggestions no-results';
        panel.id = 'command-suggestions';
        panel.innerHTML = `
            <div class="no-results-content">
                <i data-lucide="search-x" width="16" height="16"></i>
                <span>No commands found for "${input}"</span>
            </div>
            <div class="closest-suggestions">
                <span class="closest-label">Try:</span>
                <span class="closest-cmd" data-cmd="about">about</span>
                <span class="closest-cmd" data-cmd="resume">resume</span>
                <span class="closest-cmd" data-cmd="github">github</span>
                <span class="closest-cmd" data-cmd="contact">contact</span>
            </div>
        `;

        const wrapper = this.inputField?.parentElement;
        if (wrapper) {
            const rect = wrapper.getBoundingClientRect();
            panel.style.cssText = `
                position: fixed;
                left: ${rect.left}px;
                bottom: ${window.innerHeight - rect.top + 8}px;
                width: ${rect.width}px;
                z-index: 9999;
            `;
        }

        document.body.appendChild(panel);

        panel.querySelectorAll('.closest-cmd').forEach(chip => {
            chip.addEventListener('mousedown', (e) => {
                e.preventDefault();
                const cmd = chip.dataset.cmd;
                this.executeCommand(cmd);
            });
        });

        if (window.lucide) window.lucide.createIcons();
    }

    clearSuggestions() {
        const existing = document.getElementById('command-suggestions');
        if (existing) existing.remove();
        this.suggestions = [];
    }

    navigateSuggestions(direction) {
        if (this.suggestions.length === 0) return;

        this.selectedSuggestionIndex += direction;
        if (this.selectedSuggestionIndex >= this.suggestions.length) this.selectedSuggestionIndex = 0;
        if (this.selectedSuggestionIndex < 0) this.selectedSuggestionIndex = this.suggestions.length - 1;

        const selected = this.suggestions[this.selectedSuggestionIndex];
        if (selected && this.inputField) {
            this.inputField.value = selected.name;
        }

        this.highlightSuggestion();
    }

    highlightSuggestion() {
        const items = document.querySelectorAll('.suggestion-item');
        items.forEach((item, index) => {
            item.classList.toggle('selected', index === this.selectedSuggestionIndex);
        });
    }

    autoComplete() {
        if (this.suggestions.length > 0 && this.selectedSuggestionIndex >= 0) {
            const selected = this.suggestions[this.selectedSuggestionIndex];
            if (this.inputField) {
                this.inputField.value = selected.name;
                this.inputField.dispatchEvent(new Event('input'));
            }
        } else if (this.suggestions.length === 1) {
            if (this.inputField) {
                this.inputField.value = this.suggestions[0].name;
                this.inputField.dispatchEvent(new Event('input'));
            }
        }
    }

    executeSelectedOrInput() {
        if (this.selectedSuggestionIndex >= 0 && this.suggestions.length > 0) {
            const selected = this.suggestions[this.selectedSuggestionIndex];
            this.executeCommand(selected.name);
        } else {
            const input = this.inputField?.value?.trim().toLowerCase() || '';
            if (!input) { this.clearAndBlur(); return; }

            const cmd = this.commandLookup[input];
            if (cmd) {
                if (cmd.app) this.openApp(cmd.app);
                else if (cmd.action) this.executeAction(cmd.action);
            } else {
                this.showInputError();
            }
        }

        this.clearAndBlur();
    }

    executeCommand(commandName) {
        const cmd = this.commands[commandName];
        if (!cmd) return;

        if (cmd.app) this.openApp(cmd.app);
        else if (cmd.action) this.executeAction(cmd.action);

        window.soundEngine?.playWindowOpen();
    }

    openApp(appName) {
        if (window.windowManager?.windowInstances) {
            let foundWindowId = null;
            window.windowManager.windowInstances.forEach((instance, id) => {
                if (instance.app === appName) foundWindowId = id;
            });

            if (foundWindowId) {
                const instance = window.windowManager.windowInstances.get(foundWindowId);
                if (instance) {
                    if (window.systemState.state.minimizedWindows.has(foundWindowId)) {
                        window.windowManager.restoreWindow(foundWindowId);
                    } else {
                        window.windowManager.focusWindow(foundWindowId);
                    }
                    return;
                }
            }
        }

        const appLaunchers = {
            'about': () => window.aboutApp?.open(),
            'resume': () => window.resumeApp?.open(),
            'github': () => window.githubApp?.open(),
            'linkedin': () => window.linkedinApp?.open(),
            'youtube': () => window.youtubeApp?.open(),
            'contact': () => window.contactApp?.open(),
            'game': () => window.gameApp?.open(),
            'vault': () => window.vaultApp?.open()
        };

        const launcher = appLaunchers[appName];
        if (launcher) launcher();
    }

    executeAction(action) {
        switch (action) {
            case 'help': this.showHelp(); break;
            case 'clear': this.clearAndBlur(); break;
            case 'restart': if (window.sakibOS) window.sakibOS.restartSystem(); break;
            case 'shutdown': if (window.sakibOS) window.sakibOS.shutdownSystem(); break;
            case 'info': this.showSystemInfo(); break;
        }
    }

    showInputError() {
        const wrapper = this.inputField?.parentElement;
        if (wrapper) {
            wrapper.classList.add('shake');
            setTimeout(() => wrapper.classList.remove('shake'), 500);
        }

        window.soundEngine?.playError();

        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = '⚠ Command not found. Try: about, resume, github, contact, help';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    }

    clearAndBlur() {
        if (this.inputField) {
            this.inputField.value = '';
            this.inputField.blur();
        }
        this.clearSuggestions();
    }

    showHelp() {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = '📋 Commands: about, resume, github, linkedin, youtube, contact, game, vault, help, restart, shutdown';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 4000);
        }
    }

    showSystemInfo() {
        const toast = document.getElementById('toast');
        if (toast) {
            toast.textContent = '💻 SakibOS v2.0.26 | All Systems Operational';
            toast.classList.add('show');
            setTimeout(() => toast.classList.remove('show'), 3000);
        }
    }
}

window.commandSystem = new CommandSystem();