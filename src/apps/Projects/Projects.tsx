import React, { useState, useMemo } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { useBrowserStore } from '@/stores/useBrowserStore';
import { themes } from '@/styles/themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShoppingCart,
  Wrench,
  Monitor,
  Laptop,
  CreditCard,
  Headphones,
  Building2,
  Dumbbell,
  BarChart3,
  Kanban,
  Star,
  Github,
  ExternalLink,
  Linkedin,
  Sparkles,
  Search,
  Layers,
  ArrowUpRight,
  Eye,
  Check,
  Smartphone,
  Download,
  GraduationCap
} from 'lucide-react';
import ProjectDetailsModal, { ProjectDetail } from './ProjectDetailsModal';
import { downloadProjectDocumentation } from '@/lib/downloadResume';

const projects: ProjectDetail[] = [
  {
    id: 0,
    title: 'Web / Smart Mobile Platform for Managing Bus Brake Calipers',
    subtitle: 'Graduation Project • Associated with BUS SOFTWARE',
    association: 'Associated with BUS SOFTWARE',
    isGraduationProject: true,
    description:
      'A unified web and smart mobile platform designed to digitize and automate spare parts management (reception, diagnosis, repair, and delivery) for bus maintenance workshops. Features computer vision image recognition and speech-to-query voice input for workshop technicians.',
    problemSolved:
      'Maintenance workshops rely heavily on manual processes such as paper-based records, leading to delays, errors, and lack of traceability. Additionally, the absence of centralized systems limits visibility and reduces productivity. This project addresses the need for maintenance workshops to adopt digital solutions for managing spare parts, including reception, repair, and delivery with a unified centralized system.',
    features: [
      'Associated with BUS SOFTWARE — End of Study Engineering Graduation Project.',
      'Unified Web Management Dashboard (React, Node.js, Express, MongoDB) for administrative tracking & inventory.',
      'Smart Mobile Companion App (React Native) for workshop floor operators and mechanics.',
      'AI Image Recognition (MobileNet) for automated caliper model & wear defect identification.',
      'Speech-to-Query Voice Input (Whisper / Speech AI) for hands-free workshop operation.',
      'End-to-end parts lifecycle auditing: reception, triage, repair checklists, replacement parts, and dispatch.',
      'Complete Technical Documentation PDF available for direct download.',
    ],
    tech: ['React', 'React Native', 'Node.js', 'Express.js', 'MongoDB', 'MobileNet AI', 'Whisper Speech AI', 'REST APIs', 'JWT Auth'],
    stars: 350,
    image: Smartphone,
    documentationFileName: 'documentation.pdf',
    videoUrl: 'https://res.cloudinary.com/dthb3ojqm/video/upload/v1785406770/DEMO_xieh28.mp4',
    videoTitle: 'Web & Mobile Bus Calipers System — Live Demo & AI Walkthrough',
    mockupType: 'bus-caliper',
    isNew: true,
    category: 'Full-Stack',
  },
  {
    id: 1,
    title: 'NovaSon — Audio & Tech E-Commerce',
    subtitle: 'Premium E-Commerce Experience',
    description:
      'A modern e-commerce platform built for technology and audio enthusiasts. Features premium product showcase for wireless earphones & ANC headphones, dynamic category discovery, glassmorphism UI, and reusable React 19 architecture.',
    problemSolved:
      'Engineered an ultra-fast client shopping experience with instantaneous state updates, responsive cart drawer, and high-converting product showcases without bloated UI frameworks.',
    features: [
      'Next-Gen React 19 & Tailwind CSS v4 design architecture.',
      'Active noise-cancellation (ANC) and spatial audio interactive product specs.',
      'Persistent cart state with instant quantity updates and checkout totals.',
      'Smooth micro-animations powered by Framer Motion and Lucide icons.',
    ],
    tech: ['React 19', 'JavaScript (ES6+)', 'Tailwind CSS v4', 'Vite', 'Lucide React', 'Framer Motion'],
    stars: 195,
    image: Headphones,
    githubUrl: 'https://github.com/mohamedwardi068/NovaSon',
    linkedinUrl: 'https://lnkd.in/p/e3iV577z',
    videoUrl: 'https://res.cloudinary.com/dthb3ojqm/video/upload/v1785406583/NovaSondemo_kjnkjx.mp4',
    videoTitle: 'NovaSon E-Commerce — Product Specs & Cart Drawer Demo',
    mockupType: 'ecommerce',
    isNew: true,
    category: 'Frontend',
  },
  {
    id: 2,
    title: 'EstateAI — Real Estate Platform',
    subtitle: 'Modern Property Search & Maps',
    description:
      'Production-inspired real estate web application featuring interactive Leaflet maps, advanced property search interface, dedicated property details pages, and fluid Framer Motion animations.',
    problemSolved:
      'Combines geolocation clustering, price-bracket filtering, and responsive gallery previews to allow rapid real-estate discovery with zero page reloads.',
    features: [
      'Interactive Leaflet map integration with customized map markers.',
      'Comprehensive property filtering (bedrooms, price range, city, amenities).',
      'Dedicated property deep-dive sheets with high-resolution image carousels.',
      'Type-safe TypeScript codebase with strict component interfaces.',
    ],
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Leaflet', 'Lucide React'],
    stars: 210,
    image: Building2,
    githubUrl: 'https://github.com/mohamedwardi068/EstateAI',
    linkedinUrl: 'https://lnkd.in/p/eWet3mDd',
    videoUrl: 'https://res.cloudinary.com/dthb3ojqm/video/upload/v1785406637/AiEstateDemo_e3siyc.mp4',
    videoTitle: 'EstateAI — Leaflet Map Geolocation & Filtering Demo',
    mockupType: 'realestate',
    isNew: true,
    category: 'Frontend',
  },
  {
    id: 3,
    title: 'GymBot — AI Fitness & Nutrition Coach',
    subtitle: 'Full-Stack AI Health Ecosystem',
    description:
      'AI-powered full-stack fitness and nutrition platform integrating Google Gemini 2.5 Flash API. Generates customized workout splits & meal macros, editable UI cards, calendar scheduling, streak tracking, and secure JWT auth.',
    problemSolved:
      'Eliminates generic fitness plans by utilizing Gemini 2.5 Flash to synthesize body statistics, dietary restrictions, and training experience into dynamic, editable daily workout splits.',
    features: [
      'Gemini 2.5 Flash integration with structured prompt engineering & JSON schema validation.',
      'Workout routine generator with rest timers, reps/weight tracker, and calorie calculators.',
      'Full-stack MERN architecture with JWT authentication & MongoDB user profile stores.',
      'Streak counter, achievement badges, and interactive progress analytics.',
    ],
    tech: ['React 18', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Gemini 2.5 API', 'Framer Motion'],
    stars: 320,
    image: Dumbbell,
    githubUrl: 'https://github.com/mohamedwardi068/AiPoweredGymApp',
    linkedinUrl: 'https://lnkd.in/p/e65qBrPt',
    videoUrl: 'https://res.cloudinary.com/dthb3ojqm/video/upload/v1785406692/GymBotdemo_ia64cs.mp4',
    videoTitle: 'GymBot AI — Gemini 2.5 Flash Coach Walkthrough',
    mockupType: 'ai-bot',
    isNew: true,
    category: 'AI & SaaS',
  },
  {
    id: 4,
    title: 'SaaS Analytics & Metrics Dashboard',
    subtitle: 'B2B Enterprise Dark-Mode Dashboard',
    description:
      'Dark-mode enterprise analytics dashboard engineered with React, TypeScript, and raw CSS Grid/Flexbox architecture (zero UI framework dependencies). Features interactive MRR charts, user retention analytics, and real-time metrics.',
    problemSolved:
      'Demonstrates advanced CSS mastery by constructing a dense enterprise B2B dashboard with zero third-party UI component dependencies, ensuring lightweight bundle size and maximum performance.',
    features: [
      'Raw CSS Grid and Flexbox responsive multi-column layout.',
      'MRR, ARR, churn rate, and customer acquisition cost metric cards.',
      'Interactive monthly revenue bar charts and retention heatmaps.',
      'Real-time event feed and system status alerts.',
    ],
    tech: ['React', 'TypeScript', 'CSS Grid', 'Flexbox', 'Vite', 'Data Viz'],
    stars: 180,
    image: BarChart3,
    githubUrl: 'https://github.com/mohamedwardi068/E_commerce_Dashboard',
    linkedinUrl: 'https://lnkd.in/p/eR4YvfhD',
    videoUrl: 'https://res.cloudinary.com/dthb3ojqm/video/upload/v1785406507/SAASdemo_ycv9te.mp4',
    videoTitle: 'SaaS Analytics Dashboard — Pure CSS Grid Walkthrough',
    mockupType: 'dashboard',
    isNew: true,
    category: 'Frontend',
  },
  {
    id: 5,
    title: 'Project Management System (Kanban)',
    subtitle: 'Jira & Trello Inspired Agile Workflow',
    description:
      'Full-stack agile project management system with interactive drag-and-drop Kanban boards, task assignment, team collaboration, RESTful backend, and secure user authentication.',
    problemSolved:
      'Provides a clean, intuitive task orchestration board for engineering sprints with real-time column transitions (Backlog, In Progress, Code Review, Done).',
    features: [
      'Drag-and-drop task column management with instant state sync.',
      'Priority tags (Critical, High, Medium, Low) and assignee avatars.',
      'Node.js & Express RESTful API with MongoDB schema relationships.',
      'Context API state management for seamless board mutations.',
    ],
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Context API'],
    stars: 245,
    image: Kanban,
    githubUrl: 'https://github.com/mohamedwardi068/ProjectManagementSystem',
    linkedinUrl: 'https://lnkd.in/p/egpDrgB6',
    videoUrl: 'https://res.cloudinary.com/dthb3ojqm/video/upload/v1785406637/demoTaskManager_qrhq2q.mp4',
    videoTitle: 'Kanban Project Management System — Agile Sprint Demo',
    mockupType: 'kanban',
    isNew: true,
    category: 'Full-Stack',
  },
  {
    id: 6,
    title: 'E-Commerce Platform (Swoo)',
    subtitle: 'Full-Stack Shopping Solution',
    description:
      'A full-stack e-commerce solution with real-time inventory, payment processing, and comprehensive admin dashboard.',
    problemSolved:
      'Engineered an end-to-end shopping experience connecting product catalogs, user cart persistence, and order tracking.',
    features: [
      'Full MERN stack implementation with robust database modeling.',
      'Product search, category filtering, and rating system.',
      'Secure customer checkout and cart management.',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    stars: 128,
    image: ShoppingCart,
    githubUrl: 'https://github.com/mohamedwardi068/swoo',
    demoUrl: 'https://swoo.vercel.app/',
    imageUrl: 'https://res.cloudinary.com/dthb3ojqm/image/upload/v1787835330/swoo2_kiao2n.png',
    imageTitle: 'Swoo E-Commerce — Full-Stack Shopping Platform',
    category: 'Full-Stack',
  },
  {
    id: 7,
    title: 'AutoRepair Manager',
    subtitle: 'Workshop Operations System',
    description:
      'A comprehensive web application for managing an auto repair workshop. Handles client & vehicle management, repair tracking, and finished delivery.',
    problemSolved:
      'Streamlines automotive workshop workflows from vehicle intake through parts allocation to repair billing.',
    features: [
      'Vehicle intake registration and customer profile linking.',
      'Repair stage timeline and spare parts catalog.',
      'Automated service invoice calculation.',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    stars: 89,
    image: Wrench,
    githubUrl: 'https://github.com/mohamedwardi068/BusAtelierDeploy',
    demoUrl: 'https://mohamedwardi068.github.io/BusAtelierDeploy/',
    imageUrl: 'https://res.cloudinary.com/dthb3ojqm/image/upload/v1787835506/caliper_list_tkovlv.jpg',
    imageTitle: 'AutoRepair Manager — Workshop Operations & Parts Intake',
    category: 'Full-Stack',
  },
  {
    id: 8,
    title: 'ShowRoom — Electronics Accessories',
    subtitle: 'Client-Side Product Showcase',
    description:
      'A modern, fully client-side showroom application for browsing and exploring electronics accessories with fluid animations.',
    problemSolved:
      'Delivers an interactive 3D-like digital storefront experience for consumer electronics accessories.',
    features: [
      'High-resolution product image gallery with smooth transitions.',
      'Category browsing and instant keyword search.',
      'Responsive design across mobile and desktop displays.',
    ],
    tech: ['React', 'Node.js', 'TailwindCSS'],
    stars: 256,
    image: Monitor,
    githubUrl: 'https://github.com/mohamedwardi068/ShowRoomDeploy',
    demoUrl: 'https://mohamedwardi068.github.io/ShowRoomDeploy/',
    imageUrl: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&q=80',
    imageTitle: 'ShowRoom — Interactive Electronics & Accessories Gallery',
    category: 'Frontend',
  },
  {
    id: 9,
    title: 'Portfolio OS — Workstation Experience',
    subtitle: 'Linux Developer Desktop Environment',
    description:
      'This interactive Ubuntu developer workstation simulator! Built with draggable multi-windows, Spotlight launcher, terminal bash simulator, themes, and full recruiter navigation.',
    problemSolved:
      'Transforms the standard static portfolio into an immersive, memorable operating system experience that demonstrates advanced frontend mastery.',
    features: [
      'Multi-window manager with z-index stacking, dragging & maximizing.',
      'Spotlight Command Launcher (Ctrl + K) and GNOME top system bar.',
      'Full Bash terminal with history, interactive commands, and sound effects.',
      'Responsive mobile adaptation with full-screen views & bottom dock.',
    ],
    tech: ['React 18', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Zustand'],
    stars: 342,
    image: Laptop,
    githubUrl: 'https://github.com/mohamedwardi068/portfolio',
    demoUrl: 'https://mohamedwardi068.github.io/portfolio/',
    imageUrl: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?auto=format&fit=crop&w=1200&q=80',
    imageTitle: 'Portfolio OS — Draggable Ubuntu Linux Desktop Environment',
    category: 'Frontend',
  },
  {
    id: 10,
    title: 'Payment Checkout System — MERN',
    subtitle: 'Secure Payment Architecture',
    description:
      'Full-stack checkout and payment system with MERN. Features secure backend validation, mock Stripe-like architecture, and cart persistence.',
    problemSolved:
      'Implements a robust checkout pipeline handling card verification, error states, and receipt generation.',
    features: [
      'Multi-step payment flow with card validation formatting.',
      'Backend transaction simulation with status callbacks.',
      'Order history persistence and digital invoices.',
    ],
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    stars: 175,
    image: CreditCard,
    githubUrl: 'https://github.com/mohamedwardi068/Payment',
    demoUrl: 'https://payment-five-mocha.vercel.app/',
    imageUrl: 'https://res.cloudinary.com/dthb3ojqm/image/upload/v1787835595/payflow3_nz7nkf.png',
    imageTitle: 'Payment Checkout System — Secure Checkout & Transaction Verification',
    category: 'Full-Stack',
  },
];

const categories = ['All', '✨ New / Featured', 'Full-Stack', 'Frontend', 'AI & SaaS'] as const;

const Projects = () => {
  const theme = useAppStore((state) => state.theme);
  const { openWindow, selectedInspectorProjectId, openProjectInspector, closeProjectInspector } = useAppStore();
  const { addTab } = useBrowserStore();
  const currentTheme = themes[theme];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredProjectId, setHoveredProjectId] = useState<number | null>(null);

  const handleOpenLink = (url: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    openWindow('browser');
    addTab(url);
  };

  const activeModalProject = useMemo(() => {
    if (selectedInspectorProjectId === null || selectedInspectorProjectId === undefined) return null;
    return projects.find((p) => p.id === selectedInspectorProjectId) || null;
  }, [selectedInspectorProjectId]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      // Category filter
      if (selectedCategory === '✨ New / Featured' && !project.isNew) {
        return false;
      }
      if (
        selectedCategory !== 'All' &&
        selectedCategory !== '✨ New / Featured' &&
        project.category !== selectedCategory
      ) {
        return false;
      }

      // Search filter
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = project.title.toLowerCase().includes(query);
        const matchesDesc = project.description.toLowerCase().includes(query);
        const matchesTech = project.tech.some((t) => t.toLowerCase().includes(query));
        return matchesTitle || matchesDesc || matchesTech;
      }

      return true;
    });
  }, [selectedCategory, searchQuery]);

  return (
    <div
      className="h-full p-4 sm:p-6 md:p-8 overflow-y-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header & Search Controls */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xl">💻</span>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Projects</h1>
                <span
                  className="text-xs px-2.5 py-0.5 rounded-full font-bold font-mono"
                  style={{
                    backgroundColor: `${currentTheme.accent}25`,
                    color: currentTheme.accent,
                  }}
                >
                  {projects.length} Projects
                </span>
              </div>
              <p className="text-xs sm:text-sm opacity-70">
                Production web applications, full-stack ecosystems, AI integrations, and modern frontend showcases.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 opacity-50" />
              <input
                type="text"
                placeholder="Search projects or tech stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-3.5 py-2 text-xs sm:text-sm rounded-xl outline-none transition-all shadow-inner"
                style={{
                  backgroundColor: `${currentTheme.accent}12`,
                  border: `1px solid ${currentTheme.accent}30`,
                  color: currentTheme.textPrimary,
                }}
              />
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-1 border-b pb-3" style={{ borderColor: currentTheme.cardBorder }}>
            {categories.map((cat) => {
              const isActive = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`text-xs px-3.5 py-1.5 rounded-full font-medium transition-all ${
                    isActive ? 'scale-105 shadow-sm font-semibold' : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{
                    backgroundColor: isActive ? currentTheme.accent : `${currentTheme.accent}12`,
                    color: isActive ? '#ffffff' : currentTheme.textPrimary,
                    border: `1px solid ${isActive ? currentTheme.accent : `${currentTheme.accent}28`}`,
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* Projects Grid */}
        <AnimatePresence mode="popLayout">
          {filteredProjects.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20 opacity-60"
            >
              <Layers className="w-12 h-12 mx-auto mb-3 opacity-40" />
              <p className="text-base font-medium">No projects found matching "{searchQuery}"</p>
              <p className="text-xs mt-1">Try clearing your search query or selecting "All" category</p>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-5">
              {filteredProjects.map((project, index) => {
                const IconComponent = project.image;
                const isHovered = hoveredProjectId === project.id;

                return (
                  <motion.div
                    key={project.id}
                    layout
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.22, delay: index * 0.03 }}
                    onMouseEnter={() => setHoveredProjectId(project.id)}
                    onMouseLeave={() => setHoveredProjectId(null)}
                    onClick={() => openProjectInspector(project.id)}
                    className="relative rounded-2xl p-5 transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl flex flex-col justify-between cursor-pointer border group"
                    style={{
                      backgroundColor: `${currentTheme.accent}0A`,
                      borderColor: isHovered ? currentTheme.accent : `${currentTheme.accent}25`,
                      boxShadow: isHovered
                        ? `0 12px 30px -8px rgba(0, 0, 0, 0.6), 0 0 15px ${currentTheme.accentGlow}`
                        : '0 4px 15px -3px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {/* "NEW" Indicator Tag */}
                    {project.isNew && (
                      <div
                        className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide flex items-center gap-1 shadow-md uppercase"
                        style={{
                          backgroundColor: currentTheme.accent,
                          color: '#ffffff',
                        }}
                      >
                        <Sparkles className="w-3 h-3" />
                        Featured New
                      </div>
                    )}

                    <div>
                      {/* Top Info Header */}
                      <div className="flex items-start gap-3.5 mb-3">
                        {/* Icon / Mini Preview Showcase Container */}
                        <div
                          className="p-3 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110 shadow-sm"
                          style={{
                            backgroundColor: `${currentTheme.accent}22`,
                            color: currentTheme.accent,
                            border: `1px solid ${currentTheme.accent}35`,
                          }}
                        >
                          <IconComponent className="w-6 h-6 sm:w-7 sm:h-7" />
                        </div>

                        {/* Title, Subtitle, & Stars */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2 mb-0.5">
                            <h3 className="font-bold text-base sm:text-lg leading-snug truncate group-hover:text-orange-400 transition-colors">
                              {project.title}
                            </h3>
                            <div
                              className="flex items-center gap-1 text-xs font-bold shrink-0 font-mono"
                              style={{ color: currentTheme.accent }}
                            >
                              <Star className="w-3.5 h-3.5 fill-current" />
                              {project.stars}
                            </div>
                          </div>

                          {project.subtitle && (
                            <p
                              className="text-xs font-semibold mb-1 opacity-80 truncate"
                              style={{ color: currentTheme.accent }}
                            >
                              {project.subtitle}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Description */}
                      <p className="text-xs sm:text-sm opacity-80 mb-3 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      {/* Subtle Screenshot / Mini Preview Illustration Strip (Appears on hover) */}
                      <div
                        className={`overflow-hidden rounded-xl transition-all duration-300 mb-3 select-none flex items-center justify-between px-3 py-2 border text-xs ${
                          isHovered ? 'h-10 opacity-100' : 'h-0 opacity-0 py-0 mb-0 border-transparent'
                        }`}
                        style={{
                          backgroundColor: `${currentTheme.accent}15`,
                          borderColor: `${currentTheme.accent}35`,
                          color: currentTheme.accent,
                        }}
                      >
                        <div className="flex items-center gap-2 font-semibold text-[11px]">
                          <Eye className="w-3.5 h-3.5" />
                          <span>Click card to open full Project Details & Architecture</span>
                        </div>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </div>

                      {/* Tech stack pills */}
                      <div className="flex flex-wrap gap-1.5 mb-3">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                            style={{
                              backgroundColor: `${currentTheme.accent}18`,
                              color: currentTheme.accent,
                              border: `1px solid ${currentTheme.accent}28`,
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Footer Action Links */}
                    <div
                      className="flex items-center justify-between pt-3 border-t mt-2 text-xs"
                      style={{ borderColor: `${currentTheme.accent}20` }}
                    >
                      <div className="flex items-center gap-2 flex-wrap">
                        {project.documentationFileName && (
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              addNotification(`📥 Downloading ${project.documentationFileName}...`, 'info');
                              const ok = await downloadProjectDocumentation(project.documentationFileName);
                              if (ok) addNotification(`✅ Documentation downloaded!`, 'success');
                            }}
                            className="flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-sm"
                            style={{
                              backgroundColor: currentTheme.accent,
                              color: '#ffffff',
                            }}
                            title="Download project documentation PDF"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>Download Doc</span>
                          </button>
                        )}

                        {project.githubUrl && (
                          <button
                            onClick={(e) => handleOpenLink(project.githubUrl, e)}
                            className="flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95"
                            style={{
                              backgroundColor: 'rgba(255, 255, 255, 0.08)',
                              color: currentTheme.textPrimary,
                              border: '1px solid rgba(255,255,255,0.12)',
                            }}
                            title="View source code on GitHub"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>Code</span>
                          </button>
                        )}

                        {project.demoUrl && (
                          <button
                            onClick={(e) => handleOpenLink(project.demoUrl!, e)}
                            className="flex items-center gap-1.5 font-semibold px-3 py-1.5 rounded-lg transition-all hover:scale-105 active:scale-95 shadow-sm"
                            style={{
                              backgroundColor: currentTheme.accent,
                              color: '#ffffff',
                            }}
                            title="Open live interactive demo"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>Live Demo</span>
                          </button>
                        )}

                        {project.linkedinUrl && (
                          <button
                            onClick={(e) => handleOpenLink(project.linkedinUrl!, e)}
                            className="flex items-center gap-1.5 font-semibold px-2.5 py-1.5 rounded-lg bg-[#0a66c2]/15 hover:bg-[#0a66c2]/25 text-[#60a5fa] border border-[#0a66c2]/35 transition-all hover:scale-105 active:scale-95"
                            title="View official post on LinkedIn"
                          >
                            <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                            <span className="hidden sm:inline">LinkedIn</span>
                          </button>
                        )}
                      </div>

                      {/* Quick Inspector Hint */}
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          openProjectInspector(project.id);
                        }}
                        className="text-[11px] font-semibold opacity-70 hover:opacity-100 flex items-center gap-1 transition-opacity text-orange-400"
                      >
                        <span>Details</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* In-Depth Project Details Inspector Modal */}
      <ProjectDetailsModal
        project={activeModalProject}
        onClose={closeProjectInspector}
      />
    </div>
  );
};

export default Projects;

