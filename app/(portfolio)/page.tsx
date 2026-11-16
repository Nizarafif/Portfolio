import Image from "next/image";
import {
  ArrowUpRight,
  Download,
  Mail,
  MapPin,
  Phone,
  Code2,
  FolderGit2,
  CheckCircle2,
  Layers,
  Sparkles,
} from "lucide-react";
import {
  SiJavascript,
  SiReact,
  SiNodedotjs,
  SiMysql,
  SiPhp,
  SiLaravel,
  SiGit,
  SiGithub as Github,
  SiPostman,
  SiFlutter,
  SiDart,
  SiHtml5,
  SiCss3,
  SiLinkedin as Linkedin,
} from "react-icons/si";

import { createClient } from "@/utils/supabase/server";
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
  { href: "#education", label: "Education" },
  { href: "#certificates", label: "Certifications" },
  { href: "#github", label: "GitHub" },
  { href: "#contact", label: "Contact" },
];

export type Project = {
  id?: string;
  title: string;
  role: string;
  statusBadge?: string;
  problem: string;
  solution: string;
  features?: string[];
  contribution: string;
  result?: string;
  tech: string[];
  github: string;
  demo?: string;
  image_url?: string;
};

export type Experience = {
  id?: string;
  role: string;
  company: string;
  period: string;
  description: string;
  bullets?: string[];
};

export type Education = {
  id?: string;
  degree: string;
  institution: string;
  period: string;
  description?: string;
};

export type Certification = {
  id?: string;
  name: string;
  issuer: string;
  year: string;
  file_url?: string;
  credential_link?: string;
};

export type SkillItem = {
  name: string;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
};

const curatedProjects: Project[] = [
  {
    title: "SmartPay Dosen",
    role: "Full Stack Developer",
    statusBadge: "Featured Project",
    problem:
      "Pengelolaan administrasi penggajian dosen di institusi pendidikan sering kali masih manual, rentan terhadap kekeliruan perhitungan honor SKS, dan minim rekap status pembayaran transparan.",
    solution:
      "Aplikasi web pengelolaan payroll dosen terpadu untuk otomasi kalkulasi gaji, manajemen data dosen, pelacakan status pembayaran, riwayat transaksi, dan ringkasan dashboard statistik.",
    features: [
      "Manajemen data dosen & penugasan mengajar",
      "Kalkulasi honor SKS & gaji secara otomatis",
      "Pelacakan status pembayaran (Pending, Processed, Paid)",
      "Riwayat pembayaran & pencatatan bukti slip gaji",
      "Dashboard statistik rekapitulasi pengeluaran payroll",
    ],
    contribution:
      "Mengembangkan antarmuka dashboard dengan React, merancang skema database MySQL, serta mengimplementasikan RESTful API Laravel untuk alur data dan kalkulasi payroll.",
    tech: ["Laravel", "React", "MySQL", "JavaScript", "Tailwind CSS", "REST API"],
    github: "https://github.com/Nizarafif",
    demo: "",
    image_url: "",
  },
  {
    title: "CVMatch",
    role: "Full Stack Developer",
    statusBadge: "Prototype",
    problem:
      "Pelamar kerja sering mengalami kesulitan mengukur tingkat kesesuaian berkas CV mereka terhadap kriteria kualifikasi yang dicari recruiter pada deskripsi lowongan kerja.",
    solution:
      "Aplikasi web pencocokan CV dan deskripsi pekerjaan untuk menganalisis dokumen CV, mengkalkulasi skor kompatibilitas, serta memberikan rekomendasi perbaikan kata kunci yang relevan.",
    features: [
      "Input berkas CV (PDF) & ekstraksi teks CV",
      "Input deskripsi kualifikasi lowongan pekerjaan",
      "Perhitungan skor kompatibilitas (compatibility scoring)",
      "Rekomendasi kata kunci & saran penyempurnaan CV",
    ],
    contribution:
      "Membangun prototipe alur aplikasi dengan Laravel dan PHP, merancang mekanisme ekstraksi teks CV, serta menyusun logika perbandingan kata kunci.",
    tech: ["Laravel", "PHP", "MySQL", "JavaScript", "Tailwind CSS"],
    github: "https://github.com/Nizarafif",
    demo: "",
    image_url: "",
  },
  {
    title: "RISEUP",
    role: "Mobile Developer",
    statusBadge: "In Development",
    problem:
      "Kurangnya platform mandiri yang mudah diakses generasi muda untuk melakukan skrining awal kondisi kesehatan mental secara objektif dan terstruktur.",
    solution:
      "Aplikasi mobile pemantauan kesehatan mental menggunakan Flutter dengan pendekatan Sistem Pakar (Expert System) untuk identifikasi indikasi dini dan panduan penanganan awal.",
    features: [
      "Kuesioner skrining interaktif berbasis Sistem Pakar",
      "Rule-based inference engine untuk analisis indikasi awal",
      "Pencatatan riwayat & mood tracker berkala",
      "Saran penanganan mandiri dan rekomendasi rujukan",
      "Tercatat resmi Hak Cipta Program Komputer Kemenkum RI (DJKI)",
    ],
    contribution:
      "Merancang antarmuka mobile responsif menggunakan Flutter & Dart, mengimplementasikan rule-based inference engine, dan mendokumentasikan sistem hingga tercatat HKI resmi.",
    tech: ["Flutter", "Dart", "REST API", "Expert System"],
    github: "https://github.com/Nizarafif",
    demo: "",
    image_url: "",
  },
  {
    title: "Resumora",
    role: "Frontend / Full Stack Developer",
    statusBadge: "Live Application",
    problem:
      "Pembuatan CV/Resume profesional yang rapi, terstruktur, dan ramah ATS sering kali memakan waktu serta sulit disesuaikan dengan berbagai posisi pekerjaan.",
    solution:
      "Platform resume builder dengan dynamic live preview, pilihan template profesional standar industri, manajemen data terstruktur, dan ekspor dokumen PDF berkualitas tinggi.",
    features: [
      "Real-time split-screen resume editor & live preview",
      "Koleksi template resume modern dan profesional",
      "Kustomisasi bagian pengalaman kerja, pendidikan, dan keahlian",
      "Ekspor PDF instan & sinkronisasi data cloud",
    ],
    contribution:
      "Mengembangkan antarmuka interaktif menggunakan React, TypeScript, dan Tailwind CSS, mengelola state aplikasi, serta menghubungkan layanan backend.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite", "Supabase"],
    github: "https://github.com/Nizarafif/resumora",
    demo: "https://resumoraa.netlify.app/",
    image_url: "/images/resumora.png",
  },
  {
    title: "FlowSync",
    role: "Frontend Developer",
    statusBadge: "Live Application",
    problem:
      "Sinkronisasi antara daftar tugas harian dan jadwal kalender sering kali terpisah sehingga menyulitkan visualisasi alur kerja tim secara terpusat.",
    solution:
      "Aplikasi manajemen alur kerja yang menggabungkan drag-and-drop kanban board dengan kalender interaktif dan metrik progres kerja terpadu.",
    features: [
      "Interactive drag-and-drop kanban board",
      "Integrasi kalender jadwal tugas secara visual",
      "Visualisasi status progres penyelesaian pekerjaan",
      "Antarmuka responsif untuk desktop dan tablet",
    ],
    contribution:
      "Mengimplementasikan fitur kanban board, interaktivitas antarmuka, serta perancangan komponen UI yang responsif menggunakan React dan Tailwind CSS.",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/Nizarafif/FlowSync",
    demo: "https://flow-sync-one.vercel.app/",
    image_url: "/images/Flowsync.png",
  },
];

const curatedExperiences: Experience[] = [
  {
    role: "Web Developer",
    company: "PT Solusi Teknologi Indonesia",
    period: "2023 – 2025",
    description:
      "Membantu pengembangan dan pemeliharaan aplikasi web berbasis PHP, Laravel, dan JavaScript. Mengimplementasikan fitur-fitur baru sesuai kebutuhan sistem, melakukan perbaikan bug (debugging), menjaga kebersihan dan struktur kode, serta berkolaborasi aktif dengan tim pengembang.",
    bullets: [
      "Membantu pengembangan dan implementasi modul web berbasis PHP dan Laravel.",
      "Melakukan debugging, penelusuran issue, serta pengujian fungsionalitas fitur.",
      "Menjaga keterbacaan kode (clean code) dan konsistensi arsitektur MVC.",
      "Berkolaborasi dengan tim teknis dalam menyelesaikan task sesuai timeline.",
    ],
  },
  {
    role: "Full Stack Developer Intern",
    company: "PT Taman Media Indonesia",
    period: "2025 – 2026",
    description:
      "Mengembangkan fitur antarmuka frontend dan endpoint backend, membantu refaktor serta optimasi query database MySQL untuk efisiensi data, menerapkan alur kerja Git kolaboratif, serta mendukung pemeliharaan sistem aplikasi.",
    bullets: [
      "Mengembangkan komponen frontend responsif dan menghubungkannya dengan API backend.",
      "Membantu optimasi query database MySQL untuk meningkatkan efisiensi pembacaan data.",
      "Menerapkan alur kerja Git standar industri (branching, PR review, merge).",
      "Mendukung pemeliharaan dan pengujian kestabilan fitur aplikasi produksi.",
    ],
  },
];

const curatedEducationList: Education[] = [
  {
    degree: "D-IV Rekayasa Perangkat Lunak (Software Engineering)",
    institution: "Politeknik Balekambang Jepara",
    period: "2022 – 2026",
    description:
      "Fokus pada rekayasa perangkat lunak, arsitektur aplikasi web & mobile, perancangan basis data, algoritma & struktur data, serta metodologi pengembangan perangkat lunak.",
  },
  {
    degree: "Computer and Network Engineering (Teknik Komputer dan Jaringan)",
    institution: "SMK NU Al Hidayah Kudus",
    period: "2019 – 2021",
    description:
      "Mempelajari dasar-dasar pemrograman, jaringan komputer, konfigurasi server, serta perakitan dan pemeliharaan infrastruktur perangkat keras.",
  },
];

const curatedCertificates: Certification[] = [
  {
    name: "JavaScript Algorithms and Data Structures",
    issuer: "freeCodeCamp",
    year: "2022",
    credential_link: "https://www.freecodecamp.org/certification/fcc-certificate/javascript-algorithms-and-data-structures",
  },
  {
    name: "Belajar Fundamental Front-End Web Development",
    issuer: "Dicoding Indonesia",
    year: "2023",
    file_url: "/SERTIFIKAT/sertifikat_course_256_2564715_150323222614.pdf.pdf",
    credential_link: "https://www.dicoding.com/certificates/81P280JQJPOY",
  },
  {
    name: "Belajar Membuat Aplikasi Web dengan React",
    issuer: "Dicoding Indonesia",
    year: "2023",
    credential_link: "https://www.dicoding.com/certificates",
  },
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
    name: "Memulai Pemrograman Dengan Java",
    issuer: "Dicoding Indonesia",
    year: "2022",
    file_url: "/SERTIFIKAT/sertifikat_course.pdf.pdf",
    credential_link: "https://www.dicoding.com/certificates/N9ZO7D1E6ZG5",
  },
];

const categorizedSkills: {
  category: string;
  description: string;
  items: SkillItem[];
}[] = [
  {
    category: "Backend",
    description: "Server-side logic, MVC frameworks, and API endpoints",
    items: [
      { name: "PHP", icon: SiPhp, color: "text-indigo-400" },
      { name: "Laravel", icon: SiLaravel, color: "text-red-500" },
      { name: "Node.js", icon: SiNodedotjs, color: "text-emerald-500" },
    ],
  },
  {
    category: "Frontend",
    description: "Component architecture, interactive state, and web markup",
    items: [
      { name: "JavaScript", icon: SiJavascript, color: "text-yellow-400" },
      { name: "React", icon: SiReact, color: "text-cyan-400" },
      { name: "HTML", icon: SiHtml5, color: "text-orange-500" },
      { name: "CSS", icon: SiCss3, color: "text-blue-500" },
    ],
  },
  {
    category: "Database",
    description: "Relational data modeling and database queries",
    items: [
      { name: "MySQL", icon: SiMysql, color: "text-sky-400" },
    ],
  },
  {
    category: "Mobile Development",
    description: "Cross-platform mobile application development",
    items: [
      { name: "Flutter", icon: SiFlutter, color: "text-sky-400" },
      { name: "Dart", icon: SiDart, color: "text-blue-400" },
    ],
  },
  {
    category: "Tools & Workflow",
    description: "Version control, API testing, and collaboration",
    items: [
      { name: "Git", icon: SiGit, color: "text-orange-500" },
      { name: "GitHub", icon: Github, color: "text-[var(--text-primary)]" },
      { name: "Postman", icon: SiPostman, color: "text-orange-400" },
    ],
  },
];

export default async function Home() {
  const year = new Date().getFullYear();

  let projects: Project[] = curatedProjects;
  let experiences: Experience[] = curatedExperiences;
  let educationList: Education[] = curatedEducationList;
  let certifications: Certification[] = curatedCertificates;

  // Supabase fallback gracefully handled
  try {
    const supabase = await createClient();
    const withTimeout = <T,>(promise: PromiseLike<T>, ms = 2000): Promise<T> => {
      let id: NodeJS.Timeout;
      const timeout = new Promise<never>((_, reject) => {
        id = setTimeout(() => reject(new Error("Supabase timeout")), ms);
      });
      return Promise.race([promise, timeout]).finally(() => clearTimeout(id));
    };

    const [projectsRes, experiencesRes, educationRes, certificationsRes] =
      await Promise.allSettled([
        withTimeout(supabase.from("projects").select("*").order("created_at", { ascending: true })),
        withTimeout(supabase.from("experiences").select("*").order("created_at", { ascending: false })),
        withTimeout(supabase.from("education").select("*").order("created_at", { ascending: false })),
        withTimeout(supabase.from("certifications").select("*").order("created_at", { ascending: false })),
      ]);

    // If Supabase projects exist and user wants priority on SmartPay, CVMatch, RISEUP, keep them prepended
    if (
      projectsRes.status === "fulfilled" &&
      projectsRes.value.data &&
      projectsRes.value.data.length > 0
    ) {
      const dbProjects: Project[] = projectsRes.value.data.map((p) => ({
        id: p.id,
        title: p.title,
        role: p.role,
        problem: p.problem,
        solution: p.solution,
        contribution: p.contribution || "Full Stack Web Development & Implementation",
        result: p.result,
        tech: Array.isArray(p.tech) ? p.tech : [],
        github: p.github,
        demo: p.demo || undefined,
        image_url: p.image_url || undefined,
      }));

      // Combine priority projects with existing db projects without duplicating titles
      const existingTitles = new Set(curatedProjects.map((cp) => cp.title.toLowerCase()));
      const filteredDb = dbProjects.filter((dp) => !existingTitles.has(dp.title.toLowerCase()));
      projects = [...curatedProjects, ...filteredDb];
    }

    if (
      experiencesRes.status === "fulfilled" &&
      experiencesRes.value.data &&
      experiencesRes.value.data.length > 0
    ) {
      // Prioritize confirmed work experiences from user prompt
      experiences = curatedExperiences;
    }

    if (
      educationRes.status === "fulfilled" &&
      educationRes.value.data &&
      educationRes.value.data.length > 0
    ) {
      educationList = curatedEducationList;
    }

    if (
      certificationsRes.status === "fulfilled" &&
      certificationsRes.value.data &&
      certificationsRes.value.data.length > 0
    ) {
      const dbCerts: Certification[] = certificationsRes.value.data;
      const normalize = (val?: string | null) => (val || "").trim().toLowerCase();
      const existingNames = new Set(curatedCertificates.map((c) => normalize(c.name)));
      const additional = dbCerts.filter((c) => !existingNames.has(normalize(c.name)));
      certifications = [...curatedCertificates, ...additional];
    }
  } catch {
    // Keep curated data when Supabase is not reachable
  }

  const getCaseStudyLink = (p: Project) => {
    const t = (p.title || "").toLowerCase();
    if (t.includes("smartpay")) return "/projects/smartpay";
    if (t.includes("cvmatch")) return "/projects/cvmatch";
    if (t.includes("riseup")) return "/projects/riseup";
    if (t.includes("resumora")) return "/projects/resumora";
    if (t.includes("flowsync")) return "/projects/flowsync";
    if (t.includes("nexaops")) return "/projects/nexaops";
    if (t.includes("nexaport")) return "/projects/nexaport";
    if (t.includes("commerce")) return "/projects/e-commerce";
    return p.id ? `/projects/${p.id}` : "#";
  };

  const getBadgeStyle = (badge?: string) => {
    const b = (badge || "").toLowerCase();
    if (b.includes("prototype")) {
      return "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400";
    }
    if (b.includes("development")) {
      return "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400";
    }
    return "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400";
  };

  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      <SmoothScroll />
      <Navbar navItems={navItems} />

      <main className="mx-auto max-w-6xl px-6 lg:px-8">
        {/* ========================================================================= */}
        {/* A. HERO SECTION */}
        {/* ========================================================================= */}
        <section
          id="home"
          className="scroll-mt-24 pb-20 pt-32 md:pb-28 md:pt-40"
        >
          <div className="grid items-center gap-12 lg:grid-cols-12">
            <div className="space-y-8 lg:col-span-8">
              <MotionReveal immediate>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">
                  <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-emerald-600 dark:text-emerald-400">
                    <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                    Open to Work
                  </span>
                  <span className="text-[var(--text-muted)]">/</span>
                  <span>Kudus, Indonesia</span>
                  <span className="text-[var(--text-muted)]">/</span>
                  <span>Junior Full Stack Developer</span>
                </div>
              </MotionReveal>

              <MotionReveal immediate delay={0.08}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <p className="font-mono text-sm font-semibold tracking-wide text-emerald-600 dark:text-emerald-400">
                      Hi, I&apos;m
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-[var(--text-primary)] sm:text-5xl md:text-6xl lg:text-[4.25rem] leading-[1.05]">
                      Nizar Nur Afif
                    </h1>
                  </div>

                  <h2 className="text-xl font-medium tracking-tight text-[var(--text-primary)] sm:text-2xl md:text-3xl text-balance">
                    Junior Full Stack Developer{" "}
                    <span className="text-[var(--text-muted)]">|</span>{" "}
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Laravel &amp; React
                    </span>
                  </h2>

                  <p className="max-w-2xl text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base sm:leading-relaxed">
                    I am a Software Engineering graduate with an interest in web
                    application development, particularly in backend and full-stack
                    development. I have experience working with PHP, Laravel,
                    React, JavaScript, and MySQL through academic projects,
                    personal projects, and professional work experience. I enjoy
                    learning new technologies, solving problems, and building
                    applications that provide practical solutions to real-world
                    needs.
                  </p>
                </div>
              </MotionReveal>

              <MotionReveal immediate delay={0.16}>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="/CV/CV.pdf"
                    download="Nizar_Nur_Afif_CV.pdf"
                    className="inline-flex items-center gap-2 rounded-md bg-[var(--btn-primary-bg)] px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--btn-primary-text)] shadow-sm transition-all hover:bg-emerald-600 hover:text-white"
                  >
                    <Download className="h-4 w-4" />
                    <span>Download CV</span>
                  </a>

                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 rounded-md border border-[var(--border-strong)] bg-transparent px-5 py-3 text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)] transition-colors hover:border-emerald-500/50 hover:bg-[var(--bg-surface-hover)]"
                  >
                    <Mail className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
                    <span>Contact Me</span>
                  </a>

                  <div className="flex items-center gap-2 pl-1">
                    <a
                      href="https://github.com/Nizarafif"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-emerald-500/40 hover:text-[var(--text-primary)]"
                      aria-label="GitHub Profile"
                      title="GitHub Profile"
                    >
                      <Github className="h-4 w-4" />
                    </a>

                    <a
                      href="https://www.linkedin.com/in/nizar-nur-afif"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] text-[var(--text-secondary)] transition-colors hover:border-emerald-500/40 hover:text-[var(--text-primary)]"
                      aria-label="LinkedIn Profile"
                      title="LinkedIn Profile"
                    >
                      <Linkedin className="h-4 w-4" />
                    </a>
                  </div>
                </div>
              </MotionReveal>
            </div>

            {/* Editorial Portrait Card */}
            <div className="lg:col-span-4">
              <MotionReveal immediate delay={0.2}>
                <div className="mx-auto max-w-[320px] rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-3 shadow-md lg:ml-auto lg:mr-0">
                  <div className="relative aspect-[4/5] w-full overflow-hidden rounded-md bg-[var(--bg-surface-hover)]">
                    <Image
                      src="/images/pp.png"
                      alt="Nizar Nur Afif — Junior Full Stack Developer"
                      fill
                      priority
                      sizes="(max-width: 1024px) 300px, 320px"
                      className="object-cover object-center transition-all duration-500"
                    />
                  </div>
                  <div className="mt-3 flex items-center justify-between border-t border-[var(--border-subtle)] pt-3 font-mono text-[11px] text-[var(--text-secondary)]">
                    <span className="font-medium text-[var(--text-primary)]">
                      Nizar Nur Afif
                    </span>
                    <span className="text-emerald-600 dark:text-emerald-400">
                      Laravel &amp; React
                    </span>
                  </div>
                </div>
              </MotionReveal>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* B. ABOUT ME */}
        {/* ========================================================================= */}
        <section
          id="about"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  01 / About Me
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Background, passion &amp; engineering foundation.
                </h2>
              </div>

              <div className="space-y-8 lg:col-span-8">
                <div className="space-y-4 text-sm leading-relaxed text-[var(--text-secondary)] sm:text-base sm:leading-relaxed">
                  <p>
                    Saya adalah lulusan Rekayasa Perangkat Lunak dari{" "}
                    <strong className="font-semibold text-[var(--text-primary)]">
                      Politeknik Balekambang Jepara
                    </strong>{" "}
                    dengan latar belakang pendidikan kejuruan Teknik Komputer
                    dan Jaringan di{" "}
                    <strong className="font-semibold text-[var(--text-primary)]">
                      SMK NU Al Hidayah Kudus
                    </strong>
                    . Perjalanan ini membentuk fondasi yang solid dalam logika
                    pemrograman, pemahaman jaringan komputer, serta arsitektur
                    sistem.
                  </p>
                  <p>
                    Fokus utama saya berpusat pada{" "}
                    <strong className="font-semibold text-[var(--text-primary)]">
                      backend dan full-stack web application development
                    </strong>
                    . Melalui berbagai proyek akademik, eksplorasi mandiri, dan
                    pengalaman kerja di industri, saya terbiasa membangun
                    aplikasi web menggunakan ekosistem{" "}
                    <strong className="font-semibold text-emerald-600 dark:text-emerald-400">
                      PHP, Laravel, React, JavaScript, dan MySQL
                    </strong>
                    .
                  </p>
                  <p>
                    Sebagai seorang Junior Developer, saya berorientasi pada
                    penulisan kode yang rapi, pemahaman alur data yang jelas,
                    kemampuan memecahkan masalah praktis, serta kesiapan untuk
                    terus beradaptasi mempelajari teknologi baru guna memberikan
                    solusi nyata yang bermanfaat bagi pengguna.
                  </p>
                </div>

                {/* Structured Overview Grid */}
                <div className="grid grid-cols-1 gap-4 border-t border-[var(--border-subtle)] pt-6 sm:grid-cols-2">
                  <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                      Pendidikan Formal
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                      D-IV Rekayasa Perangkat Lunak
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--text-secondary)]">
                      Politeknik Balekambang Jepara (2022–2026)
                    </span>
                  </div>

                  <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                      Fokus &amp; Minat
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                      Backend &amp; Full Stack Web
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--text-secondary)]">
                      Laravel REST API, React SPA, MySQL Database
                    </span>
                  </div>

                  <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                      Pengalaman Industri
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                      Web Developer &amp; Intern
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--text-secondary)]">
                      PT Solusi Teknologi Indonesia &amp; PT Taman Media Indonesia
                    </span>
                  </div>

                  <div className="rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-4">
                    <span className="block font-mono text-[11px] uppercase tracking-wider text-[var(--text-muted)]">
                      Target Posisi
                    </span>
                    <span className="mt-1 block text-sm font-semibold text-[var(--text-primary)]">
                      Junior Full Stack / Web Developer
                    </span>
                    <span className="mt-0.5 block text-xs text-[var(--text-secondary)]">
                      Programmer IT · Laravel / PHP Developer · React Developer
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* ========================================================================= */}
        {/* C. TECHNICAL SKILLS */}
        {/* ========================================================================= */}
        <section
          id="skills"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  02 / Technical Skills
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Teknologi &amp; Tools yang Dikuasai.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Teknologi dan tools yang telah benar-benar saya gunakan dalam
                  pengembangan proyek akademik, personal, dan pekerjaan nyata.
                </p>
              </div>

              <div className="space-y-6 lg:col-span-8">
                {categorizedSkills.map((cat) => (
                  <div
                    key={cat.category}
                    className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-colors hover:border-[var(--border-hover)]"
                  >
                    <div className="mb-3 flex flex-col justify-between gap-1 sm:flex-row sm:items-baseline">
                      <h3 className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--text-primary)]">
                        {cat.category}
                      </h3>
                      <span className="text-xs text-[var(--text-muted)]">
                        {cat.description}
                      </span>
                    </div>

                    <div className="flex flex-wrap gap-2.5 pt-1">
                      {cat.items.map((skill) => {
                        const IconComp = skill.icon;
                        return (
                          <div
                            key={skill.name}
                            className="inline-flex items-center gap-2 rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-3.5 py-2 transition-all hover:border-emerald-500/40 hover:bg-[var(--bg-surface-hover)]"
                          >
                            <IconComp className={`h-4 w-4 ${skill.color}`} />
                            <span className="text-xs font-medium text-[var(--text-primary)]">
                              {skill.name}
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

        {/* ========================================================================= */}
        {/* D. FEATURED PROJECTS */}
        {/* ========================================================================= */}
        <section
          id="projects"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
          <MotionReveal>
            <div className="mb-12 flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div className="space-y-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  03 / Featured Projects
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                  Proyek Pilihan &amp; Kontribusi Nyata.
                </h2>
              </div>
              <p className="max-w-md text-sm text-[var(--text-secondary)]">
                Aplikasi yang telah dibangun mencakup pengelolaan sistem payroll,
                pencocokan CV, aplikasi mobile kesehatan mental, dan web tools
                modern.
              </p>
            </div>
          </MotionReveal>

          <div className="grid gap-6 md:grid-cols-2">
            {projects.map((project, idx) => {
              const caseStudyHref = getCaseStudyLink(project);

              return (
                <MotionReveal key={project.title} delay={idx * 0.05}>
                  <article className="group flex h-full flex-col justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 transition-all hover:border-emerald-500/40 hover:shadow-md">
                    <div className="space-y-4">
                      {/* Top Header Strip */}
                      <div className="flex items-center justify-between gap-2 border-b border-[var(--border-subtle)] pb-3">
                        <span className="font-mono text-[11px] font-medium text-[var(--text-muted)]">
                          0{idx + 1}
                        </span>

                        {project.statusBadge && (
                          <span
                            className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-medium uppercase tracking-wider ${getBadgeStyle(
                              project.statusBadge
                            )}`}
                          >
                            {project.statusBadge}
                          </span>
                        )}
                      </div>

                      {/* Project Image (if available) */}
                      {project.image_url ? (
                        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-md border border-[var(--border-subtle)] bg-[var(--bg-surface-hover)]">
                          <Image
                            src={project.image_url}
                            alt={project.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 50vw"
                            className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                          />
                        </div>
                      ) : (
                        <div className="flex aspect-[16/9] w-full items-center justify-center rounded-md border border-[var(--border-subtle)] bg-[var(--bg-primary)] p-4 text-center">
                          <div className="space-y-1">
                            <Code2 className="mx-auto h-7 w-7 text-emerald-600/70 dark:text-emerald-400/70" />
                            <p className="font-mono text-xs font-medium text-[var(--text-secondary)]">
                              {project.title}
                            </p>
                            <p className="text-[11px] text-[var(--text-muted)]">
                              {project.role}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Title & Role */}
                      <div className="space-y-1">
                        <h3 className="text-xl font-bold tracking-tight text-[var(--text-primary)]">
                          {project.title}
                        </h3>
                        <p className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                          {project.role}
                        </p>
                      </div>

                      {/* Problem Statement */}
                      <div className="space-y-1 rounded-md bg-[var(--bg-primary)] p-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                        <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                          Masalah yang Diatasi
                        </span>
                        <p>{project.problem}</p>
                      </div>

                      {/* Solution / Description */}
                      <p className="text-xs leading-relaxed text-[var(--text-secondary)]">
                        {project.solution}
                      </p>

                      {/* Main Features */}
                      {project.features && project.features.length > 0 && (
                        <div className="space-y-2 pt-1">
                          <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
                            Fitur Utama
                          </span>
                          <ul className="space-y-1 text-xs text-[var(--text-secondary)]">
                            {project.features.map((feat, fIdx) => (
                              <li key={fIdx} className="flex items-start gap-2">
                                <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-600 dark:text-emerald-400" />
                                <span>{feat}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Actual Contribution */}
                      {project.contribution && (
                        <div className="space-y-1 border-t border-[var(--border-subtle)] pt-3 text-xs leading-relaxed text-[var(--text-secondary)]">
                          <span className="block font-mono text-[10px] font-semibold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                            Kontribusi Saya
                          </span>
                          <p>{project.contribution}</p>
                        </div>
                      )}

                      {/* Tech Stack Pills */}
                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="rounded border border-[var(--border-subtle)] bg-[var(--bg-primary)] px-2 py-0.5 font-mono text-[10px] text-[var(--text-secondary)]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Bottom Action Links */}
                    <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-4">
                      <div className="flex items-center gap-4">
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-medium text-[var(--text-secondary)] transition-colors hover:text-[var(--text-primary)]"
                          >
                            <Github className="h-3.5 w-3.5" />
                            <span>Repository</span>
                          </a>
                        )}
                        {project.demo && (
                          <a
                            href={project.demo}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 dark:text-emerald-400 transition-colors hover:underline"
                          >
                            <span>Live Demo</span>
                            <ArrowUpRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>

                      <CaseStudyLink
                        href={caseStudyHref}
                        projectTitle={project.title}
                      />
                    </div>
                  </article>
                </MotionReveal>
              );
            })}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* E. WORK EXPERIENCE */}
        {/* ========================================================================= */}
        <section
          id="experience"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  04 / Work Experience
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Pengalaman Kerja Nyata.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Keterlibatan langsung dalam pengembangan aplikasi web,
                  pemeliharaan kode, dan kolaborasi tim profesional.
                </p>
              </div>

              <div className="space-y-8 lg:col-span-8">
                <div className="relative ml-2 border-l border-[var(--border-strong)] pl-7 space-y-10">
                  {experiences.map((exp, idx) => (
                    <div key={`${exp.company}-${idx}`} className="relative">
                      <span
                        aria-hidden="true"
                        className={`absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full border ${
                          idx === 0
                            ? "border-emerald-500 bg-emerald-500"
                            : "border-[var(--border-hover)] bg-[var(--bg-primary)]"
                        }`}
                      />
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div>
                          <h3 className="text-base font-bold text-[var(--text-primary)]">
                            {exp.role}
                          </h3>
                          <p className="font-medium text-sm text-emerald-600 dark:text-emerald-400">
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

                      {exp.bullets && exp.bullets.length > 0 && (
                        <ul className="mt-3 space-y-1.5 text-xs text-[var(--text-secondary)]">
                          {exp.bullets.map((b, bIdx) => (
                            <li key={bIdx} className="flex items-start gap-2">
                              <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500/80" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* ========================================================================= */}
        {/* F. EDUCATION */}
        {/* ========================================================================= */}
        <section
          id="education"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  05 / Education
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Latar Belakang Pendidikan.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Pendidikan formal di bidang Rekayasa Perangkat Lunak dan
                  Teknik Komputer Jaringan.
                </p>
              </div>

              <div className="space-y-6 lg:col-span-8">
                <div className="relative ml-2 border-l border-[var(--border-strong)] pl-7 space-y-8">
                  {educationList.map((edu, idx) => (
                    <div key={`${edu.institution}-${idx}`} className="relative">
                      <span
                        aria-hidden="true"
                        className="absolute -left-[33px] top-1.5 h-2.5 w-2.5 rounded-full border border-[var(--border-hover)] bg-[var(--bg-primary)]"
                      />
                      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                        <div>
                          <h3 className="text-base font-bold text-[var(--text-primary)]">
                            {edu.institution}
                          </h3>
                          <p className="font-medium text-sm text-emerald-600 dark:text-emerald-400">
                            {edu.degree}
                          </p>
                        </div>
                        <span className="font-mono text-xs text-[var(--text-muted)]">
                          {edu.period}
                        </span>
                      </div>
                      {edu.description && (
                        <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
                          {edu.description}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* ========================================================================= */}
        {/* G. CERTIFICATIONS */}
        {/* ========================================================================= */}
        <section
          id="certificates"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  06 / Certifications
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Sertifikat &amp; Kredensial Resmi.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Sertifikasi kompetensi pemrograman web, algoritma, serta hak
                  cipta program komputer yang dapat diverifikasi.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
                {certifications.map((cert, idx) => {
                  const certHref = cert.file_url || cert.credential_link;

                  return (
                    <div
                      key={`${cert.name}-${idx}`}
                      className="flex flex-col justify-between rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-5 transition-all hover:border-emerald-500/40"
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[var(--text-muted)]">
                          <span>{cert.issuer}</span>
                          <span>{cert.year}</span>
                        </div>
                        <h3 className="text-sm font-semibold leading-snug text-[var(--text-primary)]">
                          {cert.name}
                        </h3>
                      </div>

                      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-subtle)] pt-3">
                        {certHref ? (
                          <a
                            href={certHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400 transition-colors hover:underline"
                          >
                            <span>Lihat Sertifikat</span>
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
                            <span>Verify URL</span>
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

        {/* ========================================================================= */}
        {/* H. GITHUB ACTIVITY */}
        {/* ========================================================================= */}
        <section
          id="github"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="space-y-3 lg:col-span-4">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                  07 / GitHub Activity
                </p>
                <h2 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] sm:text-3xl">
                  Aktivitas Kode &amp; Repositori.
                </h2>
                <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                  Metrik profil publik, grafik kontribusi, dan repositori yang
                  diambil langsung secara transparan dari GitHub API.
                </p>
              </div>

              <div className="min-w-0 lg:col-span-8">
                <GitHubActivity />
              </div>
            </div>
          </MotionReveal>
        </section>

        {/* ========================================================================= */}
        {/* I. CONTACT SECTION */}
        {/* ========================================================================= */}
        <section
          id="contact"
          className="scroll-mt-20 border-t border-[var(--border-subtle)] py-20 md:py-28"
        >
          <MotionReveal>
            <div className="grid gap-12 lg:grid-cols-12">
              <div className="space-y-8 lg:col-span-5">
                <div className="space-y-3">
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-emerald-600 dark:text-emerald-400">
                    08 / Contact
                  </p>
                  <h2 className="text-3xl font-bold tracking-tight text-[var(--text-primary)] sm:text-4xl">
                    Mari Terhubung &amp; Berkolaborasi.
                  </h2>
                  <p className="text-sm leading-relaxed text-[var(--text-secondary)]">
                    Terbuka untuk peluang kerja penuh waktu (full-time) sebagai
                    Junior Full Stack Developer, Junior Web Developer, atau
                    Programmer IT, serta kolaborasi proyek teknis lainnya.
                  </p>
                </div>

                <div className="divide-y divide-[var(--border-subtle)] border-y border-[var(--border-subtle)]">
                  <a
                    href="mailto:nizarnurafif644@gmail.com"
                    className="group flex items-center justify-between py-3.5 text-sm transition-colors"
                  >
                    <span className="inline-flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                      <Mail className="h-4 w-4 text-[var(--text-muted)] group-hover:text-emerald-500" />
                      nizarnurafif644@gmail.com
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-emerald-500" />
                  </a>

                  <a
                    href="https://www.linkedin.com/in/nizar-nur-afif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 text-sm transition-colors"
                  >
                    <span className="inline-flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                      <Linkedin className="h-4 w-4 text-[var(--text-muted)] group-hover:text-emerald-500" />
                      linkedin.com/in/nizar-nur-afif
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-emerald-500" />
                  </a>

                  <a
                    href="https://github.com/Nizarafif"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 text-sm transition-colors"
                  >
                    <span className="inline-flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                      <Github className="h-4 w-4 text-[var(--text-muted)] group-hover:text-emerald-500" />
                      github.com/Nizarafif
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-emerald-500" />
                  </a>

                  <a
                    href="https://wa.me/6281806344925"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between py-3.5 text-sm transition-colors"
                  >
                    <span className="inline-flex items-center gap-3 text-[var(--text-secondary)] group-hover:text-[var(--text-primary)]">
                      <Phone className="h-4 w-4 text-[var(--text-muted)] group-hover:text-emerald-500" />
                      +62 818-0634-4925
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-[var(--text-muted)] group-hover:text-emerald-500" />
                  </a>

                  <div className="flex items-center gap-3 py-3.5 text-sm text-[var(--text-secondary)]">
                    <MapPin className="h-4 w-4 text-[var(--text-muted)]" />
                    <span>Kudus, Indonesia</span>
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-surface)] p-6 sm:p-8">
                  <div className="mb-6 border-b border-[var(--border-subtle)] pb-4">
                    <h3 className="text-base font-semibold text-[var(--text-primary)]">
                      Kirim Pesan Langsung
                    </h3>
                    <p className="mt-1 text-xs text-[var(--text-secondary)]">
                      Formulir ini terhubung langsung untuk pesan atau tawaran kerja.
                    </p>
                  </div>
                  <ContactForm />
                </div>
              </div>
            </div>
          </MotionReveal>
        </section>
      </main>

      {/* Minimalist Recruiter-Friendly Footer */}
      <footer className="border-t border-[var(--border-subtle)] py-10">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs text-[var(--text-muted)]">
            <span className="text-[var(--text-secondary)]">
              © {year} Nizar Nur Afif
            </span>
            <span>·</span>
            <span>Junior Full Stack Developer</span>
            <span>·</span>
            <span>Kudus, Indonesia</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-[var(--text-secondary)]">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="transition-colors hover:text-emerald-500"
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
