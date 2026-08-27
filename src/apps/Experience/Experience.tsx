import React, { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import { motion, AnimatePresence } from 'framer-motion';
import {
  GitCommit,
  GitBranch,
  Calendar,
  MapPin,
  Briefcase,
  GraduationCap,
  Sparkles,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  Tag,
  CheckCircle2,
  Terminal,
  Cpu,
  Download
} from 'lucide-react';
import { downloadProjectDocumentation } from '@/lib/downloadResume';

interface TimelineEntry {
  id: string;
  hash: string;
  type: 'internship' | 'freelance' | 'education';
  title: string;
  role: string;
  companyOrInstitution: string;
  location: string;
  period: string;
  year: string;
  badge?: string;
  summary: string;
  highlights: string[];
  technologies: string[];
  aiIntegrations?: string[];
  deliverables?: { label: string; url?: string }[];
}

const experienceData: TimelineEntry[] = [
  {
    id: 'exp-2026-end-study',
    hash: 'c0mm1t_2026_eos',
    type: 'internship',
    title: 'Web / Smart Mobile Platform for Managing Bus Brake Calipers',
    role: 'End of Study Full-Stack & AI Intern (Graduation Project)',
    companyOrInstitution: 'BUS SOFTWARE',
    location: 'Sousse, Tunisia',
    period: 'February 2026 – May 2026',
    year: '2026',
    badge: 'Graduation Project',
    summary:
      'Engineered an enterprise full-stack web and smart mobile platform dedicated to bus brake calipers management, maintenance tracking, spare parts logistics, and smart inventory workflows with integrated AI vision & voice recognition. Associated with BUS SOFTWARE.',
    highlights: [
      'Problem Solved: Replaced paper-based manual workshop records with a unified digital platform, eliminating errors and providing complete lifecycle traceability from reception to delivery.',
      'Cross-Platform UI: Designed and deployed reactive UI with React for web administrators & React Native for mobile workshop technicians.',
      'Backend Architecture: Developed and secured RESTful APIs with Node.js and Express.js to process calipers lifecycle states, repairs, and orders.',
      'AI Vision & Voice: Integrated MobileNet image recognition for automated caliper model/wear detection & Whisper speech-to-query voice input.',
      'Database Optimization: Structured MongoDB aggregations for rapid tracking of bus repair histories and parts inventory.',
    ],
    technologies: [
      'React',
      'React Native',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'REST APIs',
      'Git/GitHub',
      'Postman',
    ],
    aiIntegrations: ['Whisper Voice API', 'MobileNet Vision AI', 'Llama LLM'],
    deliverables: [
      { label: 'Technical Documentation PDF' },
      { label: 'Frontend & Mobile Platform' },
    ],
  },
  {
    id: 'exp-2025-internship',
    hash: 'c0mm1t_2025_bus',
    type: 'internship',
    title: 'Bus Parts Management System',
    role: 'Full-Stack Web Developer Intern',
    companyOrInstitution: 'Transport Equipment Firm',
    location: 'Sousse, Tunisia',
    period: 'June 2025 – July 2025',
    year: '2025',
    summary:
      'Developed a full-stack web application dedicated to streamlining spare bus parts catalogs, procurement tracking, operator orders, and operational maintenance schedules.',
    highlights: [
      'Built responsive dashboard for cataloging hundreds of mechanical bus components.',
      'Created CRUD RESTful API endpoints for supplier inventory updates and automated stock reordering alerts.',
      'Reduced manual tracking errors through structured role-based access control.',
    ],
    technologies: ['React', 'Node.js', 'Express.js', 'MongoDB', 'Tailwind CSS', 'Postman'],
  },
  {
    id: 'exp-2024-freelance',
    hash: 'c0mm1t_2024_free',
    type: 'freelance',
    title: 'Independent Full-Stack Software Engineering',
    role: 'Freelance Full-Stack Developer',
    companyOrInstitution: 'Independent / Client Projects',
    location: 'Sousse, Tunisia & Remote',
    period: 'January 2024 – Present',
    year: '2024+',
    badge: 'Ongoing',
    summary:
      'Architected and delivered diverse client-facing and production-ready applications spanning modern e-commerce, AI integrations, mapping engines, and enterprise Kanban systems.',
    highlights: [
      'NovaSon: High-performance audio & tech accessories e-commerce built with React 19 & Tailwind CSS v4.',
      'EstateAI: Real estate discovery platform with Leaflet interactive geo-mapping and instant search filters.',
      'GymBot: Full-stack AI fitness coach using Google Gemini 2.5 API for personalized workout & nutrition generation.',
      'SaaS Analytics: B2B metrics dashboard engineered with pure CSS Grid and React 18 without heavyweight UI libraries.',
      'Project Management System: Full-stack Jira-inspired Kanban board with drag-and-drop task workflows.',
    ],
    technologies: [
      'React 18/19',
      'TypeScript',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Tailwind CSS',
      'Gemini AI API',
      'Framer Motion',
      'Zustand',
    ],
  },
  {
    id: 'edu-2026-bachelor',
    hash: 'c0mm1t_edu_bsc',
    type: 'education',
    title: "Bachelor's Degree in Computer Science (Web Development)",
    role: 'Undergraduate Graduate',
    companyOrInstitution:
      "Institut Supérieur d'Informatique et des Technologies de Communication (ISITCom)",
    location: 'Hammam Sousse, Tunisia',
    period: 'September 2023 – June 2026',
    year: '2023 - 2026',
    summary:
      'Specialized curriculum focused on modern software engineering, web architectures, distributed systems, algorithmic optimization, database management, and object-oriented design.',
    highlights: [
      'Core focus on Web Development & Full-Stack engineering.',
      'Mastered Data Structures, Algorithms, Software Testing, and Network Protocols.',
      'Collaborated on multiple team agile sprints and capstone engineering software.',
    ],
    technologies: ['JavaScript', 'TypeScript', 'Java', 'PHP', 'SQL', 'UML', 'Linux', 'Git'],
  },
  {
    id: 'edu-2023-baccalaureate',
    hash: 'c0mm1t_edu_bac',
    type: 'education',
    title: 'Baccalaureate in Computer Science',
    role: 'Secondary Education Graduate',
    companyOrInstitution: 'Lycée Ali Bourguiba',
    location: 'Al Qalah al Kubra, Tunisia',
    period: 'September 2022 – June 2023',
    year: '2022 - 2023',
    summary:
      'Completed specialized scientific baccalaureate track with a concentration in computer science, algorithms, mathematics, and physics.',
    highlights: [
      'Algorithms and logic foundation.',
      'Introduction to Pascal, Python, and relational database concepts.',
    ],
    technologies: ['Algorithms', 'Python', 'Mathematics', 'Computer Science'],
  },
];

const Experience: React.FC = () => {
  const { theme, openWindow, openProjectInspector, addNotification } = useAppStore();
  const currentTheme = themes[theme];

  const [expandedIds, setExpandedIds] = useState<string[]>([
    'exp-2026-end-study',
    'exp-2025-internship',
    'exp-2024-freelance',
  ]);
  const [filterType, setFilterType] = useState<'all' | 'internship' | 'freelance' | 'education'>('all');

  const toggleExpand = (id: string) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const filteredData = experienceData.filter((item) => {
    if (filterType === 'all') return true;
    return item.type === filterType;
  });

  return (
    <div
      className="h-full p-4 sm:p-6 md:p-8 overflow-y-auto"
      style={{ color: currentTheme.textPrimary }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b" style={{ borderColor: currentTheme.cardBorder }}>
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xl">📜</span>
              <h1 className="text-2xl font-bold">Experience & Career Log</h1>
              <span
                className="text-xs px-2.5 py-0.5 rounded-full font-mono font-semibold"
                style={{
                  backgroundColor: `${currentTheme.accent}20`,
                  color: currentTheme.accent,
                }}
              >
                git log --graph
              </span>
            </div>
            <p className="text-xs sm:text-sm opacity-70">
              System timeline of professional internships, full-stack engineering contracts, and formal education.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 flex-wrap">
            {[
              { id: 'all', label: 'All Commits' },
              { id: 'internship', label: 'Internships' },
              { id: 'freelance', label: 'Freelance' },
              { id: 'education', label: 'Education' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilterType(tab.id as any)}
                className={`text-xs px-3 py-1 rounded-lg font-medium transition-all ${
                  filterType === tab.id ? 'scale-105 shadow-sm' : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: filterType === tab.id ? currentTheme.accent : 'rgba(255,255,255,0.05)',
                  color: filterType === tab.id ? '#ffffff' : currentTheme.textPrimary,
                  border: `1px solid ${filterType === tab.id ? currentTheme.accent : 'rgba(255,255,255,0.08)'}`,
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Timeline Log Tree */}
        <div className="relative pl-6 sm:pl-8 space-y-8 before:absolute before:left-3 sm:before:left-4 before:top-3 before:bottom-3 before:w-0.5 before:bg-gradient-to-b before:from-orange-500 before:via-orange-500/40 before:to-transparent">
          {filteredData.map((item, index) => {
            const isExpanded = expandedIds.includes(item.id);
            const isEducation = item.type === 'education';

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.25, delay: index * 0.05 }}
                className="relative group"
              >
                {/* Git Node / Commit Marker */}
                <div
                  className="absolute -left-[30px] sm:-left-[35px] top-1.5 w-6 h-6 rounded-full flex items-center justify-center border-2 shadow-md transition-transform duration-200 group-hover:scale-125"
                  style={{
                    backgroundColor: currentTheme.windowBg,
                    borderColor: currentTheme.accent,
                    color: currentTheme.accent,
                  }}
                >
                  {isEducation ? (
                    <GraduationCap className="w-3 h-3" />
                  ) : (
                    <GitCommit className="w-3 h-3" />
                  )}
                </div>

                {/* Commit Entry Card */}
                <div
                  className="rounded-xl border overflow-hidden transition-all duration-200 hover:shadow-lg"
                  style={{
                    backgroundColor: `${currentTheme.accent}0A`,
                    borderColor: `${currentTheme.accent}25`,
                  }}
                >
                  {/* Card Header (Click to toggle details) */}
                  <div
                    onClick={() => toggleExpand(item.id)}
                    className="p-4 sm:p-5 cursor-pointer flex flex-col sm:flex-row sm:items-center justify-between gap-3 select-none hover:bg-white/[0.02]"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="font-mono text-xs opacity-60 font-semibold tracking-wider text-orange-400">
                          [{item.hash}]
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded font-mono font-bold bg-white/5 border border-white/10">
                          {item.year}
                        </span>
                        {item.badge && (
                          <span
                            className="text-[10px] font-bold px-2 py-0.5 rounded-full uppercase flex items-center gap-1 shadow-sm"
                            style={{ backgroundColor: currentTheme.accent, color: '#ffffff' }}
                          >
                            <Sparkles className="w-2.5 h-2.5" />
                            {item.badge}
                          </span>
                        )}
                      </div>

                      <h3 className="text-base sm:text-lg font-bold tracking-tight" style={{ color: currentTheme.textPrimary }}>
                        {item.title}
                      </h3>

                      <div className="flex items-center gap-3 text-xs opacity-75 mt-1 flex-wrap">
                        <span className="font-semibold" style={{ color: currentTheme.accent }}>
                          {item.role}
                        </span>
                        <span>•</span>
                        <span>{item.companyOrInstitution}</span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          {item.location}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-xs font-mono opacity-60 hidden md:inline">
                        {item.period}
                      </span>
                      <button
                        className="p-1 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                        aria-label="Toggle details"
                      >
                        {isExpanded ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Expandable Details Section */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="px-4 pb-5 sm:px-5 border-t space-y-4"
                        style={{ borderColor: `${currentTheme.accent}15` }}
                      >
                        {/* Summary */}
                        <p className="text-xs sm:text-sm leading-relaxed opacity-85 pt-3">
                          {item.summary}
                        </p>

                        {/* Bullet Highlights */}
                        <div className="space-y-2">
                          <span className="text-xs font-semibold uppercase tracking-wider opacity-60 block">
                            Key Deliverables & Responsibilities
                          </span>
                          <ul className="space-y-1.5">
                            {item.highlights.map((bullet, bIdx) => (
                              <li key={bIdx} className="text-xs sm:text-sm flex items-start gap-2 opacity-80 leading-relaxed">
                                <CheckCircle2 className="w-3.5 h-3.5 mt-0.5 text-green-400 shrink-0" />
                                <span>{bullet}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* AI Integration Highlight if available */}
                        {item.aiIntegrations && item.aiIntegrations.length > 0 && (
                          <div className="p-3 rounded-lg bg-orange-500/10 border border-orange-500/25">
                            <div className="flex items-center gap-2 text-xs font-bold text-orange-400 mb-1.5">
                              <Cpu className="w-3.5 h-3.5" />
                              <span>AI & Machine Learning Implementations</span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {item.aiIntegrations.map((aiTech) => (
                                <span
                                  key={aiTech}
                                  className="text-[11px] font-mono px-2 py-0.5 rounded bg-orange-500/20 text-orange-300 font-semibold"
                                >
                                  {aiTech}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Tech Stack Pills */}
                        <div>
                          <span className="text-xs font-semibold uppercase tracking-wider opacity-60 block mb-2">
                            Technologies & Tools Utilized
                          </span>
                          <div className="flex flex-wrap gap-1.5">
                            {item.technologies.map((tech) => (
                              <span
                                key={tech}
                                className="text-[11px] px-2.5 py-0.5 rounded-md font-medium"
                                style={{
                                  backgroundColor: `${currentTheme.accent}20`,
                                  color: currentTheme.accent,
                                  border: `1px solid ${currentTheme.accent}30`,
                                }}
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Direct Actions for Graduation Project */}
                        {item.id === 'exp-2026-end-study' && (
                          <div className="pt-2 flex items-center gap-2 flex-wrap">
                            <button
                              onClick={async () => {
                                addNotification('📥 Downloading documentation.pdf...', 'info');
                                const ok = await downloadProjectDocumentation('documentation.pdf');
                                if (ok) addNotification('✅ Documentation downloaded!', 'success');
                              }}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all hover:scale-105 shadow-sm active:scale-95"
                              style={{
                                backgroundColor: currentTheme.accent,
                                color: '#ffffff',
                              }}
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Download Documentation (PDF)</span>
                            </button>
                            <button
                              onClick={() => openProjectInspector(0)}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105"
                            >
                              <span>View Project Specifications</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}

                        {/* Direct Jump to Projects Button for Freelance item */}
                        {item.id === 'exp-2024-freelance' && (
                          <div className="pt-2">
                            <button
                              onClick={() => openWindow('projects')}
                              className="text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all hover:scale-105 shadow-sm"
                              style={{
                                backgroundColor: currentTheme.accent,
                                color: '#ffffff',
                              }}
                            >
                              <span>View All Featured Projects</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Experience;
