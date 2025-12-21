# Product Requirements Document (PRD)
## Kishan Goli - Dual-Mode Interactive Portfolio

**Version:** 1.0  
**Last Updated:** 2025-12-21  
**Owner:** Kishan Sai Sriman Goli (@kishanssg)  
**Target Launch:** Q1 2025  
**Live URL:** kishanssg.vercel.app → kishanssg.dev (future)

---

## 1. Executive Summary

### 1.1 Vision
Build a unique dual-mode portfolio website that showcases Kishan's technical expertise through two distinct experiences: 
- **Professional Mode:** Minimal, fast, recruiter-friendly interface
- **Portal Mode:** Interactive 3D playground with games, demos, and immersive experiences

### 1.2 Goals
1. Position Kishan as a "Software Engineer & Builder" who transforms ideas into scalable systems
2. Demonstrate AI-powered productivity and modern development practices
3. Showcase projects with measurable impact (75% faster builds, 90% error reduction, etc.)
4. Create a memorable, share-worthy experience that stands out in hiring processes
5. Deploy 100% free infrastructure with ability to scale

### 1.3 Success Metrics
- **Traffic:** 500+ unique visitors in first 3 months
- **Engagement:** 30%+ click rate on Portal Mode toggle
- **Conversion:** 5+ direct interview requests via contact form
- **Performance:** <2s load time, 90+ Lighthouse score
- **Social Proof:** 100+ LinkedIn profile views from portfolio link

---

## 2. User Personas

### Persona 1: Technical Recruiter (Primary)
- **Goal:** Quickly assess technical skills and experience
- **Pain Points:** Too many portfolios look the same; hard to verify real impact
- **Needs:** Clean navigation, clear project outcomes, download resume option
- **Mode Preference:** Professional Mode (95% of time)

### Persona 2: Hiring Manager / Tech Lead (Primary)
- **Goal:** Evaluate system design thinking and code quality
- **Pain Points:** Need to see actual work, not just descriptions
- **Needs:** Live demos, GitHub links, architecture diagrams, metrics
- **Mode Preference:** Both modes (50/50)

### Persona 3: Fellow Developers (Secondary)
- **Goal:** Get inspired, learn techniques, network
- **Pain Points:** Boring portfolios, no personality
- **Needs:** Code snippets, interactive demos, open source links
- **Mode Preference:** Portal Mode (70%)

### Persona 4: Casual Visitors (Tertiary)
- **Goal:** Entertainment, curiosity
- **Needs:** Fun interactions, games, shareable moments
- **Mode Preference:** Portal Mode (100%)

---

## 3. Product Architecture

### 3.1 Tech Stack

```yaml
Frontend Framework: 
  - Next.js 14+ (App Router)
  - React 18+
  - TypeScript 5+

Styling: 
  - Tailwind CSS 3.4+
  - CSS Modules (for Portal Mode animations)
  - Framer Motion (animations)

3D & Interactivity:
  - Three.js (3D rendering)
  - React Three Fiber (@react-three/fiber)
  - React Three Drei (@react-three/drei)
  - GSAP (advanced animations)

State Management:
  - React Context (mode toggle, theme)
  - Zustand (optional, for complex game state)

Forms:
  - React Hook Form
  - Zod (validation)
  - Formspree (free tier - 50 submissions/month)

Analytics:
  - Vercel Analytics (free tier)
  - Plausible or Simple Analytics (privacy-focused, optional)

Video Hosting:
  - YouTube (unlisted videos)
  - Cloudinary (free tier - 25GB)

Hosting & Deployment:
  - Vercel (free tier)
  - GitHub (source control)
  - Cloudflare (future DNS when adding custom domain)

Performance:
  - Next.js Image Optimization
  - Code splitting (dynamic imports)
  - Lazy loading for 3D components
  - Service Worker (optional PWA)

Testing:
  - Vitest (unit tests)
  - Playwright (E2E tests)
  - Lighthouse CI (performance)
```

### 3.2 System Architecture

```
┌─────────────────────────────────────────────────────────┐
│                     CLIENT BROWSER                       │
├─────────────────────────────────────────────────────────┤
│  Next.js App Router (SSR + Client Components)           │
│                                                          │
│  ┌──────────────────┐      ┌─────────────────────────┐ │
│  │ Professional Mode│◄────►│    Portal Mode          │ │
│  │  (Static/SSR)    │      │  (Client-Side Rendered) │ │
│  │                  │      │                         │ │
│  │  - Hero          │      │  - 3D Scene (Three.js)  │ │
│  │  - Projects      │      │  - Games (Canvas)       │ │
│  │  │  - Timeline      │      │  - Video (YouTube API)  │ │
│  │  - Contact       │      │  - Interactive Demos    │ │
│  └──────────────────┘      └─────────────────────────┘ │
│                                                          │
│  Shared Components:                                      │
│  - Navigation, Footer, Theme Toggle, Analytics          │
└─────────────────────────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────┐
│                   EXTERNAL SERVICES                      │
├─────────────────────────────────────────────────────────┤
│  - Vercel Edge Network (CDN + Hosting)                  │
│  - YouTube (Video Hosting)                              │
│  - Formspree (Contact Form Submissions)                 │
│  - Cloudinary (Image Optimization - optional)           │
│  - GitHub (Source Code)                                 │
└─────────────────────────────────────────────────────────┘
```

### 3.3 File Structure

```
portfolio/
├── public/
│   ├── assets/
│   │   ├── images/           # Project screenshots, logos
│   │   ├── videos/           # Local video files (if any)
│   │   ├── models/           # 3D models (.gltf, .glb)
│   │   └── resume/           # PDF resume
│   ├── favicon.ico
│   └── robots.txt
│
├── src/
│   ├── app/                  # Next.js App Router
│   │   ├── layout.tsx        # Root layout
│   │   ├── page.tsx          # Homepage
│   │   ├── globals.css       # Global styles
│   │   ├── professional/     # Professional mode route (optional)
│   │   └── portal/           # Portal mode route (optional)
│   │
│   ├── components/
│   │   ├── shared/
│   │   │   ├── Navigation.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── ModeToggle.tsx      # Portal button
│   │   │   ├── ThemeToggle.tsx     # Dark/light mode
│   │   │   └── SEO.tsx
│   │   │
│   │   ├── professional/
│   │   │   ├── Hero.tsx
│   │   │   ├── About.tsx
│   │   │   ├── ProjectCard.tsx
│   │   │   ├── ProjectsGrid.tsx
│   │   │   ├── ExperienceTimeline.tsx
│   │   │   ├── SkillsGrid.tsx
│   │   │   └── ContactForm.tsx
│   │   │
│   │   └── portal/
│   │       ├── Scene3D.tsx          # Main Three.js scene
│   │       ├── PortalTransition.tsx # Mode switch animation
│   │       ├── VideoTrailer.tsx
│   │       ├── games/
│   │       │   ├── DebugTheCode.tsx
│   │       │   ├── SystemDesigner.tsx
│   │       │   ├── SpeedTyping.tsx
│   │       │   └── BugHunt.tsx
│   │       ├── ProjectGallery3D.tsx
│   │       └── EasterEggs.tsx
│   │
│   ├── lib/
│   │   ├── constants.ts       # Site config, URLs, text
│   │   ├── types.ts           # TypeScript types
│   │   └── utils.ts           # Helper functions
│   │
│   ├── data/
│   │   ├── projects.ts        # Project data
│   │   ├── experience.ts      # Work history
│   │   ├── skills.ts          # Tech stack
│   │   └── content.ts         # Site copy
│   │
│   ├── hooks/
│   │   ├── useMode.ts         # Professional/Portal mode state
│   │   ├── useTheme.ts        # Dark/light theme
│   │   └── useAnalytics.ts    # Event tracking
│   │
│   └── styles/
│       ├── professional.css   # Professional mode specific
│       └── portal.css         # Portal mode specific
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── .github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions (Lighthouse, tests)
│
├── docs/
│   ├── PRD.md                 # This document
│   ├── DESIGN.md              # Design system
│   └── DEPLOYMENT.md          # Deploy guide
│
├── .eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Feature Specifications

[Continue with the full PRD content from the previous message...]
