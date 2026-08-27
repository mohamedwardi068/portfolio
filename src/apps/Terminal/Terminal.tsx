import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, Sparkles, Download, ExternalLink, FileText } from 'lucide-react';
import { downloadPdfResume, downloadTxtResume, downloadProjectDocumentation } from '@/lib/downloadResume';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

const TerminalApp: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [showHireMe, setShowHireMe] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  const { theme, soundEnabled, addNotification, openWindow, setTheme } = useAppStore();
  const currentTheme = themes[theme];

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const playKeySound = useCallback(() => {
    if (soundEnabled) {
      try {
        const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440 + Math.random() * 80, audioCtx.currentTime);
        gain.gain.setValueAtTime(0.015, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.05);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start();
        osc.stop(audioCtx.currentTime + 0.05);
      } catch (e) {
        // audio context fallback
      }
    }
  }, [soundEnabled]);

  const getHelpText = () => (
    <div className="space-y-1.5 font-mono text-xs sm:text-sm">
      <p className="text-orange-400 font-bold">Available Workstation Commands:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1 pl-2">
        <p><strong className="text-green-400">whoami</strong>       - Display engineer profile</p>
        <p><strong className="text-green-400">stack / skills</strong> - Technology inventory</p>
        <p><strong className="text-green-400">projects</strong>     - Browse featured applications</p>
        <p><strong className="text-green-400">experience</strong>   - Career timeline & internships</p>
        <p><strong className="text-green-400">neofetch</strong>     - Mohamed OS system specifications</p>
        <p><strong className="text-green-400">contact</strong>      - Email, phone & socials</p>
        <p><strong className="text-green-400">cv / resume</strong>  - Download resume file</p>
        <p><strong className="text-green-400">docs</strong>         - Download graduation project documentation (PDF)</p>
        <p><strong className="text-green-400">theme &lt;name&gt;</strong>  - Switch theme (ubuntu, dark, hacker)</p>
        <p><strong className="text-green-400">ls</strong>           - List workspace directory</p>
        <p><strong className="text-green-400">clear</strong>        - Clear terminal screen</p>
      </div>
      <p className="pl-2 pt-1 text-yellow-300 font-semibold">sudo hire-me - Trigger high-priority hiring protocol</p>
    </div>
  );

  const getWhoamiText = () => (
    <div className="space-y-1.5 font-mono text-xs sm:text-sm">
      <p className="text-base font-bold text-orange-400">Mohamed El Ouardi</p>
      <p className="opacity-90">Full-Stack Software Engineer • Sousse, Tunisia</p>
      <p className="opacity-80">Graduate of ISITCom Hammam Sousse (Web Development Specialization)</p>
      <p className="opacity-70">Focus: High-Performance React/TypeScript frontends & Node.js/Express distributed backends.</p>
    </div>
  );

  const getNeofetchText = () => (
    <div className="flex flex-col sm:flex-row gap-4 font-mono text-xs sm:text-sm py-2">
      <div className="text-orange-500 font-bold select-none leading-none shrink-0 hidden sm:block">
        <pre className="text-xs">{`
   .---.
  /     \\
 | () () |   MOHAMED OS
  \\  _  /    -----------
   /   \\
  /     \\
 `}</pre>
      </div>
      <div className="space-y-1">
        <p><span className="text-orange-400 font-bold">OS:</span> Mohamed Dev Workstation (Ubuntu 24.04 LTS)</p>
        <p><span className="text-orange-400 font-bold">Kernel:</span> React 19.x / Vite 5.x / Linux 6.8.0-generic</p>
        <p><span className="text-orange-400 font-bold">Uptime:</span> 3+ Years in Production Web Development</p>
        <p><span className="text-orange-400 font-bold">Shell:</span> bash 5.2.21</p>
        <p><span className="text-orange-400 font-bold">Stack:</span> React, TypeScript, Node.js, Express, MongoDB, Tailwind</p>
        <p><span className="text-orange-400 font-bold">AI Engine:</span> Google Gemini 2.5 Flash, Whisper, MobileNet</p>
        <p><span className="text-orange-400 font-bold">Status:</span> Open to Full-Time & Remote Roles</p>
      </div>
    </div>
  );

  const getStackText = () => (
    <div className="space-y-1.5 font-mono text-xs sm:text-sm">
      <p className="text-orange-400 font-bold">⚡ Core Engineering Inventory:</p>
      <p><span className="text-green-400 font-bold">[Frontend]:</span> React 18/19, TypeScript, Tailwind CSS v4, Next.js, Angular</p>
      <p><span className="text-green-400 font-bold">[Backend]:</span> Node.js, Express.js, MongoDB (Mongoose), PostgreSQL, REST APIs, Java</p>
      <p><span className="text-green-400 font-bold">[DevOps]:</span> Linux, Docker, Git/GitHub, CI/CD, AWS, Vercel</p>
      <p><span className="text-green-400 font-bold">[AI]:</span> Gemini 2.5 API, Whisper Audio API, MobileNet Vision</p>
      <p className="text-xs opacity-60 mt-1">Type 'skills' to launch the visual System Monitor app.</p>
    </div>
  );

  const getProjectsSummary = () => (
    <div className="space-y-1 font-mono text-xs sm:text-sm">
      <p className="text-orange-400 font-bold">🚀 Featured Engineering & Graduation Projects:</p>
      <p>1. <span className="text-yellow-300 font-bold">[GRADUATION]</span> Web/Mobile Platform for Bus Brake Calipers (BUS SOFTWARE)</p>
      <p>2. <span className="text-yellow-300 font-bold">[NEW]</span> NovaSon — Audio E-Commerce (React 19, Tailwind v4)</p>
      <p>3. <span className="text-yellow-300 font-bold">[NEW]</span> EstateAI — Real Estate Discovery (Leaflet, TS)</p>
      <p>4. <span className="text-yellow-300 font-bold">[NEW]</span> GymBot — AI Fitness Coach (Gemini 2.5, MERN)</p>
      <p>5. <span className="text-yellow-300 font-bold">[NEW]</span> SaaS Analytics Dashboard — Pure CSS Grid & React</p>
      <p>6. <span className="text-yellow-300 font-bold">[NEW]</span> Project Management System — Full-Stack Kanban</p>
      <p>7. SWOO E-Commerce Platform (MERN)</p>
      <p>8. AutoRepair Manager (Workshop Management)</p>
      <p>9. ShowRoom Electronics Store</p>
      <p>10. <span className="text-yellow-300 font-bold">[NEW]</span> Portfolio OS — Workstation Experience (Linux Desktop Simulator)</p>
      <p className="opacity-70 text-xs mt-1 text-orange-300">Opening Projects Window...</p>
    </div>
  );

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim();
    const command = trimmed.toLowerCase();
    let output: React.ReactNode = '';

    if (command === 'clear') {
      setHistory([]);
      return;
    }

    if (command.startsWith('theme ')) {
      const themeArg = command.split(' ')[1] as 'ubuntu' | 'dark' | 'hacker';
      if (['ubuntu', 'dark', 'hacker'].includes(themeArg)) {
        setTheme(themeArg);
        output = <span className="text-green-400">Desktop theme changed to: {themeArg.toUpperCase()}</span>;
      } else {
        output = <span className="text-red-400">Usage: theme &lt;ubuntu | dark | hacker&gt;</span>;
      }
    } else {
      switch (command) {
        case 'help':
          output = getHelpText();
          break;
        case 'whoami':
          output = getWhoamiText();
          break;
        case 'neofetch':
        case 'fetch':
          output = getNeofetchText();
          break;
        case 'skills':
        case 'stack':
          output = getStackText();
          openWindow('skills');
          break;
        case 'projects':
          output = getProjectsSummary();
          openWindow('projects');
          break;
        case 'experience':
          output = (
            <div className="space-y-1 font-mono text-xs sm:text-sm">
              <p className="text-orange-400 font-bold">📜 Professional Timeline:</p>
              <p>• 2026: End of Study Internship — Web/Mobile Platform for Bus Calipers (React, Node, AI)</p>
              <p>• 2025: Web Dev Intern — Bus Parts Management System</p>
              <p>• 2024 - Present: Freelance Full-Stack Developer</p>
              <p>• 2023 - 2026: Bachelor's Degree in Computer Science (ISITCom)</p>
              <p className="opacity-70 text-xs text-orange-300">Opening Experience Window...</p>
            </div>
          );
          openWindow('experience');
          break;
        case 'about':
          output = getWhoamiText();
          openWindow('about');
          break;
        case 'contact':
          output = (
            <div className="space-y-1 font-mono text-xs sm:text-sm">
              <p className="text-orange-400 font-bold">📬 Direct Channels:</p>
              <p>📧 Email: Mohamed.ouardi@isitc.u-sousse.tn / mohamedwardi068@gmail.com</p>
              <p>💼 LinkedIn: linkedin.com/in/mohamed-wardi-69502b324</p>
              <p>🐙 GitHub: github.com/mohamedwardi068</p>
              <p>📞 Phone: +216 21238777</p>
            </div>
          );
          openWindow('contact');
          break;
        case 'ls':
          output = (
            <div className="flex flex-wrap gap-4 font-mono text-xs sm:text-sm">
              <span className="text-blue-400 font-bold">📁 Projects/</span>
              <span className="text-blue-400 font-bold">📁 Experience/</span>
              <span className="text-blue-400 font-bold">📁 Skills/</span>
              <span className="text-blue-400 font-bold">📁 Documents/</span>
              <span className="text-green-400">📄 Mohamed_El_Ouardi_CV.pdf</span>
              <span className="text-neutral-300">📄 README.md</span>
            </div>
          );
          break;
        case 'cv':
        case 'download-cv':
        case 'resume':
          downloadPdfResume();
          addNotification('📥 Downloaded Mohamed_El_Ouardi_CV.pdf locally!', 'success');
          output = (
            <div className="font-mono text-xs sm:text-sm space-y-2 py-1">
              <p className="text-green-400 font-bold">✅ Mohamed_El_Ouardi_CV.pdf downloaded to your local device!</p>
              <p className="opacity-80">Full-Stack Software Engineer • Mohamed El Ouardi</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={() => {
                    downloadPdfResume();
                    addNotification('📥 Downloading PDF Resume again...', 'info');
                  }}
                  className="text-xs px-2.5 py-1 rounded bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Again</span>
                </button>
                <button
                  onClick={() => {
                    downloadTxtResume();
                    addNotification('💾 Downloaded .txt resume!', 'success');
                  }}
                  className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Download .TXT</span>
                </button>
                <button
                  onClick={() => {
                    openWindow('files');
                    addNotification('Opening File Explorer & CV Document', 'info');
                  }}
                  className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>Open In-App Viewer</span>
                </button>
              </div>
            </div>
          );
          break;
        case 'docs':
        case 'documentation':
        case 'graduation-doc':
          downloadProjectDocumentation('documentation.pdf').then(() => {
            addNotification('📥 Downloaded documentation.pdf locally!', 'success');
          });
          output = (
            <div className="font-mono text-xs sm:text-sm space-y-2 py-1">
              <p className="text-green-400 font-bold">✅ documentation.pdf downloaded to your local device!</p>
              <p className="opacity-80">Graduation Project • Web / Smart Mobile Platform for Bus Brake Calipers (BUS SOFTWARE)</p>
              <div className="flex flex-wrap gap-2 pt-1">
                <button
                  onClick={async () => {
                    addNotification('📥 Downloading documentation.pdf again...', 'info');
                    await downloadProjectDocumentation('documentation.pdf');
                  }}
                  className="text-xs px-2.5 py-1 rounded bg-orange-500/20 hover:bg-orange-500/30 text-orange-300 border border-orange-500/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF Again</span>
                </button>
                <button
                  onClick={() => {
                    openWindow('projects');
                    addNotification('Opening Projects App', 'info');
                  }}
                  className="text-xs px-2.5 py-1 rounded bg-white/10 hover:bg-white/15 text-neutral-200 border border-white/10 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  <span>View Project Details</span>
                </button>
              </div>
            </div>
          );
          break;
        case 'sudo hire me':
        case 'sudo hire-me':
        case 'hire':
          setShowHireMe(true);
          setTheme('ubuntu');
          setTimeout(() => setShowHireMe(false), 3500);
          output = (
            <div className="font-mono text-xs sm:text-sm text-green-400 space-y-1">
              <p>🚀 HIRING PROTOCOL ACCEPTED!</p>
              <p>Initiating priority contact window. Welcome aboard!</p>
            </div>
          );
          openWindow('contact');
          addNotification('🚀 Hiring Protocol Initiated!', 'success');
          break;
        case '':
          return;
        default:
          output = (
            <span className="text-red-400 font-mono text-xs sm:text-sm">
              Command '{cmd}' not found. Type <span className="text-orange-400 underline cursor-pointer" onClick={() => handleCommand('help')}>help</span> to view available commands.
            </span>
          );
      }
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    if (trimmed) {
      setCommandHistory((prev) => [...prev, trimmed]);
    }
    setHistoryIndex(-1);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    playKeySound();

    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInput('');
      }
    }
  };

  return (
    <div
      ref={terminalRef}
      className="h-full p-4 sm:p-5 font-mono text-xs sm:text-sm overflow-y-auto cursor-text flex flex-col justify-between select-text"
      style={{ backgroundColor: currentTheme.terminalBg, color: currentTheme.terminalText }}
      onClick={() => inputRef.current?.focus()}
    >
      <div>
        {/* Terminal Header Banner */}
        <div className="mb-4 pb-3 border-b border-white/10 select-none">
          <p className="font-bold text-orange-400">Mohamed OS Bash Terminal (Workstation v2.0)</p>
          <p className="opacity-70 text-xs">
            Type <strong className="text-green-400 cursor-pointer" onClick={() => handleCommand('help')}>'help'</strong>, <strong className="text-green-400 cursor-pointer" onClick={() => handleCommand('neofetch')}>'neofetch'</strong>, or <strong className="text-green-400 cursor-pointer" onClick={() => handleCommand('projects')}>'projects'</strong>.
          </p>
        </div>

        {/* Command History */}
        {history.map((item, index) => (
          <div key={index} className="mb-3">
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-green-400 font-bold">mohamed@workstation</span>
              <span className="opacity-60">:</span>
              <span className="text-blue-400 font-bold">~</span>
              <span className="opacity-60">$</span>
              <span className="ml-1 text-white font-medium">{item.command}</span>
            </div>
            <div className="mt-1 pl-3 opacity-95">{item.output}</div>
          </div>
        ))}

        {/* Active Input Line */}
        <div className="flex items-center gap-1.5 flex-wrap pb-6">
          <span className="text-green-400 font-bold">mohamed@workstation</span>
          <span className="opacity-60">:</span>
          <span className="text-blue-400 font-bold">~</span>
          <span className="opacity-60">$</span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 min-w-[140px] ml-1 bg-transparent outline-none text-white font-mono"
            spellCheck={false}
            autoComplete="off"
            autoFocus
          />
        </div>
      </div>

      {/* Quick Suggestion Pills for Fast Interactive Clicking */}
      <div className="pt-3 border-t border-white/10 select-none">
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] opacity-50 uppercase tracking-wider mr-1">Quick Run:</span>
          {['whoami', 'neofetch', 'stack', 'projects', 'experience', 'cv', 'sudo hire-me'].map((cmd) => (
            <button
              key={cmd}
              onClick={() => handleCommand(cmd)}
              className="text-[11px] px-2 py-0.5 rounded bg-white/10 hover:bg-orange-500/30 text-orange-300 transition-colors font-mono"
            >
              $ {cmd}
            </button>
          ))}
        </div>
      </div>

      {/* Hire Me Animation Effect */}
      <AnimatePresence>
        {showHireMe && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none z-50 bg-black/60 backdrop-blur-sm"
          >
            <span className="text-8xl mb-4 animate-bounce">🚀</span>
            <h2 className="text-3xl font-bold text-white font-mono">HIRING PROTOCOL ACTIVATED!</h2>
            <p className="text-orange-400 font-mono mt-2">Connecting to Mohamed El Ouardi...</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TerminalApp;

