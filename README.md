<h1 align="center">
  🖥️ Mohamed El Ouardi - Interactive Portfolio OS
</h1>

<p align="center">
  A modern, immersive desktop operating system portfolio built with React 18, TypeScript, Tailwind CSS, Framer Motion, and Zustand — featuring multi-window management, an interactive Unix terminal with custom commands, in-OS simulated web browser, virtual file explorer, customizable themes (Ubuntu, Dark, Hacker Matrix), sound effects, and comprehensive engineering project showcases.
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v18%2B-339933?logo=node.js&logoColor=white" alt="Node.js" />
  <img src="https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=black" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-3-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind" />
  <img src="https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white" alt="Vite" />
  <img src="https://img.shields.io/badge/Framer_Motion-12-FF0055?logo=framer&logoColor=white" alt="Framer Motion" />
  <img src="https://img.shields.io/badge/Zustand-5-443E38?logo=react&logoColor=white" alt="Zustand" />
  <img src="https://img.shields.io/badge/Radix_UI-Components-161618?logo=radix-ui&logoColor=white" alt="Radix UI" />
  <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="License" />
</p>

---

## Features

- **Interactive Desktop OS & Window Manager**: Complete multi-window desktop experience with draggable, resizable, minimizable, maximizable, and focusable windows with accurate z-index layering.
- **Simulated Unix Terminal (`TerminalApp`)**: Interactive CLI terminal with command history (Up/Down navigation), real-time Web Audio sound synthesis, and rich commands (`neofetch`, `whoami`, `stack`, `projects`, `experience`, `theme`, `sudo hire-me`, `cv`, `docs`).
- **Rich Project Showcase & Modal Inspector**: Interactive catalog of full-stack, AI/ML, and mobile applications with category filtering, search, architecture diagrams, live demos, and downloadable project documentation.
- **In-OS Web Browser (`BrowserApp`)**: Integrated web browser simulation featuring tab management, quick bookmarks, omnibox navigation, and responsive web preview frames.
- **Virtual File Explorer (`FileExplorerApp`)**: Browse the portfolio workspace file tree, view code snippets, documents, and double-click to launch associated system applications.
- **Dynamic Theme Engine & Matrix Rain**: Instant live switching between **Ubuntu Aubergine**, **Midnight Developer (Dark)**, and **Cyber Terminal (Hacker mode)** with an animated Matrix Rain canvas background.
- **Realistic Boot & Login Simulation**: Ubuntu-inspired boot sequence animation, login lock screen with avatar authentication, and a one-click Recruiter Fast-Pass protocol.
- **Audio Feedback & Synthesizer**: Built-in Web Audio API synthesizer delivering subtle mechanical keyboard typing sounds and window snap audio effects.
- **Direct Resume & Thesis Downloads**: Download curated PDF/TXT resume files and the complete Graduation Project engineering documentation directly from the desktop.

---

## Tech Stack

### Frontend & Core
- **Framework**: [React 18](https://react.dev/) (TypeScript)
- **State Management**: [Zustand 5](https://github.com/pmndrs/zustand)
- **Styling**: [Tailwind CSS 3](https://tailwindcss.com/) & [Tailwind Animate](https://github.com/jamiebuilds/tailwindcss-animate)
- **Animation & Motion**: [Framer Motion 12](https://www.framer.com/motion/) & HTML5 Canvas 2D
- **Window Mechanics**: [react-rnd](https://github.com/bokuweb/react-rnd) & [react-resizable-panels](https://github.com/bvaughn/react-resizable-panels)
- **UI Components**: [Radix UI](https://www.radix-ui.com/) Primitives, [Lucide React](https://lucide.dev/), [React Icons](https://react-icons.github.io/react-icons/)
- **Contact & Email**: [@emailjs/browser](https://www.emailjs.com/)
- **Build Tool & Bundler**: [Vite 5](https://vitejs.dev/) with SWC React plugin

---

## Project Structure

```
portfolio/
├── public/                    # Static assets, wallpapers, docs & icons
│   ├── documentation.pdf      # Graduation project documentation
│   └── favicon.svg
│
├── src/
│   ├── apps/                  # Desktop OS Applications
│   │   ├── About/             # Biography, education, career goals & stats
│   │   ├── Browser/           # In-OS simulated web browser with tabs & bookmarks
│   │   ├── Contact/           # Interactive EmailJS contact form & socials
│   │   ├── Experience/        # Career timeline, internships & milestones
│   │   ├── FileExplorer/      # Virtual file system navigator & file viewer
│   │   ├── Projects/          # Project catalog, filter tags, inspector & details
│   │   ├── Settings/          # Theme switcher, wallpapers & sound FX settings
│   │   ├── Skills/            # Interactive skills matrix, radar & progress gauges
│   │   └── Terminal/          # Interactive Unix command-line shell
│   │
│   ├── components/            # System & OS UI components
│   │   ├── BootScreen/        # Ubuntu bootloader animation
│   │   ├── Desktop/           # Wallpaper, matrix canvas & desktop icons
│   │   ├── Dock/              # App launcher dock with active indicators & tooltips
│   │   ├── Launcher/          # Fullscreen application search modal
│   │   ├── LoginScreen/       # Lockscreen authentication & recruiter bypass
│   │   ├── Notification/      # Desktop toast notification manager
│   │   ├── TopBar/            # Status bar (Clock, Battery, Theme, Sound controls)
│   │   ├── WindowManager/     # Window frame, title bar controls & resize handles
│   │   └── ui/                # Radix UI reusable primitives & design tokens
│   │
│   ├── hooks/                 # Custom React hooks
│   ├── lib/                   # Utility helpers & resume generation logic
│   ├── stores/                # Zustand global state stores (OS state & browser state)
│   ├── styles/                # Theme presets (Ubuntu, Dark, Hacker) & CSS
│   ├── App.tsx                # Main OS Shell entry
│   └── main.tsx               # Application mounting point
│
├── index.html                 # HTML entry point with metadata & fonts
├── tailwind.config.ts         # Tailwind design system configuration
├── vite.config.ts             # Vite build & alias configuration
└── package.json               # Dependencies and scripts
```

---

## Installation

### Prerequisites

- **Node.js** v18 or higher - [Download](https://nodejs.org/)
- **npm**, **bun**, or **pnpm** package manager

---

### 1. Clone the Repository

```bash
git clone https://github.com/mohamedwardi068/portfolio.git
cd portfolio
```

---

### 2. Install Dependencies

```bash
npm install
```

---

### 3. Start the Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173`.

---

### 4. Build for Production

```bash
# Generate optimized production build
npm run build

# Preview the production build locally
npm run preview
```

---

### 5. Deployment

The project includes automated deployment support for GitHub Pages:

```bash
npm run deploy
```

---

## Desktop Applications

| Application | Icon | Description | Key Features |
|-------------|:----:|-------------|--------------|
| **Terminal** | `>_` | Unix-style interactive command-line interface | Custom command execution, audio synthesis, history navigation (`↑`/`↓`), `neofetch`, `sudo hire-me` |
| **Projects** | 🚀 | Showcase of software engineering projects | Live demo links, architectural breakdown, video walkthroughs, documentation download, category filtering |
| **Experience** | 💼 | Professional career timeline & internships | Associated roles (BUS SOFTWARE), achievements, tech stacks, and career milestones |
| **Skills** | ⚡ | Interactive technology inventory | Categorized skills (Frontend, Backend, Databases, AI, DevOps), proficiency indicators & badges |
| **About Me** | 👨‍💻 | Biography, engineering background & stats | Education details (ISITCom), core principles, quick stats, and downloadable resumes |
| **Browser** | 🌐 | In-OS simulated web browser | Omnibox URL bar, search integration, tabs, curated dev bookmarks, and preview frames |
| **File Explorer** | 📁 | Virtual filesystem explorer | Directory navigation, code/markdown file viewing, asset inspection, double-click to launch apps |
| **Settings** | ⚙️ | System customization control center | Live theme switching, wallpaper options, audio FX toggle, and workstation system specs |
| **Contact** | ✉️ | Direct messaging & social links | Working EmailJS form with field validation, direct mail, phone, LinkedIn, and GitHub links |

---

## Terminal Commands Reference

| Command | Description | Example Output / Action |
|---------|-------------|-------------------------|
| `help` | List all available terminal commands | Displays structured command cheat sheet |
| `whoami` | Display engineer bio & profile summary | Shows name, title, education, and engineering focus |
| `stack` / `skills` | Show categorized technical skills inventory | Lists languages, frameworks, databases, and tools |
| `projects` | Browse featured applications & open Projects app | Launches the interactive Projects window |
| `experience` | View career timeline & internships | Launches the Experience window |
| `neofetch` | Display Mohamed OS system specifications | ASCII art banner with system specs, uptime, and kernel info |
| `contact` | Display contact methods & social media links | Opens Contact window with email & phone details |
| `cv` / `resume` | Download professional resume | Generates and downloads PDF/TXT resume file |
| `docs` | Download graduation project documentation | Direct download of engineering thesis (PDF) |
| `theme <name>` | Change OS theme (`ubuntu`, `dark`, `hacker`) | Swaps visual theme and accent colors in real-time |
| `ls` | List contents of virtual workspace directory | Lists simulated filesystem directories and files |
| `clear` | Clear terminal screen history | Clears terminal console view |
| `sudo hire-me` | Trigger high-priority recruitment protocol | Unlocks recruiter contact modal & direct scheduling |

---

## System Themes

| Theme | Accent Color | Description |
|-------|:------------:|-------------|
| **Ubuntu Aubergine** | `#E94E1B` (Ubuntu Orange) | Canonical Ubuntu-inspired aubergine palette, sleek dark cards, and signature orange accents. |
| **Midnight Developer** | `#6C63FF` (Modern Indigo) | Deep navy/charcoal dark mode engineered for focus, modern glassmorphism, and indigo glows. |
| **Cyber Terminal** | `#22C55E` (Matrix Green) | Cyberpunk matrix hacker mode complete with an animated green digital rain canvas background. |

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Starts the Vite development server with Hot Module Replacement (HMR) |
| `npm run build` | Compiles TypeScript and builds production bundles into `/dist` |
| `npm run build:dev` | Compiles development build mode with source maps |
| `npm run preview` | Starts a local static web server to preview the production build |
| `npm run lint` | Runs ESLint across the codebase for static code analysis |
| `npm run deploy` | Builds the application and deploys the `/dist` bundle to GitHub Pages |

---

## LinkedIn

Connect with the author: [Mohamed Wardi](https://www.linkedin.com/in/mohamed-wardi-69502b324/)

---

<p align="center">
  <b>Made with ❤️ by Mohamed Wardi</b>
</p>