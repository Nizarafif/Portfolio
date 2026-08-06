import { notFound } from "next/navigation";
import { type Metadata } from "next";
import { createClient } from "@/utils/supabase/server";
import { caseStudiesMap, type CaseStudyData } from "@/utils/case-studies";
import CaseStudyClient from "@/components/CaseStudyClient";

interface PageProps {
  params: Promise<{ id: string }>;
}

// Generate dynamic SEO metadata for each project page
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  
  let projectTitle = "Project Case Study";
  let projectDesc = "Detailed case study of the project.";

  // Check static first
  const staticData = caseStudiesMap[id.toLowerCase()];
  if (staticData) {
    projectTitle = `${staticData.title} | Case Study`;
    projectDesc = staticData.problem;
  } else {
    // Check Supabase
    try {
      const supabase = await createClient();
      const { data: dbProject } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();
      
      if (dbProject) {
        projectTitle = `${dbProject.title} | Case Study`;
        projectDesc = dbProject.problem;
      }
    } catch {
      // Ignored, fallback to defaults
    }
  }

  return {
    title: `${projectTitle} | Nizar Nur Afif Portfolio`,
    description: projectDesc,
    openGraph: {
      title: `${projectTitle} | Nizar Nur Afif Portfolio`,
      description: projectDesc,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${projectTitle} | Nizar Nur Afif Portfolio`,
      description: projectDesc,
    }
  };
}

export default async function ProjectCaseStudyPage({ params }: PageProps) {
  const { id } = await params;
  
  // 1. Resolve via static map key first (e.g. "e-commerce" or "flowsync")
  let caseStudy: CaseStudyData | null = caseStudiesMap[id.toLowerCase()] || null;

  // 2. If not matched, try querying database from Supabase
  if (!caseStudy) {
    try {
      const supabase = await createClient();
      const { data: dbProject } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .single();

      if (dbProject) {
        // Double check if database title matches static data
        const titleLower = dbProject.title.toLowerCase();
        if (titleLower.includes("commerce")) {
          caseStudy = caseStudiesMap["e-commerce"];
        } else if (titleLower.includes("flowsync")) {
          caseStudy = caseStudiesMap["flowsync"];
        } else {
          // If a new project without dedicated static study, map dynamically
          caseStudy = {
            title: dbProject.title,
            role: dbProject.role,
            category: "Web Development",
            timeline: "Dynamic Timeline",
            status: "Completed",
            tech: dbProject.tech || [],
            github: dbProject.github,
            demo: dbProject.demo || undefined,
            image_url: dbProject.image_url || undefined,
            problem: dbProject.problem,
            solution: dbProject.solution,
            keyFeatures: [
              "Designed modular database integrations",
              "Implemented responsive UI features",
              "Applied proper state flows and caching patterns"
            ],
            systemArchitecture: `${dbProject.title} Stack\n      ↓\nClient-Server Interactions\n      ↓\nDatabase Serialization`,
            challenges: "Optimizing code execution and ensuring scalable data synchronization flows across layers.",
            resultsMetrics: [
              dbProject.result || "Achieved 100% functionality compliance"
            ],
            gallery: dbProject.image_url ? [dbProject.image_url] : []
          };
        }
      }
    } catch {
      // Ignored, check fallback
    }
  }

  // 3. If still not resolved, check fallback local mock data just in case connection failed but ID is a key
  if (!caseStudy) {
    return notFound();
  }

  return <CaseStudyClient data={caseStudy} />;
}
