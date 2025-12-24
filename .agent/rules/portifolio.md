# Kishan's Portfolio - Antigravity Agent Rules

## Project Context
This is a dual-mode interactive portfolio for Kishan Sai Sriman Goli - a full-stack software engineer who builds scalable systems. The portfolio showcases technical expertise while demonstrating creativity and personality.

---

## 🎯 Project-Specific Requirements

### Brand Identity
**Positioning**: Software Engineer & Builder at Core
- **Tagline**: "Idea → Execution → Scalable Systems"
- **Focus**:  AI-powered productivity, scalable architecture, real-world impact
- **Tone**: Professional yet approachable, technical yet accessible

### Color Palette (MUST USE)
**Professional Mode:**
```css
Primary Background: #0A0A0A (deep black)
Secondary Background: #1A1A1A (dark gray)
Primary Text: #F5F5F5 (off-white)
Secondary Text: #A0A0A0 (gray)
Accent Primary: #00D4AA (signature cyan - this is Kishan's brand color)
Accent Secondary: #0071E3 (blue for CTAs)
Border: #2A2A2A
```

**Portal Mode:**
```css
Background: #000000 (pure black)
Accent 1: #00FF88 (neon green)
Accent 2: #00D4FF (bright cyan)
Accent 3: #FF006E (magenta)
Glow Effect: Use neon-style box-shadows
```

**CRITICAL**:  The cyan (#00D4AA) is Kishan's signature color. Use it strategically for brand recognition. 

### Typography Stack
- **Headings**: Inter (font-weight: 700)
- **Body**:  Inter (font-weight: 400)
- **Code/Technical**: 'Fira Code' or 'JetBrains Mono'
- **Scale**: Use fluid typography with clamp()

### Icons
- Use **Lucide React** icons exclusively
- Icon size: 20px (small), 24px (default), 32px (large)
- Stroke width: 2px
- Always include aria-labels for accessibility

---

## 📐 Layout Requirements

### Navigation
- **Height**: 64px on desktop, 56px on mobile
- **Logo**:  "Kishan Goli" with optional monogram "KSG"
- **Links**: About, Projects, Experience, Skills, Contact
- **Portal Toggle**: Prominent button on right:  "🌀 Bored?  Enter the Portal →"
- **Sticky**:  Yes, with backdrop blur on scroll

### Grid System
- **Max Width**: 1280px for content
- **Padding**: 24px mobile, 48px tablet, 64px desktop
- **Columns**: 12-column grid
- **Gap**: 24px (mobile), 32px (desktop)

### Spacing Scale (Strictly Follow)
```
xs: 4px
sm: 8px
md: 16px
lg:  24px
xl: 32px
2xl: 48px
3xl: 64px
4xl: 96px
5xl: 128px
```

---

## 🎨 Design Patterns

### Cards (Project Cards, Stat Cards)
```tsx
// Example structure
<Card>
  - Border radius: 12px
  - Padding: 24px
  - Background: rgba(26, 26, 26, 0.5)
  - Border: 1px solid rgba(255, 255, 255, 0.1)
  - Hover: translateY(-4px) + shadow increase
  - Transition: 250ms ease-out
</Card>
```

### Buttons
**Primary:**
- Background: var(--accent-primary)
- Text: #0A0A0A (dark text on cyan)
- Padding: 12px 24px
- Border radius: 8px
- Hover:  Slight scale (1.02) + brightness increase

**Secondary:**
- Border: 1px solid var(--accent-primary)
- Background: transparent
- Text: var(--accent-primary)
- Hover: Fill with accent color

### Animations (MUST FOLLOW)
**Scroll Animations:**
- Trigger at 20% into viewport
- Fade + translateY(20px → 0)
- Duration: 600ms
- Easing: cubic-bezier(0.4, 0, 0.2, 1)

**Hover Animations:**
- Duration: 200-250ms
- Use transform, not position changes
- Add box-shadow changes for depth

**Page Transitions:**
- Portal toggle:  1. 5s iris/circle transition
- Section scrolling:  Smooth scroll with offset

---

## 💻 Technical Implementation Rules

### Component Architecture
```
components/
├── shared/          # Reusable across modes
│   ├── Navigation
│   ├── Footer
│   ├── Button
│   └── Card
├── professional/    # Professional mode only
│   ├── Hero
│   ├── About
│   ├── ProjectCard
│   └── ContactForm
└── portal/         # Portal mode only
    ├── Scene3D
    ├── games/
    └── ProjectGallery3D
```

**Rules:**
- Max 200 lines per component
- One component per file
- Use TypeScript strict mode
- Props must be typed with interfaces
- Export default for components, named for utilities

### State Management
- **Mode Toggle**: Use React Context (`ModeContext`)
- **Theme**: Use React Context (`ThemeContext`)
- **Forms**: React Hook Form + Zod
- **No Global State Libraries**: Keep it simple

### Data Structure
All content lives in `/src/data/`:

```typescript
// projects.ts
export interface Project {
  id: string;
  title: string;
  tagline: string;
  description: string;
  metrics: { label: string; value: string }[];
  techStack: string[];
  links: { github?:  string; demo?: string; };
  thumbnail: string;
  featured: boolean;
  category: 'web' | 'mobile' | 'ai' | 'tool';
}

export const projects: Project[] = [
  // D2D_Handoff, Park My Ride, etc.
];
```

### Performance Budget
- **Lighthouse Score**: 95+ (all categories)
- **First Contentful Paint**: < 1.5s
- **Time to Interactive**: < 3s
- **Total Bundle**:  < 200KB (initial, gzipped)
- **Images**: WebP with AVIF fallback
- **Lazy Load**: Everything below fold

### 3D Performance
- **Particle Count**: 2000 max on desktop, 500 on mobile
- **FPS Target**: 60fps (throttle to 30fps on low-end devices)
- **Load Strategy**: Lazy load Three.js only in Portal Mode
- **Fallback**: Show static version if WebGL unavailable

---

## 📝 Content Requirements

### Hero Section Copy
```
Line 1: Kishan Sai Sriman Goli
Line 2: Software Engineer & Builder at Core
Line 3: Idea → Execution → Scalable Systems
Line 4: Leveraging AI to build faster, smarter, better. 
```

### Project Metrics (Use These Exact Phrases)
- D2D_Handoff: "75% faster frontend builds"
- GravyWork: "90% reduction in scheduling errors"
- Park My Ride: "Handles 500+ concurrent users"
- VibeAudit: "Used by developers in AI communities"
- VibeLink: "10× faster AI reasoning"
- UCF Parking Finder: "Recognized at Knight Hacks 2024"

### Contact Form
- **Fields**: Name, Email, Message
- **Validation**: 
  - Name: min 2 chars
  - Email: valid email format
  - Message: min 10 chars
- **Endpoint**:  Formspree (configure in env)
- **Success**:  "Thanks!  I'll get back to you within 24 hours."

---

## 🎮 Portal Mode Specifications

### Games Priority Order
1. **Debug The Code** (Highest priority)
2. **Speed Typing** (Medium priority)
3. **System Design Builder** (Medium priority)
4. **Bug Hunt 3D** (Low priority - build last)

### 3D Scene Settings
```typescript
// Three.js configuration
camera: {
  fov: 75,
  near: 0.1,
  far: 1000,
  position: [0, 0, 5]
}

particles: {
  count: 2000, // Desktop
  size: 0.05,
  color: '#00FF88',
  speed: 0.5
}

controls: {
  enableZoom: false,
  enablePan: false,
  autoRotate: true,
  autoRotateSpeed: 0.5
}
```

---

## ♿ Accessibility Non-Negotiables

### Keyboard Navigation
- Tab order follows visual flow
- All interactive elements focusable
- Focus indicator:  2px solid cyan outline
- Skip to content link (hidden until focused)
- Escape closes modals/menus

### Screen Readers
```tsx
// Example patterns
<button aria-label="Toggle Portal Mode">
  🌀 Enter Portal
</button>

<img 
  src="project.png" 
  alt="D2D_Handoff converting Figma design to React code"
/>

<nav aria-label="Main navigation">
  {/* nav items */}
</nav>
```

### Color Contrast
- All text: minimum 4.5:1
- Large text (18px+): minimum 3:1
- Interactive elements: minimum 3:1
- Test with Chrome DevTools contrast checker

---

## 🚀 Deployment Rules

### Environment Variables
```env
NEXT_PUBLIC_SITE_URL=kishanssg.vercel.app
FORMSPREE_ENDPOINT=your_endpoint
NEXT_PUBLIC_GA_ID=optional
```

### Build Process
1. `npm run lint` (must pass with 0 errors)
2. `npm run build` (must succeed)
3. `npm run test` (if tests exist)
4. Lighthouse CI check (must score 90+)
5. Auto-deploy to Vercel on merge to main

### Performance Monitoring
- Vercel Analytics enabled
- Monitor Core Web Vitals
- Alert if Lighthouse score drops below 90

---

## 🎯 Quality Checklist (Run Before Committing)

### Code Quality
- [ ] No console.logs in production code
- [ ] All TypeScript errors resolved
- [ ] ESLint passes with no warnings
- [ ] Prettier formatted all files
- [ ] No unused imports or variables
- [ ] All components have proper TypeScript types

### Design Quality
- [ ] Spacing follows the scale (no arbitrary values)
- [ ] Colors use CSS variables (no hardcoded hex)
- [ ] All animations have `prefers-reduced-motion` check
- [ ] Responsive on 320px, 768px, 1024px, 1920px
- [ ] All images optimized and lazy-loaded

### Content Quality
- [ ] No placeholder text (Lorem ipsum)
- [ ] All links tested and working
- [ ] Contact form sends to correct email
- [ ] Resume PDF is latest version
- [ ] All project data is accurate

### Accessibility
- [ ] Lighthouse accessibility score 100
- [ ] Keyboard navigation works
- [ ] Screen reader tested (NVDA/VoiceOver)
- [ ] All images have alt text
- [ ] Focus indicators visible

---

## 🔧 Development Workflow

### Branch Strategy
- `main` - Production (auto-deploys)
- `develop` - Development branch
- `feature/*` - Feature branches

### Commit Messages
Use conventional commits:
```
feat: add portal mode transition animation
fix: resolve mobile menu z-index issue
docs: update README with setup instructions
style: adjust spacing on project cards
perf: lazy load Three.js bundle
```

### PR Requirements
- Title describes the change
- Description explains why (not just what)
- Screenshots for visual changes
- Lighthouse scores attached
- No merge conflicts

---

## 📚 Reference Links

### Design Assets
- Resume: `/public/resume/kishan_goli_resume.pdf`
- LinkedIn: `linkedin.com/in/kishanssg`
- GitHub: `github.com/kishanssg`
- Email: `kishan.ss. goli@gmail.com`

### External Resources
- Icons: Lucide React (https://lucide.dev)
- Fonts: Inter (Google Fonts)
- 3D:  React Three Fiber docs
- Animations: Framer Motion docs

---

## ⚠️ Common Pitfalls to Avoid

### Design
- ❌ Don't use more than 3 font weights of Inter
- ❌ Don't add animations just because you can
- ❌ Don't use stock photos - custom graphics only
- ❌ Don't make the Portal toggle too subtle

### Code
- ❌ Don't import entire Three.js - import only what you need
- ❌ Don't forget to memoize expensive computations
- ❌ Don't use `any` type - type everything properly
- ❌ Don't bundle 3D assets in main bundle

### Content
- ❌ Don't exaggerate metrics - be honest
- ❌ Don't use buzzwords without substance
- ❌ Don't forget to update copyright year
- ❌ Don't leave contact form without spam protection

---

## 🎓 Learning as You Build

### If You Get Stuck
1. Check the full PRD in `/docs/PRD.md`
2. Reference the `.rules` file (global standards)
3. Look at similar portfolios for inspiration (don't copy)
4. Ask specific questions about implementation

### Testing Your Decisions
- Does this make the portfolio more memorable?
- Does this showcase Kishan's skills?
- Will recruiters understand this? 
- Does this perform well on mobile?

---

**Remember**: This portfolio is Kishan's digital handshake. Every detail matters. Build with intention, polish with pride. 

Last Updated: 2025-12-21
Version: 1.0