import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";
import { getIcon } from "@/components/icons-map";
import NameAnimation from "@/components/NameAnimation";
import ContactForm from "@/components/ContactForm";
import SmoothScroll from "@/components/SmoothScroll";
import ScrollReveal from "@/components/ScrollReveal";
import HeroTyping from "@/components/HeroTyping";
import GitHubActivity from "@/components/GitHubActivity";
import BackToTop from "@/components/BackToTop";
import LottiePlayer from "@/components/LottiePlayer";
import TimeStatus from "@/components/TimeStatus";

import { 
  ArrowUpRight, 
  Award, 
  Briefcase, 
  Calendar, 
  CheckCircle, 
  Code, 
  Cpu, 
  ExternalLink, 
  FileText, 
  FolderGit2, 
  GraduationCap, 
  LayoutGrid, 
  Mail, 
  MapPin, 
  MessageSquare, 
  Phone, 
  Send, 
  ShieldCheck, 
  Terminal,
  Activity,
  Layers,
  Database,
  Smartphone,
  Wrench,
  BookOpen,
  User
} from "lucide-react";

import { 
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiMysql, SiPhp, SiLaravel,
  SiGit, SiGithub as Github, SiPostman, SiVuedotjs, SiPostgresql, SiFlutter, SiFirebase,
  SiDocker, SiFigma, SiVercel, SiDart, SiHtml5, SiCss3, SiLinkedin as Linkedin
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const dynamic = 'force-dynamic';

const navItems = [
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

// Fallback Static Data
const fallbackProjects: Project[] = [
  {
    title: "E-Commerce App",
    role: "Fullstack Developer",
    problem: "Building a modern, responsive, fast, and seamless e-commerce platform for product management and shopping cart experience.",
    solution: "Developing the e-commerce application using React, TypeScript, and Tailwind CSS with modular architecture, shopping cart state management, and user authentication.",
    result: "Delivered a high-performance e-commerce application with a clean, responsive user interface and intuitive shopping workflow.",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Nizarafif/e-commerce",
    demo: "https://e-commerce-six-omega-11.vercel.app/",
    image_url: "/images/e-commerce.png",
  },
  {
    title: "FlowSync",
    role: "Fullstack Developer",
    problem: "Building an integrated project and task management platform to help teams manage workflows, schedules, and collaboration in a single dynamic dashboard.",
    solution: "Developing the FlowSync application using React, TypeScript, Vite, and Tailwind CSS with drag-and-drop Kanban Board, interactive calendar, and task analysis visualization.",
    result: "Delivered a responsive and efficient workflow management system with seamless visual synchronization between calendar scheduling and task boards.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/Nizarafif/FlowSync",
    demo: "https://flow-sync-one.vercel.app/",
    image_url: "/images/Flowsync.png",
  },
];

const fallbackExperiences: Experience[] = [
  {
    role: "Intern Full Stack Developer",
    company: "PT Taman Media Indonesia",
    period: "2025",
    description: "Developed frontend and backend features, and assisted with database optimization to enhance company application performance.",
  },
  {
    role: "Intern Website Developer",
    company: "CV Polibang Creative Studio",
    period: "2023",
    description: "Participated in client website development using WordPress and custom coding, and learned about digital project management.",
  },
];

const fallbackEducationList: Education[] = [
  {
    degree: "Software Engineering",
    institution: "Politeknik Balekambang",
    period: "2022 - 2026",
  },
  {
    degree: "Computer and Network Engineering",
    institution: "SMK NU AL HIDAYAH",
    period: "2019 - 2022",
  },
];

const fallbackCertifications: Certification[] = [
  {
    name: "Java Training",
    issuer: "Course Provider",
    year: "2022",
    file_url: "/SERTIFIKAT/sertifikat_course.pdf.pdf",
  },
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

// Rich technical descriptions & skill badges mapping
const skillDetails: Record<string, { desc: string; level: "Advanced" | "Intermediate" | "Learning" }> = {
  "javascript": { desc: "Dynamic scripting for frontend & backend application logic.", level: "Advanced" },
  "javascript (es6+)": { desc: "Dynamic scripting for frontend & backend application logic.", level: "Advanced" },
  "typescript": { desc: "Type-safe JavaScript extension for enterprise-scale systems.", level: "Advanced" },
  "react": { desc: "Component-based declarative virtual DOM client UI library.", level: "Advanced" },
  "next.js": { desc: "Production Meta-framework for Server-Side Rendering & ISR.", level: "Advanced" },
  "tailwind css": { desc: "Utility-first CSS tokens for responsive UI assembly.", level: "Advanced" },
  "vue.js": { desc: "Progressive reactive client library for fast SPAs.", level: "Intermediate" },
  "flutter": { desc: "Google's engine for native cross-platform application compilation.", level: "Advanced" },
  "dart": { desc: "Object-oriented client-optimized language powering Flutter.", level: "Advanced" },
  "php": { desc: "Server-side interpreter powering enterprise systems.", level: "Advanced" },
  "laravel": { desc: "Elegant PHP framework with secure routing and ORM.", level: "Advanced" },
  "node.js": { desc: "V8 engine runtime for executing backend code.", level: "Advanced" },
  "mysql": { desc: "Popular RDBMS database engine for relational tables.", level: "Advanced" },
  "postgresql": { desc: "Highly robust open-source object-relational database server.", level: "Intermediate" },
  "firebase": { desc: "Serverless BaaS with realtime NoSQL databases and OAuth.", level: "Intermediate" },
  "git": { desc: "Distributed version control system to manage commits.", level: "Advanced" },
  "github": { desc: "Collaboration hosting service for Git revision tracking.", level: "Advanced" },
  "vs code": { desc: "Highly customizable development IDE by Microsoft.", level: "Advanced" },
  "postman": { desc: "Collaboration platform for API design, testing & mocks.", level: "Advanced" },
  "docker": { desc: "Container virtualization engine for reproducible staging.", level: "Intermediate" },
  "figma": { desc: "Vector graphics design software for digital wireframes.", level: "Intermediate" },
  "vercel": { desc: "Cloud hosting for frontend and serverless edge functions.", level: "Advanced" },
  "html5": { desc: "Standard semantic structuring language for browser nodes.", level: "Advanced" },
  "css3": { desc: "Cascading styles supporting transitions and layouts.", level: "Advanced" },
  "express.js": { desc: "Minimalist middleware framework for Node.js backends.", level: "Intermediate" },
  "firestore": { desc: "Realtime NoSQL document database powered by Google.", level: "Intermediate" },
};

const fallbackSkills = {
  frontend: [
    { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "React", icon: SiReact, color: "text-cyan-500" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-slate-900" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-600" },
    { name: "Vue.js", icon: SiVuedotjs, color: "text-emerald-500" },
  ],
  backend: [
    { name: "PHP", icon: SiPhp, color: "text-indigo-500" },
    { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
  ],
  mobile: [
    { name: "Flutter", icon: SiFlutter, color: "text-sky-500" },
    { name: "Dart", icon: SiDart, color: "text-sky-600" },
  ],
  database: [
    { name: "MySQL", icon: SiMysql, color: "text-blue-650" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-600" },
    { name: "Firebase", icon: SiFirebase, color: "text-amber-500" },
  ],
  tools: [
    { name: "Git", icon: SiGit, color: "text-orange-500" },
    { name: "GitHub", icon: Github, color: "text-slate-800" },
    { name: "Docker", icon: SiDocker, color: "text-blue-500" },
    { name: "Postman", icon: SiPostman, color: "text-orange-600" },
    { name: "Figma", icon: SiFigma, color: "text-rose-500" },
    { name: "VS Code", icon: VscVscode, color: "text-blue-500" },
  ],
};

export default async function Home() {
  const year = new Date().getFullYear();
  const nameText = "Nizar Nur Afif";

  let projects: Project[] = fallbackProjects;
  let experiences: Experience[] = fallbackExperiences;
  let educationList: Education[] = fallbackEducationList;
  let certifications: Certification[] = fallbackCertifications;
  let skills = fallbackSkills;

  try {
    const supabase = await createClient();

    // Fetch projects
    const { data: dbProjects, error: projectsErr } = await supabase
      .from("projects")
      .select("*")
      .order("created_at", { ascending: true });
    
    if (dbProjects && dbProjects.length > 0 && !projectsErr) {
      projects = dbProjects.map(p => ({
        id: p.id,
        title: p.title,
        role: p.role,
        problem: p.problem,
        solution: p.solution,
        result: p.result,
        tech: p.tech,
        github: p.github,
        demo: p.demo || undefined,
        image_url: p.image_url || undefined,
      }));
    }

    // Fetch experiences
    const { data: dbExperiences, error: expErr } = await supabase
      .from("experiences")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (dbExperiences && dbExperiences.length > 0 && !expErr) {
      experiences = dbExperiences;
    }

    // Fetch education
    const { data: dbEducation, error: eduErr } = await supabase
      .from("education")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (dbEducation && dbEducation.length > 0 && !eduErr) {
      educationList = dbEducation;
    }

    // Fetch certifications
    const { data: dbCertifications, error: certErr } = await supabase
      .from("certifications")
      .select("*")
      .order("created_at", { ascending: false });
    
    if (dbCertifications && dbCertifications.length > 0 && !certErr) {
      certifications = dbCertifications;
    }

    // Fetch skills
    const { data: dbSkills, error: skillsErr } = await supabase
      .from("skills")
      .select("*")
      .order("created_at", { ascending: true });
    
    if (dbSkills && dbSkills.length > 0 && !skillsErr) {
      const getCategorySkills = (cat: 'frontend' | 'backend' | 'tools' | 'mobile' | 'database') => {
        return dbSkills
          .filter(s => s.category === cat)
          .map(s => {
            const mappedIcon = getIcon(s.icon_name);
            return {
              name: s.name,
              icon: mappedIcon || SiJavascript,
              color: s.color_class,
            };
          });
      };

      const frontend = getCategorySkills('frontend');
      const backend = getCategorySkills('backend');
      const mobile = getCategorySkills('mobile');
      const database = getCategorySkills('database');
      const tools = getCategorySkills('tools');

      skills = {
        frontend: frontend.length > 0 ? frontend : fallbackSkills.frontend,
        backend: backend.length > 0 ? backend : fallbackSkills.backend,
        mobile: mobile.length > 0 ? mobile : fallbackSkills.mobile,
        database: database.length > 0 ? database : fallbackSkills.database,
        tools: tools.length > 0 ? tools : fallbackSkills.tools,
      };
    }
  } catch (error) {
    console.warn("Supabase connection not active or using local fallback.", error);
  }

  // Get dynamic case study page target link
  const getCaseStudyLink = (p: Project) => {
    if (p.title.toLowerCase().includes("commerce")) return "/projects/e-commerce";
    if (p.title.toLowerCase().includes("flowsync")) return "/projects/flowsync";
    return p.id ? `/projects/${p.id}` : "#";
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-950 relative overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(69,169,169,0.06),rgba(255,255,255,0))] font-sans antialiased">
      <SmoothScroll />
      <ScrollReveal />
      
      {/* Dynamic Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[45%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-emerald-500/6 rounded-full blur-[120px] pointer-events-none" />
 
      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e2e8f0_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f0_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10 opacity-[0.4]" />
 
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-30 border-b border-slate-200/50 bg-white/70 backdrop-blur-md">
        <TimeStatus />
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-0">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 rounded-xl border border-slate-200 bg-white p-1 flex items-center justify-center transition-all duration-300 group-hover:border-teal-500/50 shadow-sm">
              <Image
                src="/nizar-logo.png"
                alt="Nizar Nur Afif logo"
                fill
                className="object-contain p-1.5"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-bold text-slate-900 tracking-wide transition-colors group-hover:text-teal-650">
                Nizar Nur Afif
              </span>
              <span className="text-[10px] text-slate-500 font-semibold tracking-wider uppercase">Software Engineer</span>
            </div>
          </a>
 
          <div className="hidden items-center gap-1.5 text-xs font-semibold text-slate-650 sm:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 transition-all duration-200 hover:bg-slate-100 hover:text-teal-600"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>
 
      <main className="mx-auto max-w-5xl px-6 pb-24 pt-32 lg:px-0 relative z-10">
        
        {/* Hero Section */}
        <section
          id="home"
          className="relative flex flex-col gap-12 pb-20 pt-8 md:flex-row md:items-center md:justify-between scroll-mt-24"
        >
          <div className="space-y-6 flex-1 animate-fade-in" data-reveal="slide-up">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-50/60 px-3.5 py-1 text-xs font-bold text-teal-650">
              <span className="w-2 h-2 rounded-full bg-teal-500 animate-ping" />
              <span>Available for Full-Time Opportunities</span>
            </div>
            
            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-450 uppercase tracking-widest">Hi There, I am</p>
              <NameAnimation nameText={nameText} />
              <div className="text-lg font-semibold text-slate-600 sm:text-2xl pt-1">
                <span>A Passionate </span>
                <HeroTyping />
              </div>
            </div>
 
            <p className="max-w-xl text-xs sm:text-sm leading-relaxed text-slate-600 text-justify">
              I am a professional Software Engineer dedicated to creating elegant, high-performance, and scalable digital solutions. I specialize in building robust backend systems, dynamic full-stack web applications, and feature-rich cross-platform mobile apps using modern architectures.
            </p>

            {/* CTAs Row */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-teal-600 hover:bg-teal-500 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-teal-600/10 hover:shadow-teal-500/30 transition-all duration-200 hover:-translate-y-0.5"
              >
                View Projects
              </a>
              <a
                href="/CV/CV.pdf"
                download="Nizar_Nur_Afif_CV.pdf"
                className="inline-flex items-center justify-center rounded-xl border border-slate-200 bg-white px-6 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-50 hover:text-slate-900 hover:border-slate-350 transition-all duration-200 shadow-sm"
              >
                Download CV
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center rounded-xl border border-transparent bg-slate-100 px-6 py-3 text-xs font-semibold text-slate-600 hover:bg-slate-200 transition-all duration-200"
              >
                Contact Me
              </a>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 pt-6">
              <div className="rounded-xl border border-slate-200/50 bg-white p-4 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Completed</span>
                <span className="text-xl font-extrabold text-slate-800">15+ Projects</span>
              </div>
              <div className="rounded-xl border border-slate-200/50 bg-white p-4 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Experience</span>
                <span className="text-xl font-extrabold text-slate-800">3+ Years</span>
              </div>
              <div className="rounded-xl border border-slate-200/50 bg-white p-4 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Tech Stack</span>
                <span className="text-xl font-extrabold text-slate-800">18+ Techs</span>
              </div>
              <div className="rounded-xl border border-slate-200/50 bg-white p-4 shadow-sm">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Repositories</span>
                <span className="text-xl font-extrabold text-slate-800">20+ Public</span>
              </div>
            </div>
          </div>
 
          <div className="flex flex-col gap-6 items-center md:items-end relative" data-reveal="slide-left">
            <div className="w-full max-w-xs rounded-xl border border-slate-200/60 bg-white p-5 shadow-lg shadow-slate-100/60 backdrop-blur-sm relative">
              <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur opacity-[0.08] pointer-events-none"></div>
              <div className="relative z-10">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  Quick Profile
                </p>
                <dl className="mt-4 space-y-2.5 text-xs">
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-450">Focus</dt>
                    <dd className="font-semibold text-slate-800">Web & Mobile API</dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-slate-450">Specialty</dt>
                    <dd className="font-semibold text-slate-800 text-right">Laravel · React · Flutter</dd>
                  </div>
                  <div className="flex justify-between gap-4 items-center">
                    <dt className="text-slate-450">Availability</dt>
                    <dd className="font-bold text-emerald-650 bg-emerald-50 px-2 py-0.5 rounded-full text-[10px]">Open to Work</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>
 
        {/* About Section */}
        <section
          id="about"
          className="border-t border-slate-200/60 py-20 md:py-28 scroll-mt-24"
          data-reveal="slide-up"
        >
          <div className="grid gap-8 md:grid-cols-3">
            <div className="md:col-span-1 space-y-6">
              <div>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                  About Me
                </h2>
                <div className="h-1 w-10 bg-teal-500 mt-3 rounded-full" />
              </div>

              {/* Cool Profile Picture Container */}
              <div className="relative group max-w-[240px] mx-auto md:mx-0">
                {/* Decorative glowing gradient behind the image */}
                <div className="absolute -inset-1.5 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-300 pointer-events-none"></div>
                
                {/* Image frame */}
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-2 shadow-md transition-all duration-300 group-hover:scale-[1.01] group-hover:shadow-lg">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-xl bg-slate-50">
                    <Image
                      src="/images/pp.png"
                      alt="Nizar Nur Afif profile photo"
                      fill
                      priority
                      className="object-cover object-center transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 240px"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Info Cards */}
            <div className="md:col-span-2 space-y-6">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <User className="h-4.5 w-4.5 text-teal-650" />
                    <span>Who I Am</span>
                  </h3>
                  <p className="text-xs text-slate-550 leading-relaxed text-justify">
                    A dedicated Software Engineer specializing in designing modular systems, clean coding structures, and robust client-server communication.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Briefcase className="h-4.5 w-4.5 text-teal-650" />
                    <span>Experience</span>
                  </h3>
                  <p className="text-xs text-slate-550 leading-relaxed text-justify">
                    Internship at PT Taman Media Indonesia and dynamic freelance/contract software developments since 2023.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <GraduationCap className="h-4.5 w-4.5 text-teal-650" />
                    <span>Education</span>
                  </h3>
                  <p className="text-xs text-slate-550 leading-relaxed text-justify">
                    Graduated with a Bachelor&apos;s in Software Engineering from Politeknik Balekambang, focusing on design patterns.
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-2">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
                    <Activity className="h-4.5 w-4.5 text-teal-650" />
                    <span>Current Focus</span>
                  </h3>
                  <p className="text-xs text-slate-550 leading-relaxed text-justify">
                    Deep-diving into REST APIs, database optimizations, Docker orchestration, and high-performance system deployments.
                  </p>
                </div>
              </div>

              {/* Currently Learning Section */}
              <div className="rounded-xl border border-teal-500/20 bg-teal-50/20 p-5 shadow-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="space-y-3 flex-1">
                  <h4 className="text-xs font-bold text-teal-750 flex items-center gap-2 uppercase tracking-wider">
                    <BookOpen className="h-4 w-4" />
                    <span>Currently Learning & Specializing In</span>
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {["Docker", "CI/CD", "Redis", "Clean Architecture", "Microservices"].map((learn) => (
                      <span 
                        key={learn} 
                        className="rounded-lg bg-white border border-teal-500/10 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm"
                      >
                        {learn}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="w-16 h-16 shrink-0 bg-white/60 rounded-xl border border-teal-500/15 p-2 flex items-center justify-center shadow-inner self-center sm:self-auto">
                  <LottiePlayer src="/lottie/about.json" className="w-12 h-12" />
                </div>
              </div>
            </div>
          </div>
        </section>
 
        {/* Skills Section */}
        <section
          id="skills"
          className="border-t border-slate-200/60 py-20 md:py-28 scroll-mt-24"
        >
          <div className="grid gap-8 md:grid-cols-3" data-reveal="slide-up">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Skills & Tech Stack
              </h2>
              <div className="h-1 w-10 bg-teal-500 mt-3 rounded-full" />
              <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xs">
                Classified technological expertise categorized by layer. Hover each technology to learn my competency level.
              </p>
              <div className="hidden md:flex justify-start pt-6 opacity-85">
                <LottiePlayer src="/lottie/tech.json" className="w-32 h-32" />
              </div>
            </div>
            
            <div className="md:col-span-2 space-y-8">
              {/* Categorized Skills */}
              {[
                { title: "Backend Technologies", list: skills.backend, icon: Cpu },
                { title: "Frontend Frameworks", list: skills.frontend, icon: Layers },
                { title: "Mobile Engineering", list: skills.mobile, icon: Smartphone },
                { title: "Database Systems", list: skills.database, icon: Database },
                { title: "Development Tools", list: skills.tools, icon: Wrench }
              ].map((category) => (
                <div key={category.title} className="space-y-3">
                  <h3 className="text-xs font-bold text-slate-500 flex items-center gap-2 uppercase tracking-wider pl-1">
                    <category.icon className="h-4 w-4 text-teal-650" />
                    <span>{category.title}</span>
                  </h3>
                  
                  <div className="grid gap-4 sm:grid-cols-2">
                    {category.list.map((item) => {
                      const SkillIcon = item.icon;
                      const lookupKey = item.name.toLowerCase();
                      const detail = skillDetails[lookupKey] || { desc: "Web Development Stack Technology Integration.", level: "Intermediate" };
                      
                      return (
                        <div 
                          key={item.name} 
                          className="group relative rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm transition-all duration-300 hover:border-teal-500/25 hover:shadow-md"
                        >
                          <div className="flex items-center justify-between gap-2">
                            <div className="flex items-center gap-2.5">
                              <SkillIcon className={`h-5 w-5 ${item.color}`} />
                              <span className="text-xs font-bold text-slate-800">{item.name}</span>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                              detail.level === "Advanced" ? "bg-teal-50 text-teal-700" :
                              detail.level === "Intermediate" ? "bg-blue-50 text-blue-700" :
                              "bg-slate-100 text-slate-700"
                            }`}>
                              {detail.level}
                            </span>
                          </div>
                          <p className="mt-2 text-[10px] text-slate-500 leading-normal">
                            {detail.desc}
                          </p>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* Projects Section */}
        <section
          id="projects"
          className="border-t border-slate-200/60 py-20 md:py-28 scroll-mt-24"
        >
          <div className="mb-12" data-reveal="slide-up">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
              Featured Projects
            </h2>
            <div className="h-1 w-10 bg-teal-500 mt-3 rounded-full" />
            <p className="mt-3 text-xs text-slate-550 leading-relaxed max-w-sm">
              Each project has a dedicated, dynamic Case Study. Click to discover challenges, solutions, and system architectures.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group flex flex-col overflow-hidden rounded-xl border border-slate-200/60 bg-white transition-all duration-300 hover:border-teal-500/25 hover:shadow-lg hover:shadow-slate-100"
                  data-reveal="slide-up"
                >
                  {project.image_url ? (
                    <div className="relative h-52 w-full overflow-hidden border-b border-slate-100 bg-slate-50">
                      <Image
                        src={project.image_url}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-slate-50 text-xs text-slate-400 flex items-center justify-center font-medium">
                      Project preview area
                    </div>
                  )}
                  
                  <div className="flex flex-1 flex-col p-6 space-y-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-slate-900 tracking-wide group-hover:text-teal-650 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">{project.role}</p>
                    </div>
 
                    <p className="text-xs text-slate-600 leading-relaxed text-justify line-clamp-3">
                      {project.problem}
                    </p>
 
                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-slate-100 px-2 py-0.5 text-[9px] text-slate-650 font-semibold"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
 
                    <div className="pt-3 flex items-center justify-between text-xs font-semibold border-t border-slate-100/60">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-slate-500 hover:text-slate-900 transition-colors inline-flex items-center gap-1"
                      >
                        <Github className="h-4 w-4" />
                        <span>Source Code</span>
                      </a>
                      
                      <Link
                        href={getCaseStudyLink(project)}
                        className="text-teal-600 hover:text-teal-500 transition-colors inline-flex items-center gap-1 font-bold"
                      >
                        <span>View Case Study</span>
                        <ArrowUpRight className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>
 
        {/* Experience Section */}
        <section
          id="experience"
          className="border-t border-slate-200/60 py-20 md:py-28 scroll-mt-24"
        >
          <div className="grid gap-8 md:grid-cols-3" data-reveal="slide-up">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                History & Journey
              </h2>
              <div className="h-1 w-10 bg-teal-500 mt-3 rounded-full" />
              <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xs">
                A vertical representation of my professional activities, freelancing, and academic background.
              </p>
            </div>
 
            <div className="md:col-span-2 space-y-8">
              {/* Professional Timeline Tree */}
              <div className="relative border-l border-slate-200 ml-4 space-y-8 py-2">
                
                {/* 1. Open to Work */}
                <div className="relative pl-7 group" data-reveal="slide-up">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-teal-500 ring-4 ring-slate-100 group-hover:scale-125 transition-transform duration-200" />
                  <div className="rounded-xl border border-teal-500/20 bg-teal-50/20 p-5">
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-teal-850">Open to Full-Time Positions</h3>
                        <p className="text-[10px] font-semibold text-teal-650 mt-0.5">Software Engineer · Backend Developer · Flutter Developer</p>
                      </div>
                      <span className="text-[9px] font-bold text-teal-700 bg-teal-100/60 px-2 py-0.5 rounded-full self-start sm:self-auto uppercase tracking-wider">Active</span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-650">
                      Actively seeking roles where I can leverage clean architecture principles, backend developer optimizations, or cross-platform Flutter programming capabilities.
                    </p>
                  </div>
                </div>

                {/* 2. PT Taman Media Indonesia */}
                <div className="relative pl-7 group" data-reveal="slide-up">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-teal-500 ring-4 ring-slate-100 group-hover:scale-125 transition-transform duration-200" />
                  <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:border-teal-500/20">
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Intern Full Stack Developer</h3>
                        <p className="text-xs font-semibold text-teal-600 mt-0.5">PT Taman Media Indonesia</p>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full self-start sm:self-auto">2025</span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 text-justify">
                      Assisted with core backend optimizations and frontend screen assemblies. Refactored queries to boost performance and learned development sprint scopes.
                    </p>
                  </div>
                </div>

                {/* 3. Freelance Projects */}
                <div className="relative pl-7 group" data-reveal="slide-up">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-teal-500 ring-4 ring-slate-100 group-hover:scale-125 transition-transform duration-200" />
                  <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:border-teal-500/20">
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Freelance Web & Mobile Developer</h3>
                        <p className="text-xs font-semibold text-teal-600 mt-0.5">Independent Contracts</p>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full self-start sm:self-auto">2023 - 2024</span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 text-justify">
                      Collaborated directly with small business owners to engineer custom landing cards, inventory management systems, and cross-platform mobile app mockups.
                    </p>
                  </div>
                </div>

                {/* 4. Academic Projects */}
                <div className="relative pl-7 group" data-reveal="slide-up">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-teal-500 ring-4 ring-slate-100 group-hover:scale-125 transition-transform duration-200" />
                  <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:border-teal-500/20">
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">Software Engineering Academic Work</h3>
                        <p className="text-xs font-semibold text-teal-600 mt-0.5">Politeknik Balekambang</p>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full self-start sm:self-auto">2022 - 2026</span>
                    </div>
                    <p className="mt-3 text-xs leading-relaxed text-slate-600 text-justify">
                      Focusing on core software lifecycle designs. Built various course assignments testing algorithms, data mappings, and secure database frameworks.
                    </p>
                  </div>
                </div>

                {/* 5. Graduation */}
                <div className="relative pl-7 group" data-reveal="slide-up">
                  <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-teal-500 ring-4 ring-slate-100 group-hover:scale-125 transition-transform duration-200" />
                  <div className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm transition-all duration-300 hover:border-teal-500/20">
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">High School Graduation</h3>
                        <p className="text-xs font-semibold text-teal-600 mt-0.5">SMK NU AL HIDAYAH (Computer & Networks)</p>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-full self-start sm:self-auto">2022</span>
                    </div>
                  </div>
                </div>

              </div>

              {/* Education Sublist */}
              <div className="pt-4 space-y-4">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-450 border-l-2 border-teal-500 pl-3">
                  Formal Education Details
                </p>
                <div className="grid gap-4 sm:grid-cols-2">
                  {educationList.map((edu) => (
                    <div
                      key={edu.degree + edu.institution}
                      className="rounded-xl border border-slate-200/60 bg-white p-4 shadow-sm"
                    >
                      <h4 className="text-xs font-bold text-slate-900">{edu.degree}</h4>
                      <p className="mt-1 text-[11px] font-semibold text-slate-500">{edu.institution}</p>
                      <p className="mt-2 text-[10px] font-bold text-slate-400">{edu.period}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Certificates Section */}
        <section
          id="certificates"
          className="border-t border-slate-200/60 py-20 md:py-28 scroll-mt-24"
        >
          <div className="grid gap-8 md:grid-cols-3" data-reveal="slide-up">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Certifications
              </h2>
              <div className="h-1 w-10 bg-teal-500 mt-3 rounded-full" />
              <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xs">
                Professional certificates verified by global issuers validating my engineering expertise.
              </p>
            </div>
            
            <div className="md:col-span-2 grid gap-4 sm:grid-cols-2">
              {certifications.map((cert) => (
                <div 
                  key={cert.name + cert.issuer}
                  className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm flex flex-col justify-between hover:border-teal-500/20 transition-all duration-300"
                >
                  <div className="space-y-2">
                    <div className="w-8 h-8 rounded-lg bg-teal-50 flex items-center justify-center text-teal-650 shrink-0">
                      <Award className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="text-xs font-bold text-slate-900 leading-snug line-clamp-2">
                        {cert.name}
                      </h3>
                      <p className="mt-1 text-[10px] font-semibold text-slate-500">
                        {cert.issuer}
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[10px] font-bold">
                    <span className="text-slate-400">{cert.year}</span>
                    {cert.file_url ? (
                      <a 
                        href={cert.file_url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-teal-600 hover:text-teal-500 transition-colors inline-flex items-center gap-0.5"
                      >
                        <span>View PDF</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ) : cert.credential_link ? (
                      <a 
                        href={cert.credential_link} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="text-teal-600 hover:text-teal-500 transition-colors inline-flex items-center gap-0.5"
                      >
                        <span>Verify Credential</span>
                        <ArrowUpRight className="h-3 w-3" />
                      </a>
                    ) : null}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* GitHub Section */}
        <section
          id="github"
          className="border-t border-slate-200/60 py-20 md:py-28 scroll-mt-24"
        >
          <div className="grid gap-8 md:grid-cols-3" data-reveal="slide-up">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                GitHub Activity
              </h2>
              <div className="h-1 w-10 bg-teal-500 mt-3 rounded-full" />
              <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xs">
                Dynamically fetched details of my coding schedules, stargazers, forks, and live push commit logs from GitHub APIs.
              </p>
              <div className="hidden md:flex justify-start pt-6 opacity-85">
                <LottiePlayer src="/lottie/github.json" className="w-32 h-32" />
              </div>
            </div>
            
            <div className="md:col-span-2">
              <GitHubActivity />
            </div>
          </div>
        </section>

        {/* Achievements Section */}
        <section
          id="achievements"
          className="border-t border-slate-200/60 py-20 md:py-28 scroll-mt-24"
        >
          <div className="grid gap-8 md:grid-cols-3" data-reveal="slide-up">
            <div className="md:col-span-1">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Achievements & Impact
              </h2>
              <div className="h-1 w-10 bg-teal-500 mt-3 rounded-full" />
              <p className="mt-4 text-xs text-slate-500 leading-relaxed max-w-xs">
                Key software engineering metrics reflecting my overall learning and building speed.
              </p>
            </div>
            
            <div className="md:col-span-2 grid gap-6 sm:grid-cols-3">
              {[
                { count: "15+", label: "Projects Completed", desc: "Interactive mobile and scalable web apps built." },
                { count: "18+", label: "Technologies Mastered", desc: "Backend frameworks, libraries, APIs, and devops tools." },
                { count: "500+", label: "GitHub Commits", desc: "Regular revisions pushing clean structural modules." },
                { count: "8+", label: "Certificates Earned", desc: "Verified validations of frontend & backend courses." },
                { count: "5+", label: "Academic Projects", desc: "Database models, structures, and algorithmic work." }
              ].map((ach, idx) => (
                <div key={idx} className="rounded-xl border border-slate-200/60 bg-white p-5 shadow-sm space-y-2">
                  <span className="text-2xl font-extrabold text-teal-650 block">{ach.count}</span>
                  <h3 className="text-xs font-bold text-slate-900">{ach.label}</h3>
                  <p className="text-[10px] text-slate-500 leading-relaxed">{ach.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
 
        {/* Contact Section */}
        <section
          id="contact"
          className="border-t border-slate-200/60 py-20 md:py-28 scroll-mt-24"
        >
          <div className="grid gap-8 md:grid-cols-3" data-reveal="slide-up">
            <div className="md:col-span-1 space-y-4">
              <h2 className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Let&apos;s Build Something Amazing Together
              </h2>
              <div className="h-1 w-10 bg-teal-500 mt-1 rounded-full" />
              <p className="text-xs text-slate-500 leading-relaxed max-w-xs pt-1">
                Reach out for inquiries, contract jobs, or recruitment opportunities. I will respond within 24 hours.
              </p>

              {/* Contact Info Cards */}
              <div className="space-y-3 pt-2">
                <a 
                  href="mailto:nizarnurafif644@gmail.com" 
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-white shadow-sm hover:border-teal-500/20 hover:shadow-md transition-all text-xs font-semibold text-slate-700"
                >
                  <Mail className="h-4.5 w-4.5 text-teal-650 shrink-0" />
                  <span>nizarnurafif644@gmail.com</span>
                </a>
                <a 
                  href="https://linkedin.com/in/nizarnurafif" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-white shadow-sm hover:border-teal-500/20 hover:shadow-md transition-all text-xs font-semibold text-slate-700"
                >
                  <Linkedin className="h-4.5 w-4.5 text-teal-650 shrink-0" />
                  <span>linkedin.com/in/nizarnurafif</span>
                </a>
                <a 
                  href="https://github.com/Nizarafif" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-white shadow-sm hover:border-teal-500/20 hover:shadow-md transition-all text-xs font-semibold text-slate-700"
                >
                  <Github className="h-4.5 w-4.5 text-teal-650 shrink-0" />
                  <span>github.com/Nizarafif</span>
                </a>
                <a 
                  href="https://wa.me/6282242131665" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-white shadow-sm hover:border-teal-500/20 hover:shadow-md transition-all text-xs font-semibold text-slate-700"
                >
                  <Phone className="h-4.5 w-4.5 text-teal-650 shrink-0" />
                  <span>+62 822-4213-1665</span>
                </a>
                <div className="flex items-center gap-3 p-3 rounded-xl border border-slate-200/60 bg-white shadow-sm text-xs font-semibold text-slate-700">
                  <MapPin className="h-4.5 w-4.5 text-teal-650 shrink-0" />
                  <span>Kudus, Indonesia</span>
                </div>
              </div>
            </div>
 
            <div className="md:col-span-2">
              <div className="rounded-xl border border-slate-200/65 bg-white p-6 md:p-8 shadow-lg shadow-slate-100 relative" data-reveal="slide-up">
                <div className="absolute -inset-1 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-xl blur opacity-[0.06] pointer-events-none"></div>
                <div className="relative z-10 grid gap-8 md:grid-cols-5">
                  <div className="md:col-span-2 hidden md:flex flex-col items-center justify-center border-r border-slate-100 pr-6">
                    <LottiePlayer src="/lottie/contact.json" className="w-32 h-32" />
                    <p className="text-[10px] font-bold text-teal-650 uppercase tracking-widest mt-4">Fast Response</p>
                    <p className="text-[9px] text-slate-400 text-center mt-1">Directly delivered to my active inbox.</p>
                  </div>
                  <div className="md:col-span-3 space-y-6">
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-teal-600" />
                      <span>Send a Direct Message</span>
                    </h3>
                    <ContactForm />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
 
      {/* Footer */}
      <footer className="border-t border-slate-200/60 bg-white/40 py-12 relative z-10">
        <div className="mx-auto max-w-5xl px-6 lg:px-0 space-y-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="space-y-3">
              <span className="text-sm font-bold text-slate-900">Nizar Nur Afif</span>
              <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                Dedicated Software Engineer constructing robust APIs and rich cross-platform mobile apps.
              </p>
            </div>
            
            {/* Quick Navigation Footer */}
            <div className="space-y-3">
              <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Navigation</h4>
              <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-semibold text-slate-600">
                {navItems.map((item) => (
                  <a key={item.href} href={item.href} className="hover:text-teal-650 transition-colors">
                    {item.label}
                  </a>
                ))}
              </div>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-250 flex flex-col gap-4 items-center justify-between text-[10px] font-semibold text-slate-450 tracking-wider uppercase sm:flex-row">
            <span>© {year} Nizar Nur Afif. All rights reserved.</span>
            <span className="normal-case tracking-normal text-slate-400 text-xs">
              Built with: <span className="font-semibold text-slate-600">Next.js 15 · Tailwind CSS · Supabase · Framer Motion</span>
            </span>
          </div>
        </div>
      </footer>

      {/* Floating Back to Top Button */}
      <BackToTop />
    </div>
  );
}
