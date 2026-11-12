import Image from "next/image";
import { ArrowUpRight, Download, Mail, MapPin, Phone } from "lucide-react";
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiMysql,
  SiPhp,
  SiLaravel,
  SiGit,
  SiGithub as Github,
  SiPostman,
  SiVuedotjs,
  SiPostgresql,
  SiFlutter,
  SiFirebase,
  SiDocker,
  SiVercel,
  SiDart,
  SiLinkedin as Linkedin,
  SiOpenai,
  SiSupabase,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { Bot, Cpu, Network, Sparkles } from "lucide-react";

import { createClient } from "@/utils/supabase/server";
import { getIcon } from "@/components/icons-map";
import Navbar, { type NavItem } from "@/components/Navbar";
import SmoothScroll from "@/components/SmoothScroll";
import BackToTop from "@/components/BackToTop";
import MotionReveal from "@/components/MotionReveal";
import CaseStudyLink from "@/components/CaseStudyLink";
import GitHubActivity from "@/components/GitHubActivity";
import ContactForm from "@/components/ContactForm";

export const dynamic = "force-dynamic";

const navItems: NavItem[] = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

type Project = {
  id?: string;
  title: string;
  role: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  github: string;
  demo?: string;
  image_url?: string;
};

type Experience = {
  id?: string;
  role: string;
  company: string;
  period: string;
  description: string;
};

type Education = {
  id?: string;
  degree: string;
  institution: string;
  period: string;
};

type Certification = {
  id?: string;
  name: string;
  issuer: string;
  year: string;
  file_url?: string;
  credential_link?: string;
};

type SkillItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const fallbackProjects: Project[] = [
  {
    title: "Resumora",
    role: "Fullstack / Frontend Engineer",
    problem:
      "Pembuatan CV/Resume profesional yang lolos uji ATS seringkali rumit, memakan waktu, dan minim optimasi formulasi kata kunci relevan.",
    solution:
      "Membangun platform AI Resume Builder modern dengan live dynamic preview editor, ATS Match Score calculator, asisten penulisan AI, multi-template responsif, serta ekspor PDF instan.",
    result:
      "Menghadirkan aplikasi resume builder bertenaga AI dengan kompatibilitas ATS 98%+, live preview instan, dan integrasi cloud storage.",
    tech: [
      "React 19",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
      "Zustand",
      "Zod",
      "Supabase",
    ],
    github: "https://github.com/Nizarafif/resumora",
    demo: "https://resumoraa.netlify.app/",
    image_url: "/images/resumora.png",
  },
  {
    title: "NexaOps",
    role: "Fullstack Developer & Architect",
    problem:
      "Sistem pemantauan dan pengelolaan seluruh siklus aset IT perusahaan (hardware, software, lisensi, jaringan) secara real-time dengan jejak audit mutasi, barcode scanner, dan kalkulasi depresiasi.",
    solution:
      "Membangun platform IT Asset Monitoring & Management berbasis Clean Architecture menggunakan Laravel 13 REST API, React 18, TypeScript, Tailwind CSS, TanStack Query, Framer Motion, dan Recharts.",
    result:
      "Menghadirkan dashboard monitoring aset real-time, kalkulasi depresiasi otomatis, alert masa garansi, dan cetak label QR code fisik.",
    tech: [
      "Laravel 13",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "Framer Motion",
      "Recharts",
    ],
    github: "https://github.com/Nizarafif/nexaops",
    demo: "https://nexaops.vercel.app/",
    image_url: "/images/nexaops.png",
  },
  {
    title: "NexaPort",
    role: "Fullstack Developer & Lead",
    problem:
      "Kebutuhan platform enterprise manajemen depo logistik kontainer terpadu untuk pelacakan peti kemas real-time, visualisasi denah yard 2D/3D, dan gate automation.",
    solution:
      "Mengembangkan Intelligent Container Logistics & Depot Platform menggunakan Laravel REST API (PostgreSQL immutable ledger) dan React TypeScript frontend dengan visualizer yard interaktif.",
    result:
      "Meningkatkan efisiensi pelacakan kontainer dan monitoring operasional depo dengan visualisasi denah yard dan ledger pergerakan kontainer.",
    tech: [
      "Laravel",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Vite",
      "PostgreSQL",
      "Lucide React",
    ],
    github: "https://github.com/Nizarafif/nexaport",
    demo: "https://nexaport.vercel.app/",
    image_url: "/images/nexaport.png",
  },
  {
    title: "FlowSync",
    role: "Fullstack Developer",
    problem:
      "Building an integrated project and task management platform to help teams manage workflows, schedules, and collaboration in a single dynamic dashboard.",
    solution:
      "Developing the FlowSync application using React, TypeScript, Vite, and Tailwind CSS with drag-and-drop Kanban Board, interactive calendar, and task analysis visualization.",
    result:
      "Delivered a responsive and efficient workflow management system with seamless visual synchronization between calendar scheduling and task boards.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/Nizarafif/FlowSync",
    demo: "https://flow-sync-one.vercel.app/",
    image_url: "/images/Flowsync.png",
  },
  {
    title: "E-Commerce App",
    role: "Fullstack Developer",
    problem:
      "Building a modern, responsive, fast, and seamless e-commerce platform for product management and shopping cart experience.",
    solution:
      "Developing the e-commerce application using React, TypeScript, and Tailwind CSS with modular architecture, shopping cart state management, and user authentication.",
    result:
      "Delivered a high-performance e-commerce application with a clean, responsive user interface and intuitive shopping workflow.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Nizarafif/e-commerce",
    demo: "https://e-commerce-six-omega-11.vercel.app/",
    image_url: "/images/e-commerce.png",
  },
];

const fallbackExperiences: Experience[] = [
  {
    role: "Intern Full Stack Developer",
    company: "PT Taman Media Indonesia",
    period: "2025",
    description:
      "Developed frontend and backend features, refactored database queries, and assisted with system optimization to improve application performance and reliability.",
  },
  {
    role: "Freelance Web & Mobile Developer",
    company: "Independent Contracts",
    period: "2023 - 2024",
    description:
      "Collaborated directly with clients to engineer custom business websites, inventory management applications, and cross-platform mobile experiences.",
  },
];

const fallbackEducationList: Education[] = [
  {
    degree: "Bachelor of Software Engineering",
    institution: "Politeknik Balekambang",
    period: "2022 - 2026",
  },
  {
    degree: "Computer and Network Engineering",
    institution: "SMK NU AL HIDAYAH",
    period: "2019 - 2022",
  },
];

const localCertificates: Certification[] = [
  {
    name: "Hak Cipta Program Komputer: Aplikasi Monitoring Kesehatan Mental (RiseUp) berbasis Expert System",
    issuer: "Kementerian Hukum RI (DJKI)",
    year: "2026",
    file_url:
      "/SERTIFIKAT/HKI_Aplikasi%20Monitoring%20Kesehatan%20Mental%20(RiseUp)%20berbasis%20Expert%20System.pdf",
  },
  {
    name: "MLOps Engineer — Level Mahir / Expert (IDCamp 2025)",
    issuer: "Indosat Ooredoo Hutchison · Dicoding Indonesia",
    year: "2026",
    file_url:
      "/SERTIFIKAT/Sertifikat%20IDCamp%202025%20Level%20Expert%20(Nizar%20Nur%20Afif).pdf.pdf",
  },
  {
    name: "Belajar Penerapan Data Science dengan Microsoft Fabric & Membangun Aplikasi Gen AI dengan Microsoft Azure",
    issuer: "Microsoft Elevate · Dicoding Indonesia",
    year: "2026",
    file_url: "/SERTIFIKAT/PRE7NRERP8.pdf.pdf",
  },
  {
    name: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
    issuer: "Dicoding Indonesia",
    year: "2023",
    file_url: "/SERTIFIKAT/sertifikat%20AwsDasar_Nizar%20Nur%20Afif.pdf.pdf",
    credential_link: "https://www.dicoding.com/certificates/MEPJK1MOQX3V",
  },
  {
    name: "Belajar Dasar Pemrograman JavaScript",
    issuer: "Dicoding Indonesia",
    year: "2023",
    file_url: "/SERTIFIKAT/sertifikat_course_256_2564715_150323222614.pdf.pdf",
    credential_link: "https://www.dicoding.com/certificates/81P280JQJPOY",
  },
  {
    name: "IDCamp x Dicoding LIVE: Software Architecture 101",
    issuer: "Indosat Ooredoo Hutchison · Dicoding Indonesia",
    year: "2022",
    file_url:
      "/SERTIFIKAT/idcamp-x-dicoding-live-software-architecture-101-certificate.pdf.pdf",
  },
  {
    name: "Memulai Pemrograman Dengan Java",
    issuer: "Dicoding Indonesia",
    year: "2022",
    file_url: "/SERTIFIKAT/sertifikat_course.pdf.pdf",
    credential_link: "https://www.dicoding.com/certificates/N9ZO7D1E6ZG5",
  },
];

const fallbackCertifications: Certification[] = [
  ...localCertificates,
  {
    name: "Learning to Build Web Applications with React",
    issuer: "Dicoding Indonesia",
    year: "2023",
  },
  {
    name: "Learning the Fundamentals of Front-End Web Development",
    issuer: "Dicoding Indonesia",
    year: "2023",
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "2022",
  },
];

const fallbackSkills: Record<string, SkillItem[]> = {
  backend: [
    { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
    { name: "PHP", icon: SiPhp, color: "text-indigo-500" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-emerald-500" },
    {
      name: "RESTful API Architecture",
      icon: Cpu,
      color: "text-[var(--accent)]",
    },
  ],
  frontend: [
    { name: "React", icon: SiReact, color: "text-cyan-500" },
    {
      name: "Next.js",
      icon: SiNextdotjs,
      color: "text-[var(--text-primary)]",
    },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-sky-500" },
    { name: "Vue.js", icon: SiVuedotjs, color: "text-emerald-500" },
  ],
  mobile: [
    { name: "Flutter", icon: SiFlutter, color: "text-sky-500" },
    { name: "Dart", icon: SiDart, color: "text-blue-500" },
  ],
  database: [
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-500" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
    { name: "Supabase", icon: SiSupabase, color: "text-emerald-500" },
    { name: "Firebase", icon: SiFirebase, color: "text-amber-500" },
  ],
  tools: [
    { name: "Docker", icon: SiDocker, color: "text-sky-500" },
    { name: "Git", icon: SiGit, color: "text-orange-500" },
    { name: "GitHub", icon: Github, color: "text-[var(--text-primary)]" },
    { name: "Postman", icon: SiPostman, color: "text-orange-500" },
    {
      name: "Vercel & Netlify",
      icon: SiVercel,
      color: "text-[var(--text-primary)]",
    },
    { name: "VS Code", icon: VscVscode, color: "text-blue-500" },
  ],
  ai_agents: [
    {
      name: "AI Agent Workflows",
      icon: Bot,
      color: "text-[var(--accent)]",
    },
    {
      name: "MCP (Model Context Protocol)",
      icon: Network,
      color: "text-cyan-500",
    },
    {
      name: "OpenAI & LLM Integration",
      icon: SiOpenai,
      color: "text-emerald-500",
    },
    {
      name: "Prompt Engineering & RAG",
      icon: Sparkles,
      color: "text-amber-500",
    },
  ],
};

// Normalize DB icon color classes so monochrome icons stay crisp in both Dark and Light themes
function normalizeIconColor(colorClass?: string | null): string {
  if (!colorClass) return "text-[var(--text-primary)]";
  if (
    colorClass.includes("slate-900") ||
    colorClass.includes("slate-800") ||
    colorClass.includes("text-white") ||
    colorClass.includes("black")
  ) {
    return "text-[var(--text-primary)]";
  }
  if (colorClass.includes("blue-650")) return "text-blue-500";
  if (colorClass.includes("cyan-450")) return "text-cyan-500";
  return colorClass;
}

export default async function Home() {
  const year = new Date().getFullYear();

  let projects: Project[] = fallbackProjects;
  let experiences: Experience[] = fallbackExperiences;
  let educationList: Education[] = fallbackEducationList;
  let certifications: Certification[] = fallbackCertifications;
  let skills = fallbackSkills;

  try {
    const supabase = await createClient();

    const withTimeout = <T,>(
      promise: PromiseLike<T>,
      ms = 2500
    ): Promise<T> => {
      let id: NodeJS.Timeout;
      const timeout = new Promise<never>((_, reject) => {
        id = setTimeout(() => reject(new Error("Supabase timeout")), ms);
      });
      return Promise.race([promise, timeout]).finally(() => clearTimeout(id));
    };

    const [
      projectsRes,
      experiencesRes,
      educationRes,
      certificationsRes,
      skillsRes,
    ] = await Promise.allSettled([
      withTimeout(
        supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: true })
      ),
      withTimeout(
        supabase
          .from("experiences")
          .select("*")
          .order("created_at", { ascending: false })
      ),
      withTimeout(
        supabase
          .from("education")
          .select("*")
          .order("created_at", { ascending: false })
      ),
      withTimeout(
        supabase
          .from("certifications")
          .select("*")
          .order("created_at", { ascending: false })
      ),
      withTimeout(
        supabase
          .from("skills")
          .select("*")
          .order("created_at", { ascending: true })
      ),
    ]);

    if (
      projectsRes.status === "fulfilled" &&
      projectsRes.value.data &&
      !projectsRes.value.error &&
      projectsRes.value.data.length > 0
    ) {
      projects = projectsRes.value.data.map((p) => ({
        id: p.id,
        title: p.title,
        role: p.role,
        problem: p.problem,
        solution: p.solution,
        result: p.result,
        tech: Array.isArray(p.tech) ? p.tech : [],
        github: p.github,
        demo: p.demo || undefined,
        image_url: p.image_url || undefined,
      }));
    }

    if (
      experiencesRes.status === "fulfilled" &&
      experiencesRes.value.data &&
      !experiencesRes.value.error &&
      experiencesRes.value.data.length > 0
    ) {
      experiences = experiencesRes.value.data;
    }

    if (
      educationRes.status === "fulfilled" &&
      educationRes.value.data &&
      !educationRes.value.error &&
      educationRes.value.data.length > 0
    ) {
      educationList = educationRes.value.data;
    }

    if (
      certificationsRes.status === "fulfilled" &&
      certificationsRes.value.data &&
      !certificationsRes.value.error &&
      certificationsRes.value.data.length > 0
    ) {
      const dbCerts: Certification[] = certificationsRes.value.data;
      const normalizeFile = (url?: string | null) => {
        if (!url) return "";
        try {
          return decodeURIComponent(url).trim().toLowerCase();
        } catch {
          return url.trim().toLowerCase();
        }
      };
      const existingFiles = new Set(
        dbCerts.map((c) => normalizeFile(c.file_url)).filter(Boolean)
      );
      const existingNames = new Set(
        dbCerts.map((c) => (c.name || "").trim().toLowerCase()).filter(Boolean)
      );

      const missingLocal = localCertificates.filter(
        (c) =>
          !existingFiles.has(normalizeFile(c.file_url)) &&
          !existingNames.has(c.name.trim().toLowerCase())
      );

      certifications = [...missingLocal, ...dbCerts];
    }

    if (
      skillsRes.status === "fulfilled" &&
      skillsRes.value.data &&
      !skillsRes.value.error &&
      skillsRes.value.data.length > 0
    ) {
      const dbSkills = skillsRes.value.data;
      const getCategorySkills = (cat: string): SkillItem[] =>
        dbSkills
          .filter((s) => s.category === cat)
          .map((s) => {
            const mappedIcon = getIcon(s.icon_name);
            return {
              name: s.name,
              icon: mappedIcon || SiJavascript,
              color: normalizeIconColor(s.color_class),
            };
          });

      const backend = getCategorySkills("backend");
      const frontend = getCategorySkills("frontend");
      const mobile = getCategorySkills("mobile");
      const database = getCategorySkills("database");
      const tools = getCategorySkills("tools");
      const ai_agents = getCategorySkills("ai_agents");

      skills = {
        backend: backend.length > 0 ? backend : fallbackSkills.backend,
        frontend: frontend.length > 0 ? frontend : fallbackSkills.frontend,
        mobile: mobile.length > 0 ? mobile : fallbackSkills.mobile,
        database: database.length > 0 ? database : fallbackSkills.database,
        tools: tools.length > 0 ? tools : fallbackSkills.tools,
        ai_agents: ai_agents.length > 0 ? ai_agents : fallbackSkills.ai_agents,
      };
    }
  } catch (error) {
    console.warn(
      "Supabase connection not active or using local fallback.",
      error
    );
  }

  const getCaseStudyLink = (p: Project) => {
    const t = (p.title || "").toLowerCase();
    if (t.includes("resumora")) return "/projects/resumora";
    if (t.includes("nexaops")) return "/projects/nexaops";
    if (t.includes("nexaport")) return "/projects/nexaport";
    if (t.includes("commerce")) return "/projects/e-commerce";
    if (t.includes("flowsync")) return "/projects/flowsync";
    return p.id ? `/projects/${p.id}` : "#";
  };

  const skillCategories = [
    { title: "Backend Development", items: skills.backend },
    { title: "Frontend Development", items: skills.frontend },
    { title: "Mobile Development", items: skills.mobile },
    { title: "Database & Cloud", items: skills.database },
    { title: "DevOps & Tools", items: skills.tools },
    { title: "AI & Automation", items: skills.ai_agents },
  ];

  const featuredProject = projects[0];
  const otherProjects = projects.slice(1);

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <SmoothScroll />
      <Navbar navItems={navItems} />

      <main className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* 2. HERO SECTION */}
        <section
          id="home"
          className="scroll-mt-24 pb-24 pt-36 md:pb-32 md:pt-44"
        >
          <div className="grid items-end gap-12 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-8">
              <MotionReveal immediate>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  <span className="inline-flex items-center gap-2 text-[var(--text-primary)]">
                    <span className="h-2 w-2 rounded-full bg-emerald-500" />
                    Open to Work
                  </span>
                  <span className="text-[var(--text-muted)]">/</span>
                  <span>Kudus, Indonesia</span>
                  <span className="text-[var(--text-muted)]">/</span>
                  <span>Software Engineer · Full Stack Developer</span>
                </div>
              </MotionReveal>

              <MotionReveal immediate delay={0.08}>
                <div className="space-y-5">
                  <p className="text-sm font-medium tracking-wide text-[var(--text-secondary)]">
                    Nizar Nur Afif
                  </p>
                  <h1 className="text-4xl font-semibold tracking-[-0.03em] leading-[1.06] text-[var(--text-primary)] sm:text-5xl md:text-6xl lg:text-[4.25rem]">
                    Building Digital Products That Make a Difference.
                  </h1>
                  <p className="max-w-2xl text-base leading-relaxed text-[var(--text-secondary)] sm:text-lg">
                    I&apos;m a Software Engineer passionate about building
                    scalable web applications, robust backend systems, and
                    modern mobile experiences.
                  </p>
                </div>
              </MotionReveal>

              <MotionReveal immediate delay={0.16}>
                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <a
                    href="#projects"
                    className="inline-flex items-center gap-2 rounded-sm bg-[var(--btn-primary-bg)] px-6 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--btn-primary-text)] transition-colors hover:bg-[var(--accent)] hover:text-white"
                  >
                    <span>View My Projects</span>
                    <ArrowUpRight className="h-4 w-4" />
                  </a>

                  <a
                    href="/CV/CV.pdf"
                    download="Nizar_Nur_Afif_CV.pdf"
                    className="inline-flex items-center gap-2 rounded-sm border border-[var(--border-strong)] bg-transparent px-6 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--bg-surface)]"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download CV</span>
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 px-3 py-3 text-xs font-medium uppercase tracking-wider text-[var(--text-secondary)] transition-colors hover:text-[var(--accent)]"
                  >
                    <span>Contact Me</span>
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </MotionReveal>
            </div>

            {/* Editorial Portrait Composition */}
            <div className="lg:col-span-4">
              <MotionReveal immediate delay={0.2}>
                <figure className="mx-auto max-w-[300px] border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-2.5 lg:ml-auto lg:mr-0">
                  <div className="relative aspect-[4/5] w-full overflow-hidden bg-[var(--bg-surface-hover)]">
                    <Image
                      src="/images/pp.png"
                      alt="Nizar Nur Afif — Software Engineer"
                      fill
                      priority
                      sizes="(max-width: 1024px) 300px, 320px"
                      className="object-cover object-center grayscale contrast-110 transition-all duration-500 hover:grayscale-0"
                    />
                  </div>
                  <figcaption className="mt-2.5 flex items-center justify-between border-t border-[var(--border-subtle)] pt-2.5 font-mono text-[10px] uppercase tracking-widest text-[var(--text-secondary)]">
                    <span>Nizar Nur Afif</span>
                    <span className="text-[var(--text-muted)]">
                      SWE / Full Stack
                    </span>
                  </figcaption>
                </figure>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* 3. ABOUT ME */}
        <section
          id="about"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4 space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  01 / About
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Engineering with clarity and structural discipline.
                </h2>
              </div>

              <div className="lg:col-span-8 space-y-10">
                <div className="space-y-5 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base">
                  <p>
                    I am a Software Engineer based in Kudus, Indonesia,
                    specializing in full-stack web architecture, RESTful API
                    design, and cross-platform mobile development. My engineering
                    approach emphasizes clean, modular codebases, reliable data
                    models, and responsive interfaces built for long-term
                    maintainability.
                  </p>
                  <p>
                    During my internship as a Full Stack Developer at{" "}
                    <span className="text-[var(--text-primary)] font-medium">
                      PT Taman Media Indonesia
                    </span>
                    , I contributed to core backend optimizations, query
                    refactoring, and production frontend workflows. Alongside
                    that, my{" "}
                    <span className="text-[var(--text-primary)] font-medium">
                      freelance development experience
                    </span>{" "}
                    since 2023 has allowed me to partner directly with clients to
                    deliver custom business portals, inventory tools, and mobile
                    applications.
                  </p>
                  <p>
                    Academically grounded in Software Engineering at{" "}
                    <span className="text-[var(--text-primary)] font-medium">
                      Politeknik Balekambang
                    </span>
                    , my current technical interests revolve around Clean
                    Architecture, database performance tuning, Docker
                    containerization, CI/CD pipelines, Redis caching, and
                    AI-assisted engineering workflows.
                  </p>
                </div>

                {/* Minimalist Structured Metadata Grid */}
                <dl className="grid grid-cols-1 border-t border-[var(--border-subtle)] sm:grid-cols-2">
                  <div className="border-b border-[var(--border-subtle)] py-4 sm:border-r sm:pr-6">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      Industry Experience
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium text-[var(--text-primary)]">
                      PT Taman Media Indonesia &amp; Freelance
                    </dd>
                  </div>
                  <div className="border-b border-[var(--border-subtle)] py-4 sm:pl-6">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      Education
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium text-[var(--text-primary)]">
                      Politeknik Balekambang — Software Engineering
                    </dd>
                  </div>
                  <div className="border-b border-[var(--border-subtle)] py-4 sm:border-b-0 sm:border-r sm:pr-6">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      Core Stack
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium text-[var(--text-primary)]">
                      Laravel · React · Next.js · TypeScript · Flutter
                    </dd>
                  </div>
                  <div className="py-4 sm:pl-6">
                    <dt className="font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      Technical Interests
                    </dt>
                    <dd className="mt-1.5 text-sm font-medium text-[var(--text-primary)]">
                      Clean Architecture · Docker · Redis · AI Workflows
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* 4. TECH STACK & SKILLS */}
        <section
          id="skills"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4 space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  02 / Tech Stack
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Technologies &amp; engineering toolkit.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Tools and frameworks I rely on to architect APIs, build
                  interactive interfaces, and ship reliable software.
                </p>
              </div>

              <div className="lg:col-span-8 space-y-10">
                {skillCategories.map((category) => (
                  <div key={category.title} className="space-y-4">
                    <h3 className="border-b border-[var(--border-subtle)] pb-2 font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                      {category.title}
                    </h3>

                    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                      {category.items.map((item) => {
                        const SkillIcon = item.icon;
                        return (
                          <div
                            key={item.name}
                            className="group flex items-center gap-3 border border-[var(--border-subtle)] bg-[var(--bg-surface)] px-4 py-3 transition-colors hover:border-[var(--border-hover)] hover:bg-[var(--bg-surface-hover)]"
                          >
                            <SkillIcon
                              className={`h-4 w-4 shrink-0 ${item.color} opacity-85 transition-opacity group-hover:opacity-100`}
                            />
                            <span className="truncate text-xs font-medium text-[var(--text-primary)]">
                              {item.name}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* 5. FEATURED PROJECTS */}
        <section
          id="projects"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
          <MotionReveal>
            <div className="mb-14 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  03 / Featured Projects
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Selected Systems &amp; Case Studies.
                </h2>
              </div>
              <p className="max-w-md text-sm text-[var(--text-secondary)]">
                Production applications and architectural case studies across
                enterprise logistics, IT operations, AI SaaS, and e-commerce.
              </p>
            </div>
          </MotionReveal>

          <div className="grid gap-8 md:grid-cols-2">
            {/* Lead Featured Project */}
            {featuredProject && (
              <MotionReveal className="md:col-span-2">
                <article className="group flex flex-col justify-between border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-colors hover:border-[var(--border-hover)] sm:p-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between gap-2 font-mono text-[11px] uppercase tracking-widest text-[var(--text-secondary)]">
                      <span className="text-[var(--accent)]">
                        Featured / 01
                      </span>
                      <span className="truncate">{featuredProject.role}</span>
                    </div>

                    <div className="grid gap-6 md:grid-cols-12 md:items-start">
                      <div className="space-y-4 md:col-span-7">
                        <h3 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                          {featuredProject.title}
                        </h3>

                        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                          {featuredProject.problem}
                        </p>

                        <div className="flex flex-wrap gap-1.5 pt-2">
                          {featuredProject.tech.map((tech) => (
                            <span
                              key={tech}
                              className="border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2.5 py-1 font-mono text-[10px] text-[var(--text-secondary)]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      {(featuredProject.result || featuredProject.solution) && (
                        <div className="space-y-2 border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-5 md:col-span-5">
                          <span className="block font-mono text-[10px] uppercase tracking-widest text-[var(--accent)]">
                            Key Outcome
                          </span>
                          <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                            {featuredProject.result || featuredProject.solution}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-5">
                    <div className="flex items-center gap-5">
                      {featuredProject.github && (
                        <a
                          href={featuredProject.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Source Code</span>
                        </a>
                      )}
                      {featuredProject.demo && (
                        <a
                          href={featuredProject.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                        >
                          <span>Live Demo</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>

                    <CaseStudyLink
                      href={getCaseStudyLink(featuredProject)}
                      projectTitle={featuredProject.title}
                    />
                  </div>
                </article>
              </MotionReveal>
            )}

            {/* Remaining Projects Grid */}
            {otherProjects.map((project, idx) => (
              <MotionReveal
                key={project.id || project.title}
                delay={idx * 0.05}
              >
                <article className="group flex h-full flex-col justify-between border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-colors hover:border-[var(--border-hover)]">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between gap-2 font-mono text-[10px] uppercase tracking-widest text-[var(--text-muted)]">
                      <span>0{idx + 2}</span>
                      <span className="truncate text-[var(--text-secondary)]">
                        {project.role}
                      </span>
                    </div>

                    <h3 className="text-xl font-semibold tracking-tight text-[var(--text-primary)]">
                      {project.title}
                    </h3>

                    <p className="line-clamp-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                      {project.problem}
                    </p>

                    <div className="flex flex-wrap gap-1.5 pt-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[var(--border-subtle)] pt-4">
                    <div className="flex items-center gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                        >
                          <Github className="h-3.5 w-3.5" />
                          <span>Source</span>
                        </a>
                      )}
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                        >
                          <span>Demo</span>
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>

                    <CaseStudyLink
                      href={getCaseStudyLink(project)}
                      projectTitle={project.title}
                    />
                  </div>
                </article>
              </MotionReveal>
            ))}
          </div>
        </section>

        {/* 6. EXPERIENCE & EDUCATION */}
        <section
          id="experience"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4 space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  04 / Experience &amp; Education
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Professional journey &amp; academic foundation.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Hands-on engineering roles, independent client work, and
                  formal software engineering education.
                </p>
              </div>

              <div className="lg:col-span-8 space-y-14">
                {/* Work Experience Timeline */}
                <div className="space-y-6">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                    Experience
                  </h3>

                  <div className="relative ml-2 border-l border-[var(--border-strong)] pl-7 space-y-10">
                    {experiences.map((exp, idx) => (
                      <div
                        key={exp.id || `${exp.company}-${idx}`}
                        className="relative"
                      >
                        <span
                          aria-hidden="true"
                          className={`absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full border ${
                            idx === 0
                              ? "border-[var(--accent)] bg-[var(--accent)]"
                              : "border-[var(--border-hover)] bg-[var(--bg-primary)]"
                          }`}
                        />
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <div>
                            <h4 className="text-base font-semibold text-[var(--text-primary)]">
                              {exp.role}
                            </h4>
                            <p className="text-sm text-[var(--text-secondary)]">
                              {exp.company}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-[var(--text-muted)] sm:text-right">
                            {exp.period}
                          </span>
                        </div>
                        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
                          {exp.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Education Timeline */}
                <div className="space-y-6 border-t border-[var(--border-subtle)] pt-10">
                  <h3 className="font-mono text-xs uppercase tracking-widest text-[var(--text-secondary)]">
                    Education
                  </h3>

                  <div className="relative ml-2 border-l border-[var(--border-strong)] pl-7 space-y-8">
                    {educationList.map((edu, idx) => (
                      <div
                        key={edu.id || `${edu.institution}-${idx}`}
                        className="relative"
                      >
                        <span
                          aria-hidden="true"
                          className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full border border-[var(--border-hover)] bg-[var(--bg-primary)]"
                        />
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                          <div>
                            <h4 className="text-base font-semibold text-[var(--text-primary)]">
                              {edu.institution}
                            </h4>
                            <p className="text-sm text-[var(--text-secondary)]">
                              {edu.degree}
                            </p>
                          </div>
                          <span className="font-mono text-xs text-[var(--text-muted)]">
                            {edu.period}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* 7. CERTIFICATIONS */}
        <section
          id="certificates"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4 space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  05 / Certifications
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Verified Credentials.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Completed technical courses and certifications in frontend
                  engineering, algorithms, and software development.
                </p>
              </div>

              <div className="lg:col-span-8 grid gap-4 sm:grid-cols-2">
                {certifications.map((cert, idx) => {
                  const certHref = cert.file_url || cert.credential_link;

                  return (
                    <div
                      key={cert.id || `${cert.name}-${idx}`}
                      className="flex flex-col justify-between border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-hover)]"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                          <span>{cert.issuer}</span>
                          <span>{cert.year}</span>
                        </div>
                        <h3 className="text-sm font-medium leading-snug text-[var(--text-primary)]">
                          {cert.name}
                        </h3>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-3">
                        {certHref ? (
                          <a
                            href={certHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-[var(--accent)] transition-colors hover:text-[var(--accent-hover)]"
                          >
                            <span>View Certificate</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                            Verified Completion
                          </span>
                        )}

                        {cert.file_url && cert.credential_link && (
                          <a
                            href={cert.credential_link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-mono text-[10px] uppercase tracking-wider text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                          >
                            <span>Verify</span>
                            <ArrowUpRight className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* 8. GITHUB ACTIVITY */}
        <section
          id="github"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-4 space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                  06 / GitHub Activity
                </p>
                <h2 className="text-2xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Code &amp; Open Source Activity.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Live profile metrics, contribution history, and recently
                  updated repositories fetched directly from GitHub.
                </p>
              </div>

              <div className="min-w-0 lg:col-span-8">
                <GitHubActivity />
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* 9. CONTACT SECTION */}
        <section
          id="contact"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-24 md:py-32"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="lg:col-span-5 space-y-8">
                <div className="space-y-3">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--accent)]">
                    07 / Contact
                  </p>
                  <h2 className="text-3xl font-semibold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                    Have a project in mind? Let&apos;s build something together.
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    Open for full-time engineering roles, freelance systems, and
                    technical collaborations.
                  </p>
                </div>

                <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
                  <a
                    href="mailto:nizarnurafif644@gmail.com"
                    className="group flex items-center justify-between py-3.5 text-sm transition-colors"
                  >
                    <span className="inline-flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                      <Mail className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                      nizarnurafif644@gmail.com
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                  </a>

                  <a
                    href="https://linkedin.com/in/nizarnurafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 text-sm transition-colors"
                  >
                    <span className="inline-flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                      <Linkedin className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                      linkedin.com/in/nizarnurafif
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                  </a>

                  <a
                    href="https://github.com/Nizarafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 text-sm transition-colors"
                  >
                    <span className="inline-flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                      <Github className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                      github.com/Nizarafif
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                  </a>

                  <a
                    href="https://wa.me/6281806344925"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 text-sm transition-colors"
                  >
                    <span className="inline-flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                      <Phone className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                      +62 818-0634-4925
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-[var(--accent)]" />
                  </a>

                  <div className="flex items-center gap-3 py-3.5 text-sm text-[var(--text-secondary)]">
                    <MapPin className="h-4 w-4 text-[var(--text-muted)]" />
                    <span>Kudus, Indonesia</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
                  <div className="mb-6 border-b border-[var(--border-subtle)] pb-4">
                    <h3 className="text-base font-medium text-[var(--text-primary)]">
                      Send a Direct Message
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      Messages are stored directly and answered promptly.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>
      </main>

      {/* Minimalist Editorial Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-xs text-[var(--text-muted)]">
            <span className="text-[var(--text-secondary)]">
              © {year} Nizar Nur Afif
            </span>
            <span>·</span>
            <span>Kudus, Indonesia</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-[var(--text-secondary)]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-[var(--text-primary)]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>

      <BackToTop />
    </div>
  );
}
