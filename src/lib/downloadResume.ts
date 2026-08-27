import { saveAs } from 'file-saver';

export const RESUME_TEXT = `MOHAMED EL OUARDI — Full-Stack Developer
Email: Mohamed.ouardi@isitc.u-sousse.tn | mohamedwardi068@gmail.com
Phone: +216 21238777 | Location: Sousse, Tunisia
GitHub: https://github.com/mohamedwardi068
LinkedIn: https://www.linkedin.com/in/mohamed-wardi-69502b324/

SUMMARY
========
Full-Stack Developer and Computer Science graduate from ISITCom Hammam Sousse specializing in modern Web Development. Proficient in React, TypeScript, Node.js, Express.js, MongoDB, REST APIs, and Generative AI integrations.

WORK EXPERIENCE
===============
1. End of Study Internship (Feb 2026 – May 2026 | Sousse, Tunisia)
   Web / Smart Mobile Platform for Managing Bus Brake Calipers (Associated with BUS SOFTWARE)
   - Frontend: Developed reactive UI with React & React Native for workshop operators.
   - Backend: Designed secured REST APIs using Node.js & Express.js with MongoDB.
   - AI Integration: Integrated MobileNet image recognition and Whisper voice input.

2. Web Developer Intern (June 2025 – July 2025 | Sousse, Tunisia)
   Bus Parts Management System
   - Full-stack web application managing spare parts catalog, orders, and workflows.

3. Freelance Full-Stack Developer (Jan 2024 – Present)
   - NovaSon: Audio & tech accessories e-commerce with React 19 & Tailwind v4.
   - EstateAI: Real estate discovery platform with Leaflet maps & Framer Motion.
   - GymBot: Full-stack AI fitness coach using Google Gemini 2.5 API.
   - SaaS Analytics Dashboard: Enterprise B2B metrics dashboard in pure CSS Grid.
   - Project Management System: Full-stack Jira-inspired Kanban board with REST APIs.

EDUCATION
=========
- Bachelor's Degree in Computer Science (Web Development) — ISITCom Hammam Sousse (2023 - 2026)
- Baccalaureate in Computer Science — Lycée Ali Bourguiba (2022 - 2023)

TECHNICAL SKILLS
================
- Frontend: React 18/19, TypeScript, JavaScript, Next.js, Angular, Tailwind CSS, HTML5, CSS Grid
- Backend: Node.js, Express.js, MongoDB, PostgreSQL, Spring Boot, RESTful APIs
- DevOps: Linux, Docker, Git/GitHub, CI/CD, AWS, Postman
- AI & Tools: Gemini API, Whisper, Llama, MobileNet, Figma, VS Code, Scrum
`;

export const DOCUMENTATION_TEXT = `GRADUATION PROJECT TECHNICAL DOCUMENTATION
=====================================================
Project: Web / Smart Mobile Platform for Managing Bus Brake Calipers
Associated with: BUS SOFTWARE
Developer: Mohamed El Ouardi (Full-Stack Engineer)
Institution: ISITCom Hammam Sousse — University of Sousse (2026)

1. EXECUTIVE SUMMARY & PROBLEM STATEMENT
-----------------------------------------
Maintenance workshops rely heavily on manual processes such as paper-based records,
leading to delays, errors, and lack of traceability. Additionally, the absence of
centralized systems limits visibility and reduces productivity.
This project addresses the need for maintenance workshops to adopt digital solutions
for managing spare parts, including reception, repair, and delivery with a unified
centralized system.

2. ARCHITECTURAL OVERVIEW & TECH STACK
---------------------------------------
- Web Management Dashboard: React 18/19, TypeScript, Tailwind CSS, Recharts
- Mobile Companion App: React Native for cross-platform workshop operator tablets
- Backend Architecture: Node.js, Express.js RESTful APIs with JWT Role-Based Auth
- Database: MongoDB with Mongoose ODM for lifecycle tracking and inventory
- AI Model 1: MobileNet Computer Vision for automated caliper reference & defect detection
- AI Model 2: Whisper Speech-to-Query Voice AI for hands-free workshop logging

3. CORE CAPABILITIES
--------------------
- Reception & Triage with photo inspection & barcode scanning
- Interactive repair checklists and parts replacement tracking
- Hands-free voice commands for technicians with greasy hands
- Complete spare parts lifecycle auditing from intake to delivery
- Automated quality sign-off and dispatch reporting
`;

/**
 * Trigger direct local download of Mohamed El Ouardi's CV (PDF)
 */
export const downloadPdfResume = async (): Promise<boolean> => {
  const fileName = 'Mohamed_El_Ouardi_CV.pdf';
  try {
    const baseUrl = import.meta.env.BASE_URL || './';
    const pdfUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}${fileName}`;
    
    // Fetch and trigger instant blob download using file-saver
    const response = await fetch(pdfUrl);
    if (response.ok) {
      const blob = await response.blob();
      saveAs(blob, fileName);
      return true;
    }
  } catch (e) {
    // ignore and fallback
  }

  // Guaranteed instant fallback
  const fallbackBlob = new Blob([RESUME_TEXT], { type: 'application/pdf;charset=utf-8' });
  saveAs(fallbackBlob, fileName);
  return true;
};

/**
 * Trigger direct local download of Mohamed El Ouardi's Resume as formatted text
 */
export const downloadTxtResume = (): void => {
  const blob = new Blob([RESUME_TEXT], { type: 'text/plain;charset=utf-8' });
  saveAs(blob, 'Mohamed_El_Ouardi_Resume.txt');
};

/**
 * Trigger direct local download of project documentation PDF
 */
export const downloadProjectDocumentation = async (fileName: string = 'documentation.pdf'): Promise<boolean> => {
  try {
    const baseUrl = import.meta.env.BASE_URL || './';
    const pdfUrl = `${baseUrl.endsWith('/') ? baseUrl : baseUrl + '/'}${fileName}`;
    
    const response = await fetch(pdfUrl);
    if (response.ok) {
      const blob = await response.blob();
      saveAs(blob, fileName);
      return true;
    }
  } catch (e) {
    // ignore and fallback
  }

  // Fallback direct blob download
  const fallbackBlob = new Blob([DOCUMENTATION_TEXT], { type: 'application/pdf;charset=utf-8' });
  saveAs(fallbackBlob, fileName);
  return true;
};

/**
 * Trigger browser print dialog for CV
 */
export const printResume = (): void => {
  window.print();
};
