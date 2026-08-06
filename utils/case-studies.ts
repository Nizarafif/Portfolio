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
  }
};
