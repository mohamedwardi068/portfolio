import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore, AppId } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import {
  Search,
  Code,
  Briefcase,
  Layers,
  User,
  Terminal as TerminalIcon,
  Mail,
  Folder,
  Settings as SettingsIcon,
  Globe,
  Sparkles,
  ExternalLink,
  Command,
  ArrowRight,
  X
} from 'lucide-react';

interface SearchResultItem {
  id: string;
  title: string;
  subtitle: string;
  category: 'Application' | 'Project' | 'Skill / Tech';
  icon: React.ElementType;
  action: () => void;
  badge?: string;
}

const AppLauncherModal: React.FC = () => {
  const {
    isLauncherOpen,
    closeLauncher,
    openWindow,
    openProjectInspector,
    theme,
  } = useAppStore();
  const currentTheme = themes[theme];

  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus input whenever launcher opens
  useEffect(() => {
    if (isLauncherOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isLauncherOpen]);

  // Master catalog of all searchable items
  const allItems: SearchResultItem[] = useMemo(
    () => [
      // Applications
      {
        id: 'app-projects',
        title: 'Projects Showcase',
        subtitle: 'Explore full-stack, AI, and frontend applications',
        category: 'Application',
        icon: Code,
        badge: 'Featured',
        action: () => openWindow('projects'),
      },
      {
        id: 'app-experience',
        title: 'Experience & Career Log',
        subtitle: 'System timeline, internships, freelance history & education',
        category: 'Application',
        icon: Briefcase,
        badge: 'Timeline',
        action: () => openWindow('experience'),
      },
      {
        id: 'app-skills',
        title: 'Skills & System Monitor',
        subtitle: 'Technology inventory & hardware-style proficiency monitor',
        category: 'Application',
        icon: Layers,
        badge: 'Tech Stack',
        action: () => openWindow('skills'),
      },
      {
        id: 'app-about',
        title: 'About Mohamed',
        subtitle: 'Full-Stack developer profile, bio & contact links',
        category: 'Application',
        icon: User,
        action: () => openWindow('about'),
      },
      {
        id: 'app-terminal',
        title: 'Linux Terminal',
        subtitle: 'Interactive Bash shell (whoami, neofetch, skills, projects)',
        category: 'Application',
        icon: TerminalIcon,
        action: () => openWindow('terminal'),
      },
      {
        id: 'app-contact',
        title: 'Mail & Contact',
        subtitle: 'Send direct messages, email & social channels',
        category: 'Application',
        icon: Mail,
        action: () => openWindow('contact'),
      },
      {
        id: 'app-files',
        title: 'Files & Resume Viewer',
        subtitle: 'Browse documents, projects READMEs & download CV',
        category: 'Application',
        icon: Folder,
        action: () => openWindow('files'),
      },
      {
        id: 'app-browser',
        title: 'Web Browser',
        subtitle: 'Preview live project websites and external repositories',
        category: 'Application',
        icon: Globe,
        action: () => openWindow('browser'),
      },
      {
        id: 'app-settings',
        title: 'System Settings',
        subtitle: 'Desktop appearance, wallpapers, and sound preferences',
        category: 'Application',
        icon: SettingsIcon,
        action: () => openWindow('settings'),
      },

      // Featured Projects
      {
        id: 'proj-0',
        title: 'Bus Brake Calipers Management Platform',
        subtitle: 'Graduation Project (BUS SOFTWARE) • MERN, React Native, Vision AI & Voice AI',
        category: 'Project',
        icon: Code,
        badge: '🎓 Graduation',
        action: () => {
          openWindow('projects');
          openProjectInspector(0);
        },
      },
      {
        id: 'proj-1',
        title: 'NovaSon — Audio & Tech E-Commerce',
        subtitle: 'React 19, Tailwind v4, ANC audio showcase & glass UI',
        category: 'Project',
        icon: Code,
        badge: '✨ New',
        action: () => {
          openWindow('projects');
          openProjectInspector(1);
        },
      },
      {
        id: 'proj-2',
        title: 'EstateAI — Real Estate Platform',
        subtitle: 'Interactive Leaflet maps, property filtering, Framer Motion',
        category: 'Project',
        icon: Code,
        badge: '✨ New',
        action: () => {
          openWindow('projects');
          openProjectInspector(2);
        },
      },
      {
        id: 'proj-3',
        title: 'GymBot — AI Fitness Coach',
        subtitle: 'Google Gemini 2.5 API, MERN stack, workout/diet generator',
        category: 'Project',
        icon: Code,
        badge: '✨ New',
        action: () => {
          openWindow('projects');
          openProjectInspector(3);
        },
      },
      {
        id: 'proj-4',
        title: 'SaaS Analytics Dashboard',
        subtitle: 'Pure CSS Grid & Flexbox, React, TypeScript, MRR metrics',
        category: 'Project',
        icon: Code,
        badge: '✨ New',
        action: () => {
          openWindow('projects');
          openProjectInspector(4);
        },
      },
      {
        id: 'proj-5',
        title: 'Kanban Project Management System',
        subtitle: 'Jira/Trello-inspired agile workflow, MERN, Context API',
        category: 'Project',
        icon: Code,
        badge: '✨ New',
        action: () => {
          openWindow('projects');
          openProjectInspector(5);
        },
      },
      {
        id: 'proj-6',
        title: 'SWOO E-Commerce Platform',
        subtitle: 'Full-stack MERN shopping solution with cart & admin',
        category: 'Project',
        icon: Code,
        action: () => {
          openWindow('projects');
          openProjectInspector(6);
        },
      },

      // Technologies / Skills
      {
        id: 'tech-react',
        title: 'React & React Native',
        subtitle: 'Core frontend framework used across NovaSon, EstateAI, Mobile Apps',
        category: 'Skill / Tech',
        icon: Layers,
        action: () => openWindow('skills'),
      },
      {
        id: 'tech-typescript',
        title: 'TypeScript & JavaScript (ES6+)',
        subtitle: 'Strict type safety, modern async workflows, enterprise apps',
        category: 'Skill / Tech',
        icon: Layers,
        action: () => openWindow('skills'),
      },
      {
        id: 'tech-nodejs',
        title: 'Node.js & Express.js REST APIs',
        subtitle: 'Scalable backend microservices, JWT auth, MongoDB models',
        category: 'Skill / Tech',
        icon: Layers,
        action: () => openWindow('skills'),
      },
      {
        id: 'tech-docker',
        title: 'Docker & Linux Workstation',
        subtitle: 'Containerization, Linux environment, CI/CD deployment pipelines',
        category: 'Skill / Tech',
        icon: Layers,
        action: () => openWindow('skills'),
      },
      {
        id: 'tech-ai',
        title: 'AI Integration (Gemini 2.5, Whisper, Llama)',
        subtitle: 'Generative AI workflows, voice input, image recognition',
        category: 'Skill / Tech',
        icon: Sparkles,
        action: () => openWindow('skills'),
      },
    ],
    [openWindow, openProjectInspector]
  );

  // Filtered results
  const filteredResults = useMemo(() => {
    if (!query.trim()) {
      return allItems.slice(0, 7); // Default top recommendations
    }
    const q = query.toLowerCase();
    return allItems.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q)
    );
  }, [allItems, query]);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < filteredResults.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : filteredResults.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const selected = filteredResults[selectedIndex];
      if (selected) {
        selected.action();
        closeLauncher();
      }
    } else if (e.key === 'Escape') {
      closeLauncher();
    }
  };

  if (!isLauncherOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[120] flex items-start justify-center pt-16 md:pt-24 px-4 bg-black/60 backdrop-blur-md">
        {/* Backdrop click to dismiss */}
        <div className="absolute inset-0" onClick={closeLauncher} />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: -20 }}
          transition={{ duration: 0.18, ease: 'easeOut' }}
          className="relative w-full max-w-2xl rounded-2xl shadow-2xl overflow-hidden border flex flex-col z-10"
          style={{
            backgroundColor: currentTheme.windowBg,
            borderColor: currentTheme.windowBorderFocused,
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Search Header */}
          <div
            className="flex items-center px-4 py-3.5 border-b"
            style={{
              borderColor: currentTheme.cardBorder,
              backgroundColor: currentTheme.windowHeader,
            }}
          >
            <Search className="w-5 h-5 opacity-60 mr-3 shrink-0" style={{ color: currentTheme.accent }} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(0);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search apps, projects, technologies, or commands..."
              className="flex-1 bg-transparent text-base sm:text-lg outline-none placeholder:text-neutral-500"
              style={{ color: currentTheme.textPrimary }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                className="p-1 rounded-md hover:bg-white/10 opacity-60 hover:opacity-100"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <div className="ml-3 hidden sm:flex items-center gap-1 text-[11px] px-2 py-0.5 rounded bg-white/5 border border-white/10 text-neutral-400">
              <Command className="w-3 h-3" />
              <span>ESC to exit</span>
            </div>
          </div>

          {/* Results List */}
          <div className="max-h-[380px] overflow-y-auto p-2 divide-y divide-white/5">
            {filteredResults.length === 0 ? (
              <div className="py-12 text-center text-neutral-400">
                <Search className="w-8 h-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm font-medium">No results found for "{query}"</p>
                <p className="text-xs opacity-60 mt-1">Try searching for "Projects", "Experience", or "React"</p>
              </div>
            ) : (
              filteredResults.map((item, index) => {
                const isSelected = index === selectedIndex;
                const IconComponent = item.icon;

                return (
                  <div
                    key={item.id}
                    onMouseEnter={() => setSelectedIndex(index)}
                    onClick={() => {
                      item.action();
                      closeLauncher();
                    }}
                    className={`flex items-center justify-between px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
                      isSelected ? 'scale-[1.01]' : 'opacity-85 hover:opacity-100'
                    }`}
                    style={{
                      backgroundColor: isSelected ? `${currentTheme.accent}25` : 'transparent',
                      border: isSelected ? `1px solid ${currentTheme.accent}50` : '1px solid transparent',
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <div
                        className="p-2.5 rounded-lg flex items-center justify-center shrink-0"
                        style={{
                          backgroundColor: isSelected ? currentTheme.accent : `${currentTheme.accent}18`,
                          color: isSelected ? '#ffffff' : currentTheme.accent,
                        }}
                      >
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div className="min-w-0 flex-1 pr-2">
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-semibold truncate" style={{ color: currentTheme.textPrimary }}>
                            {item.title}
                          </h4>
                          {item.badge && (
                            <span
                              className="text-[10px] font-bold px-1.5 py-0.2 rounded uppercase shrink-0"
                              style={{
                                backgroundColor: `${currentTheme.accent}30`,
                                color: currentTheme.accent,
                              }}
                            >
                              {item.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs opacity-70 truncate mt-0.5" style={{ color: currentTheme.textSecondary }}>
                          {item.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0 ml-2">
                      <span className="text-[10px] font-medium opacity-50 px-2 py-0.5 rounded bg-white/5 hidden sm:inline">
                        {item.category}
                      </span>
                      <ArrowRight
                        className={`w-4 h-4 transition-transform ${isSelected ? 'translate-x-1 opacity-100' : 'opacity-0'}`}
                        style={{ color: currentTheme.accent }}
                      />
                    </div>
                  </div>
                );
              })
            )}
          </div>

          {/* Quick Footer Navigation */}
          <div
            className="flex items-center justify-between px-4 py-2 text-xs border-t bg-black/20"
            style={{ borderColor: currentTheme.cardBorder, color: currentTheme.textSecondary }}
          >
            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">↑</kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">↓</kbd> Navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white/10 text-[10px]">↵</kbd> Open
              </span>
            </div>
            <div className="hidden sm:block text-[11px] opacity-70">
              Mohamed El Ouardi Workstation Spotlight
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AppLauncherModal;
