import { useState, useMemo } from 'react';
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
  Layers
} from 'lucide-react';

interface Project {
  id: number;
  title: string;
  subtitle?: string;
  description: string;
  tech: string[];
  stars: number;
  image: React.ElementType;
  githubUrl: string;
  demoUrl?: string;
  linkedinUrl?: string;
  isNew?: boolean;
  category: 'Full-Stack' | 'Frontend' | 'AI & SaaS';
}

const projects: Project[] = [
  {
    id: 1,
    title: 'NovaSon — Audio & Tech E-Commerce',
    subtitle: 'Premium E-Commerce Experience',
    description:
      'A modern e-commerce platform built for technology and audio enthusiasts. Features premium product showcase for wireless earphones & ANC headphones, dynamic category discovery, glassmorphism UI, and reusable React 19 architecture.',
    tech: ['React 19', 'JavaScript (ES6+)', 'Tailwind CSS v4', 'Vite', 'Lucide React'],
    stars: 195,
    image: Headphones,
    githubUrl: 'https://github.com/mohamedwardi068/NovaSon',
    linkedinUrl: 'https://lnkd.in/p/e3iV577z',
    isNew: true,
    category: 'Frontend',
  },
  {
    id: 2,
    title: 'EstateAI — Real Estate Platform',
    subtitle: 'Modern Property Search & Maps',
    description:
      'Production-inspired real estate web application featuring interactive Leaflet maps, advanced property search interface, dedicated property details pages, and fluid Framer Motion animations.',
    tech: ['React', 'TypeScript', 'Tailwind CSS', 'Vite', 'Framer Motion', 'Leaflet', 'Lucide React'],
    stars: 210,
    image: Building2,
    githubUrl: 'https://github.com/mohamedwardi068/EstateAI',
    linkedinUrl: 'https://lnkd.in/p/eWet3mDd',
    isNew: true,
    category: 'Frontend',
  },
  {
    id: 3,
    title: 'GymBot — AI Fitness & Nutrition Coach',
    subtitle: 'Full-Stack AI Health Ecosystem',
    description:
      'AI-powered full-stack fitness and nutrition platform integrating Google Gemini 2.5 Flash API. Generates customized workout splits & meal macros, editable UI cards, calendar scheduling, streak tracking, and secure JWT auth.',
    tech: ['React 18', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Gemini 2.5 API', 'Framer Motion'],
    stars: 320,
    image: Dumbbell,
    githubUrl: 'https://github.com/mohamedwardi068/AiPoweredGymApp',
    linkedinUrl: 'https://lnkd.in/p/e65qBrPt',
    isNew: true,
    category: 'AI & SaaS',
  },
  {
    id: 4,
    title: 'SaaS Analytics & Metrics Dashboard',
    subtitle: 'B2B Enterprise Dark-Mode Dashboard',
    description:
      'Dark-mode enterprise analytics dashboard engineered with React, TypeScript, and raw CSS Grid/Flexbox architecture (zero UI framework dependencies). Features interactive MRR charts, user retention analytics, and real-time metrics.',
    tech: ['React', 'TypeScript', 'CSS Grid', 'Flexbox', 'Vite', 'Data Viz'],
    stars: 180,
    image: BarChart3,
    githubUrl: 'https://github.com/mohamedwardi068/E_commerce_Dashboard',
    linkedinUrl: 'https://lnkd.in/p/eR4YvfhD',
    isNew: true,
    category: 'Frontend',
  },
  {
    id: 5,
    title: 'Project Management System (Kanban)',
    subtitle: 'Jira & Trello Inspired Agile Workflow',
    description:
      'Full-stack agile project management system with interactive drag-and-drop Kanban boards, task assignment, team collaboration, RESTful backend, and secure user authentication.',
    tech: ['React', 'Vite', 'Tailwind CSS', 'Node.js', 'Express.js', 'MongoDB', 'Context API'],
    stars: 245,
    image: Kanban,
    githubUrl: 'https://github.com/mohamedwardi068/ProjectManagementSystem',
    linkedinUrl: 'https://lnkd.in/p/egpDrgB6',
    isNew: true,
    category: 'Full-Stack',
  },
  {
    id: 6,
    title: 'E-Commerce Platform (Swoo)',
    subtitle: 'Full-Stack Shopping Solution',
    description:
      'A full-stack e-commerce solution with real-time inventory, payment processing, and comprehensive admin dashboard.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    stars: 128,
    image: ShoppingCart,
    githubUrl: 'https://github.com/mohamedwardi068/swoo',
    demoUrl: 'https://swoo.vercel.app/',
    category: 'Full-Stack',
  },
  {
    id: 7,
    title: 'AutoRepair Manager',
    subtitle: 'Workshop Operations System',
    description:
      'A comprehensive web application for managing an auto repair workshop. Handles client & vehicle management, repair tracking, and finished delivery.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    stars: 89,
    image: Wrench,
    githubUrl: 'https://github.com/mohamedwardi068/BusAtelierDeploy',
    demoUrl: 'https://mohamedwardi068.github.io/BusAtelierDeploy/',
    category: 'Full-Stack',
  },
  {
    id: 8,
    title: 'ShowRoom — Electronics Accessories',
    subtitle: 'Client-Side Product Showcase',
    description:
      'A modern, fully client-side showroom application for browsing and exploring electronics accessories with fluid animations.',
    tech: ['React', 'Node.js', 'TailwindCSS'],
    stars: 256,
    image: Monitor,
    githubUrl: 'https://github.com/mohamedwardi068/ShowRoomDeploy',
    demoUrl: 'https://mohamedwardi068.github.io/ShowRoomDeploy/',
    category: 'Frontend',
  },
  {
    id: 9,
    title: 'Portfolio OS',
    subtitle: 'Ubuntu Desktop Experience',
    description:
      'This Ubuntu-style desktop portfolio you are currently viewing! Built with draggable windows, customizable themes, apps, and terminal.',
    tech: ['React', 'TypeScript', 'TailwindCSS', 'Framer Motion', 'Zustand'],
    stars: 342,
    image: Laptop,
    githubUrl: 'https://github.com/mohamedwardi068/portfolio',
    demoUrl: 'https://mohamedwardi068.github.io/portfolio/',
    category: 'Frontend',
  },
  {
    id: 10,
    title: 'Payment Checkout System — MERN',
    subtitle: 'Secure Payment Architecture',
    description:
      'Full-stack checkout and payment system with MERN. Features secure backend validation, mock Stripe-like architecture, and cart persistence.',
    tech: ['React', 'Node.js', 'Express', 'MongoDB', 'TailwindCSS'],
    stars: 175,
    image: CreditCard,
    githubUrl: 'https://github.com/mohamedwardi068/Payment',
    demoUrl: 'https://payment-five-mocha.vercel.app/',
    category: 'Full-Stack',
  },
];

const categories = ['All', '✨ New / Featured', 'Full-Stack', 'Frontend', 'AI & SaaS'] as const;

const Projects = () => {
  const theme = useAppStore((state) => state.theme);
  const { openWindow } = useAppStore();
  const { addTab } = useBrowserStore();
  const currentTheme = themes[theme];

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleOpenLink = (url: string) => {
    openWindow('browser');
    addTab(url);
  };

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
      className="h-full p-6 overflow-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      {/* Header & Controls */}
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-bold">Featured Projects</h1>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-semibold"
                style={{
                  backgroundColor: `${currentTheme.accent}25`,
                  color: currentTheme.accent,
                }}
              >
                {projects.length} Projects
              </span>
            </div>
            <p className="text-xs sm:text-sm opacity-70 mt-1">
              Sorted by newest additions • Full-Stack, AI, & Modern Frontend Applications
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 opacity-50" />
            <input
              type="text"
              placeholder="Search project or tech..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-sm rounded-lg outline-none transition-all"
              style={{
                backgroundColor: `${currentTheme.accent}15`,
                border: `1px solid ${currentTheme.accent}30`,
                color: currentTheme.textPrimary,
              }}
            />
          </div>
        </div>

        {/* Filter Badges */}
        <div className="flex flex-wrap gap-2 pt-1">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs px-3 py-1.5 rounded-full font-medium transition-all ${
                  isActive ? 'scale-105 shadow-sm' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: isActive ? currentTheme.accent : `${currentTheme.accent}15`,
                  color: isActive ? '#ffffff' : currentTheme.textPrimary,
                  border: `1px solid ${isActive ? currentTheme.accent : `${currentTheme.accent}30`}`,
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
            className="text-center py-16 opacity-60"
          >
            <Layers className="w-12 h-12 mx-auto mb-3 opacity-40" />
            <p className="text-base font-medium">No projects found matching your criteria</p>
            <p className="text-xs mt-1">Try searching with a different term or clear filters</p>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.25, delay: index * 0.04 }}
                className={`relative rounded-xl p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-lg flex flex-col justify-between ${
                  project.isNew ? 'ring-1' : ''
                }`}
                style={{
                  backgroundColor: `${currentTheme.accent}10`,
                  borderColor: project.isNew ? `${currentTheme.accent}60` : undefined,
                }}
              >
                {/* "NEW" Indicator Tag */}
                {project.isNew && (
                  <div
                    className="absolute -top-2.5 right-4 px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide flex items-center gap-1 shadow-sm uppercase"
                    style={{
                      backgroundColor: currentTheme.accent,
                      color: '#ffffff',
                    }}
                  >
                    <Sparkles className="w-3 h-3" />
                    New
                  </div>
                )}

                <div>
                  <div className="flex items-start gap-4">
                    {/* Icon Container */}
                    <div
                      className="p-3.5 rounded-xl flex items-center justify-center shrink-0"
                      style={{
                        backgroundColor: `${currentTheme.accent}22`,
                        color: currentTheme.accent,
                      }}
                    >
                      <project.image className="w-7 h-7" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <h3 className="font-bold text-base sm:text-lg leading-snug truncate">
                          {project.title}
                        </h3>
                        <div
                          className="flex items-center gap-1 text-xs font-semibold shrink-0"
                          style={{ color: currentTheme.accent }}
                        >
                          <Star className="w-3.5 h-3.5 fill-current" />
                          {project.stars}
                        </div>
                      </div>

                      {project.subtitle && (
                        <p
                          className="text-xs font-medium mb-2 opacity-80"
                          style={{ color: currentTheme.accent }}
                        >
                          {project.subtitle}
                        </p>
                      )}

                      <p className="text-xs sm:text-sm opacity-80 mb-3 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack pills */}
                  <div className="flex flex-wrap gap-1.5 my-3">
                    {project.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[11px] px-2 py-0.5 rounded-md font-medium"
                        style={{
                          backgroundColor: `${currentTheme.accent}20`,
                          color: currentTheme.accent,
                        }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Footer Action Links */}
                <div
                  className="flex items-center gap-3 pt-3 border-t mt-2"
                  style={{ borderColor: `${currentTheme.accent}20` }}
                >
                  {project.githubUrl && (
                    <button
                      onClick={() => handleOpenLink(project.githubUrl)}
                      className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-all hover:opacity-100 opacity-75 hover:scale-105"
                      style={{
                        backgroundColor: `${currentTheme.accent}15`,
                        color: currentTheme.textPrimary,
                      }}
                    >
                      <Github className="w-3.5 h-3.5" />
                      Code
                    </button>
                  )}

                  {project.demoUrl && (
                    <button
                      onClick={() => handleOpenLink(project.demoUrl)}
                      className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-all hover:opacity-100 opacity-75 hover:scale-105"
                      style={{
                        backgroundColor: `${currentTheme.accent}25`,
                        color: currentTheme.accent,
                      }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      Live Demo
                    </button>
                  )}

                  {project.linkedinUrl && (
                    <button
                      onClick={() => handleOpenLink(project.linkedinUrl!)}
                      className="flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-md transition-all hover:opacity-100 opacity-75 hover:scale-105"
                      style={{
                        backgroundColor: `${currentTheme.accent}15`,
                        color: currentTheme.textPrimary,
                      }}
                    >
                      <Linkedin className="w-3.5 h-3.5 text-[#0a66c2]" />
                      LinkedIn Post
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Projects;
