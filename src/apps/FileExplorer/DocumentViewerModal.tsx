import React, { useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppStore } from '@/stores/useAppStore';
import { themes } from '@/styles/themes';
import {
  X,
  Download,
  Printer,
  FileText,
  CheckCircle2,
  Mail,
  Phone,
  MapPin,
  FileDown,
  LogOut,
  ExternalLink,
  Sparkles,
  Award,
  Image as ImageIcon,
  ZoomIn,
  ZoomOut,
  GraduationCap
} from 'lucide-react';
import { downloadPdfResume, downloadTxtResume, printResume } from '@/lib/downloadResume';

interface DocumentViewerModalProps {
  isOpen: boolean;
  onClose: () => void;
  fileName: string;
  fileContent?: string;
  isPdfCv?: boolean;
  isImage?: boolean;
  imageUrl?: string;
}

const DocumentViewerModal: React.FC<DocumentViewerModalProps> = ({
  isOpen,
  onClose,
  fileName,
  fileContent,
  isPdfCv,
  isImage,
  imageUrl,
}) => {
  const { theme, addNotification } = useAppStore();
  const currentTheme = themes[theme];
  const [zoomLevel, setZoomLevel] = useState<number>(1);

  // Reset zoom on modal open
  useEffect(() => {
    if (isOpen) {
      setZoomLevel(1);
    }
  }, [isOpen]);

  // Close modal when pressing Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      return () => window.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

  const handleDownloadPdf = async () => {
    addNotification('📥 Downloading Mohamed_El_Ouardi_CV.pdf to your device...', 'info');
    const success = await downloadPdfResume();
    if (success) {
      addNotification('✅ PDF Resume downloaded successfully!', 'success');
    }
  };

  const handleDownloadTxt = () => {
    downloadTxtResume();
    addNotification('✅ Text Resume (.txt) downloaded locally!', 'success');
  };

  const handleDownloadImage = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = fileName || 'Bachelor_Degree_ISITCom.png';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      addNotification(`📥 Downloaded ${fileName} locally!`, 'success');
    }
  };

  const handlePrint = () => {
    printResume();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-[140] flex items-center justify-center p-2 sm:p-4 md:p-6 bg-black/85 backdrop-blur-md"
        onClick={onClose}
        role="dialog"
        aria-modal="true"
        aria-label="Document Viewer"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ duration: 0.18 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-4xl max-h-[92vh] rounded-2xl shadow-2xl border overflow-hidden flex flex-col"
          style={{
            backgroundColor: currentTheme.windowBg,
            borderColor: currentTheme.windowBorderFocused,
            color: currentTheme.textPrimary,
          }}
        >
          {/* Document Header Toolbar */}
          <div
            className="flex items-center justify-between px-3 sm:px-6 py-3 border-b select-none gap-2"
            style={{
              backgroundColor: currentTheme.windowHeader,
              borderColor: currentTheme.cardBorder,
            }}
          >
            {/* Title & Document Badge */}
            <div className="flex items-center gap-2.5 min-w-0">
              {isImage ? (
                <ImageIcon className="w-5 h-5 text-blue-400 shrink-0" />
              ) : (
                <FileText className="w-5 h-5 text-orange-400 shrink-0" />
              )}
              <div className="min-w-0">
                <h3 className="text-xs sm:text-base font-bold truncate">{fileName}</h3>
                <span className="text-[10px] sm:text-[11px] opacity-60 font-mono block truncate">
                  {isPdfCv
                    ? 'PDF Document Viewer • Interactive CV'
                    : isImage
                    ? 'Image Viewer • Official Academic Credential'
                    : 'Text / Markdown Viewer'}
                </span>
              </div>
            </div>

            {/* Action Buttons Toolbar */}
            <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
              {isPdfCv && (
                <>
                  {/* Primary Download PDF (Local) */}
                  <button
                    onClick={handleDownloadPdf}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: currentTheme.accent,
                      color: '#ffffff',
                    }}
                    title="Download PDF to your computer"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Download PDF</span>
                    <span className="sm:hidden">PDF</span>
                  </button>

                  {/* Secondary Download TXT */}
                  <button
                    onClick={handleDownloadTxt}
                    className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105 active:scale-95"
                    title="Download plain text (.txt) format"
                  >
                    <FileDown className="w-3.5 h-3.5 shrink-0" />
                    <span>Download TXT</span>
                  </button>

                  {/* Print / Save as PDF */}
                  <button
                    onClick={handlePrint}
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105 active:scale-95"
                    title="Print or Save as PDF"
                  >
                    <Printer className="w-3.5 h-3.5 shrink-0" />
                    <span>Print</span>
                  </button>
                </>
              )}

              {isImage && (
                <>
                  {/* Zoom Controls */}
                  <div className="hidden sm:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10">
                    <button
                      onClick={() => setZoomLevel((prev) => Math.max(0.75, prev - 0.25))}
                      className="p-1 rounded hover:bg-white/10 text-xs"
                      title="Zoom Out"
                    >
                      <ZoomOut className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[11px] font-mono px-1 opacity-70">
                      {Math.round(zoomLevel * 100)}%
                    </span>
                    <button
                      onClick={() => setZoomLevel((prev) => Math.min(2, prev + 0.25))}
                      className="p-1 rounded hover:bg-white/10 text-xs"
                      title="Zoom In"
                    >
                      <ZoomIn className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Download Image Button */}
                  <button
                    onClick={handleDownloadImage}
                    className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-md transition-all hover:scale-105 active:scale-95"
                    style={{
                      backgroundColor: currentTheme.accent,
                      color: '#ffffff',
                    }}
                    title="Download original certificate image"
                  >
                    <Download className="w-3.5 h-3.5 shrink-0" />
                    <span className="hidden sm:inline">Download Degree</span>
                    <span className="sm:hidden">Download</span>
                  </button>

                  <button
                    onClick={handlePrint}
                    className="hidden sm:flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105 active:scale-95"
                    title="Print Document"
                  >
                    <Printer className="w-3.5 h-3.5 shrink-0" />
                    <span>Print</span>
                  </button>
                </>
              )}

              {/* Explicit, Prominent EXIT / CLOSE Button */}
              <button
                onClick={onClose}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-red-500/20 hover:bg-red-500/35 text-red-300 hover:text-white border border-red-500/40 transition-all hover:scale-105 active:scale-95 shadow-sm ml-1"
                aria-label="Exit Viewer"
                title="Exit Document Viewer (Esc)"
              >
                <LogOut className="w-3.5 h-3.5 shrink-0 rotate-180" />
                <span className="font-semibold">Exit</span>
              </button>
            </div>
          </div>

          {/* Document Body */}
          <div className="flex-1 overflow-y-auto p-3 sm:p-6 md:p-8 bg-[#1E1C1C] text-neutral-200">
            {isPdfCv ? (
              /* High-End Clean Formatted CV Render (A4 Document Canvas) */
              <div className="max-w-3xl mx-auto space-y-6">
                <div
                  id="printable-cv-content"
                  className="bg-[#252222] border border-white/10 rounded-xl p-5 sm:p-8 md:p-10 shadow-2xl space-y-8 font-sans"
                >
                  {/* CV Header */}
                  <div className="border-b border-white/10 pb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                          MOHAMED EL OUARDI
                        </h1>
                        <Award className="w-5 h-5 text-orange-400 shrink-0" />
                      </div>
                      <p className="text-base font-bold text-orange-400 mt-1">
                        Full-Stack Software Developer
                      </p>
                      <p className="text-xs text-neutral-400 mt-1 max-w-xl leading-relaxed">
                        Computer Science graduate from ISITCom Hammam Sousse specializing in modern Web Development. Passionate about building robust architectures, intuitive user interfaces, and generative AI integrations.
                      </p>
                    </div>

                    <div className="text-xs space-y-1.5 text-neutral-300 shrink-0 font-mono bg-white/[0.03] p-3 rounded-xl border border-white/5">
                      <p className="flex items-center gap-1.5">
                        <Mail className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span className="break-all">Mohamed.ouardi@isitc.u-sousse.tn</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <Phone className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span>+216 21238777</span>
                      </p>
                      <p className="flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                        <span>Sousse, Tunisia</span>
                      </p>
                      <p className="flex items-center gap-1.5 text-green-400 font-semibold pt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                        <span>Open to Remote & Full-Time</span>
                      </p>
                    </div>
                  </div>

                  {/* Work Experience */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4 border-b border-orange-500/20 pb-1 flex items-center justify-between">
                      <span>Work Experience & Internships</span>
                      <span className="font-mono text-[10px] opacity-60">3+ Years</span>
                    </h2>

                    <div className="space-y-6 text-xs sm:text-sm">
                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white gap-1">
                          <span>Web / Smart Mobile Platform for Managing Bus Brake Calipers</span>
                          <span className="font-mono text-xs text-orange-400 sm:text-neutral-300">Feb 2026 – May 2026</span>
                        </div>
                        <p className="text-orange-300 font-medium text-xs">End of Study Full-Stack & AI Intern • Sousse, Tunisia</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-300 leading-relaxed text-xs">
                          <li>Developed user-friendly reactive interface using React & React Native for workshop operators.</li>
                          <li>Engineered secured Node.js / Express.js REST APIs for business logic and MongoDB lifecycle aggregation.</li>
                          <li>Integrated AI algorithms (MobileNet computer vision for parts logging & Whisper voice command input).</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white gap-1">
                          <span>Bus Parts Management System</span>
                          <span className="font-mono text-xs text-orange-400 sm:text-neutral-300">June 2025 – July 2025</span>
                        </div>
                        <p className="text-orange-300 font-medium text-xs">Web Developer Intern • Sousse, Tunisia</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-300 leading-relaxed text-xs">
                          <li>Contributed to full-stack web application dedicated to managing bus spare parts, orders, and workflows.</li>
                        </ul>
                      </div>

                      <div>
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white gap-1">
                          <span>Freelance Full-Stack Engineering Projects</span>
                          <span className="font-mono text-xs text-orange-400 sm:text-neutral-300">Jan 2024 – Present</span>
                        </div>
                        <p className="text-orange-300 font-medium text-xs">Independent Developer • Sousse, Tunisia</p>
                        <ul className="list-disc list-inside mt-2 space-y-1 text-neutral-300 leading-relaxed text-xs">
                          <li><strong>NovaSon:</strong> Audio E-Commerce with React 19 & Tailwind CSS v4.</li>
                          <li><strong>EstateAI:</strong> Real estate discovery platform with Leaflet interactive maps.</li>
                          <li><strong>GymBot:</strong> Full-stack AI fitness coach using Google Gemini 2.5 API.</li>
                          <li><strong>SaaS Analytics Dashboard:</strong> Enterprise B2B metrics dashboard in pure CSS Grid.</li>
                          <li><strong>Project Management System:</strong> Full-stack Kanban board with Node.js & MongoDB.</li>
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-4 border-b border-orange-500/20 pb-1">
                      Education & Degrees
                    </h2>

                    <div className="space-y-3 text-xs sm:text-sm">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white gap-1">
                        <span>Bachelor's Degree in Computer Science (Web Development)</span>
                        <span className="font-mono text-xs text-orange-400 sm:text-neutral-300">2023 – 2026</span>
                      </div>
                      <p className="text-neutral-300 text-xs">Institut Supérieur d'Informatique et des Technologies de Communication (ISITCom), Hammam Sousse</p>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between font-bold text-white pt-2 gap-1">
                        <span>Baccalaureate in Computer Science</span>
                        <span className="font-mono text-xs text-orange-400 sm:text-neutral-300">2022 – 2023</span>
                      </div>
                      <p className="text-neutral-300 text-xs">Lycée Ali Bourguiba, Al Qalah al Kubra, Tunisia</p>
                    </div>
                  </div>

                  {/* Technical Stack */}
                  <div>
                    <h2 className="text-xs font-bold uppercase tracking-wider text-orange-400 mb-3 border-b border-orange-500/20 pb-1">
                      Technical Skills & Inventory
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-300">
                      <p><strong className="text-white">Frontend:</strong> React 18/19, TypeScript, JavaScript (ES6+), Tailwind CSS v4, Next.js, Angular, HTML5, CSS Grid</p>
                      <p><strong className="text-white">Backend:</strong> Node.js, Express.js, MongoDB, PostgreSQL, Spring Boot, REST APIs, Java, PHP</p>
                      <p><strong className="text-white">DevOps & Cloud:</strong> Linux, Docker, Git/GitHub, CI/CD, AWS, Postman, Vercel, Netlify</p>
                      <p><strong className="text-white">AI Integrations:</strong> Gemini 2.5 API, Whisper Audio, Llama, MobileNet</p>
                    </div>
                  </div>
                </div>

                {/* Bottom Quick-Action Bar & Prominent Exit Controls */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleDownloadPdf}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: currentTheme.accent,
                        color: '#ffffff',
                      }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download PDF to PC</span>
                    </button>
                    <button
                      onClick={handleDownloadTxt}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105"
                    >
                      <FileDown className="w-4 h-4" />
                      <span>Download .TXT</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print / Save PDF</span>
                    </button>
                  </div>

                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-500/20 hover:bg-red-500/35 text-red-300 hover:text-white border border-red-500/40 transition-all hover:scale-105 active:scale-95 ml-auto"
                  >
                    <LogOut className="w-4 h-4 rotate-180" />
                    <span>Exit & Close Resume</span>
                  </button>
                </div>
              </div>
            ) : isImage ? (
              /* High-Resolution Image Document Viewer (e.g., Bachelor Diploma) */
              <div className="max-w-4xl mx-auto space-y-4">
                {/* Meta Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.03] border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white">National Bachelor Degree in Computer Science</h4>
                      <p className="text-xs text-neutral-400">
                        Higher Institute of Computer Science and Communication Technologies (ISITCom), University of Sousse
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-2.5 py-1 rounded-lg bg-green-500/20 text-green-300 border border-green-500/30 font-medium">
                      Mention: Bien (حسن)
                    </span>
                    <span className="px-2.5 py-1 rounded-lg bg-orange-500/20 text-orange-300 border border-orange-500/30 font-medium">
                      2023 – 2026
                    </span>
                  </div>
                </div>

                {/* Degree Image Canvas Container */}
                <div
                  id="printable-cv-content"
                  className="relative overflow-hidden rounded-2xl border border-white/15 bg-[#121212] p-2 sm:p-4 shadow-2xl flex items-center justify-center min-h-[400px]"
                >
                  <motion.img
                    src={imageUrl || './Bachelor_Degree_ISITCom.png'}
                    alt={fileName}
                    style={{ scale: zoomLevel }}
                    className="max-h-[70vh] w-auto object-contain rounded-xl shadow-lg transition-transform duration-200"
                  />
                </div>

                {/* Bottom Quick-Action Bar */}
                <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-white/[0.04] border border-white/10">
                  <div className="flex items-center gap-2 flex-wrap">
                    <button
                      onClick={handleDownloadImage}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold shadow-md transition-all hover:scale-105 active:scale-95"
                      style={{
                        backgroundColor: currentTheme.accent,
                        color: '#ffffff',
                      }}
                    >
                      <Download className="w-4 h-4" />
                      <span>Download Degree Image</span>
                    </button>
                    <button
                      onClick={handlePrint}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/15 border border-white/10 transition-all hover:scale-105"
                    >
                      <Printer className="w-4 h-4" />
                      <span>Print Document</span>
                    </button>
                  </div>

                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-500/20 hover:bg-red-500/35 text-red-300 hover:text-white border border-red-500/40 transition-all hover:scale-105 active:scale-95 ml-auto"
                  >
                    <LogOut className="w-4 h-4 rotate-180" />
                    <span>Exit Viewer</span>
                  </button>
                </div>
              </div>
            ) : (
              /* Regular Text / Markdown Preview */
              <div className="max-w-2xl mx-auto space-y-4">
                <div className="bg-black/30 p-6 rounded-xl border border-white/10 font-mono text-xs leading-relaxed whitespace-pre-wrap">
                  {fileContent || 'No content to display.'}
                </div>
                <div className="flex justify-end">
                  <button
                    onClick={onClose}
                    className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold bg-red-500/20 hover:bg-red-500/35 text-red-300 border border-red-500/40 transition-all hover:scale-105"
                  >
                    <LogOut className="w-4 h-4 rotate-180" />
                    <span>Exit Document Viewer</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default DocumentViewerModal;
