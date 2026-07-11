import { useEffect, useState } from 'react';
import { useTheme } from './theme.tsx';
import { useReveal } from './hooks.ts';
import { experience } from './data/experience.ts';
import { projects, type Project } from './data/projects.ts';
import { skillGroups } from './data/skills.ts';
import { education, awards } from './data/education.ts';
import {
  GitHubIcon,
  LinkedInIcon,
  MailIcon,
  LinkIcon,
  PlayIcon,
  BoxIcon,
  SunIcon,
  MoonIcon,
  ArrowDownIcon
} from './icons.tsx';

const EMAIL = 'rwherber@gmail.com';
const GITHUB = 'https://github.com/rob893';
const LINKEDIN = 'https://www.linkedin.com/in/robert-herber-2b9837b8/';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
];

export function App() {
  return (
    <div className="app">
      <Backdrop />
      <Header />
      <main>
        <Hero />
        <ExperienceSection />
        <ProjectsSection />
        <SkillsSection />
        <EducationSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

function Backdrop() {
  return (
    <div className="backdrop" aria-hidden="true">
      <div className="glow glow-1" />
      <div className="glow glow-2" />
      <div className="grid-overlay" />
    </div>
  );
}

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle color theme" title="Toggle theme">
      {theme === 'dark' ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}

function Header() {
  const [active, setActive] = useState('about');
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = NAV.map(n => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      entries => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id);
          }
        }
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header className={scrolled ? 'site-header scrolled' : 'site-header'}>
      <a className="brand" href="#about" onClick={() => setMenuOpen(false)}>
        <span className="brand-mark">RH</span>
        <span className="brand-name">Robert Herber</span>
      </a>
      <nav className={menuOpen ? 'nav open' : 'nav'}>
        {NAV.map(n => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={active === n.id ? 'nav-link active' : 'nav-link'}
            onClick={() => setMenuOpen(false)}
          >
            {n.label}
          </a>
        ))}
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <button className="menu-btn" aria-label="Toggle navigation" onClick={() => setMenuOpen(o => !o)}>
          <span className={menuOpen ? 'bar b1' : 'bar'} />
          <span className={menuOpen ? 'bar b2' : 'bar'} />
          <span className={menuOpen ? 'bar b3' : 'bar'} />
        </button>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="about" className="hero">
      <div className="hero-inner">
        <div className="hero-text">
          <p className="eyebrow">
            <span className="status-dot" /> Principal Software Engineer · Microsoft
          </p>
          <h1>
            Hi, I&apos;m <span className="accent">Robert Herber</span>.
          </h1>
          <p className="lede">
            Principal Software Engineer at Microsoft who enjoys building cool stuff — from AI-powered developer
            platforms and cloud-scale services to game engines and the occasional emoji-only cache.
          </p>
          <p className="sub-lede">
            I design and ship systems that make thousands of engineers more productive, obsess over code quality, and
            love turning hard problems into clean, reliable software.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="#projects">
              View my work
            </a>
            <a className="btn btn-ghost" href="/RobertHerberResume.pdf" target="_blank" rel="noreferrer">
              Résumé (PDF)
            </a>
          </div>
          <div className="hero-social">
            <a href={GITHUB} target="_blank" rel="noreferrer" aria-label="GitHub">
              <GitHubIcon />
            </a>
            <a href={LINKEDIN} target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <LinkedInIcon />
            </a>
            <a href={`mailto:${EMAIL}`} aria-label="Email">
              <MailIcon />
            </a>
            <span className="hero-loc">Atlanta, GA</span>
          </div>
        </div>
        <div className="hero-portrait">
          <div className="portrait-ring">
            <img src="/profile.jpg" alt="Robert Herber" loading="eager" />
          </div>
        </div>
      </div>
      <a className="scroll-hint" href="#experience" aria-label="Scroll to experience">
        <ArrowDownIcon />
      </a>
    </section>
  );
}

function Reveal({ children, className }: { children: React.ReactNode; className?: string }) {
  const [ref, visible] = useReveal<HTMLDivElement>();
  return (
    <div ref={ref} className={`reveal${visible ? ' in' : ''}${className ? ` ${className}` : ''}`}>
      {children}
    </div>
  );
}

function SectionHeading({ index, title, kicker }: { index: string; title: string; kicker: string }) {
  return (
    <div className="section-heading">
      <span className="section-index">{index}</span>
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
    </div>
  );
}

function ExperienceSection() {
  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <SectionHeading index="01" kicker="Where I've worked" title="Experience" />
        </Reveal>
        <div className="timeline">
          {experience.map(job => (
            <Reveal key={`${job.company}-${job.start}`}>
              <article className="glass timeline-item">
                <div className="timeline-meta">
                  <span className={`period${job.current ? ' current' : ''}`}>
                    {job.start} — {job.end}
                  </span>
                </div>
                <div className="timeline-body">
                  <h3>{job.role}</h3>
                  <p className="company">{job.company}</p>
                  <ul>
                    {job.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  {job.tags && (
                    <div className="chip-row">
                      {job.tags.map(t => (
                        <span key={t} className="chip">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const FILTERS = ['All', 'Featured', 'Web App', 'Library', 'Game'] as const;
type Filter = (typeof FILTERS)[number];

function matchesFilter(project: Project, filter: Filter): boolean {
  if (filter === 'All') return true;
  if (filter === 'Featured') return !!project.featured;
  if (filter === 'Game') return project.category === 'Game' || project.category === 'Game Engine';
  return project.category === filter;
}

function linkIcon(kind: Project['links'][number]['kind']) {
  switch (kind) {
    case 'github':
      return <GitHubIcon size={16} />;
    case 'video':
      return <PlayIcon size={16} />;
    case 'npm':
      return <BoxIcon size={16} />;
    default:
      return <LinkIcon size={16} />;
  }
}

function ProjectsSection() {
  const [filter, setFilter] = useState<Filter>('Featured');
  const shown = projects.filter(p => matchesFilter(p, filter));

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <SectionHeading index="02" kicker="Things I've built" title="Projects" />
        </Reveal>
        <Reveal>
          <div className="filter-row">
            {FILTERS.map(f => (
              <button key={f} className={filter === f ? 'filter active' : 'filter'} onClick={() => setFilter(f)}>
                {f}
              </button>
            ))}
          </div>
        </Reveal>
        <div className="project-grid">
          {shown.map(p => (
            <Reveal key={p.name}>
              <article className="glass project-card">
                <div className="project-top">
                  <span className="project-cat">{p.category}</span>
                  {p.featured && (
                    <span className="star" title="Featured">
                      ★
                    </span>
                  )}
                </div>
                <h3>{p.name}</h3>
                <p className="project-blurb">{p.blurb}</p>
                <div className="chip-row">
                  {p.tech.map(t => (
                    <span key={t} className="chip small">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="project-links">
                  {p.links.map(l => (
                    <a key={l.url} href={l.url} target="_blank" rel="noreferrer" className="project-link">
                      {linkIcon(l.kind)}
                      {l.label}
                    </a>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <SectionHeading index="03" kicker="My toolbox" title="Skills & tech" />
        </Reveal>
        <div className="skills-grid">
          {skillGroups.map(group => (
            <Reveal key={group.title}>
              <div className="glass skill-card">
                <h3>{group.title}</h3>
                <div className="chip-row">
                  {group.skills.map(s => (
                    <span key={s} className="chip">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function EducationSection() {
  return (
    <section id="education" className="section">
      <div className="container">
        <Reveal>
          <SectionHeading index="04" kicker="Background" title="Education & awards" />
        </Reveal>
        <div className="edu-layout">
          <div className="edu-col">
            {education.map(e => (
              <Reveal key={e.degree + e.field}>
                <div className="glass edu-card">
                  <div className="edu-head">
                    <h3>{e.degree}</h3>
                    <span className="period">
                      {e.start} — {e.end}
                    </span>
                  </div>
                  <p className="edu-field">{e.field}</p>
                  <p className="edu-school">
                    {e.school} · {e.location}
                  </p>
                  {e.detail && <span className="edu-detail">{e.detail}</span>}
                </div>
              </Reveal>
            ))}
          </div>
          <div className="award-col">
            <Reveal>
              <div className="glass award-card">
                <h3>Awards & honors</h3>
                <ul className="award-list">
                  {awards.map(a => (
                    <li key={a}>
                      <span className="trophy">🏆</span>
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal>
          <div className="glass contact-card">
            <p className="section-kicker center">Get in touch</p>
            <h2>Let&apos;s build something.</h2>
            <p className="contact-text">
              Whether you want to talk shop about distributed systems, AI tooling, or a side project idea — my inbox is
              always open.
            </p>
            <a className="btn btn-primary btn-lg" href={`mailto:${EMAIL}`}>
              <MailIcon size={18} /> {EMAIL}
            </a>
            <div className="contact-social">
              <a href={GITHUB} target="_blank" rel="noreferrer" className="contact-social-link">
                <GitHubIcon size={18} /> GitHub
              </a>
              <a href={LINKEDIN} target="_blank" rel="noreferrer" className="contact-social-link">
                <LinkedInIcon size={18} /> LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} Robert Herber</p>
    </footer>
  );
}
