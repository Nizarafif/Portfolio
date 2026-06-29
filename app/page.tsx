'use client';

import Image from "next/image";
import { useEffect, useState, type MouseEvent } from "react";
import { 
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiMysql, SiPhp, SiLaravel,
  SiGit, SiGithub, SiPostman, SiVuedotjs, SiPostgresql, SiFlutter, SiFirebase,
  SiDocker, SiFigma, SiVercel
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import dynamic from "next/dynamic";

const ThreeScene = dynamic(() => import("@/components/ThreeScene"), { ssr: false });

const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

type Project = {
  title: string;
  role: string;
  problem: string;
  solution: string;
  result: string;
  tech: string[];
  github: string;
  demo?: string;
  image?: string;
};

type Experience = {
  role: string;
  company: string;
  period: string;
  description: string;
};

type Education = {
  degree: string;
  institution: string;
  period: string;
};

type Certification = {
  name: string;
  issuer: string;
  year: string;
  file?: string;
};

const projects: Project[] = [
  {
    title: "Taxonomy",
    role: "Open Source Contributor",
    problem:
      "Developers need a modern, performant, and accessible foundation for building content-driven applications with the latest Next.js features.",
    solution:
      "A comprehensive starting point using Next.js App Router, Prisma, and Tailwind CSS. Implements authentication, MDX support, and a clean UI component system.",
    result:
      "Serves as a reference implementation for thousands of developers adopting the Next.js App Router and server components.",
    tech: ["Next.js 14", "Prisma", "Tailwind CSS", "Shadcn UI"],
    github: "https://github.com/shadcn-ui/taxonomy",
    demo: "https://tx.shadcn.com/",
    image: "/images/taxonomy.png",
  },
  {
    title: "Dub.co",
    role: "Open Source Contributor",
    problem:
      "Managing short links and tracking analytics across marketing campaigns is often fragmented and lacks transparency.",
    solution:
      "An open-source link management infrastructure that provides powerful analytics, custom domains, and programmatic link generation via API.",
    result:
      "Processed millions of clicks with low latency, providing real-time insights for marketing teams and developers.",
    tech: ["Next.js", "Tinybird", "Redis", "Vercel Edge Functions"],
    github: "https://github.com/dubinc/dub",
    demo: "https://dub.co",
    image: "/images/dub.png",
  },
  {
    title: "Next.js Commerce",
    role: "Frontend Developer",
    problem:
      "Building high-performance e-commerce sites requires complex integration with headless CMS and payment gateways while maintaining speed.",
    solution:
      "A high-performance e-commerce starter kit featuring edge caching, image optimization, and seamless integration with Shopify and BigCommerce.",
    result:
      "Achieved 100/100 Lighthouse scores, ensuring instant page loads and improved conversion rates for online stores.",
    tech: ["Next.js", "Shopify API", "Tailwind CSS", "Edge Middleware"],
    github: "https://github.com/vercel/commerce",
    demo: "https://demo.vercel.store",
    image: "/images/commerce.png",
  },
];

const experiences: Experience[] = [
  {
    role: "Intern Full Stack Developer",
    company: "PT Taman Media Indonesia",
    period: "2025",
    description:
      "Mengembangkan fitur frontend dan backend, serta membantu optimasi database untuk meningkatkan performa aplikasi perusahaan.",
  },
  {
    role: "Intern Website Developer",
    company: "CV Polibang Creative Studio",
    period: "2023",
    description:
      "Berpartisipasi dalam pembuatan website klien menggunakan WordPress dan custom coding, serta belajar mengenai manajemen proyek digital.",
  },
];

const educationList: Education[] = [
  {
    degree: "Rekayasa Perangkat Lunak",
    institution: "Politeknik Balekambang",
    period: "2022 - Sekarang",
  },
  {
    degree: "Teknik Komputer dan Jaringan",
    institution: "SMK NU AL HIDAYAH",
    period: "2019 - 2022",
  },
];

const certifications: Certification[] = [
  {
    name: "Pelatihan Java",
    issuer: "Course Provider",
    year: "2022",
    file: "/SERTIFIKAT/sertifikat_course.pdf.pdf",
  },
  {
    name: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    year: "2023",
  },
  {
    name: "Belajar Fundamental Front-End Web Development",
    issuer: "Dicoding Indonesia",
    year: "2023",
  },
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "2022",
  },
];

const skills = {
  frontend: [
    { name: "JavaScript (ES6+)", icon: SiJavascript, color: "text-yellow-400" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-600" },
    { name: "React", icon: SiReact, color: "text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-slate-900" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-500" },
    { name: "Vue.js", icon: SiVuedotjs, color: "text-emerald-500" },
    { name: "Flutter", icon: SiFlutter, color: "text-sky-400" },
  ],
  backend: [
    { name: "PHP", icon: SiPhp, color: "text-indigo-500" },
    { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-500" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-600" },
    { name: "Firebase", icon: SiFirebase, color: "text-amber-500" },
  ],
  tools: [
    { name: "Git", icon: SiGit, color: "text-red-500" },
    { name: "GitHub", icon: SiGithub, color: "text-slate-900" },
    { name: "VS Code", icon: VscVscode, color: "text-blue-500" },
    { name: "Postman", icon: SiPostman, color: "text-orange-500" },
    { name: "Docker", icon: SiDocker, color: "text-sky-500" },
    { name: "Figma", icon: SiFigma, color: "text-rose-500" },
    { name: "Vercel", icon: SiVercel, color: "text-slate-900" },
  ],
};

export default function Home() {
  const year = new Date().getFullYear();

  const nameText = "Nizar Nur Afif";
  const [displayName, setDisplayName] = useState(nameText);
  const [isAnimatingName, setIsAnimatingName] = useState(true);

  useEffect(() => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let frame = 0;
    const totalFrames = nameText.length + 6;

    const intervalId = setInterval(() => {
      frame += 1;

      if (frame >= totalFrames) {
        setDisplayName(nameText);
        setIsAnimatingName(false);
        clearInterval(intervalId);
        return;
      }

      setDisplayName(() =>
        nameText
          .split("")
          .map((char, index) => {
            if (char === " ") return " ";
            if (index < frame - 2) return nameText[index];
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join("")
      );
    }, 70);

    return () => clearInterval(intervalId);
  }, [nameText]);

  const handleSmoothScroll = (
    event: MouseEvent<HTMLAnchorElement>,
    targetHref: string
  ) => {
    event.preventDefault();
    const targetId = targetHref.replace("#", "");
    const element = document.getElementById(targetId);
    if (!element) return;

    const headerOffset = 80; 
    const elementPosition = element.getBoundingClientRect().top + window.scrollY;
    const offsetPosition = elementPosition - headerOffset;

    window.scrollTo({
      top: offsetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#111827] relative">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#E2E8F0] bg-white/95 backdrop-blur">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6 lg:px-0">
          <a href="#home" className="flex items-center gap-3">
            <div className="relative h-14 w-14">
              <Image
                src="/nizar-logo.png"
                alt="Nizar Nur Afif logo"
                fill
                className="object-contain"
                sizes="56px"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-[#0B0F19]">
                Nizar Nur Afif
              </span>
              <span className="text-xs text-slate-500">Fullstack Developer</span>
            </div>
          </a>

          <div className="hidden items-center gap-6 text-xs font-medium text-slate-600 sm:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(event) => handleSmoothScroll(event, item.href)}
                className="rounded-full px-2 py-1 transition-colors duration-150 hover:bg-[#F1F5F9] hover:text-[#0B0F19]"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-4 pb-16 pt-16 sm:px-6 lg:px-0">
        {/* Hero */}
        <section
          id="home"
          className="relative flex flex-col gap-10 pb-16 pt-2 md:flex-row md:items-center md:justify-between overflow-hidden rounded-2xl"
        >
          <ThreeScene />
          <div className="space-y-6 flex-1 relative z-10">
            <p className="inline-flex items-center rounded-full bg-[#F1F5F9] px-3 py-1 text-xs font-medium text-[#0F766E]">
              Fullstack Developer · Indonesia
            </p>
            <h1
              className={`text-3xl font-bold tracking-tight text-[#0B0F19] sm:text-4xl md:text-[2.6rem] md:leading-tight transition duration-150 drop-shadow-sm ${
                isAnimatingName ? "blur-[1px]" : ""
              }`}
            >
              <span className="bg-gradient-to-r from-[#0B0F19] to-slate-600 bg-clip-text text-transparent">
                {displayName}
              </span>
            </h1>
            <p className="max-w-xl text-sm leading-relaxed text-slate-600 sm:text-base text-justify">
              Saya adalah Fullstack Developer profesional yang berdedikasi untuk menciptakan solusi digital end-to-end yang elegan dan berdampak. Dengan keahlian di frontend dan backend, saya membangun aplikasi web yang tidak hanya responsif dan cepat, tetapi juga scalable, aman, dan memberikan pengalaman pengguna yang intuitif.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href="#projects"
                onClick={(event) => handleSmoothScroll(event, "#projects")}
                className="inline-flex items-center justify-center rounded-lg bg-[#0F766E] px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-teal-700/20 transition-all duration-200 hover:-translate-y-1 hover:bg-[#0c5c56] hover:shadow-teal-700/30"
              >
                View Projects
              </a>
              <a
                href="/CV/CV.pdf"
                download="Nizar_Nur_Afif_CV.pdf"
                className="inline-flex items-center justify-center rounded-lg border border-[#0B0F19] px-5 py-2.5 text-xs font-medium text-[#0B0F19] transition-colors duration-150 hover:bg-[#0B0F19] hover:text-white"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center md:items-end relative z-10">
            {/* Profile Photo with Decorative Elements */}
            <div className="relative group">
              {/* Gradient Background Orbs */}
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-gradient-to-br from-teal-400/30 to-emerald-400/30 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-full blur-2xl"></div>
              
              {/* Main Photo Container */}
              <div className="relative">
                {/* Decorative Border */}
                <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 rounded-2xl blur-sm opacity-40 group-hover:opacity-60 transition duration-300"></div>
                
                {/* Photo Frame */}
                <div className="relative w-64 h-80 rounded-2xl overflow-hidden border-4 border-white shadow-2xl bg-gradient-to-br from-slate-100 to-slate-50">
                  <Image
                    src="/images/pp.png"
                    alt="Nizar Nur Afif - Fullstack Developer"
                    fill
                    className="object-cover object-top"
                    sizes="256px"
                    priority
                  />
                </div>

                {/* Floating Tech Badges */}
                <div className="absolute -top-3 -left-3 bg-white rounded-lg px-3 py-1.5 shadow-lg border border-teal-100 animate-bounce" style={{animationDuration: '3s'}}>
                  <span className="text-xs font-bold text-teal-700">⚡ React</span>
                </div>
                
                <div className="absolute -bottom-3 -right-3 bg-white rounded-lg px-3 py-1.5 shadow-lg border border-emerald-100 animate-bounce" style={{animationDuration: '3.5s', animationDelay: '0.5s'}}>
                  <span className="text-xs font-bold text-emerald-700">🚀 Next.js</span>
                </div>

                <div className="absolute top-1/4 -right-4 bg-white rounded-lg px-3 py-1.5 shadow-lg border border-blue-100 animate-bounce" style={{animationDuration: '4s', animationDelay: '1s'}}>
                  <span className="text-xs font-bold text-blue-700">💾 Node.js</span>
                </div>

                {/* Decorative Geometric Shapes */}
                <div className="absolute -top-6 right-8 w-12 h-12 border-4 border-teal-300/50 rounded-lg rotate-12 group-hover:rotate-45 transition-transform duration-500"></div>
                <div className="absolute -bottom-4 left-4 w-8 h-8 bg-gradient-to-br from-emerald-400/40 to-teal-400/40 rounded-full"></div>
              </div>
            </div>

            {/* Quick Profile Card */}
            <div className="w-full max-w-xs rounded-lg bg-[#F1F5F9] p-4 shadow-sm">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
                Quick profile
              </p>
              <dl className="mt-3 space-y-2 text-xs text-slate-700">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Role</dt>
                  <dd className="font-medium text-[#111827]">Fullstack Developer</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Focus</dt>
                  <dd className="font-medium text-[#111827]">
                    Frontend · Backend · Database
                  </dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Availability</dt>
                  <dd className="font-medium text-[#111827]">
                    Open for opportunities
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="border-t border-[#E2E8F0] py-10 md:py-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-[#0B0F19]">About Me</h2>
          </div>
          <div className="space-y-4 text-sm leading-relaxed text-slate-600 sm:text-base max-w-4xl mx-auto">
            <p className="text-justify">
              Saya seorang fullstack developer yang berpengalaman membangun aplikasi web
              dari frontend hingga backend. Terbiasa bekerja dengan stack JavaScript/TypeScript modern
              (React, Next.js) untuk frontend, dan Node.js dengan Express untuk backend,
              serta database relational (PostgreSQL, MySQL) maupun NoSQL (MongoDB).
            </p>
            <p className="text-justify">
              Dalam setiap project, saya fokus pada arsitektur yang scalable, clean code,
              dan best practices seperti RESTful API design, database optimization, dan
              security. Saya juga memperhatikan struktur folder, separation of concerns,
              dan dokumentasi yang baik agar codebase mudah di-maintain oleh tim.
            </p>
          </div>
        </section>

        {/* Skills */}
        <section
          id="skills"
          className="border-t border-[#E2E8F0] py-10 md:py-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0B0F19]">Skills</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="space-y-3 rounded-xl border border-slate-200 bg-white/50 p-5 shadow-sm transition-all hover:shadow-md hover:border-teal-200 hover:bg-white/80">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
                Frontend
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {skills.frontend.map((item) => (
                  <li key={item.name} className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-slate-200 hover:bg-slate-50">
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      <span className="font-medium">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 rounded-xl border border-slate-200 bg-white/50 p-5 shadow-sm transition-all hover:shadow-md hover:border-teal-200 hover:bg-white/80">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
                Backend
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {skills.backend.map((item) => (
                  <li key={item.name} className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-slate-200 hover:bg-slate-50">
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      <span className="font-medium">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-3 rounded-xl border border-slate-200 bg-white/50 p-5 shadow-sm transition-all hover:shadow-md hover:border-teal-200 hover:bg-white/80">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-teal-700">
                Tools
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                {skills.tools.map((item) => (
                  <li key={item.name} className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition-colors hover:border-slate-200 hover:bg-slate-50">
                      <item.icon className={`h-5 w-5 ${item.color}`} />
                      <span className="font-medium">{item.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects */}
        <section
          id="projects"
          className="border-t border-[#E2E8F0] py-10 md:py-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0B0F19]">Projects</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group flex h-full flex-col overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-md hover:border-teal-200"
                >
                  {project.image ? (
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover object-top"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="h-32 bg-gradient-to-br from-slate-100 to-slate-200 text-xs text-slate-400 flex items-center justify-center font-medium">
                      Project preview area
                    </div>
                  )}
                  <div className="flex flex-1 flex-col p-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-sm font-semibold text-[#0B0F19]">
                        {project.title}
                      </h3>
                      <p className="text-[11px] text-slate-500">{project.role}</p>
                    </div>
                    <div className="mt-3 space-y-2 text-xs text-slate-700">
                      <div>
                        <p className="font-semibold text-[11px] text-slate-500">
                          Problem
                        </p>
                        <p className="mt-1 text-[13px] text-justify">{project.problem}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[11px] text-slate-500">
                          Approach
                        </p>
                        <p className="mt-1 text-[13px] text-justify">{project.solution}</p>
                      </div>
                      <div>
                        <p className="font-semibold text-[11px] text-slate-500">
                          Result / Features
                        </p>
                        <p className="mt-1 text-[13px] text-justify">{project.result}</p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1 text-[11px] text-slate-500">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded-full bg-[#F1F5F9] px-2 py-0.5"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                    <div className="mt-4 flex gap-3 text-xs font-medium">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[#0F766E] underline-offset-4 hover:underline"
                      >
                        GitHub
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#0B0F19] underline-offset-4 hover:underline"
                        >
                          Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
          </div>
        </section>

        {/* Experience & Education */}
        <section
          id="experience"
          className="border-t border-[#E2E8F0] py-10 md:py-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0B0F19]">Experience & Education</h2>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                  Experience
                </p>
                <div className="space-y-4">
                  {experiences.map((exp) => (
                    <div
                      key={exp.role + exp.company}
                      className="rounded-xl border border-slate-200 bg-white/50 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-100 hover:-translate-y-0.5"
                    >
                      <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between">
                        <div>
                          <h3 className="text-sm font-semibold text-[#0B0F19]">
                            {exp.role}
                          </h3>
                          <p className="text-xs font-medium text-slate-600">
                            {exp.company}
                          </p>
                        </div>
                        <span className="text-xs text-slate-500">
                          {exp.period}
                        </span>
                      </div>
                      <p className="mt-2 text-sm text-slate-600 text-justify">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Education
                  </p>
                  <div className="space-y-3">
                    {educationList.map((edu) => (
                      <div
                        key={edu.degree + edu.institution}
                        className="rounded-xl border border-slate-200 bg-white/50 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-100"
                      >
                        <h3 className="text-sm font-semibold text-[#0B0F19]">
                          {edu.degree}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-slate-600">
                          {edu.institution}
                        </p>
                        <p className="mt-1 text-xs text-slate-500">
                          {edu.period}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
                    Certifications
                  </p>
                  <div className="space-y-3">
                    {certifications.map((cert) => (
                      <div
                        key={cert.name + cert.issuer}
                        className="rounded-xl border border-slate-200 bg-white/50 p-5 shadow-sm transition-all duration-200 hover:shadow-md hover:border-teal-100"
                      >
                        <h3 className="text-sm font-semibold text-[#0B0F19]">
                          {cert.name}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-slate-600">
                          {cert.issuer}
                        </p>
                        <div className="mt-1 flex items-center justify-between text-xs text-slate-500">
                          <span>{cert.year}</span>
                          {cert.file && (
                            <a
                              href={cert.file}
                              target="_blank"
                              rel="noreferrer"
                              className="font-medium text-[#0F766E] underline-offset-4 hover:underline"
                            >
                              View Certificate
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </section>

        {/* Contact */}
        <section
          id="contact"
          className="border-t border-[#E2E8F0] py-10 md:py-12"
        >
          <div className="text-center mb-10">
            <h2 className="text-2xl font-bold text-[#0B0F19]">Contact</h2>
          </div>
          <div className="space-y-8 max-w-4xl mx-auto">
              {/* Contact Form */}
              <div className="rounded-xl border border-slate-200 bg-white/50 p-6 shadow-sm">
                <h3 className="text-sm font-semibold text-[#0B0F19] mb-4 flex items-center gap-2">
                  <svg className="w-5 h-5 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Kirim Pesan Langsung
                </h3>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const formData = new FormData(e.currentTarget);
                    const name = formData.get('name');
                    const email = formData.get('email');
                    const message = formData.get('message');
                    
                    const subject = `Portfolio Contact from ${name}`;
                    const body = `Nama: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0APesan:%0D%0A${message}`;
                    
                    window.location.href = `mailto:nizarnurafif644@gmail.com?subject=${encodeURIComponent(subject)}&body=${body}`;
                  }}
                  className="space-y-4"
                >
                  <div>
                    <label htmlFor="name" className="block text-xs font-medium text-slate-700 mb-1.5">
                      Nama Lengkap
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="Masukkan nama Anda"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-xs font-medium text-slate-700 mb-1.5">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                      placeholder="email@example.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-xs font-medium text-slate-700 mb-1.5">
                      Pesan
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      className="w-full px-4 py-2.5 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all resize-none"
                      placeholder="Tulis pesan Anda di sini..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-[#0F766E] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-lg shadow-teal-700/20 transition-all duration-200 hover:-translate-y-1 hover:bg-[#0c5c56] hover:shadow-teal-700/30"
                  >
                    Kirim Pesan via Email
                  </button>
                </form>
              </div>

              {/* Contact Info */}

            </div>
        </section>
      </main>



      {/* Footer */}
      <footer className="border-t border-[#E2E8F0] bg-white">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 px-4 py-4 text-[11px] text-slate-500 sm:px-6 lg:px-0">
          <span>© {year} Nizar Nur Afif. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}

