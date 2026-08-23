export interface CaseStudyData {
  title: string;
  role: string;
  problem: string;
  solution: string;
  result?: string;
  tech: string[];
  github: string;
  demo?: string;
  image_url?: string;
  timeline: string;
  status: string;
  category: string;
  keyFeatures: string[];
  systemArchitecture: string;
  challenges: string;
  resultsMetrics: string[];
  gallery: string[];
}

export const caseStudiesMap: Record<string, CaseStudyData> = {
  "e-commerce": {
    title: "E-Commerce App",
    role: "Fullstack Developer",
    category: "Web Application",
    timeline: "Jan 2023 - Mar 2023",
    status: "Completed",
    tech: ["React", "TypeScript", "Tailwind CSS"],
    github: "https://github.com/Nizarafif/e-commerce",
    demo: "https://e-commerce-six-omega-11.vercel.app/",
    image_url: "/images/e-commerce.png",
    problem: "Traditional e-commerce platforms struggle with page load speed, responsiveness, and complex checkout states, leading to high cart abandonment rates and poor user satisfaction.",
    solution: "Built a fully optimized single-page e-commerce application using React and TypeScript. Implemented client-side shopping cart state management, modular component architecture, and styled it with Tailwind CSS for maximum responsiveness and high-performance loads.",
    keyFeatures: [
      "User Authentication (Login & Register)",
      "Dynamic Product Grid with Category Filtering",
      "Interactive Shopping Cart with Real-time Total Calculations",
      "Mock Checkout Flow with Form Validations",
      "Responsive Grid Layout optimized for Mobile and Desktop",
      "High Contrast UI and Smooth Transitions"
    ],
    systemArchitecture: `React Client (Vite)
      ↓
State Management (React Context)
      ↓
Tailwind CSS UI Rendering
      ↓
API Call Fallback (Mock DB / Local Storage)`,
    challenges: "Managing asynchronous state changes during cart manipulations and maintaining state persistence across page refreshes. Resolved by implementing React Context coupled with local storage serialization.",
    resultsMetrics: [
      "10+ Fully Functional Client-side Screens",
      "Under 2s Page Load Time on Mobile",
      "100% Client-side Checkout Flow Completeness",
      "Zero Dependency State Engine using native React Hooks"
    ],
    gallery: [
      "/images/e-commerce.png"
    ]
  },
  "flowsync": {
    title: "FlowSync",
    role: "Fullstack Developer",
    category: "SaaS Workflow Tool",
    timeline: "May 2024 - Aug 2024",
    status: "Completed",
    tech: ["React", "TypeScript", "Tailwind CSS", "Vite"],
    github: "https://github.com/Nizarafif/FlowSync",
    demo: "https://flow-sync-one.vercel.app/",
    image_url: "/images/Flowsync.png",
    problem: "Teams struggle to align calendar schedules with task lists, resulting in fragmented workflows, missed deadlines, and poor tracking of tasks across project management tools.",
    solution: "Developed FlowSync, an integrated workspace merging a drag-and-drop Kanban board with an interactive calendar. The application links tasks to specific dates and visualizes overall team progress with analysis charts, keeping work synchronized.",
    keyFeatures: [
      "Interactive Drag-and-Drop Kanban Board",
      "Dynamic Task Analytics and Progress Bars",
      "Custom Dashboard with Workspace Metrics",
      "Clean Glassmorphic Theme with Dark Mode Support",
      "Collaborative Workspace Mockups"
    ],
    systemArchitecture: `React & Vite Frontend
      ↓
Drag-and-Drop Handler (HTML5 DnD API)
      ↓
Tailwind CSS (Glassmorphism design tokens)
      ↓
Workspace Analytics Engine`,
    challenges: "Handling smooth transitions and drag-and-drop state syncing between the Kanban Board and the Calendar database without layout shifts or slow response times. Solved by decoupling render updates from database writes.",
    resultsMetrics: [
      "Interactive Kanban Board with drag-and-drop functionality",
      "Linked Calendar showing real-time task allocations",
      "Fully Responsive UI across Tablet, Desktop, and Mobile sizes",
      "Lightweight Bundle Size under 150KB for fast loads"
    ],
    gallery: [
      "/images/Flowsync.png"
    ]
  },
  "nexaops": {
    title: "NexaOps",
    role: "Fullstack Developer & System Architect",
    category: "IT Operations & Asset Management",
    timeline: "Aug 2026",
    status: "Completed",
    tech: ["Laravel 13", "React", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion", "Recharts"],
    github: "https://github.com/Nizarafif/nexaops",
    demo: "https://nexaops.vercel.app/",
    image_url: "/images/nexaops.png",
    problem: "Perusahaan sering menghadapi kesulitan dalam memantau siklus hidup aset IT (hardware, software, lisensi, dan perangkat jaringan), risiko kehilangan riwayat mutasi aset, serta tidak adanya peringatan dini masa garansi dan kalkulasi depresiasi otomatis.",
    solution: "Membangun NexaOps, sistem IT Asset Monitoring & Management komprehensif berbasis Clean Architecture dengan Laravel 13 REST API dan React 18 (Vite). Dilengkapi live monitoring dashboard, QR Code scanner/generator fisik, jejak audit mutasi, dan visualisasi distribusi aset.",
    keyFeatures: [
      "Real-time Telemetry & Asset Health Monitoring Dashboard",
      "Interactive Network Topology & Server Rack Visualizer",
      "Physical Barcode & QR Code Label Generator with Quick Scan",
      "Automated Warranty Expiration Alerts & Depreciation Calculator",
      "Role-Based Access Control (RBAC) & Immutable Mutation Audit Logs",
      "Dark Mode & Light Mode with Fluid Framer Motion Transitions"
    ],
    systemArchitecture: `React 18 + Vite (TypeScript & Tailwind)
      ↓
TanStack Query & Zustand State Management
      ↓
Laravel 13 REST API (Service Layer & Repository Pattern)
      ↓
PostgreSQL / MySQL + Sanitized Audit Trail Logging`,
    challenges: "Menghadirkan visualisasi topologi jaringan dan data monitoring real-time tanpa membebani performa browser serta memastikan integritas riwayat pergerakan aset. Diatasi dengan TanStack Query caching dan pagination teroptimasi.",
    resultsMetrics: [
      "100% Comprehensive Audit Trail mutasi seluruh perangkat IT",
      "Visualisasi Recharts & topology map real-time berkinerja tinggi",
      "Dukungan cetak QR Code label siap pakai untuk inventarisasi fisik",
      "Arsitektur modular Clean Architecture berbasis Service-Repository"
    ],
    gallery: [
      "/images/nexaops.png"
    ]
  },
  "nexaport": {
    title: "NexaPort",
    role: "Fullstack Developer & Lead Engineer",
    category: "Logistics & Depot Management",
    timeline: "Aug 2026",
    status: "Completed",
    tech: ["Laravel", "React", "TypeScript", "Tailwind CSS", "Vite", "PostgreSQL", "Lucide React"],
    github: "https://github.com/Nizarafif/nexaport",
    demo: "https://nexaport.vercel.app/",
    image_url: "/images/nexaport.png",
    problem: "Operasional logistik peti kemas dan depo kontainer sering menghadapi inefisiensi akibat pelacakan manual, keterlambatan informasi status kontainer in/out, dan manajemen yard yang belum terotomatisasi.",
    solution: "Mengembangkan platform Intelligent Container Logistics & Depot Platform terpadu dengan Laravel REST API (PostgreSQL immutable ledger) dan React TypeScript frontend. Dilengkapi visualisasi yard 2D/3D interaktif, pelacak kontainer publik, gate automation, dan invoice billing.",
    keyFeatures: [
      "2D/3D Interactive Container Depot Yard Map Visualizer",
      "Real-time Shipment & Container Status Tracker (In-Gate / Out-Gate)",
      "Automated Gate Operations Log & Equipment Scheduling",
      "Immutable Container Movement Ledger dengan Riwayat Logistik Lengkap",
      "Vessel Arrival/Departure Schedule Monitoring & Berthing Management",
      "Billing, Invoicing, & Automatic EDI/Export Data Integration"
    ],
    systemArchitecture: `React Frontend (Vite, TypeScript & Tailwind CSS)
      ↓
Logistics Operations Portal & Container Visualizer
      ↓
Laravel REST API Backend (Sanctum RBAC & Service Layer)
      ↓
PostgreSQL 16 Database with Immutable Movement Ledger`,
    challenges: "Merancang visualisasi denah yard kontainer multi-tier yang responsif dan interaktif serta sinkronisasi pergerakan kontainer masuk/keluar depo secara real-time. Diselesaikan dengan visualizer interaktif berbasis slot kompartemen yard.",
    resultsMetrics: [
      "Visualisasi denah depo 2D/3D dengan kapasitas ratusan kontainer",
      "Pencatatan ledger mutasi kontainer dengan akurasi 100%",
      "Portal publik cepat untuk pelacakan kontainer dan gate pass",
      "Kecepatan respon API di bawah 120ms untuk ribuan pergerakan logistik"
    ],
    gallery: [
      "/images/nexaport.png"
    ]
  },
  "resumora": {
    title: "Resumora",
    role: "Fullstack / Frontend Engineer",
    category: "AI & Productivity SaaS",
    timeline: "Aug 2026",
    status: "Completed",
    tech: ["React 19", "TypeScript", "Tailwind CSS", "Vite", "Framer Motion", "Zustand", "Zod", "Supabase"],
    github: "https://github.com/Nizarafif/resumora",
    demo: "https://resumoraa.netlify.app/",
    image_url: "/images/resumora.png",
    problem: "Pembuatan CV/Resume profesional yang lolos uji Applicant Tracking System (ATS) seringkali memakan waktu lama, sulit disesuaikan dengan deskripsi pekerjaan target, serta minim panduan penulisan poin pencapaian yang berdampak.",
    solution: "Membangun Resumora, platform AI Resume Builder modern dengan live dynamic preview editor, ATS Match Score calculator, asisten penulisan berbasis AI untuk memperkuat bullet point pekerjaan, template resume profesional multi-tema, serta ekspor PDF instan dan QR Code sharing.",
    keyFeatures: [
      "Real-time Split-Screen Resume Editor & Live Dynamic Preview",
      "ATS Match Score Analyzer & Keyword Optimization Engine",
      "AI Writing Assistant Panel untuk perbaikan tata bahasa & formulasi dampak",
      "Multi-Template System (ATS Professional, Modern, Creative, Elegant, Executive, Minimal)",
      "Instant High-Resolution PDF Export & Printable Document Rendering",
      "Supabase Cloud Sync, Public Shareable Link & QR Code Generation"
    ],
    systemArchitecture: `React 19 + Vite (TypeScript & Tailwind CSS)
      ↓
Zustand Global State + React Hook Form (Zod Validation)
      ↓
AI Provider Layer & ATS Scoring Engine
      ↓
Supabase Backend & Edge Services + Netlify Deployment`,
    challenges: "Menghadirkan performa rendering live preview resume instan tanpa delay ketikan pada form yang kompleks, serta mempertahankan tata letak layout PDF saat dicetak/diekspor. Diatasi dengan debounced state updates dan print CSS stylesheet terstandarisasi.",
    resultsMetrics: [
      "98%+ ATS Compatibility Score pada seluruh template resume bawaan",
      "Live preview sinkronisasi instan tanpa lag di bawah 16ms",
      "Fitur ekspor PDF berkualitas tinggi dan siap cetak",
      "Terdeploy secara live dan dapat diakses di resumoraa.netlify.app"
    ],
    gallery: [
      "/images/resumora.png"
    ]
  }
};
