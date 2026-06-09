"use client";

/* eslint-disable @next/next/no-img-element */
import React, { useEffect, useRef, useState } from "react";
import Starfield from "@/components/starfield";

const BIRTH_DATE = "2001-03-07";
const ACCENT = "#e7b24d";
const RESUME_URL = "https://drive.google.com/file/d/1PtjWHluV8STGgtCEq2PLlrSKfwDki_GA";
const EMAIL_ADDRESS = "kyle.newbigging@gmail.com";
const PROFILE_PHOTO_SRC =
  process.env.NEXT_PUBLIC_PROFILE_PHOTO_URL || "/LinkedInProfile.jpg";

type Tech = {
  id: string;
  label: string;
  color: string;
  blurb: string;
  items: string[];
};

type Project = {
  title: string;
  tag: string;
  status: string;
  blurb: string;
  details: string[];
  link?: string;
};

type LinkItem = {
  label: string;
  href: string;
  note: string;
};

const TECH: Tech[] = [
  {
    id: "nodejs",
    label: "Node.js",
    color: "#7cc36a",
    blurb:
      "Backends, REST and real-time APIs, and the glue that holds services together.",
    items: [
      "Express / Fastify",
      "WebSockets and realtime",
      "Postgres / Mongo",
      "Auth and REST APIs",
    ],
  },
  {
    id: "flutter",
    label: "Flutter",
    color: "#5cc6f0",
    blurb: "One codebase, native-feeling apps on iOS and Android.",
    items: [
      "Dart",
      "Cross-platform UI",
      "State management",
      "Native integrations",
    ],
  },
  {
    id: "htmlcss",
    label: "HTML / CSS / JS",
    color: "#e8a24a",
    blurb: "The web, end to end: interactive, fast, and built to feel good.",
    items: ["React", "Canvas and animation", "Responsive layout", "Tailwind"],
  },
  {
    id: "others",
    label: "Others",
    color: "#e8cf4a",
    blurb: "Whatever the problem needs, especially AI and game development.",
    items: ["Python / ML", "Unity and C#", "Three.js / WebGL", "Always learning"],
  },
];

const PROJECTS: Project[] = [
  {
    title: "OpenClaw Agent Workflow",
    tag: "AI Agents",
    status: "Personal automation experiment",
    blurb:
      "Experimenting with OpenClaw, Discord, Codex Pro, and GitHub issue workflows so I can kick off useful development work remotely.",
    details: [
      "Discord bot as a remote control surface",
      "Cron jobs that refine issues and attempt implementations",
      "Pull requests stay gated behind my review before going live",
    ],
  },
  {
    title: "Operations Dashboard",
    tag: "Internal Tools",
    status: "Zebra Robotics",
    blurb:
      "Built an internal scheduling and student-tracking dashboard for a robotics education center with workflows for makeups, teams, summer planning, and billing support.",
    details: [
      "Live schedule and student state tracking",
      "Tokenized parent response links to reduce email overhead",
      "Operational data shaped for billing and admin follow-through",
    ],
  },
  {
    title: "Coach Wiki & Onboarding",
    tag: "Knowledge Systems",
    status: "Zebra Robotics",
    blurb:
      "Created an internal wiki and course materials that help new coaches learn center-specific teaching, equipment, day-to-day operations, and classroom management.",
    details: [
      "Onboarding guides for new teachers",
      "Course, materials, and equipment references",
      "Teaching guidelines for niche robotics programs",
    ],
  },
  {
    title: "OnTrack",
    tag: "Product",
    status: "Collaborative app",
    blurb:
      "A goal-accountability app for career, health, and daily momentum, built with collaborators to help people keep projects, tasks, and priorities in one place.",
    details: [
      "Goals, projects, tasks, and daily lists",
      "AI summaries that help pick up where you left off",
      "Public prototype lives as North Star on GitHub",
    ],
    link: "https://github.com/KyleNewbigging/northstar",
  },
  {
    title: "Undergraduate Prerequisites",
    tag: "Data Viz",
    status: "Public GitHub project",
    blurb:
      "A React app that visualizes university course prerequisites as directed graphs, with search and automated data extraction from academic sources.",
    details: [
      "React interface with graph exploration",
      "Python and Flask data pipeline",
      "Playwright checks for functionality monitoring",
    ],
    link: "https://github.com/KyleNewbigging/UndergraduatePrerequisites",
  },
  {
    title: "Pacman AI",
    tag: "Reinforcement Learning",
    status: "Public GitHub project",
    blurb:
      "A Python reinforcement learning project based on UC Berkeley's AI curriculum, exploring Q-learning, feature extraction, and layout performance.",
    details: [
      "Q-learning agents and custom features",
      "Performance analysis across layouts",
      "Built as a practical AI learning project",
    ],
    link: "https://github.com/KyleNewbigging/PacmanAI",
  },
];

const LINKS: LinkItem[] = [
  {
    label: "GitHub",
    href: "https://github.com/KyleNewbigging",
    note: "github.com/KyleNewbigging",
  },
  {
    label: "LinkedIn",
    href: "https://ca.linkedin.com/in/kyle-newbigging",
    note: "linkedin.com/in/kyle-newbigging",
  },
  {
    label: "Email",
    href: `mailto:${EMAIL_ADDRESS}`,
    note: EMAIL_ADDRESS,
  },
  { label: "Resume", href: RESUME_URL, note: "PDF" },
];

function useLiveAge(birthDate: string) {
  const [age, setAge] = useState("");

  useEffect(() => {
    const birthday = new Date(birthDate).getTime();
    const calculateAge = () => {
      const years = (Date.now() - birthday) / (1000 * 60 * 60 * 24 * 365.25);
      setAge(years.toFixed(9));
    };

    calculateAge();
    const intervalId = window.setInterval(calculateAge, 50);

    return () => window.clearInterval(intervalId);
  }, [birthDate]);

  return age;
}

function AgeCounter({ birthDate }: { birthDate: string }) {
  const age = useLiveAge(birthDate);
  const [whole, fraction] = age.split(".");

  return (
    <div className="age-counter">
      <span className="age-pre">I&apos;m a</span>
      <span className="age-num">
        <span className="age-whole">{whole || "--"}</span>
        <span className="age-frac">.{fraction || "000000000"}</span>
      </span>
      <span className="age-pre">year-old developer</span>
    </div>
  );
}

function TechTags({
  active,
  setActive,
}: {
  active: string | null;
  setActive: (value: string | null) => void;
}) {
  return (
    <div className="tech-row" aria-label="Technologies">
      {TECH.map((tech) => (
        <button
          key={tech.id}
          className={`tech-tag${active === tech.id ? " is-active" : ""}`}
          style={{ "--tc": tech.color } as React.CSSProperties}
          type="button"
          aria-expanded={active === tech.id}
          aria-controls="tech-panel"
          onClick={() => setActive(active === tech.id ? null : tech.id)}
        >
          {tech.label}
        </button>
      ))}
    </div>
  );
}

function TechPanel({ active }: { active: string | null }) {
  const tech = TECH.find((item) => item.id === active);

  return (
    <div
      className={`tech-panel${tech ? " is-open" : ""}`}
      id="tech-panel"
      aria-live="polite"
    >
      {tech ? (
        <div
          className="tech-panel-inner"
          style={{ "--tc": tech.color } as React.CSSProperties}
        >
          <div className="tech-panel-head">
            <span className="tech-dot" />
            <span className="tech-panel-title">{tech.label}</span>
          </div>
          <p className="tech-panel-blurb">{tech.blurb}</p>
          <ul className="tech-panel-list">
            {tech.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
}

function Hero() {
  const [active, setActive] = useState<string | null>(null);
  const [photoSrc, setPhotoSrc] = useState(PROFILE_PHOTO_SRC);

  return (
    <section className="hero" id="home">
      <div className="hero-inner">
        <div className="photo-wrap">
          <div className="photo-ring" />
          <img
            className="photo"
            src={photoSrc}
            alt="Kyle Newbigging"
            width={613}
            height={613}
            onError={() => setPhotoSrc("/LinkedInProfile.jpg")}
          />
        </div>

        <h1 className="name">Kyle Newbigging</h1>
        <AgeCounter birthDate={BIRTH_DATE} />

        <p className="hero-sub">who uses</p>
        <TechTags active={active} setActive={setActive} />
        <TechPanel active={active} />
      </div>

      <a href="#about" className="scroll-cue" aria-label="Scroll to about">
        <span>explore</span>
        <span className="scroll-arrow" aria-hidden="true">
          &darr;
        </span>
      </a>
    </section>
  );
}

function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.18 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={`${className} reveal${shown ? " in" : ""}`}>
      {children}
    </div>
  );
}

function About() {
  const facts = [
    { key: "B.Sc.", value: "Computer Science, Math minor" },
    { key: "Guelph", value: "University of Guelph" },
    { key: "Work", value: "Full-stack tools and operations systems" },
    { key: "Into", value: "AI agents, automation, and game development" },
  ];

  return (
    <section className="section" id="about">
      <Reveal className="section-head">
        <span className="kicker">01 - About</span>
        <h2 className="section-title">A developer who likes hard problems.</h2>
      </Reveal>
      <Reveal className="about-grid">
        <p className="about-body">
          I studied Computer Science with a Math minor at the University of
          Guelph, where I was also president and captain of the varsity ultimate
          frisbee team. I have been hooked on technology since I was young, and
          these days that energy goes mostly into AI, internal tools, and game
          development. I like building systems that turn messy real-world
          operations into something calmer, faster, and easier for people to use.
        </p>
        <ul className="facts">
          {facts.map((fact) => (
            <li key={fact.key}>
              <span className="fact-k">{fact.key}</span>
              <span className="fact-v">{fact.value}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isExternal = project.link?.startsWith("http");
  const content = (
    <>
      <div className="proj-thumb">
        <span className="proj-thumb-label">{project.status}</span>
        <span className="proj-index">{String(index + 1).padStart(2, "0")}</span>
      </div>
      <div className="proj-meta">
        <div className="proj-titlerow">
          <h3 className="proj-title">{project.title}</h3>
          <span className="proj-tag">{project.tag}</span>
        </div>
        <p className="proj-blurb">{project.blurb}</p>
        <ul className="proj-details">
          {project.details.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </>
  );

  return (
    <Reveal className="proj-card">
      {project.link ? (
        <a
          href={project.link}
          className="proj-link"
          target={isExternal ? "_blank" : undefined}
          rel={isExternal ? "noreferrer" : undefined}
        >
          {content}
        </a>
      ) : (
        <article className="proj-link proj-link-static">{content}</article>
      )}
    </Reveal>
  );
}

function Work() {
  return (
    <section className="section" id="work">
      <Reveal className="section-head">
        <span className="kicker">02 - Work</span>
        <h2 className="section-title">Systems I am building.</h2>
      </Reveal>
      <div className="proj-grid">
        {PROJECTS.map((project, index) => (
          <ProjectCard key={project.title} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section className="section contact" id="contact">
      <Reveal className="section-head">
        <span className="kicker">03 - Contact</span>
        <h2 className="section-title">Let&apos;s build something.</h2>
      </Reveal>
      <Reveal className="link-grid">
        {LINKS.map((link) => {
          const isExternal = link.href.startsWith("http");

          return (
            <a
              key={link.label}
              className="link-card"
              href={link.href}
              target={isExternal ? "_blank" : undefined}
              rel={isExternal ? "noreferrer" : undefined}
            >
              <span className="link-label">{link.label}</span>
              <span className="link-note">{link.note}</span>
              <span className="link-arrow" aria-hidden="true" />
            </a>
          );
        })}
      </Reveal>
      <footer className="footer">
        <span>&copy; {new Date().getFullYear()} Kyle Newbigging</span>
        <span className="footer-dim">built among the stars</span>
      </footer>
    </section>
  );
}

function Nav() {
  const [solid, setSolid] = useState(false);

  useEffect(() => {
    const handleScroll = () => setSolid(window.scrollY > 60);

    handleScroll();
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={`nav${solid ? " solid" : ""}`} aria-label="Main">
      <a href="#home" className="nav-logo">
        KN<span>.</span>
      </a>
      <div className="nav-links">
        <a href="#about">About</a>
        <a href="#work">Work</a>
        <a href="#contact">Contact</a>
      </div>
    </nav>
  );
}

export default function Home() {
  useEffect(() => {
    document.documentElement.style.setProperty("--accent", ACCENT);
  }, []);

  return (
    <div className="portfolio-app">
      <Starfield density="regular" motion accent={ACCENT} />
      <div className="vignette" />
      <Nav />
      <main>
        <Hero />
        <About />
        <Work />
        <Contact />
      </main>
    </div>
  );
}
