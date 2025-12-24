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
  - Three. js (3D rendering)
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
│  │  - Timeline      │      │  - Video (YouTube API)  │ │
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
│   │   ├── models/           # 3D models (. gltf, .glb)
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
│       ├── professional. css   # Professional mode specific
│       └── portal.css         # Portal mode specific
│
├── tests/
│   ├── unit/
│   └── e2e/
│
├── . github/
│   └── workflows/
│       └── ci.yml             # GitHub Actions (Lighthouse, tests)
│
├── docs/
│   ├── PRD.md                 # This document
│   ├── DESIGN.md              # Design system
│   └── DEPLOYMENT.md          # Deploy guide
│
├── . eslintrc.json
├── .prettierrc
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

---

## 4. Feature Specifications

## 4.1 PROFESSIONAL MODE (Default Experience)

### 4.1.1 Navigation Bar
**Requirements:**
- Sticky header, transparent on scroll top, solid background after scroll
- Logo/Name on left:  "Kishan Goli" or "KSG" monogram
- Nav links: About | Projects | Experience | Skills | Contact
- Right side: Portal Toggle Button + Theme Toggle (sun/moon icon)
- Mobile: Hamburger menu with smooth slide-in

**Acceptance Criteria:**
- ✅ Smooth scroll to sections on click
- ✅ Active section highlighting in nav
- ✅ Accessible (keyboard navigation, ARIA labels)
- ✅ Mobile responsive (<768px breakpoint)

---

### 4.1.2 Hero Section
**Layout:**
```
┌────────────────────────────────────────────┐
│                                            │
│         Kishan Sai Sriman Goli             │
│                                            │
│     Software Engineer & Builder at Core    │
│                                            │
│   Idea → Execution → Scalable Systems      │
│                                            │
│  Leveraging AI to build faster, smarter,   │
│             better.                         │
│                                            │
│   [View Projects]  [Download Resume]       │
│                                            │
│         ↓ Scroll to explore                │
│                                            │
└────────────────────────────────────────────┘
```

**Animation Requirements:**
- Fade-in on page load (500ms delay)
- Text appears word-by-word or line-by-line
- Subtle background gradient animation (slow shift)
- Scroll indicator bounces gently

**Copy:**
```
Name: Kishan Sai Sriman Goli
Tagline: Software Engineer & Builder at Core
Subtitle: Idea → Execution → Scalable Systems
Description: Leveraging AI to build faster, smarter, better.
```

**CTAs:**
- Primary: "View Projects" (scrolls to #projects)
- Secondary: "Download Resume" (opens PDF in new tab)

**Acceptance Criteria:**
- ✅ Responsive typography (fluid type scale)
- ✅ CTAs have hover states (scale, color shift)
- ✅ Accessible contrast ratios (WCAG AA)
- ✅ Works without JavaScript (progressive enhancement)

---

### 4.1.3 About Section
**Content:**
```markdown
## About Me

I don't just write code—I build products. 

From concept to production, I architect scalable systems 
that solve real problems. 

By combining modern cloud infrastructure with cutting-edge 
AI tools, I deliver solutions 75% faster without 
compromising quality.

Whether it's reducing scheduling errors by 90% or automating 
UI handoffs for entire teams, I turn ambitious ideas into 
production reality.

Currently pursuing my Master's in Computer Science at UCF 
(GPA: 3.97/4.0), AWS Certified, and building real-world 
products that matter. 
```

**Layout:**
- Two-column layout (desktop): Text left, Stats/Highlights right
- Single column (mobile)
- Subtle fade-in on scroll into view

**Stats Panel (Right Side):**
```
┌──────────────────────────┐
│  75%                     │
│  Faster Frontend Builds  │
│  (D2D_Handoff)           │
├──────────────────────────┤
│  90%                     │
│  Reduction in Errors     │
│  (GravyWork)             │
├──────────────────────────┤
│  3. 97/4.0                │
│  GPA at UCF              │
├──────────────────────────┤
│  AWS Certified           │
│  Developer Associate     │
└──────────────────────────┘
```

**Acceptance Criteria:**
- ✅ Animated counters for stats (count-up effect)
- ✅ Responsive grid layout
- ✅ Fade-in animation triggered when 50% in viewport

---

### 4.1.4 Projects Section
**Display:**
- Grid layout:  2 columns (desktop), 1 column (mobile)
- 6 featured projects initially, "Load More" button for rest

**Project Card Structure:**
```
┌─────────────────────────────────────┐
│  [Project Thumbnail/Screenshot]     │
├─────────────────────────────────────┤
│  Project Name                       │
│  One-line description               │
│                                     │
│  Key Metric:  "75% faster builds"    │
│                                     │
│  Tech:  [TypeScript][React][Node]    │
│                                     │
│  [View Details] [GitHub] [Demo]     │
└─────────────────────────────────────┘
```

**Projects to Include:**
1. **D2D_Handoff** - AI-Powered Design-to-Code Tool
2. **Park My Ride** - Real-time Parking Coordination Platform
3. **GravyWork** - Workforce Management for Social Catering
4. **VibeAudit** - Security Scanner for AI-Generated Code
5. **VibeLink** - API-to-FlowSpec Compiler for LLMs
6. **UCF Parking Finder** - Real-time Parking Recommendations

**Project Data Schema:**
```typescript
interface Project {
  id:  string;
  title: string;
  tagline: string;
  description:  string;
  metrics: {
    label: string;
    value: string;
  }[];
  techStack: string[];
  links:  {
    github?:  string;
    demo?: string;
    case_study?: string;
  };
  thumbnail:  string;
  featured:  boolean;
}
```

**Interactions:**
- Hover:  Card lifts (translateY(-8px)), shadow intensifies
- Click "View Details":  Expands inline OR opens modal with full case study

**Case Study Modal Content:**
```markdown
# Project Title

## The Problem
[2-3 sentences]

## The Solution
[Architecture diagram or screenshot]
[3-4 sentences explaining approach]

## Technical Implementation
- Tech stack with justifications
- Key architectural decisions
- Challenges overcome

## Impact & Results
- Metric 1: X% improvement
- Metric 2: Reduced Y by Z
- User feedback (if applicable)

## Code Sample
[Optional: embedded CodePen or syntax-highlighted snippet]

[GitHub Link] [Live Demo]
```

**Acceptance Criteria:**
- ✅ All projects load from `data/projects.ts` (single source of truth)
- ✅ Images lazy-load (Next.js Image component)
- ✅ Accessible (keyboard navigation, screen reader friendly)
- ✅ Click outside modal to close

---

### 4.1.5 Experience Timeline
**Layout:**
```
         ┌─ 2025
         │
    ●────┤  Full Stack Developer
    │    │  Park My Ride
    │    │  • Real-time parking coordination
    │    │  • WebSockets, React Native
    │    │
    │    ├─ Dec 2024
    │    │
    ●────┤  Software Developer (Contract)
    │    │  GravyWork
    │    │  • 90% error reduction
    │    │  • Ruby on Rails, PostgreSQL
    │    │
    │    ├─ 2024
    │    │
    ●────┤  Tech Lead - Null (InfoSec) Chapter
         │  • 300+ attendees at events
         │  • Led CTF competitions
         │
         └─ 2023
```

**Data Schema:**
```typescript
interface Experience {
  id: string;
  title: string;
  company: string;
  location: string;
  startDate:  string; // YYYY-MM
  endDate: string | "Present";
  highlights: string[];
  techStack: string[];
}
```

**Interaction:**
- Scroll-triggered animation: Timeline draws top-to-bottom
- Hover on entry: Highlight, expand to show more details

**Acceptance Criteria:**
- ✅ Chronological order (most recent first)
- ✅ Mobile:  Simplified linear layout
- ✅ Animated timeline line (CSS or SVG)

---

### 4.1.6 Skills Section
**Layout:**
- Categorized grid: Languages | Databases | Frameworks | Cloud/Tools

```
Languages              Databases           Frameworks
┌──────────────┐      ┌──────────────┐    ┌──────────────┐
│ JavaScript   │      │ PostgreSQL   │    │ React        │
│ TypeScript   │      │ MongoDB      │    │ Next.js      │
│ Python       │      │ Redis        │    │ Node.js      │
│ Java         │      │ DynamoDB     │    │ Django       │
│ Go           │      │ MySQL        │    │ Spring Boot  │
└──────────────┘      └──────────────┘    └──────────────┘

Cloud & Tools
┌────────────────────────────────────────────────────────┐
│ AWS (EC2, Lambda, RDS) | Docker | Kubernetes | Git    │
│ GitHub Actions | Jenkins | Kafka | GraphQL | REST     │
└────────────────────────────────────────────────────────┘
```

**Visual Treatment:**
- Pills/badges with icons (optional)
- Fade-in on scroll
- Optional: Animated skill bars (but avoid unless meaningful)

**Acceptance Criteria:**
- ✅ Responsive grid (4 cols → 2 cols → 1 col)
- ✅ Matches resume exactly
- ✅ Semantic HTML (lists, proper headings)

---

### 4.1.7 Contact Section
**Layout:**
```
┌─────────────────────────────────────────────────────┐
│                  Let's Build Together                │
│                                                      │
│   Whether you're hiring, collaborating, or just     │
│   want to chat about tech—I'd love to hear from you.│
│                                                      │
│   ┌────────────────────────────────────────────┐   │
│   │  Name: [________________]                  │   │
│   │  Email:  [________________]                 │   │
│   │  Message: [___________________________]    │   │
│   │           [___________________________]    │   │
│   │                                             │   │
│   │            [Send Message]                   │   │
│   └────────────────────────────────────────────┘   │
│                                                      │
│   Or reach me directly:                             │
│   📧 kishan.ss. goli@gmail.com                       │
│   💼 linkedin.com/in/kishanssg                      │
│   🐙 github.com/kishanssg                           │
│                                                      │
└─────────────────────────────────────────────────────┘
```

**Form Requirements:**
- Fields: Name (required), Email (required, validated), Message (required, min 10 chars)
- Submit to **Formspree** (free tier:  50/month)
- Client-side validation (React Hook Form + Zod)
- Success state:  "Thanks!  I'll get back to you within 24 hours."
- Error state: Display specific validation errors

**Social Links:**
- Email: `mailto:kishan.ss.goli@gmail.com`
- LinkedIn: `https://linkedin.com/in/kishanssg`
- GitHub: `https://github.com/kishanssg`
- (Optional:  Twitter, Medium, DEV. to if applicable)

**Acceptance Criteria:**
- ✅ Spam protection (honeypot field, Formspree reCAPTCHA)
- ✅ Accessible form labels and error messages
- ✅ Loading state on submit (prevent double-submit)
- ✅ Mobile-friendly input fields

---

### 4.1.8 Footer
**Content:**
```
┌──────────────────────────────────────────────────────┐
│  © 2025 Kishan Goli.  Built with Next.js & ❤️        │
│                                                       │
│  [LinkedIn] [GitHub] [Email] [Resume PDF]            │
│                                                       │
│  Deployed on Vercel • Open Source on GitHub          │
└──────────────────────────────────────────────────────┘
```

**Acceptance Criteria:**
- ✅ Links open in new tab (`target="_blank" rel="noopener noreferrer"`)
- ✅ Year updates automatically
- ✅ Sticky to bottom on short pages

---

## 4.2 PORTAL MODE (Interactive Experience)

### 4.2.1 Portal Toggle Button
**Location:** Top-right corner of navigation bar

**Design:**
```
┌────────────────────────────────────┐
│  🌀 Bored? Enter the Portal →     │
└────────────────────────────────────┘
```

**States:**
- Professional Mode: "🌀 Bored? Enter the Portal"
- Portal Mode:  "← Exit Portal (Back to Normal)"

**Interaction:**
- Click triggers mode switch
- Smooth transition animation (see 4.2.2)
- Persists choice in localStorage (optional)

**Acceptance Criteria:**
- ✅ Keyboard accessible (Tab + Enter)
- ✅ High contrast, visible on all backgrounds
- ✅ Animated hover state (pulse, glow)

---

### 4.2.2 Mode Transition Animation
**Requirements:**
- **Duration:** 1.5-2 seconds
- **Effect:** Portal/wormhole visual effect

**Animation Sequence:**
```
Professional Mode
       ↓
1. Click Portal Button
       ↓
2. Screen darkens (overlay fade-in)
       ↓
3. Portal animation: 
   - Option A: Expanding circle (iris transition)
   - Option B: Particle vortex (swirling effect)
   - Option C: Glitch/distortion effect
       ↓
4. Professional content fades out
       ↓
5. Portal content fades in
       ↓
Portal Mode Active
```

**Technical Implementation:**
- Framer Motion `AnimatePresence` for component swap
- CSS clip-path or SVG mask for portal shape
- Three. js particle system for vortex (optional, heavier)

**Acceptance Criteria:**
- ✅ Smooth 60fps animation
- ✅ No layout shift during transition
- ✅ Accessible (respects `prefers-reduced-motion`)
- ✅ Reversible (same animation going back)

---

### 4.2.3 Portal Mode - Landing Scene
**Experience:**
```
┌──────────────────────────────────────────────────────┐
│                                                       │
│         [3D Animated Background - Stars/Grid]        │
│                                                       │
│          Welcome to the Builder's Playground          │
│                                                       │
│        Where ideas become interactive reality         │
│                                                       │
│   ┌───────────┐  ┌───────────┐  ┌───────────┐      │
│   │  🎮 Games │  │ 🎬 Trailer│  │ 🚀 Projects│      │
│   └───────────┘  └───────────┘  └───────────┘      │
│                                                       │
│              [Explore] or scroll ↓                    │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**3D Background Options:**
1. **Starfield** - Moving particles (like Star Wars hyperspace)
2. **Animated Grid** - Tron-style glowing grid
3. **Floating Shapes** - Abstract geometric shapes

**Technical:**
- Three.js + React Three Fiber
- Particle count: ~1000-5000 (performance test)
- Mouse parallax effect (cursor affects particle movement)

**Acceptance Criteria:**
- ✅ Loads within 3 seconds
- ✅ Degrades gracefully on low-end devices
- ✅ Pause animations when tab not active (performance)

---

### 4.2.4 Video Trailer Section
**Layout:**
```
┌──────────────────────────────────────────────────────┐
│                                                       │
│              Watch My Journey (60 sec)                │
│                                                       │
│   ┌──────────────────────────────────────────────┐  │
│   │                                               │  │
│   │         [Embedded Video Player]              │  │
│   │                                               │  │
│   │    [Custom controls - Play/Pause/Volume]     │  │
│   │                                               │  │
│   └──────────────────────────────────────────────┘  │
│                                                       │
│   Chapters:                                          │
│   0: 00 Introduction | 0:15 D2D_Handoff              │
│   0:30 Park My Ride | 0:45 Call to Action           │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Video Content Script (60 seconds):**
```
0:00-0:10  Hook
"What if you could turn a Figma design into production 
 code in seconds?"
[Show D2D_Handoff demo - design to code transformation]

0:10-0:20  Introduction
"Hi, I'm Kishan.  I build scalable systems that solve 
 real problems."
[Quick montage of projects]

0:20-0:35  Projects Showcase
"From reducing scheduling errors by 90%..."
[GravyWork screenshot]
"... to real-time parking coordination..."
[Park My Ride app demo]
"...I combine cloud architecture with AI tools to 
 deliver fast."

0:35-0:50  Philosophy
"I don't just write code.  I take ideas from concept 
 to production.  Idea → Execution → Scale."
[Animated diagram]

0:50-1:00  Call to Action
"Currently pursuing my Master's at UCF, AWS certified, 
 and ready to build.  Let's create something amazing 
 together."
[Contact info + portfolio URL]
```

**Hosting:**
- YouTube (unlisted) - embed with custom controls
- Or self-host on Cloudinary (25GB free)

**Player Requirements:**
- Custom UI (hide YouTube branding if possible)
- Autoplay on scroll into view (muted)
- Chapter markers clickable

**Acceptance Criteria:**
- ✅ Video optimized for web (<10MB file size)
- ✅ Accessible (captions/subtitles)
- ✅ Mobile-responsive player
- ✅ Analytics tracking (play, completion rate)

---

### 4.2.5 Games Section

## Game 1: Debug The Code

**Concept:**
- Player is shown a code snippet with 3-5 bugs
- Must identify and click on buggy lines
- Timer:  60 seconds
- Score based on speed and accuracy

**Example Challenge:**
```javascript
// Fix this React component (3 bugs)

function UserProfile({ user }) {
  const [count, setCount] = useState(0);
  
  // Bug 1: Missing dependency
  useEffect(() => {
    console.log(user.name);
  }, []);
  
  // Bug 2: Mutating state directly
  const increment = () => {
    count++;
  };
  
  return (
    <div>
      {/* Bug 3: Incorrect prop name */}
      <h1>{user.firstName}</h1>
      <button onClick={increment}>Count: {count}</button>
    </div>
  );
}
```

**UI:**
```
┌──────────────────────────────────────────────────────┐
│  Debug The Code                       Time: 45s      │
├──────────────────────────────────────────────────────┤
│                                                       │
│  [Code editor with syntax highlighting]              │
│  [Clickable lines - highlight on hover]              │
│                                                       │
│  Bugs Found:  1/3                                     │
│                                                       │
│  [Hint] [Skip] [Submit]                              │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Levels:**
1. Easy - JavaScript/React basics
2. Medium - TypeScript, async issues
3. Hard - Performance bugs, race conditions

**Acceptance Criteria:**
- ✅ 10+ challenges stored in JSON
- ✅ Syntax highlighting (use Prism.js or Shiki)
- ✅ Feedback on correct/incorrect clicks
- ✅ Leaderboard (localStorage, top 5 scores)

---

## Game 2: System Design Builder

**Concept:**
- Drag-and-drop system architecture components
- Build a scalable system (e.g., "Design Instagram")
- Components: Load Balancer, Database, Cache, CDN, Queue

**UI:**
```
┌──────────────────────────────────────────────────────┐
│  System Design Challenge:  Build a URL Shortener      │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Toolbox:                  Canvas:                    │
│  ┌──────────┐             ┌────────────────────┐    │
│  │  [LB]    │             │                    │    │
│  │  [DB]    │  ───drag──► │  [Drop components] │    │
│  │  [Cache] │             │  [Connect with     │    │
│  │  [CDN]   │             │   arrows]          │    │
│  │  [Queue] │             │                    │    │
│  └──────────┘             └────────────────────┘    │
│                                                       │
│  [Check Solution] [Hint] [Reset]                     │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Challenges:**
1. URL Shortener (basic)
2. Real-time Chat App (medium)
3. Video Streaming Platform (hard)

**Validation:**
- Check if required components are present
- Check if connections make sense
- Provide feedback:  "Great!  But consider adding a cache here..."

**Technical:**
- React DnD or react-flow library
- Canvas API or SVG for connections

**Acceptance Criteria:**
- ✅ 3+ challenges with validation logic
- ✅ Save progress (localStorage)
- ✅ Share solution as image (html2canvas)

---

## Game 3: Speed Typing - Tech Edition

**Concept:**
- Type code snippets, tech terms, or famous quotes
- Track WPM (words per minute) and accuracy
- Leaderboard

**UI:**
```
┌──────────────────────────────────────────────────────┐
│  Speed Typing Challenge                              │
├──────────────────────────────────────────────────────┤
│                                                       │
│  Type this code:                                     │
│                                                       │
│  const users = await db.query('SELECT * FROM users');│
│  ▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂▂ │
│                                                       │
│  [Input field]                                       │
│                                                       │
│  WPM: 0 | Accuracy: 0% | Time: 0s                    │
│                                                       │
│  [Start] [New Challenge]                             │
│                                                       │
└──────────────────────────────────────────────────────┘
```

**Phrases:**
- Code snippets (JavaScript, Python, SQL)
- Tech quotes ("Talk is cheap.  Show me the code.")
- Terminal commands

**Acceptance Criteria:**
- ✅ Real-time WPM calculation
- ✅ Highlight correct/incorrect characters
- ✅ 20+ phrases
- ✅ Leaderboard (top 10, localStorage)

---

## Game 4: Bug Hunt (3D Interactive)

**Concept:**
- 3D environment with hidden "bugs" (literal bug models)
- Click to find them within time limit
- Each bug reveals a fun fact about Kishan

**UI:**
- Full-screen 3D scene (Three.js)
- Cursor changes when hovering over bug
- Counter:  "Bugs Found: 3/10"
- Timer: 60 seconds

**Fun Facts Revealed:**
```
Bug 1: "I built my first app in 10th grade"
Bug 2: "I once debugged a production issue at 3 AM (caffeine is key)"
Bug 3: "My favorite tech stack:  Next.js + PostgreSQL"
Bug 4: "I'm AWS Certified Developer Associate"
Bug 5: "I led a 300+ attendee cybersecurity event"
...  etc
```

**Acceptance Criteria:**
- ✅ 10 hidden bugs in 3D scene
- ✅ Mobile:  Tap to find (not just desktop cursor)
- ✅ Completion reward: "You found all bugs! Here's a secret..."

---

### 4.2.6 3D Project Gallery
**Concept:**
- Projects displayed as floating cards in 3D space
- Navigate with arrow keys or drag
- Click project to see detailed view

**Layout:**
```
      [Project 3]
         /
    [Project 2]  ← Camera view
         \
      [Project 1]
```

**Interaction:**
- Arrow keys: Navigate between projects
- Mouse drag: Rotate the scene
- Click project:  Zoom in + show details overlay

**Technical:**
- React Three Fiber
- Drei's `<OrbitControls>` for navigation
- Project cards as 3D planes with textures (screenshots)

**Acceptance Criteria:**
- ✅ Smooth animations (60fps)
- ✅ Fallback for devices without WebGL
- ✅ Keyboard accessible

---

### 4.2.7 Easter Eggs
**Hidden Features:**

1. **Konami Code** (↑ ↑ ↓ ↓ ← → ← → B A)
   - Triggers:  Matrix-style code rain effect
   - Message: "You found the secret!  🎉"

2. **Click Logo 5 Times**
   - Triggers:  Theme changes to random color scheme
   - Or: Plays a fun sound effect

3. **Type "AI" in Search/Input**
   - Triggers: AI assistant chatbot appears
   - Simple Q&A about Kishan (pre-scripted)

4. **Idle for 60 Seconds**
   - Triggers:  Screen saver mode (particles, ambient animation)

**Acceptance Criteria:**
- ✅ Non-intrusive (easy to exit)
- ✅ Track discovery in analytics
- ✅ Share button for easter eggs

---

## 5. Design System

### 5.1 Professional Mode Design

**Color Palette (Dark Mode Default):**
```css
--bg-primary: #0A0A0A;
--bg-secondary: #1A1A1A;
--text-primary: #F5F5F5;
--text-secondary: #A0A0A0;
--accent-primary: #00D4AA;    /* Cyan */
--accent-secondary: #0071E3;  /* Blue */
--border: #2A2A2A;
--hover:  #00FFB3;
```

**Light Mode (Optional):**
```css
--bg-primary: #FFFFFF;
--bg-secondary:  #F8F8F8;
--text-primary: #1A1A1A;
--text-secondary: #666666;
--accent-primary:  #00A887;
--accent-secondary: #0056B3;
--border: #E0E0E0;
```

**Typography:**
```css
Font Family: 
  - Headings: 'Inter', 'SF Pro Display', system-ui
  - Body: 'Inter', system-ui, sans-serif
  - Code: 'Fira Code', 'Consolas', monospace

Font Sizes (Fluid Scale):
  - H1: clamp(2. 5rem, 5vw, 4rem)
  - H2: clamp(2rem, 4vw, 3rem)
  - H3: clamp(1.5rem, 3vw, 2rem)
  - Body: clamp(1rem, 2vw, 1.125rem)
  - Small: 0.875rem

Line Heights:
  - Headings: 1.2
  - Body: 1.6
  
Letter Spacing:
  - Headings: -0.02em
  - Body: 0
```

**Spacing Scale:**
```
4px, 8px, 12px, 16px, 24px, 32px, 48px, 64px, 96px, 128px
```

**Border Radius:**
```
Small: 4px
Medium: 8px
Large:  16px
Full: 9999px
```

**Shadows:**
```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.1);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 20px rgba(0,0,0,0.15);
--shadow-xl: 0 20px 40px rgba(0,0,0,0.2);
```

**Animations:**
```css
--transition-fast: 150ms ease;
--transition-base: 250ms ease;
--transition-slow: 400ms ease;

--easing-smooth: cubic-bezier(0.4, 0, 0.2, 1);
--easing-bounce: cubic-bezier(0.68, -0.55, 0.265, 1.55);
```

---

### 5.2 Portal Mode Design

**Color Palette:**
```css
--portal-bg: #000000;
--portal-bg-secondary: #0D0D1A;
--portal-text: #FFFFFF;
--portal-accent-1: #00FF88;   /* Neon Green */
--portal-accent-2: #00D4FF;   /* Cyan */
--portal-accent-3: #FF006E;   /* Magenta */
--portal-glow: rgba(0, 255, 136, 0.5);
```

**Effects:**
```css
--neon-glow: 0 0 10px var(--portal-accent-1),
             0 0 20px var(--portal-accent-1),
             0 0 30px var(--portal-accent-1);

--glass-effect: 
  background: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
```

**Particles:**
- Count: 2000-5000
- Colors: Gradient from accent-1 to accent-2
- Movement: Slow drift + mouse parallax

---

### 5.3 Component Library (Reusable)

**Button Variants:**
```tsx
<Button variant="primary">   // Solid background, accent color
<Button variant="secondary"> // Outline, transparent bg
<Button variant="ghost">     // Text only, hover effect
<Button variant="icon">      // Icon only, circular

// Sizes
<Button size="sm">           // Padding:  8px 16px
<Button size="md">           // Padding: 12px 24px (default)
<Button size="lg">           // Padding: 16px 32px
```

**Card Component:**
```tsx
<Card>
  <Card.Image src="..." alt="..." />
  <Card.Header>
    <Card.Title>Project Name</Card.Title>
    <Card.Badge>Featured</Card.Badge>
  </Card.Header>
  <Card.Body>
    <Card.Description>... </Card.Description>
    <Card.Metrics>
      <Metric label="Impact" value="75% faster" />
    </Card.Metrics>
    <Card.TechStack tags={['React', 'Node.js']} />
  </Card.Body>
  <Card.Footer>
    <Button>View Details</Button>
  </Card.Footer>
</Card>
```

**Acceptance Criteria for Components:**
- ✅ Fully typed (TypeScript)
- ✅ Accessible (ARIA attributes, keyboard nav)
- ✅ Documented (JSDoc comments)
- ✅ Tested (Vitest unit tests)

---

## 6. Performance Requirements

### 6.1 Core Web Vitals Targets
- **LCP (Largest Contentful Paint):** <2.5s
- **FID (First Input Delay):** <100ms
- **CLS (Cumulative Layout Shift):** <0.1

### 6.2 Lighthouse Scores (Minimum)
- Performance: 90+
- Accessibility: 100
- Best Practices: 100
- SEO: 100

### 6.3 Optimization Strategies
- ✅ Code splitting (dynamic imports for Portal Mode)
- ✅ Image optimization (Next.js Image, WebP format)
- ✅ Lazy loading (components below fold)
- ✅ Font optimization (subset, preload)
- ✅ Minification (CSS, JS)
- ✅ Compression (Brotli, Gzip)
- ✅ CDN caching (Vercel Edge Network)

### 6.4 Bundle Size Targets
- Initial JS: <150KB (gzipped)
- CSS: <50KB (gzipped)
- Total page weight: <1MB (excluding videos)

---

## 7. SEO & Metadata

### 7.1 Meta Tags (All Pages)
```html
<title>Kishan Goli - Software Engineer & Builder</title>
<meta name="description" content="Full-stack engineer building scalable systems.  Idea → Execution → Production.  AWS Certified.  AI-powered development." />

<meta property="og:title" content="Kishan Goli - Software Engineer" />
<meta property="og: description" content="Building scalable systems from concept to production" />
<meta property="og:image" content="/og-image.png" />
<meta property="og:url" content="https://kishanssg.vercel.app" />
<meta property="og:type" content="website" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter: title" content="Kishan Goli - Software Engineer" />
<meta name="twitter:description" content="Building scalable systems..." />
<meta name="twitter: image" content="/og-image. png" />

<link rel="canonical" href="https://kishanssg.vercel.app" />
```

### 7.2 Structured Data (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Kishan Sai Sriman Goli",
  "jobTitle": "Software Engineer",
  "url": "https://kishanssg.vercel.app",
  "sameAs": [
    "https://linkedin.com/in/kishanssg",
    "https://github.com/kishanssg"
  ],
  "alumniOf": {
    "@type": "CollegeOrUniversity",
    "name": "University of Central Florida"
  },
  "knowsAbout": [
    "Software Engineering",
    "Distributed Systems",
    "Cloud Architecture",
    "AI Tools"
  ]
}
```

### 7.3 Sitemap & Robots.txt
```xml
<!-- sitemap.xml -->
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://kishanssg.vercel.app</loc>
    <lastmod>2025-12-21</lastmod>
    <priority>1.0</priority>
  </url>
</urlset>
```

```
# robots.txt
User-agent: *
Allow: /
Sitemap: https://kishanssg.vercel.app/sitemap. xml
```

---

## 8. Analytics & Tracking

### 8.1 Events to Track
**Professional Mode:**
- Page views (per section)
- CTA clicks (View Projects, Download Resume)
- Project card clicks
- Contact form submissions
- External link clicks (GitHub, LinkedIn)

**Portal Mode:**
- Portal toggle clicks
- Game starts/completions
- Video plays/completions
- Easter egg discoveries

**Performance:**
- Load times
- Mode switch duration
- 3D scene FPS (if <30fps, log device info)

### 8.2 Tools
- **Vercel Analytics** (free tier)
- **Google Analytics 4** (optional)
- **PostHog** (optional, open-source alternative)

### 8.3 Privacy
- ✅ No tracking without consent (optional cookie banner)
- ✅ Privacy policy page (if collecting emails)
- ✅ Anonymize IPs

---

## 9. Accessibility (WCAG 2.1 AA Compliance)

### 9.1 Requirements
- ✅ Keyboard navigation (Tab, Enter, Esc, Arrow keys)
- ✅ Screen reader support (ARIA labels, semantic HTML)
- ✅ Color contrast ≥4.5:1 (text), ≥3:1 (UI components)
- ✅ Focus indicators (visible outlines)
- ✅ Skip to main content link
- ✅ Alt text for all images
- ✅ Form labels and error messages
- ✅ Respect `prefers-reduced-motion`
- ✅ Responsive text (zoom to 200% without breaking)

### 9.2 Testing Tools
- Lighthouse Accessibility Audit
- axe DevTools
- WAVE Browser Extension
- Manual keyboard testing

---

## 10. Browser & Device Support

### 10.1 Browsers
- ✅ Chrome/Edge (last 2 versions)
- ✅ Firefox (last 2 versions)
- ✅ Safari (last 2 versions)
- ⚠️ Best effort:  IE11 (show fallback message)

### 10.2 Devices
- Desktop: 1920x1080+, 1440x900, 1366x768
- Tablet: iPad (1024x768), iPad Pro (1366x1024)
- Mobile: iPhone (390x844), Android (360x800)

### 10.3 Responsive Breakpoints
```css
/* Mobile first */
@media (min-width: 640px)  { /* sm */ }
@media (min-width: 768px)  { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
@media (min-width: 1536px) { /* 2xl */ }
```

---

## 11. Testing Strategy

### 11.1 Unit Tests (Vitest)
- All utility functions (lib/utils. ts)
- Data transformations (data/*. ts)
- Form validation logic

**Coverage Target:** 70%+

### 11.2 Integration Tests (React Testing Library)
- Component rendering
- User interactions (button clicks, form submissions)
- Mode switching

### 11.3 E2E Tests (Playwright)
**Critical User Flows:**
1. Homepage → Projects → Contact Form Submit
2. Homepage → Portal Toggle → Play Game
3. Mobile:  Navigation menu → Section scroll

### 11.4 Visual Regression (optional)
- Percy or Chromatic
- Screenshot comparison on PR

### 11.5 Performance Tests
- Lighthouse CI (run on every deploy)
- Bundle size monitoring (bundlesize or bundlephobia)

---

## 12. Deployment & CI/CD

### 12.1 GitHub Actions Workflow
```yaml
name: CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run:  npm run lint

  test:
    runs-on: ubuntu-latest
    steps: 
      - uses: actions/checkout@v3
      - run:  npm ci
      - run: npm test

  lighthouse:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run: npm run build
      - uses: treosh/lighthouse-ci-action@v9
        with:
          urls:  http://localhost:3000
          uploadArtifacts: true

  deploy:
    runs-on: ubuntu-latest
    if: github. ref == 'refs/heads/main'
    steps:
      - uses: actions/checkout@v3
      - run: npm ci
      - run:  npm run build
      - uses:  amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets. ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

### 12.2 Deployment Checklist
- ✅ Environment variables set (Formspree key, analytics IDs)
- ✅ Domain connected (kishanssg.vercel.app → kishanssg.dev later)
- ✅ SSL certificate active
- ✅ Redirects configured (www → non-www)
- ✅ 404 page custom design
- ✅ Sitemap submitted to Google Search Console

---

## 13. Content Strategy

### 13.1 Project Case Studies (Full Content)

**Template for Each Project:**
```markdown
# [Project Title]

## 🎯 The Problem
[2-3 sentences describing the pain point]

## 💡 The Solution
[High-level approach, 3-4 sentences]

## 🏗️ Architecture
[Diagram or bullet points]
- Frontend: [tech stack]
- Backend: [tech stack]
- Infrastructure: [hosting, databases, etc.]

## 🔧 Technical Highlights
1. [Key technical decision #1 and why]
2. [Challenge overcome]
3. [Innovation or unique approach]

## 📊 Impact & Results
- **Metric 1:** [e.g., 75% faster build time]
- **Metric 2:** [e.g., Used by 4-engineer team]
- **User Feedback:** "[Quote if applicable]"

## 🧩 Code Snippet
[Optional:  10-20 lines of interesting code with explanation]

## 🔗 Links
- [GitHub Repository](link)
- [Live Demo](link)
- [Blog Post](if applicable)

## 🏷️ Tech Stack
[List of technologies used]
```

**Full Case Studies:**

### **1. D2D_Handoff**
```markdown
# D2D_Handoff - AI-Powered Design-to-Code Tool

## 🎯 The Problem
Frontend engineers waste 3-4 weeks manually converting Figma designs 
into React Native, Jetpack Compose, or SwiftUI code. This creates 
bottlenecks in product development and introduces inconsistencies 
between design and implementation.

## 💡 The Solution
Built an AI-powered Figma plugin that automatically converts design 
files into production-ready code across multiple frameworks. Uses 
GPT-4 to understand design intent and generate idiomatic, 
component-based code that matches platform conventions.

## 🏗️ Architecture
- **Plugin:** TypeScript + Figma Plugin API
- **AI Engine:** OpenAI GPT-4 with custom prompts
- **Code Generation:** Template-based system with AST manipulation
- **Deployment:** Docker containers for processing pipeline

Flow:
1. User selects Figma frames
2. Plugin extracts design tokens (colors, spacing, typography)
3. GPT-4 analyzes component hierarchy
4. Generates platform-specific code
5. User reviews and exports

## 🔧 Technical Highlights
1. **Smart Component Detection:** Built a heuristic algorithm that 
   identifies reusable components vs. one-off layouts, reducing 
   code duplication by 60%. 

2. **Multi-Platform Mapping:** Created a translation layer that maps 
   Figma's auto-layout to Flexbox (React Native), Compose modifiers 
   (Jetpack), and SwiftUI stacks. 

3. **Design Token Extraction:** Parses Figma variables and styles 
   into platform-specific theme files (e.g., tailwind.config.js, 
   theme.kt, Theme.swift).

## 📊 Impact & Results
- **75% Faster:** Reduced frontend build time from 4 weeks to 1 week
- **Adoption:** Used by internal 4-engineer team across 3 projects
- **Quality:** 90% of generated code required zero manual edits
- **Consistency:** Eliminated design-dev drift in MVP releases

## 🧩 Code Snippet
```typescript
// Example:  Figma Auto Layout → React Native Flexbox
function convertAutoLayout(node: FrameNode): FlexStyle {
  const { layoutMode, primaryAxisAlignItems, counterAxisAlignItems } = node;
  
  return {
    flexDirection: layoutMode === 'HORIZONTAL' ? 'row' : 'column',
    justifyContent: mapAlignment(primaryAxisAlignItems),
    alignItems: mapAlignment(counterAxisAlignItems),
    gap: node.itemSpacing,
  };
}
```

## 🔗 Links
- [GitHub Repository](https://github.com/kishanssg/d2d-handoff)
- [Figma Plugin](link-if-published)

## 🏷️ Tech Stack
TypeScript • Node.js • Figma Plugin API • OpenAI GPT-4 • Docker • React Native • Jetpack Compose • SwiftUI
```

### **2. Park My Ride**
```markdown
# Park My Ride - Real-Time Parking Coordination Platform

## 🎯 The Problem
Traditional valet services lack real-time visibility into vehicle 
status, leading to long wait times, miscommunication, and frustrated 
customers.  Drivers can't track their car's location or ETA. 

## 💡 The Solution
Built a three-app ecosystem (Customer, Valet, Driver) using React 
Native and WebSockets to enable real-time vehicle tracking, status 
updates, and instant notifications. Customers see live updates from 
drop-off to retrieval. 

## 🏗️ Architecture
- **Frontend:** React Native (iOS/Android) × 3 apps
- **Backend:** Node. js + Express + Socket.io (WebSockets)
- **Database:** PostgreSQL with PostGIS (geospatial queries)
- **Real-Time:** WebSocket connections for live updates
- **Infrastructure:** AWS EC2 + RDS

Data Flow:
1. Customer requests valet via app
2. System assigns valet and driver
3. Real-time location updates via GPS + WebSockets
4. Status changes broadcast to all connected clients
5. Payment processing on completion

## 🔧 Technical Highlights
1. **Optimized Read Paths:** Designed composite indexes on 
   `(location_id, status, created_at)` to reduce query latency 
   from 800ms to 120ms for "active reservations" endpoint.

2. **Geospatial Queries:** Used PostGIS to find nearest available 
   drivers within 5-mile radius: 
   ```sql
   SELECT * FROM drivers
   WHERE ST_DWithin(location, ST_MakePoint($1, $2)::geography, 8000)
   AND status = 'available'
   ORDER BY location <-> ST_MakePoint($1, $2)
   LIMIT 5;
   ```

3. **Connection Pooling:** Implemented connection pooling (pg-pool) 
   to handle 500+ concurrent WebSocket connections without 
   overwhelming the database.

## 📊 Impact & Results
- **Real-Time Sync:** <2s latency for status updates
- **Scalability:** Handles 500+ concurrent users during pilot
- **Customer Satisfaction:** 4.8/5 star rating in early testing
- **Efficiency:** 40% reduction in average wait times

## 🔗 Links
- [GitHub Repository](https://github.com/kishanssg/park-my-ride)
- [Demo Video](link)

## 🏷️ Tech Stack
React Native • Node.js • Express • Socket.io • PostgreSQL • PostGIS • AWS EC2 • AWS RDS • Redis
```

### **3. GravyWork** (Similar format)
### **4. VibeAudit** (Similar format)
### **5. VibeLink** (Similar format)
### **6. UCF Parking Finder** (Similar format)

---

### 13.2 About Section (Full Copy)
```markdown
## About Me

I don't just write code—I build products. 

From concept to production, I architect scalable systems that 
solve real problems.  Whether it's reducing scheduling errors by 
90%, cutting frontend build times by 75%, or enabling real-time 
coordination for hundreds of users, I turn ambitious ideas into 
production reality.

My approach combines modern cloud infrastructure (AWS, Docker, 
Kubernetes) with cutting-edge AI tools to deliver solutions 
faster without compromising quality. By leveraging GenAI for 
code generation, documentation, and testing, I've compressed 
traditional development timelines while maintaining high standards.

Currently pursuing my Master's in Computer Science at UCF 
(GPA: 3.97/4.0), I've built production systems handling 
concurrent users, optimized databases for high-traffic workloads, 
and designed APIs that power real-world applications. 

I'm AWS Certified (Developer Associate), Microsoft Azure 
certified, and constantly exploring new technologies.  When I'm 
not coding, I lead the Null InfoSec chapter (300+ attendees at 
our events) and mentor aspiring engineers.

**Let's build something that scales.**
```

---

## 14. Future Enhancements (Phase 2+)

### 14.1 Nice-to-Have Features
- **Blog:** Tech articles, tutorials (MDX)
- **Testimonials:** From colleagues, clients
- **Dark/Light Mode Toggle:** (already planned)
- **Multi-Language Support:** (i18n if targeting global audience)
- **AI Chatbot:** Answer questions about Kishan (using RAG + OpenAI)

### 14.2 Advanced Portal Mode Features
- **Voice Commands:** "Show me projects" (Web Speech API)
- **Augmented Reality:** View projects in AR (WebXR)
- **Multiplayer Games:** Real-time leaderboards (Firebase Realtime DB)
- **Generative Art:** Each visit generates unique background

### 14.3 Integrations
- **GitHub Activity:** Live feed of recent commits, PRs
- **Blog RSS:** Auto-import from Medium, DEV. to
- **Calendar:** Book 1: 1 coffee chat (Calendly embed)

---

## 15. Launch Plan

### 15.1 Pre-Launch Checklist
- [ ] All content written and proofread
- [ ] Resume PDF uploaded and downloadable
- [ ] Project screenshots/videos prepared
- [ ] Contact form tested (Formspree connected)
- [ ] Analytics installed (Vercel Analytics)
- [ ] SEO meta tags verified (Open Graph preview tested)
- [ ] Performance tested (Lighthouse score 90+)
- [ ] Accessibility audited (WAVE, axe)
- [ ] Mobile tested (iOS Safari, Android Chrome)
- [ ] Cross-browser tested (Chrome, Firefox, Safari, Edge)
- [ ] 404 page designed
- [ ] Favicon and app icons added

### 15.2 Launch Day
1. **Deploy to Production:** Merge to `main` branch → Auto-deploy to Vercel
2. **Update LinkedIn:** Change website to kishanssg.vercel.app
3. **Update GitHub Profile:** Add portfolio link to bio
4. **Update Resume:** Add portfolio URL
5. **Social Announcement:**
   - LinkedIn post with screenshot + key features
   - Twitter thread (if applicable)
6. **Share in Communities:**
   - DEV. to showcase post
   - Hacker News Show HN (if unique enough)
   - Reddit r/webdev (if appropriate)

### 15.3 Post-Launch (Week 1)
- Monitor analytics (traffic sources, popular sections)
- Fix any bugs reported
- Collect feedback from 5+ trusted peers
- Iterate on UX based on session recordings (Hotjar free tier)

### 15.4 Post-Launch (Month 1)
- Write