import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { useBrowserStore } from '@/stores/useBrowserStore';
import { themes } from '@/styles/themes';
import {
  X,
  Github,
  ExternalLink,
  Linkedin,
  Star,
  Sparkles,
  Layers,
  CheckCircle2,
  Cpu,
  Boxes,
  Compass,
  Code2,
  FileText,
  Download,
  Building2,
  GraduationCap,
  ShieldCheck,
  Smartphone,
  Play,
  Pause,
  Video,
  Image as ImageIcon,
  Mic,
  Activity,
  Maximize2,
  Volume2
} from 'lucide-react';
import { downloadProjectDocumentation } from '@/lib/downloadResume';

export interface ProjectDetail {
  id: number;
  title: string;
  subtitle?: string;
  category: 'Full-Stack' | 'Frontend' | 'AI & SaaS' | 'Mobile & Full-Stack';
  description: string;
  problemSolved?: string;
  features: string[];
  tech: string[];
  techBreakdown?: {
    frontend?: string[];
    backend?: string[];
    mobile?: string[];
    database?: string[];
    ai?: string[];
    styling?: string[];
  };
  architectureNotes?: string;
  stars: number;
  image: React.ElementType;
  githubUrl?: string;
  demoUrl?: string;
  linkedinUrl?: string;
  documentationUrl?: string;
  documentationFileName?: string;
  videoUrl?: string;
  videoTitle?: string;
  imageUrl?: string;
  imageTitle?: string;
  association?: string;
  isGraduationProject?: boolean;
  isNew?: boolean;
  mockupType?: 'bus-caliper' | 'ecommerce' | 'realestate' | 'ai-bot' | 'dashboard' | 'kanban' | 'generic';
}

interface ProjectDetailsModalProps {
  project: ProjectDetail | null;
  onClose: () => void;
}

const ProjectDetailsModal: React.FC<ProjectDetailsModalProps> = ({ project, onClose }) => {
  const { theme, openWindow, addNotification } = useAppStore();
  const { addTab } = useBrowserStore();
  const currentTheme = themes[theme];

  const [activeTab, setActiveTab] = useState<'media' | 'preview'>('media');

  useEffect(() => {
    setActiveTab('media');
  }, [project?.id, project?.videoUrl, project?.imageUrl]);

  if (!project) return null;

  const handleOpenBrowser = (url: string) => {
    openWindow('browser');
    addTab(url);
  };

  const handleDownloadDoc = async () => {
    const fileName = project.documentationFileName || 'documentation.pdf';
    addNotification(`📥 Downloading ${fileName} to your computer...`, 'info');
    const ok = await downloadProjectDocumentation(fileName);
    if (ok) {
      addNotification(`✅ Documentation downloaded successfully! (${fileName})`, 'success');
    }
  };

  const IconComponent = project.image;

  // Render rich tailored visual showcase mockup
  const renderVisualMockup = () => {
    const type = project.mockupType || (project.id === 0 ? 'bus-caliper' : project.id === 1 ? 'ecommerce' : project.id === 2 ? 'realestate' : project.id === 3 ? 'ai-bot' : project.id === 4 ? 'dashboard' : 'generic');

    if (type === 'bus-caliper') {
      return (
        <div className="w-full bg-[#141414] rounded-xl border border-white/10 p-3 sm:p-4 text-xs font-sans space-y-3">
          {/* Mockup Toolbar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] opacity-80">
            <span className="flex items-center gap-1.5 text-orange-400 font-bold">
              <ShieldCheck className="w-3.5 h-3.5" />
              BUS SOFTWARE — Caliper Maintenance Workstation v2.4
            </span>
            <span className="px-2 py-0.5 rounded bg-green-500/20 text-green-300 font-mono text-[10px]">
              ● Real-Time Connected
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {/* Left: Web Admin Reception Panel */}
            <div className="bg-[#1C1B1B] p-3 rounded-lg border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-300">
                <span>🖥️ Web Reception & Intake Queue</span>
                <span className="text-orange-400 font-mono">3 Active Repairs</span>
              </div>
              <div className="space-y-1.5 font-mono text-[10px]">
                <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold">CALIPER-8849 [Knorr SB7000]</p>
                    <p className="text-neutral-400 text-[9px]">Bus #104 (Transit fleet)</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-yellow-500/20 text-yellow-300 font-semibold text-[9px]">
                    In Triage
                  </span>
                </div>
                <div className="p-2 rounded bg-black/40 border border-white/5 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold">CALIPER-8850 [Meritor Elsa 225]</p>
                    <p className="text-neutral-400 text-[9px]">Bus #82 (Express Line)</p>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 font-semibold text-[9px]">
                    Replacing Seals
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Mobile Technician Screen with Vision & Voice */}
            <div className="bg-[#1C1B1B] p-3 rounded-lg border border-white/10 space-y-2">
              <div className="flex items-center justify-between text-[11px] font-bold text-neutral-300">
                <span>📱 React Native Mobile Companion</span>
                <span className="text-blue-400 font-mono text-[10px]">AI Vision Active</span>
              </div>

              {/* Camera Scanner View */}
              <div className="relative h-24 rounded bg-neutral-900 border border-blue-500/40 flex flex-col items-center justify-center p-2 overflow-hidden">
                <div className="absolute inset-2 border-2 border-dashed border-blue-400/50 rounded pointer-events-none animate-pulse" />
                <span className="text-[10px] font-mono text-blue-300 bg-black/70 px-2 py-0.5 rounded mb-1 z-10">
                  🎯 MobileNet: Knorr SB7000 (99.4% Match)
                </span>
                <span className="text-[9px] font-mono text-orange-300 z-10">
                  Wear Severity: 42% (Inspection Required)
                </span>
              </div>

              {/* Voice Speech to query indicator */}
              <div className="flex items-center gap-2 p-1.5 rounded bg-black/50 border border-white/5 text-[10px]">
                <Mic className="w-3.5 h-3.5 text-red-400 animate-pulse" />
                <span className="text-neutral-300 font-mono truncate">
                  [Whisper AI]: "Query spare caliper seals stock"
                </span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'ecommerce') {
      return (
        <div className="w-full bg-[#141414] rounded-xl border border-white/10 p-3 sm:p-4 text-xs font-sans space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px]">
            <span className="font-bold text-orange-400">🎧 NovaSon Audio E-Commerce • React 19 & Tailwind v4</span>
            <span className="text-green-400 font-mono text-[10px]">Cart Total: $299.00 (1 Item)</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#1C1B1B] p-3 rounded-lg border border-white/10 flex items-center gap-3">
              <div className="w-16 h-16 rounded-lg bg-orange-500/20 flex items-center justify-center text-orange-400 font-bold text-xl">
                🎧
              </div>
              <div className="min-w-0">
                <h5 className="font-bold text-white text-xs">NovaSon ANC Pro Wireless</h5>
                <p className="text-[10px] text-neutral-400">Active Noise Cancellation • 40mm Titanium Drivers</p>
                <p className="text-xs font-bold text-orange-400 mt-1">$299.00 <span className="line-through text-neutral-500 text-[10px]">$349.00</span></p>
              </div>
            </div>
            <div className="bg-[#1C1B1B] p-3 rounded-lg border border-white/10 space-y-2">
              <span className="text-[11px] font-bold text-neutral-300 block">Instant Cart Drawer & Specs</span>
              <div className="text-[10px] font-mono space-y-1 text-neutral-300">
                <p className="flex justify-between"><span>Battery Life:</span> <span className="text-white">45h Playtime</span></p>
                <p className="flex justify-between"><span>Latency:</span> <span className="text-white">32ms Ultra-Low</span></p>
                <p className="flex justify-between"><span>Checkout Status:</span> <span className="text-green-400 font-bold">Ready</span></p>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'realestate') {
      return (
        <div className="w-full bg-[#141414] rounded-xl border border-white/10 p-3 sm:p-4 text-xs font-sans space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px]">
            <span className="font-bold text-blue-400">🗺️ EstateAI Discovery Platform • Interactive Leaflet Maps</span>
            <span className="text-neutral-400 font-mono text-[10px]">128 Properties Found</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="h-28 rounded-lg bg-blue-950/40 border border-blue-500/30 relative flex items-center justify-center p-2">
              <span className="text-[10px] font-mono text-blue-300 bg-black/70 px-2 py-1 rounded">
                📍 Sousse Marina Luxury Villa: $450,000
              </span>
              <span className="absolute top-2 left-2 text-[9px] px-1.5 py-0.5 rounded bg-blue-500/20 text-blue-300">
                GPS: 35.8256° N, 10.6084° E
              </span>
            </div>
            <div className="bg-[#1C1B1B] p-3 rounded-lg border border-white/10 space-y-1.5 text-[10px] font-mono">
              <p className="text-white font-bold">Property Filters:</p>
              <p className="text-neutral-300">• 4 Beds • 3 Baths • 320 m²</p>
              <p className="text-neutral-300">• Sea View • Smart Pool • Solar Energy</p>
              <span className="inline-block mt-1 px-2 py-0.5 rounded bg-green-500/20 text-green-300 font-bold">
                Verified Listing
              </span>
            </div>
          </div>
        </div>
      );
    }

    if (type === 'ai-bot') {
      return (
        <div className="w-full bg-[#141414] rounded-xl border border-white/10 p-3 sm:p-4 text-xs font-sans space-y-3">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px]">
            <span className="font-bold text-orange-400">🤖 GymBot AI Coach • Google Gemini 2.5 Flash API</span>
            <span className="text-green-400 font-mono text-[10px]">Model: Gemini 2.5 Flash</span>
          </div>
          <div className="space-y-2 text-[11px]">
            <div className="p-2.5 rounded-lg bg-orange-500/10 border border-orange-500/20 text-neutral-200">
              <p className="font-bold text-orange-300 text-[10px] mb-1">🤖 GymBot Assistant:</p>
              <p className="text-xs leading-relaxed">
                "Based on your hypertrophy goal, here is your Day 1 Upper Body Split: Bench Press (4x8 @ 85kg), Incline Dumbbell Press (3x10), Cable Lateral Raises (4x15). Daily Target: 2,450 kcal | 170g Protein."
              </p>
            </div>
            <div className="flex items-center justify-between p-2 rounded bg-black/40 border border-white/5 font-mono text-[10px]">
              <span>🔥 Streak: 14 Days</span>
              <span>🥗 Protein: 170g / 170g (100%)</span>
              <span className="text-green-400 font-bold">Next: Rest Timer 90s</span>
            </div>
          </div>
        </div>
      );
    }

    // Generic Clean Showcase Banner
    return (
      <div
        className="relative w-full h-44 sm:h-52 rounded-xl overflow-hidden border flex flex-col items-center justify-center text-center p-6 select-none shadow-inner"
        style={{
          background: `radial-gradient(circle at center, ${currentTheme.accent}20 0%, rgba(20, 20, 20, 0.95) 75%)`,
          borderColor: `${currentTheme.accent}30`,
        }}
      >
        <div
          className="p-4 rounded-2xl mb-3 shadow-lg flex items-center justify-center animate-subtle-glow"
          style={{
            backgroundColor: `${currentTheme.accent}35`,
            color: currentTheme.accent,
          }}
        >
          <IconComponent className="w-10 h-10" />
        </div>
        <span className="text-sm sm:text-base font-bold tracking-tight">
          {project.title}
        </span>
        <p className="text-xs opacity-70 max-w-md mt-1">
          {project.category} Application • Engineering Showcase by Mohamed El Ouardi
        </p>
      </div>
    );
  };

  // Render media showcase (HTML5 Video Player or High-Res Screenshot Showcase)
  const renderMediaShowcase = () => {
    // 1. Video Player if videoUrl exists
    if (project.videoUrl) {
      return (
        <div className="w-full bg-[#0D0D0D] rounded-xl border border-white/15 overflow-hidden shadow-2xl space-y-0">
          {/* Video Header Bar */}
          <div className="px-3.5 py-2.5 bg-[#181818] border-b border-white/10 flex items-center justify-between gap-2 text-xs flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse shrink-0" />
              <span className="font-semibold text-neutral-200 truncate text-[11px] sm:text-xs">
                {project.videoTitle || `${project.title} — Live Walkthrough`}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-black/60 border border-white/10 text-[10px] font-mono text-neutral-400 shrink-0">
                1080p HD
              </span>
            </div>

            <button
              onClick={() => handleOpenBrowser(project.videoUrl!)}
              className="flex items-center gap-1.5 text-[11px] font-semibold text-orange-400 hover:text-orange-300 hover:underline shrink-0 ml-auto"
              title="Open video in in-OS browser window"
            >
              <ExternalLink className="w-3 h-3" />
              <span>Open in In-OS Browser</span>
            </button>
          </div>

          {/* Native HTML5 Video Element */}
          <div className="relative w-full bg-black flex items-center justify-center">
            <video
              key={project.videoUrl}
              src={project.videoUrl}
              controls
              playsInline
              preload="metadata"
              className="w-full max-h-[380px] sm:max-h-[440px] aspect-video object-contain bg-black"
            >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      );
    }

    // 2. High-Res Picture / Screenshot if imageUrl exists
    if (project.imageUrl) {
      return (
        <div className="w-full bg-[#0D0D0D] rounded-xl border border-white/15 overflow-hidden shadow-2xl space-y-0">
          {/* Screenshot Header Bar */}
          <div className="px-3.5 py-2.5 bg-[#181818] border-b border-white/10 flex items-center justify-between gap-2 text-xs flex-wrap">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse shrink-0" />
              <span className="font-semibold text-neutral-200 truncate text-[11px] sm:text-xs">
                {project.imageTitle || `${project.title} — Platform Showcase`}
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-500/30 text-[10px] font-mono shrink-0">
                Screenshot Preview
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0 ml-auto">
              {project.demoUrl && (
                <button
                  onClick={() => handleOpenBrowser(project.demoUrl!)}
                  className="flex items-center gap-1 text-[11px] font-semibold text-orange-400 hover:text-orange-300 hover:underline"
                  title="Open live interactive demo"
                >
                  <ExternalLink className="w-3 h-3" />
                  <span>Open Live Demo</span>
                </button>
              )}
              <button
                onClick={() => handleOpenBrowser(project.imageUrl!)}
                className="flex items-center gap-1 text-[11px] font-semibold text-neutral-300 hover:text-white hover:underline"
                title="View full-size image in browser"
              >
                <Maximize2 className="w-3 h-3" />
                <span>Full Image</span>
              </button>
            </div>
          </div>

          {/* Screenshot Picture Showcase Container */}
          <div
            className="relative w-full max-h-[380px] sm:max-h-[440px] aspect-video bg-black flex items-center justify-center overflow-hidden group cursor-pointer"
            onClick={() => handleOpenBrowser(project.demoUrl || project.imageUrl!)}
            title="Click to open project demo in in-OS browser"
          >
            <img
              key={project.imageUrl}
              src={project.imageUrl}
              alt={project.title}
              className="w-full h-full object-cover sm:object-contain transition-transform duration-300 group-hover:scale-[1.02]"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 pointer-events-none">
              <span className="text-xs font-semibold text-white bg-black/70 px-3 py-1 rounded-lg backdrop-blur-sm">
                🔍 Click to launch in in-OS Browser
              </span>
              <span className="text-[11px] font-mono text-orange-400 bg-black/70 px-2 py-1 rounded">
                {project.category}
              </span>
            </div>
          </div>
        </div>
      );
    }

    // 3. Fallback when neither videoUrl nor imageUrl is provided
    return (
      <div className="w-full bg-[#121212] rounded-xl border border-white/10 p-8 text-center space-y-3">
        <div className="w-12 h-12 rounded-full bg-white/5 mx-auto flex items-center justify-center text-neutral-400">
          <ImageIcon className="w-6 h-6" />
        </div>
        <h4 className="text-sm font-bold text-white">Showcase Preview Coming Soon</h4>
        <p className="text-xs text-neutral-400 max-w-md mx-auto">
          A dedicated video and screenshot showcase is being prepared. In the meantime, explore the interactive architecture preview tab or launch the source code.
        </p>
        <button
          onClick={() => setActiveTab('preview')}
          className="px-4 py-2 rounded-lg text-xs font-semibold bg-orange-500/20 text-orange-400 border border-orange-500/30 hover:bg-orange-500/30 transition-colors inline-flex items-center gap-1.5"
        >
          <Layers className="w-3.5 h-3.5" />
          <span>View Interactive Architecture</span>
        </button>
      </div>
    );
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[130] flex items-center justify-center p-3 sm:p-6 bg-black/80 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-3xl max-h-[92vh] rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
          style={{
            backgroundColor: currentTheme.windowBg,
            borderColor: currentTheme.windowBorderFocused,
            color: currentTheme.textPrimary,
          }}
        >
          {/* Modal Header */}
          <div
            className="flex items-center justify-between px-4 sm:px-6 py-3.5 border-b select-none"
            style={{
              backgroundColor: currentTheme.windowHeader,
              borderColor: currentTheme.cardBorder,
            }}
          >
            <div className="flex items-center gap-3 min-w-0 pr-4">
              <div
                className="p-2.5 rounded-xl flex items-center justify-center shrink-0 shadow-sm"
                style={{
                  backgroundColor: `${currentTheme.accent}25`,
                  color: currentTheme.accent,
                }}
              >
                <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h2 className="text-sm sm:text-lg font-bold truncate">
                    {project.title}
                  </h2>
                  {project.isGraduationProject && (
                    <span
                      className="text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase flex items-center gap-1 bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    >
                      <GraduationCap className="w-3 h-3" />
                      Graduation Project
                    </span>
                  )}
                  {project.isNew && (
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1"
                      style={{ backgroundColor: currentTheme.accent, color: '#fff' }}
                    >
                      <Sparkles className="w-2.5 h-2.5" />
                      Featured
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  <p className="text-xs font-semibold" style={{ color: currentTheme.accent }}>
                    {project.subtitle || project.category}
                  </p>
                  {project.association && (
                    <span className="text-[11px] px-2 py-0.5 rounded-md bg-white/10 text-white/90 font-medium">
                      🏢 {project.association}
                    </span>
                  )}
                </div>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-colors shrink-0"
              aria-label="Close modal"
            >
              <X className="w-5 h-5 opacity-75 hover:opacity-100" />
            </button>
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* Tab Navigation: Media Showcase vs Interactive Architecture */}
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('media')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'media'
                      ? 'bg-orange-500/25 text-orange-400 border border-orange-500/40 shadow-sm'
                      : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  {project.videoUrl ? (
                    <>
                      <Video className="w-3.5 h-3.5 text-red-400" />
                      <span>Video Demo & Walkthrough</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-red-500/20 text-red-300 rounded font-mono font-bold">
                        HD
                      </span>
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-3.5 h-3.5 text-blue-400" />
                      <span>Screenshot & UI Showcase</span>
                      <span className="text-[9px] px-1.5 py-0.2 bg-blue-500/20 text-blue-300 rounded font-mono font-bold">
                        LIVE
                      </span>
                    </>
                  )}
                </button>

                <button
                  onClick={() => setActiveTab('preview')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    activeTab === 'preview'
                      ? 'bg-orange-500/25 text-orange-400 border border-orange-500/40 shadow-sm'
                      : 'opacity-70 hover:opacity-100 hover:bg-white/5'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Interactive Architecture</span>
                </button>
              </div>

              <div className="flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full bg-black/40 border border-white/10 shrink-0">
                <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                <span>{project.stars} Stars</span>
              </div>
            </div>

            {/* Showcase Stage */}
            {activeTab === 'media' ? renderMediaShowcase() : renderVisualMockup()}

            {/* Overview Description */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2">
                Project Overview
              </h3>
              <p className="text-xs sm:text-sm opacity-90 leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Problem Solved */}
            {project.problemSolved && (
              <div
                className="p-4 rounded-xl border space-y-1 text-xs sm:text-sm"
                style={{
                  backgroundColor: `${currentTheme.accent}0A`,
                  borderColor: `${currentTheme.accent}25`,
                }}
              >
                <span className="font-bold flex items-center gap-1.5" style={{ color: currentTheme.accent }}>
                  <Compass className="w-4 h-4" />
                  Problem Solved & Engineering Approach
                </span>
                <p className="opacity-85 leading-relaxed text-xs sm:text-sm">
                  {project.problemSolved}
                </p>
              </div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <div>
                <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-3">
                  Key Features & Capabilities
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {project.features.map((feat, fIdx) => (
                    <div
                      key={fIdx}
                      className="p-3 rounded-lg bg-white/[0.03] border border-white/5 flex items-start gap-2.5 text-xs sm:text-sm"
                    >
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <span className="opacity-85">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tech Stack Breakdown */}
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider opacity-60 mb-2.5">
                Technology Stack & Architecture
              </h3>
              <div className="flex flex-wrap gap-2">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="text-xs px-3 py-1 rounded-lg font-medium"
                    style={{
                      backgroundColor: `${currentTheme.accent}18`,
                      color: currentTheme.accent,
                      border: `1px solid ${currentTheme.accent}30`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Modal Footer Actions */}
          <div
            className="flex items-center justify-between p-4 border-t gap-3 select-none flex-wrap bg-black/20"
            style={{ borderColor: currentTheme.cardBorder }}
          >
            <div className="flex items-center gap-2 flex-wrap">
              {project.documentationFileName && (
                <button
                  onClick={handleDownloadDoc}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 active:scale-95 shadow-md"
                  style={{
                    backgroundColor: currentTheme.accent,
                    color: '#ffffff',
                  }}
                  title="Download complete technical documentation PDF"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Documentation (PDF)</span>
                </button>
              )}

              {project.videoUrl && (
                <button
                  onClick={() => setActiveTab('media')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-red-500/20 hover:bg-red-500/30 text-red-300 border border-red-500/35 transition-all hover:scale-105"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Watch Video Demo</span>
                </button>
              )}

              {project.imageUrl && !project.videoUrl && (
                <button
                  onClick={() => setActiveTab('media')}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 border border-blue-500/35 transition-all hover:scale-105"
                >
                  <ImageIcon className="w-3.5 h-3.5" />
                  <span>View Screenshot</span>
                </button>
              )}

              {project.githubUrl && (
                <button
                  onClick={() => handleOpenBrowser(project.githubUrl!)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 shadow-sm"
                  style={{
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                    color: currentTheme.textPrimary,
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                  }}
                >
                  <Github className="w-4 h-4" />
                  <span>View Source Code</span>
                </button>
              )}

              {project.demoUrl && (
                <button
                  onClick={() => handleOpenBrowser(project.demoUrl!)}
                  className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all hover:scale-105 shadow-sm"
                  style={{
                    backgroundColor: currentTheme.accent,
                    color: '#ffffff',
                  }}
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>Open Live Demo</span>
                </button>
              )}
            </div>

            {project.linkedinUrl && (
              <button
                onClick={() => handleOpenBrowser(project.linkedinUrl!)}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#0a66c2]/20 hover:bg-[#0a66c2]/30 text-[#60a5fa] border border-[#0a66c2]/40 transition-all hover:scale-105 ml-auto"
              >
                <Linkedin className="w-4 h-4 text-[#0a66c2]" />
                <span>LinkedIn Showcase</span>
              </button>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectDetailsModal;
