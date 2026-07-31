import { type IconType } from "react-icons";
import { 
  SiJavascript, SiTypescript, SiReact, SiNextdotjs, SiTailwindcss,
  SiNodedotjs, SiMysql, SiPhp, SiLaravel,
  SiGit, SiGithub, SiPostman, SiVuedotjs, SiPostgresql, SiFlutter, SiFirebase,
  SiDocker, SiFigma, SiVercel
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";

export const iconsMap: Record<string, IconType> = {
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
  SiGithub,
  SiPostman,
  SiVuedotjs,
  SiPostgresql,
  SiFlutter,
  SiFirebase,
  SiDocker,
  SiFigma,
  SiVercel,
  VscVscode,
};

export function getIcon(iconName: string): IconType | null {
  return iconsMap[iconName] || null;
}
