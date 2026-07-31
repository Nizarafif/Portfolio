import Image from "next/image";
import { createClient } from "@/utils/supabase/server";
import { getIcon } from "@/components/icons-map";
import NameAnimation from "@/components/NameAnimation";
import ContactForm from "@/components/ContactForm";
import SmoothScroll from "@/components/SmoothScroll";
import { 
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiMysql, SiPhp, SiLaravel,
  SiGit, SiGithub, SiPostman, SiVuedotjs, SiPostgresql, SiFlutter, SiFirebase,
  SiDocker, SiFigma, SiVercel
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
};

// Fallback Static Data
const fallbackProjects: Project[] = [
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
];

const fallbackExperiences: Experience[] = [
  {
    role: "Intern Full Stack Developer",
    company: "PT Taman Media Indonesia",
    period: "2025",
    description:
      "Developed frontend and backend features, and assisted with database optimization to enhance company application performance.",
  },
  {
    role: "Intern Website Developer",
    company: "CV Polibang Creative Studio",
    period: "2023",
    description:
      "Participated in client website development using WordPress and custom coding, and learned about digital project management.",
  },
];

const fallbackEducationList: Education[] = [
  {
    degree: "Software Engineering",
    institution: "Politeknik Balekambang",
    period: "2022",
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

const fallbackSkills = {
  frontend: [
    { name: "JavaScript (ES6+)", icon: SiJavascript, color: "text-yellow-400" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "React", icon: SiReact, color: "text-cyan-400" },
    { name: "Next.js", icon: SiNextdotjs, color: "text-white" },
    { name: "Tailwind CSS", icon: SiTailwindcss, color: "text-cyan-450" },
    { name: "Vue.js", icon: SiVuedotjs, color: "text-emerald-500" },
    { name: "Flutter", icon: SiFlutter, color: "text-sky-400" },
  ],
  backend: [
    { name: "PHP", icon: SiPhp, color: "text-indigo-400" },
    { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-500" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-400" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-500" },
    { name: "Firebase", icon: SiFirebase, color: "text-amber-500" },
  ],
  tools: [
    { name: "Git", icon: SiGit, color: "text-orange-500" },
    { name: "GitHub", icon: SiGithub, color: "text-slate-300" },
    { name: "VS Code", icon: VscVscode, color: "text-blue-500" },
    { name: "Postman", icon: SiPostman, color: "text-orange-500" },
    { name: "Docker", icon: SiDocker, color: "text-blue-400" },
    { name: "Figma", icon: SiFigma, color: "text-rose-500" },
    { name: "Vercel", icon: SiVercel, color: "text-white" },
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
      const getCategorySkills = (cat: 'frontend' | 'backend' | 'tools') => {
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
      const tools = getCategorySkills('tools');

      if (frontend.length > 0 || backend.length > 0 || tools.length > 0) {
        skills = { frontend, backend, tools };
      }
    }
  } catch (error) {
    console.warn("Koneksi Supabase belum aktif atau menggunakan fallback lokal.", error);
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 relative overflow-hidden bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(13,148,136,0.12),rgba(255,255,255,0))] font-sans antialiased">
      <SmoothScroll />
      
      {/* Aurora Ambient Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-teal-500/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-[40%] right-[-10%] w-[60%] h-[60%] bg-indigo-500/5 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[10%] w-[50%] h-[50%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-slate-900/60 bg-slate-950/80 backdrop-blur-md">
        <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 lg:px-0">
          <a href="#home" className="flex items-center gap-3 group">
            <div className="relative h-12 w-12 rounded-xl border border-slate-800 bg-slate-900 p-1 flex items-center justify-center transition-all duration-300 group-hover:border-teal-500/50">
              <Image
                src="/nizar-logo.png"
                alt="Nizar Nur Afif logo"
                fill
                className="object-contain p-1.5"
                sizes="48px"
              />
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-sm font-semibold text-white tracking-wide transition-colors group-hover:text-teal-400">
                Nizar Nur Afif
              </span>
              <span className="text-[10px] text-slate-500 font-medium tracking-wider uppercase">Fullstack Developer</span>
            </div>
          </a>

          <div className="hidden items-center gap-1.5 text-xs font-semibold text-slate-400 sm:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 transition-all duration-200 hover:bg-slate-900 hover:text-teal-400"
              >
                {item.label}
              </a>
            ))}
          </div>
        </nav>
      </header>

      <main className="mx-auto max-w-5xl px-6 pb-24 pt-12 lg:px-0 relative z-10">
        
        {/* Hero Section */}
        <section
          id="home"
          className="relative flex flex-col gap-12 pb-20 pt-8 md:flex-row md:items-center md:justify-between scroll-mt-24"
        >
          <div className="space-y-6 flex-1" data-reveal="slide-up">
            <div className="inline-flex items-center gap-1.5 rounded-full border border-teal-500/20 bg-teal-950/30 px-3 py-1 text-xs font-medium text-teal-400">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-400 animate-pulse" />
              <span>Open to Work</span>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-widest">Welcome</p>
              <NameAnimation nameText={nameText} />
            </div>

            <p className="max-w-xl text-sm leading-relaxed text-slate-400 sm:text-base text-justify">
              I am a professional Fullstack Developer dedicated to creating elegant and impactful end-to-end digital solutions. With expertise in both frontend and backend, I build web applications that are not only responsive and fast, but also scalable, secure, and deliver an intuitive user experience.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <a
                href="#projects"
                className="inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-lg shadow-teal-500/10 hover:shadow-teal-500/25 transition-all duration-200 hover:-translate-y-0.5 hover:from-teal-500 hover:to-emerald-500"
              >
                View Projects
              </a>
              <a
                href="/CV/CV.pdf"
                download="Nizar_Nur_Afif_CV.pdf"
                className="inline-flex items-center justify-center rounded-xl border border-slate-800 bg-slate-900/60 px-6 py-3 text-xs font-semibold text-slate-300 hover:bg-slate-900 hover:text-white hover:border-slate-700 transition-all duration-200"
              >
                Download CV
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-6 items-center md:items-end" data-reveal="slide-left">
            {/* Profile Photo */}
            <div className="relative group">
              {/* Photo Glow behind */}
              <div className="absolute -inset-2 bg-gradient-to-r from-teal-500 to-indigo-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-500"></div>
              
              {/* Photo Frame */}
              <div className="relative w-64 h-80 rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 shadow-2xl">
                <Image
                  src="/images/pp.png"
                  alt="Nizar Nur Afif"
                  fill
                  className="object-cover object-top filter grayscale hover:grayscale-0 transition-all duration-500"
                  sizes="256px"
                  priority
                />
              </div>

              {/* Float Badges */}
              <div className="absolute -top-3 -left-3 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 shadow-xl select-none animate-bounce" style={{animationDuration: '4s'}}>
                <span className="text-[10px] font-bold text-teal-400">⚡ React</span>
              </div>
              
              <div className="absolute -bottom-3 -right-3 bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 shadow-xl select-none animate-bounce" style={{animationDuration: '4.5s', animationDelay: '0.5s'}}>
                <span className="text-[10px] font-bold text-teal-400">🚀 Next.js</span>
              </div>
            </div>

            {/* Quick Profile Card */}
            <div className="w-full max-w-xs rounded-xl border border-slate-900 bg-slate-900/40 p-5 shadow-xl backdrop-blur-sm">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                Quick Profile
              </p>
              <dl className="mt-4 space-y-2.5 text-xs">
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Focus</dt>
                  <dd className="font-semibold text-slate-300">Frontend & Backend</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Specialty</dt>
                  <dd className="font-semibold text-slate-300 text-right">React · Next.js · Laravel</dd>
                </div>
                <div className="flex justify-between gap-4">
                  <dt className="text-slate-500">Availability</dt>
                  <dd className="font-semibold text-emerald-400">Freelance / Full-time</dd>
                </div>
              </dl>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section
          id="about"
          className="border-t border-slate-900/80 py-16 md:py-20 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              About Me
            </h2>
            <div className="h-1 w-12 bg-teal-500 mx-auto mt-3 rounded-full" />
          </div>
          <div className="space-y-6 text-sm leading-relaxed text-slate-400 sm:text-base max-w-3xl mx-auto">
            <p className="text-justify">
              I am a full-stack developer experienced in building web applications from frontend to backend. Accustomed to working with the modern JavaScript/TypeScript stack (React, Next.js) on the frontend, and Node.js with Express or Laravel on the backend, along with relational databases (PostgreSQL, MySQL) and NoSQL (MongoDB).
            </p>
            <p className="text-justify">
              In every project, I focus on scalable architecture, clean code, and best practices like RESTful API design, database optimization, and security. I also pay attention to folder structure, separation of concerns, and good documentation to ensure the codebase is easily maintainable by the team.
            </p>
          </div>
        </section>

        {/* Skills Section */}
        <section
          id="skills"
          className="border-t border-slate-900/80 py-16 md:py-20 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Tech Stack & Skills
            </h2>
            <div className="h-1 w-12 bg-teal-500 mx-auto mt-3 rounded-full" />
          </div>
          
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Frontend */}
            <div className="space-y-4 rounded-2xl border border-slate-900 bg-slate-900/20 p-6 transition-all duration-300 hover:border-teal-500/35 hover:shadow-[0_0_25px_rgba(13,148,136,0.06)] hover:-translate-y-0.5" data-reveal="slide-right">
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
                Frontend Development
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                {skills.frontend.map((item) => {
                  const SkillIcon = item.icon;
                  return (
                    <li key={item.name} className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all duration-200 hover:border-slate-800/40 hover:bg-slate-900/30">
                        <SkillIcon className={`h-5 w-5 ${item.color}`} />
                        <span className="font-semibold">{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* Backend */}
            <div className="space-y-4 rounded-2xl border border-slate-900 bg-slate-900/20 p-6 transition-all duration-300 hover:border-teal-500/35 hover:shadow-[0_0_25px_rgba(13,148,136,0.06)] hover:-translate-y-0.5" data-reveal="slide-up">
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
                Backend Development
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                {skills.backend.map((item) => {
                  const SkillIcon = item.icon;
                  return (
                    <li key={item.name} className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all duration-200 hover:border-slate-800/40 hover:bg-slate-900/30">
                        <SkillIcon className={`h-5 w-5 ${item.color}`} />
                        <span className="font-semibold">{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
            
            {/* Tools */}
            <div className="space-y-4 rounded-2xl border border-slate-900 bg-slate-900/20 p-6 transition-all duration-300 hover:border-teal-500/35 hover:shadow-[0_0_25px_rgba(13,148,136,0.06)] hover:-translate-y-0.5" data-reveal="slide-left">
              <p className="text-[10px] font-bold uppercase tracking-widest text-teal-400">
                Development Tools
              </p>
              <ul className="mt-2 space-y-1.5 text-xs text-slate-300">
                {skills.tools.map((item) => {
                  const SkillIcon = item.icon;
                  return (
                    <li key={item.name} className="flex items-center gap-3 rounded-lg border border-transparent p-2 transition-all duration-200 hover:border-slate-800/40 hover:bg-slate-900/30">
                        <SkillIcon className={`h-5 w-5 ${item.color}`} />
                        <span className="font-semibold">{item.name}</span>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </section>

        {/* Projects Section */}
        <section
          id="projects"
          className="border-t border-slate-900/80 py-16 md:py-20 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Portfolio Projects
            </h2>
            <div className="h-1 w-12 bg-teal-500 mx-auto mt-3 rounded-full" />
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.title}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-slate-900 bg-slate-900/30 transition-all duration-300 hover:border-teal-500/35 hover:shadow-[0_0_30px_rgba(13,148,136,0.09)]"
                  data-reveal="slide-up"
                >
                  {project.image_url ? (
                    <div className="relative h-52 w-full overflow-hidden border-b border-slate-900/80">
                      <Image
                        src={project.image_url}
                        alt={`${project.title} preview`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                  ) : (
                    <div className="h-40 bg-slate-900 text-xs text-slate-500 flex items-center justify-center font-medium">
                      Project preview area
                    </div>
                  )}
                  
                  <div className="flex flex-1 flex-col p-6 space-y-4">
                    <div className="flex items-baseline justify-between gap-2">
                      <h3 className="text-base font-bold text-white tracking-wide group-hover:text-teal-400 transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-[10px] font-semibold text-slate-500 tracking-wider uppercase">{project.role}</p>
                    </div>

                    <div className="space-y-3 text-xs text-slate-400">
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Problem</span>
                        <p className="mt-1 leading-relaxed text-justify">{project.problem}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Solution</span>
                        <p className="mt-1 leading-relaxed text-justify">{project.solution}</p>
                      </div>
                      <div>
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Key Features</span>
                        <p className="mt-1 leading-relaxed text-justify">{project.result}</p>
                      </div>
                    </div>

                    <div className="pt-2 flex flex-wrap gap-1.5">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="rounded bg-slate-900 border border-slate-800 px-2 py-0.5 text-[10px] text-slate-300 font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="pt-3 flex gap-4 text-xs font-semibold">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center gap-1"
                      >
                        GitHub &rarr;
                      </a>
                      {project.demo && (
                        <a
                          href={project.demo}
                          target="_blank"
                          rel="noreferrer"
                          className="text-slate-300 hover:text-white transition-colors inline-flex items-center gap-1"
                        >
                          Live Demo &rarr;
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
          className="border-t border-slate-900/80 py-16 md:py-20 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Experience & Education
            </h2>
            <div className="h-1 w-12 bg-teal-500 mx-auto mt-3 rounded-full" />
          </div>

          <div className="space-y-12 max-w-3xl mx-auto">
              {/* Experience Timeline */}
              <div className="space-y-6">
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500 border-l-2 border-teal-500 pl-3">
                  Work Experience
                </p>
                <div className="relative border-l border-slate-800 ml-3 space-y-6 py-2">
                  {experiences.map((exp) => (
                    <div
                      key={exp.role + exp.company}
                      className="relative pl-6 group"
                      data-reveal="slide-up"
                    >
                      {/* Timeline Dot */}
                      <span className="absolute -left-[5px] top-1.5 h-2 w-2 rounded-full bg-teal-500 ring-4 ring-slate-950 group-hover:scale-125 transition-transform duration-200" />
                      
                      <div className="rounded-xl border border-slate-900 bg-slate-900/20 p-5 transition-all duration-300 hover:border-teal-500/25 hover:shadow-[0_0_20px_rgba(13,148,136,0.04)]">
                        <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between">
                          <div>
                            <h3 className="text-sm font-bold text-white">
                              {exp.role}
                            </h3>
                            <p className="text-xs font-medium text-teal-400 mt-0.5">
                              {exp.company}
                            </p>
                          </div>
                          <span className="text-[10px] font-semibold text-slate-500 bg-slate-900 border border-slate-800 px-2 py-0.5 rounded-full">
                            {exp.period}
                          </span>
                        </div>
                        <p className="mt-3 text-xs leading-relaxed text-slate-400 text-justify">
                          {exp.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Education & Certifications */}
              <div className="grid gap-6 md:grid-cols-2 pt-4">
                {/* Education */}
                <div className="space-y-4" data-reveal="slide-right">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 border-l-2 border-teal-500 pl-3">
                    Education
                  </p>
                  <div className="space-y-4">
                    {educationList.map((edu) => (
                      <div
                        key={edu.degree + edu.institution}
                        className="rounded-xl border border-slate-900 bg-slate-900/20 p-5 transition-all duration-300 hover:border-teal-500/20"
                      >
                        <h3 className="text-sm font-bold text-white">
                          {edu.degree}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {edu.institution}
                        </p>
                        <p className="mt-2 text-[10px] font-semibold text-slate-500">
                          {edu.period}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Certifications */}
                <div className="space-y-4" data-reveal="slide-left">
                  <p className="text-xs font-bold uppercase tracking-widest text-slate-500 border-l-2 border-teal-500 pl-3">
                    Certifications
                  </p>
                  <div className="space-y-4">
                    {certifications.map((cert) => (
                      <div
                        key={cert.name + cert.issuer}
                        className="rounded-xl border border-slate-900 bg-slate-900/20 p-5 transition-all duration-300 hover:border-teal-500/20"
                      >
                        <h3 className="text-sm font-bold text-white leading-snug">
                          {cert.name}
                        </h3>
                        <p className="mt-1 text-xs font-medium text-slate-400">
                          {cert.issuer}
                        </p>
                        <div className="mt-3 flex items-center justify-between text-[10px]">
                          <span className="font-semibold text-slate-500">{cert.year}</span>
                          {cert.file_url && (
                            <a
                              href={cert.file_url}
                              target="_blank"
                              rel="noreferrer"
                              className="font-bold text-teal-400 hover:text-teal-300 transition-colors inline-flex items-center gap-0.5"
                            >
                              View Certificate &rarr;
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

        {/* Contact Section */}
        <section
          id="contact"
          className="border-t border-slate-900/80 py-16 md:py-20 scroll-mt-24"
        >
          <div className="text-center mb-12">
            <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-3xl bg-gradient-to-r from-white via-slate-300 to-slate-500 bg-clip-text text-transparent">
              Contact Me
            </h2>
            <div className="h-1 w-12 bg-teal-500 mx-auto mt-3 rounded-full" />
          </div>
          
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-slate-900 bg-slate-900/30 p-6 md:p-8 shadow-xl backdrop-blur-sm" data-reveal="slide-up">
              <h3 className="text-sm font-bold text-white mb-6 flex items-center gap-2">
                <svg className="w-5 h-5 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span>Send a Direct Message</span>
              </h3>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/60 py-8 relative z-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-center gap-2 px-6 text-[10px] font-semibold text-slate-500 tracking-wider uppercase sm:px-6 lg:px-0">
          <span>© {year} Nizar Nur Afif. All rights reserved.</span>
        </div>
      </footer>
    </div>
  );
}
