import { useState, useRef, useEffect, useCallback } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { saveAs } from 'file-saver';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandHistory {
  command: string;
  output: React.ReactNode;
}

const Terminal = () => {
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
      const audio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
      audio.volume = 0.1;
      audio.play().catch(() => { });
    }
  }, [soundEnabled]);

  const getHelpText = () => (
    <div className="space-y-1">
      <p>Available commands:</p>
      <p className="pl-4">about       - Learn about me</p>
      <p className="pl-4">skills      - View my technical skills</p>
      <p className="pl-4">projects    - Browse my projects</p>
      <p className="pl-4">contact     - Get my contact info</p>
      <p className="pl-4">download-cv - Download my resume</p>
      <p className="pl-4">ls          - List directory contents</p>
      <p className="pl-4">clear       - Clear terminal</p>
      <p className="pl-4">help        - Show this help message</p>
      <p className="pl-4 text-yellow-400">sudo hire me - ???</p>
    </div>
  );

  const getAboutText = () => (
    <div className="space-y-2">
      <p className="text-lg font-bold" style={{ color: currentTheme.accent }}>
        👨‍💻 Full-Stack Developer
      </p>
      <p>I'm a passionate developer who loves building beautiful, functional web applications.</p>
      <p>With expertise in React, TypeScript, Node.js, and cloud technologies,</p>
      <p>I create scalable solutions that make a difference.</p>
    </div>
  );

  const getSkillsText = () => (
    <div className="space-y-2">
      <p style={{ color: currentTheme.accent }}>Frontend:</p>
      <p className="pl-4">React, TypeScript, Next.js, Tailwind CSS, Framer Motion,css,JS,Angular</p>
      <p style={{ color: currentTheme.accent }}>Backend:</p>
      <p className="pl-4">Node.js, Python, PostgreSQL, MongoDB,Express,Spring Boot</p>
      <p style={{ color: currentTheme.accent }}>DevOps:</p>
      <p className="pl-4">Docker, AWS, CI/CD, Kubernetes, Terraform</p>
    </div>
  );

  const getProjectsText = () => (
    <div className="space-y-2">
      <p style={{ color: currentTheme.accent }}>📁 Projects:</p>
      <p className="pl-4">• E-Commerce Platform - Full-stack shopping experience</p>
      <p className="pl-4">• Task Management App - Real-time collaboration tool</p>
      <p className="pl-4">• AI Chat Interface - OpenAI-powered chatbot</p>
      <p className="pl-4">• Portfolio OS - This Ubuntu-style portfolio!</p>
      <p className="mt-2 text-sm opacity-70">Type 'projects' to open the Projects app for more details.</p>
    </div>
  );

  const getContactText = () => (
    <div className="space-y-1">
      <p style={{ color: currentTheme.accent }}>📬 Contact Information:</p>
      <p className="pl-4">📧 Email: Mohamed.ouardi@isitc.u-sousse.tn</p>
      <p className="pl-4">💼 LinkedIn: linkedin.com/in/mohamed-wardi-69502b324</p>
      <p className="pl-4">🐙 GitHub: github.com/mohamedwardi068</p>
    </div>
  );

  const getLsText = () => (
    <div className="flex flex-wrap gap-4">
      <span style={{ color: '#4CE44C' }}>Documents/</span>
      <span style={{ color: '#4CE44C' }}>Projects/</span>
      <span style={{ color: '#4CE44C' }}>Downloads/</span>
      <span>README.md</span>
      <span>resume.pdf</span>
      <span>.bashrc</span>
    </div>
  );

  const handleCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();
    let output: React.ReactNode = '';

    switch (command) {
      case 'help':
        output = getHelpText();
        break;
      case 'about':
        output = getAboutText();
        openWindow('about');
        break;
      case 'skills':
        output = getSkillsText();
        openWindow('skills');
        break;
      case 'projects':
        output = getProjectsText();
        openWindow('projects');
        break;
      case 'contact':
        output = getContactText();
        openWindow('contact');
        break;
      case 'ls':
        output = getLsText();
        break;
      case 'clear':
        setHistory([]);
        return;
      case 'download-cv':
        output = <span className="text-green-400">📥 Downloading resume.pdf...</span>;
        addNotification('Resume downloaded successfully!', 'success');
        // Create a simple text file as CV placeholder
        const cvContent = `
DEVELOPER RESUME
================

Full-Stack Developer
Email: developer@example.com
GitHub: github.com/developer

SKILLS
------
- Frontend: React, TypeScript, Next.js
- Backend: Node.js, Python, PostgreSQL
- DevOps: Docker, AWS, CI/CD

EXPERIENCE
----------
- Built scalable web applications
- Led development teams
- Implemented CI/CD pipelines
        `;
        const blob = new Blob([cvContent], { type: 'text/plain;charset=utf-8' });
        saveAs(blob, 'resume.txt');
        break;
      case 'sudo hire me':
      case 'sudo hire-me':
        setShowHireMe(true);
        setTheme('hacker');
        setTimeout(() => setShowHireMe(false), 3000);
        output = <span className="text-green-400">🎉 HACKER MODE ACTIVATED! Excellent choice!</span>;
        addNotification('🎉 Hacker Mode Activated!', 'success');
        break;
      case '':
        return;
      default:
        output = (
          <span>
            Command not found: {cmd}. Type <span style={{ color: currentTheme.accent }}>help</span> for available commands.
          </span>
        );
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    if (cmd.trim()) {
      setCommandHistory((prev) => [...prev, cmd]);
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
      className="h-full p-4 font-mono text-sm overflow-auto cursor-text"
      style={{ backgroundColor: currentTheme.terminalBg, color: currentTheme.terminalText }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Welcome Message */}
      <div className="mb-4">
        <p style={{ color: currentTheme.accent }}>Welcome to Ubuntu Portfolio Terminal</p>
        <p className="opacity-70">Type <strong style={{ color: currentTheme.accent }}> 'help' </strong> for available commands.</p>
      </div>

      {/* Command History */}
      {history.map((item, index) => (
        <div key={index} className="mb-2">
          <div className="flex items-center gap-2">
            <span style={{ color: currentTheme.terminalPrompt }}>Mohamed@portfolio</span>
            <span className="opacity-70">:</span>
            <span style={{ color: '#5C94CE' }}>~</span>
            <span className="opacity-70">$</span>
            <span className="ml-2">{item.command}</span>
          </div>
          <div className="mt-1 pl-4">{item.output}</div>
        </div>
      ))}

      {/* Input Line */}
      <div className="flex items-center gap-2">
        <span style={{ color: currentTheme.terminalPrompt }}>Mohamed@portfolio</span>
        <span className="opacity-70">:</span>
        <span style={{ color: '#5C94CE' }}>~</span>
        <span className="opacity-70">$</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 ml-2 bg-transparent outline-none"
          style={{ color: currentTheme.terminalText }}
          spellCheck={false}
          autoComplete="off"
        />
      </div>

      {/* Hire Me Animation */}
      <AnimatePresence>
        {showHireMe && (
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            className="fixed inset-0 flex items-center justify-center pointer-events-none z-50"
          >
            <div className="text-6xl">🚀</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Terminal;
