import React, { useState } from 'react';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import {
  Folder,
  File,
  FileText,
  Image as ImageIcon,
  ArrowLeft,
  Home,
  ChevronRight,
  Download,
  Eye,
  Sparkles,
  HardDrive
} from 'lucide-react';
import DocumentViewerModal from './DocumentViewerModal';
import { downloadPdfResume, downloadProjectDocumentation } from '@/lib/downloadResume';

interface FileItem {
  name: string;
  type: 'folder' | 'file';
  icon: React.ElementType;
  children?: FileItem[];
  content?: string;
  isPdfCv?: boolean;
  isPdfDoc?: boolean;
  isImage?: boolean;
  imageUrl?: string;
}

const fileSystem: FileItem[] = [
  {
    name: 'Documents',
    type: 'folder',
    icon: Folder,
    children: [
      {
        name: 'Mohamed_El_Ouardi_CV.pdf',
        type: 'file',
        icon: FileText,
        isPdfCv: true,
        content: 'Official developer resume of Mohamed El Ouardi (Full-Stack Engineer)',
      },
      {
        name: 'documentation.pdf',
        type: 'file',
        icon: FileText,
        isPdfDoc: true,
        content: 'Official Graduation Project Technical Documentation: Web / Smart Mobile Platform for Managing Bus Brake Calipers (Associated with BUS SOFTWARE).',
      },
      {
        name: 'Cover_Letter_Mohamed.txt',
        type: 'file',
        icon: FileText,
        content: `Dear Hiring Manager,

I am writing to express my strong enthusiasm for full-stack and frontend software engineering opportunities. With a Bachelor's degree in Computer Science from ISITCom Hammam Sousse, 3+ years of production experience in React, TypeScript, Node.js, Express, and MongoDB, and a passion for crafting state-of-the-art web products, I am eager to contribute to high-impact teams.

Thank you for your time and consideration.

Best regards,
Mohamed El Ouardi`,
      },
      {
        name: 'Bachelor_Degree_ISITCom.png',
        type: 'file',
        icon: ImageIcon,
        isImage: true,
        imageUrl: './Bachelor_Degree_ISITCom.png',
        content: 'Official National Bachelor Degree in Computer Science (Multimedia & Web Development) from ISITCom Hammam Sousse, University of Sousse (Mention: Bien / حسن)',
      },
    ],
  },
  {
    name: 'Projects',
    type: 'folder',
    icon: Folder,
    children: [
      {
        name: 'bus-calipers-platform/',
        type: 'folder',
        icon: Folder,
        children: [
          {
            name: 'README.md',
            type: 'file',
            icon: FileText,
            content: '# Web / Smart Mobile Platform for Managing Bus Brake Calipers\nAssociated with BUS SOFTWARE — End of Study Engineering Graduation Project.\n\nProblem Statement:\nMaintenance workshops rely heavily on manual processes such as paper-based records, leading to delays, errors, and lack of traceability. Additionally, the absence of centralized systems limits visibility and reduces productivity. This project addresses the need for maintenance workshops to adopt digital solutions for managing spare parts, including reception, repair, and delivery with a unified centralized system.\n\nArchitecture & Stack:\n- Web Management: React, Node.js, Express.js, MongoDB\n- Mobile App: React Native\n- AI Integrations: MobileNet Computer Vision & Whisper Speech-to-Query Voice Input\n- Full documentation available in documentation.pdf',
          },
          {
            name: 'documentation.pdf',
            type: 'file',
            icon: FileText,
            isPdfDoc: true,
            content: 'Graduation Project Technical Architecture & Modules Specification PDF (BUS SOFTWARE).',
          },
        ],
      },
      {
        name: 'novason-ecommerce/',
        type: 'folder',
        icon: Folder,
        children: [
          {
            name: 'README.md',
            type: 'file',
            icon: FileText,
            content: '# NovaSon — Audio & Tech E-Commerce\nBuilt with React 19 & Tailwind CSS v4.\nFeatures wireless audio showcase, ANC details, and instant cart drawer.\nGitHub: https://github.com/mohamedwardi068/NovaSon',
          },
        ],
      },
      {
        name: 'estate-ai-platform/',
        type: 'folder',
        icon: Folder,
        children: [
          {
            name: 'README.md',
            type: 'file',
            icon: FileText,
            content: '# EstateAI — Real Estate Discovery\nBuilt with React, TypeScript, Leaflet Maps, and Framer Motion.\nInteractive geo-search and property details.\nGitHub: https://github.com/mohamedwardi068/EstateAI',
          },
        ],
      },
      {
        name: 'gymbot-ai-coach/',
        type: 'folder',
        icon: Folder,
        children: [
          {
            name: 'README.md',
            type: 'file',
            icon: FileText,
            content: '# GymBot — AI Fitness & Nutrition Coach\nFull-Stack MERN app integrating Google Gemini 2.5 Flash API.\nGenerates custom daily workout splits and nutrition macros.\nGitHub: https://github.com/mohamedwardi068/AiPoweredGymApp',
          },
        ],
      },
      {
        name: 'saas-analytics-dashboard/',
        type: 'folder',
        icon: Folder,
        children: [
          {
            name: 'README.md',
            type: 'file',
            icon: FileText,
            content: '# SaaS Analytics Dashboard\nEnterprise B2B metrics dashboard built with pure CSS Grid and React without UI libraries.\nGitHub: https://github.com/mohamedwardi068/E_commerce_Dashboard',
          },
        ],
      },
      {
        name: 'project-management-kanban/',
        type: 'folder',
        icon: Folder,
        children: [
          {
            name: 'README.md',
            type: 'file',
            icon: FileText,
            content: '# Project Management System\nFull-Stack agile Kanban board with drag-and-drop tasks, Context API, Node.js & MongoDB.\nGitHub: https://github.com/mohamedwardi068/ProjectManagementSystem',
          },
        ],
      },
      {
        name: 'portfolio-os/',
        type: 'folder',
        icon: Folder,
        children: [
          {
            name: 'README.md',
            type: 'file',
            icon: FileText,
            content: '# Portfolio OS — Workstation Experience\n\nInteractive Ubuntu workstation developer portfolio simulator.\n\n- Live Demo: https://grand-queijadas-012417.netlify.app/\n- Video Walkthrough: https://res.cloudinary.com/dthb3ojqm/video/upload/v1787837353/demo_wprbnl.mp4\n- GitHub: https://github.com/mohamedwardi068/portfolio\n- Stack: React 18, TypeScript, Tailwind CSS, Framer Motion, Zustand, Web Audio API',
          },
        ],
      },
      {
        name: 'README.md',
        type: 'file',
        icon: FileText,
        content: '# Featured Developer Repositories\nTotal 10 production projects available in Projects app.\nDeveloper: Mohamed El Ouardi',
      },
    ],
  },
  {
    name: 'Experience_Logs',
    type: 'folder',
    icon: Folder,
    children: [
      {
        name: 'internship_2026_calipers.txt',
        type: 'file',
        icon: FileText,
        content: 'End of Study Internship 2026: Web/Mobile Platform for Bus Brake Calipers with AI vision & voice recognition.',
      },
      {
        name: 'internship_2025_bus_parts.txt',
        type: 'file',
        icon: FileText,
        content: 'Web Developer Internship 2025: Bus Parts Management System (Full-Stack).',
      },
    ],
  },
  {
    name: 'Mohamed_El_Ouardi_CV.pdf',
    type: 'file',
    icon: FileText,
    isPdfCv: true,
    content: 'Primary curriculum vitae of Mohamed El Ouardi (Full-Stack Engineer).',
  },
  {
    name: 'README.md',
    type: 'file',
    icon: FileText,
    content: 'Welcome to Mohamed OS Workstation! Explore projects, experience log, and technical skills.',
  },
  {
    name: '.bashrc',
    type: 'file',
    icon: File,
    content: '# Mohamed OS Shell Profile\nalias projects="portfolio-open projects"\nalias skills="portfolio-open skills"\nalias cv="portfolio-open files"\nexport USER="mohamed"\nexport OS="Ubuntu 24.04 LTS"',
  },
];

const FileExplorer: React.FC = () => {
  const { theme, openWindow, addNotification } = useAppStore();
  const currentTheme = themes[theme];

  const [currentPath, setCurrentPath] = useState<string[]>(['Home']);
  const [currentItems, setCurrentItems] = useState<FileItem[]>(fileSystem);
  const [selectedFile, setSelectedFile] = useState<FileItem | null>(null);
  const [pathHistory, setPathHistory] = useState<{ path: string[]; items: FileItem[] }[]>([]);
  const [viewerModal, setViewerModal] = useState<{
    isOpen: boolean;
    fileName: string;
    fileContent?: string;
    isPdfCv?: boolean;
    isImage?: boolean;
    imageUrl?: string;
  }>({
    isOpen: false,
    fileName: '',
  });

  const navigateToFolder = (folder: FileItem) => {
    if (folder.type === 'folder' && folder.children) {
      setPathHistory([...pathHistory, { path: currentPath, items: currentItems }]);
      setCurrentPath([...currentPath, folder.name]);
      setCurrentItems(folder.children);
      setSelectedFile(null);
    }
  };

  const goBack = () => {
    if (pathHistory.length > 0) {
      const previous = pathHistory[pathHistory.length - 1];
      setCurrentPath(previous.path);
      setCurrentItems(previous.items);
      setPathHistory(pathHistory.slice(0, -1));
      setSelectedFile(null);
    }
  };

  const goHome = () => {
    setCurrentPath(['Home']);
    setCurrentItems(fileSystem);
    setPathHistory([]);
    setSelectedFile(null);
  };

  const handleItemClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateToFolder(item);
    } else {
      setSelectedFile(item);
      if (item.isPdfCv || item.isImage) {
        setViewerModal({
          isOpen: true,
          fileName: item.name,
          fileContent: item.content,
          isPdfCv: item.isPdfCv,
          isImage: item.isImage,
          imageUrl: item.imageUrl,
        });
      }
    }
  };

  const handleItemDoubleClick = (item: FileItem) => {
    if (item.type === 'folder') {
      navigateToFolder(item);
    } else {
      setViewerModal({
        isOpen: true,
        fileName: item.name,
        fileContent: item.content,
        isPdfCv: item.isPdfCv,
        isImage: item.isImage,
        imageUrl: item.imageUrl,
      });
    }
  };

  return (
    <div
      className="h-full flex flex-col overflow-hidden"
      style={{ color: currentTheme.textPrimary }}
    >
      {/* Nautilus Top Navigation Toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b select-none"
        style={{
          backgroundColor: currentTheme.windowHeader,
          borderColor: currentTheme.cardBorder,
        }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <button
            onClick={goBack}
            disabled={pathHistory.length === 0}
            className="p-1.5 rounded-lg transition-colors disabled:opacity-30 hover:bg-white/10"
            title="Go Back"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={goHome}
            className="p-1.5 rounded-lg transition-colors hover:bg-white/10"
            title="Home Directory"
          >
            <Home className="w-4 h-4" />
          </button>

          {/* Breadcrumb Path */}
          <div className="flex items-center gap-1 ml-2 text-xs font-mono truncate">
            {currentPath.map((segment, index) => (
              <span key={index} className="flex items-center">
                {index > 0 && <ChevronRight className="w-3.5 h-3.5 mx-1 opacity-50" />}
                <span className={index === currentPath.length - 1 ? 'font-bold text-orange-400' : 'opacity-70'}>
                  {segment}
                </span>
              </span>
            ))}
          </div>
        </div>

        {/* Quick CV Action Bar */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setViewerModal({
                isOpen: true,
                fileName: 'Mohamed_El_Ouardi_CV.pdf',
                isPdfCv: true,
              })
            }
            className="text-xs font-semibold px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
            style={{
              backgroundColor: currentTheme.accent,
              color: '#ffffff',
            }}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Open CV</span>
          </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Nautilus Shortcuts Sidebar */}
        <div
          className="w-44 p-3 border-r hidden sm:flex flex-col gap-1 text-xs select-none shrink-0"
          style={{
            backgroundColor: 'rgba(0,0,0,0.15)',
            borderColor: currentTheme.cardBorder,
          }}
        >
          <span className="text-[10px] font-bold uppercase tracking-wider opacity-50 px-2 py-1">Places</span>
          <button
            onClick={goHome}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <Home className="w-3.5 h-3.5 text-orange-400" />
            <span>Home</span>
          </button>
          <button
            onClick={() => {
              const docs = fileSystem.find((f) => f.name === 'Documents');
              if (docs) {
                goHome();
                navigateToFolder(docs);
              }
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <Folder className="w-3.5 h-3.5 text-orange-400" />
            <span>Documents</span>
          </button>
          <button
            onClick={() => {
              const projs = fileSystem.find((f) => f.name === 'Projects');
              if (projs) {
                goHome();
                navigateToFolder(projs);
              }
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <Folder className="w-3.5 h-3.5 text-orange-400" />
            <span>Projects</span>
          </button>
          <button
            onClick={() => {
              const exps = fileSystem.find((f) => f.name === 'Experience_Logs');
              if (exps) {
                goHome();
                navigateToFolder(exps);
              }
            }}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg hover:bg-white/10 transition-colors text-left"
          >
            <Folder className="w-3.5 h-3.5 text-orange-400" />
            <span>Experience Logs</span>
          </button>
        </div>

        {/* Main Files Grid */}
        <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
          {currentItems.length === 0 ? (
            <p className="text-center opacity-50 mt-12 text-sm font-mono">This folder is empty</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3.5">
              {currentItems.map((item, index) => {
                const isSelected = selectedFile?.name === item.name;
                const IconComponent = item.icon;

                return (
                  <div
                    key={index}
                    onClick={() => handleItemClick(item)}
                    onDoubleClick={() => handleItemDoubleClick(item)}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all border text-center select-none ${
                      isSelected ? 'scale-105 shadow-md' : 'hover:scale-[1.02]'
                    }`}
                    style={{
                      backgroundColor: isSelected
                        ? `${currentTheme.accent}30`
                        : `${currentTheme.accent}0A`,
                      borderColor: isSelected
                        ? currentTheme.accent
                        : `${currentTheme.accent}20`,
                    }}
                  >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-2"
                      style={{
                        backgroundColor: item.type === 'folder' ? `${currentTheme.accent}20` : 'rgba(255,255,255,0.05)',
                        color: item.type === 'folder' ? currentTheme.accent : currentTheme.textPrimary,
                      }}
                    >
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="text-xs font-medium max-w-full truncate px-1" title={item.name}>
                      {item.name}
                    </span>
                    {item.isPdfCv && (
                      <span className="text-[9px] font-bold text-orange-400 uppercase mt-0.5">
                        Interactive CV
                      </span>
                    )}
                    {item.isPdfDoc && (
                      <span className="text-[9px] font-bold text-green-400 uppercase mt-0.5">
                        Documentation
                      </span>
                    )}
                    {item.isImage && (
                      <span className="text-[9px] font-bold text-blue-400 uppercase mt-0.5">
                        Academic Degree
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Selected File Details Panel (Desktop) */}
        {selectedFile && (
          <div
            className="w-64 p-4 border-l overflow-y-auto hidden md:flex flex-col justify-between shrink-0"
            style={{ borderColor: currentTheme.cardBorder }}
          >
            <div>
              <div className="text-center mb-4 pt-2">
                {selectedFile.isImage && selectedFile.imageUrl ? (
                  <div className="w-24 h-20 mx-auto mb-2 rounded-lg overflow-hidden border border-white/20 shadow-md">
                    <img
                      src={selectedFile.imageUrl}
                      alt={selectedFile.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <selectedFile.icon
                    className="w-14 h-14 mx-auto mb-2"
                    style={{ color: currentTheme.accent }}
                  />
                )}
                <h3 className="font-bold text-sm break-all">{selectedFile.name}</h3>
                <span className="text-[11px] opacity-60 font-mono">
                  {selectedFile.type === 'folder'
                    ? 'Folder'
                    : selectedFile.isPdfCv
                    ? 'PDF Document'
                    : selectedFile.isPdfDoc
                    ? 'Project Documentation PDF'
                    : selectedFile.isImage
                    ? 'Official Degree Certificate'
                    : 'Text File'}
                </span>
              </div>

              {selectedFile.content && (
                <div
                  className="p-3 rounded-xl text-xs opacity-85 leading-relaxed overflow-hidden max-h-40 border"
                  style={{
                    backgroundColor: `${currentTheme.accent}10`,
                    borderColor: `${currentTheme.accent}25`,
                  }}
                >
                  <p className="line-clamp-6">{selectedFile.content}</p>
                </div>
              )}
            </div>

            {selectedFile.type === 'file' && (
              <div className="space-y-2 mt-4">
                <button
                  onClick={() =>
                    setViewerModal({
                      isOpen: true,
                      fileName: selectedFile.name,
                      fileContent: selectedFile.content,
                      isPdfCv: selectedFile.isPdfCv,
                      isImage: selectedFile.isImage,
                      imageUrl: selectedFile.imageUrl,
                    })
                  }
                  className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 shadow-sm transition-all hover:scale-105"
                  style={{
                    backgroundColor: currentTheme.accent,
                    color: '#ffffff',
                  }}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>
                    {selectedFile.isPdfCv
                      ? 'Open Interactive CV'
                      : selectedFile.isPdfDoc
                      ? 'View Documentation'
                      : selectedFile.isImage
                      ? 'View Degree Certificate'
                      : 'Open File Viewer'}
                  </span>
                </button>

                {selectedFile.isPdfCv && (
                  <button
                    onClick={async () => {
                      addNotification('📥 Downloading Mohamed_El_Ouardi_CV.pdf...', 'info');
                      const ok = await downloadPdfResume();
                      if (ok) addNotification('✅ PDF Resume downloaded successfully!', 'success');
                    }}
                    className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105"
                  >
                    <Download className="w-3.5 h-3.5 text-orange-400" />
                    <span>Download PDF to PC</span>
                  </button>
                )}

                {selectedFile.isPdfDoc && (
                  <button
                    onClick={async () => {
                      addNotification(`📥 Downloading ${selectedFile.name}...`, 'info');
                      const ok = await downloadProjectDocumentation(selectedFile.name);
                      if (ok) addNotification(`✅ Documentation downloaded!`, 'success');
                    }}
                    className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105"
                  >
                    <Download className="w-3.5 h-3.5 text-green-400" />
                    <span>Download Documentation PDF</span>
                  </button>
                )}

                {selectedFile.isImage && selectedFile.imageUrl && (
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = selectedFile.imageUrl!;
                      link.download = selectedFile.name;
                      link.target = '_blank';
                      link.rel = 'noopener noreferrer';
                      document.body.appendChild(link);
                      link.click();
                      document.body.removeChild(link);
                      addNotification(`📥 Downloaded ${selectedFile.name} locally!`, 'success');
                    }}
                    className="w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105"
                  >
                    <Download className="w-3.5 h-3.5 text-blue-400" />
                    <span>Download Degree PNG</span>
                  </button>
                )}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Interactive CV / Image / Document Viewer Modal */}
      <DocumentViewerModal
        isOpen={viewerModal.isOpen}
        onClose={() => setViewerModal({ isOpen: false, fileName: '' })}
        fileName={viewerModal.fileName}
        fileContent={viewerModal.fileContent}
        isPdfCv={viewerModal.isPdfCv}
        isImage={viewerModal.isImage}
        imageUrl={viewerModal.imageUrl}
      />
    </div>
  );
};

export default FileExplorer;

