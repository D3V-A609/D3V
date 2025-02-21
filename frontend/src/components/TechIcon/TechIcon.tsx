// components/TechIcon/TechIcon.tsx
import {
  FaReact, FaJava, FaPython, FaDocker, FaNode, 
  FaAws, FaCode, FaDatabase, FaServer, FaLock, FaNetworkWired, FaGlobe
} from "react-icons/fa";

import {
  SiTypescript, SiSpring, SiKubernetes, SiJenkins, 
  SiRedis, SiPostgresql, SiMysql, SiMongodb, 
  SiSqlite, SiTensorflow, SiPytorch, SiLinux,
  SiRedux, SiGithubactions, SiUnity, SiUnrealengine,
  SiNginx, SiVirtualbox, SiSwift, SiKotlin,
  SiGraphql, SiApachekafka, SiElasticsearch, SiKibana,
  SiLogstash, SiAnsible, SiCplusplus,
  SiGitlab, SiVuedotjs, SiNodedotjs, SiC, SiBlockchaindotcom
} from "react-icons/si";

import { 
  SiAndroid, SiOpengl, SiLinuxcontainers, 
  SiNginxproxymanager
} from "react-icons/si";

import { MdArchitecture, MdAutoMode } from "react-icons/md";

import { TbBrandCSharp } from "react-icons/tb";

import { BiNetworkChart, BiMemoryCard, BiData, BiTestTube, BiGitBranch } from "react-icons/bi";

import { GrStorage, GrVirtualMachine, GrOptimize, GrSecure } from "react-icons/gr";

import { AiOutlineCloud, AiOutlineContainer, AiOutlineDeploymentUnit, AiOutlineNodeIndex } from "react-icons/ai";

import { VscSymbolMethod } from "react-icons/vsc"; 

import { BsGearFill } from "react-icons/bs";

import './TechIcon.css'

interface TechIconProps {
  tech: string;
  className?: string;
}

const TechIcon: React.FC<TechIconProps> = ({ tech, className }) => {
  if (!tech) {
    console.warn("Tech prop is undefined");
    return null;
  }

  const normalizedTech = tech.trim().toLowerCase().replace(/[_-]/g, '.');
  const baseClass = `tech-icon ${normalizedTech}`;
  const combinedClassName = `${baseClass} ${className || ""}`.trim();

  const getIcon = (tech: string) => {
    switch (tech) {
      // Programming Languages
      case "c": return <SiC className={combinedClassName} />;
      case "c.plus": return <SiCplusplus className={combinedClassName} />;
      case "c.sharp": return <TbBrandCSharp className={combinedClassName} />;
      case "python": return <FaPython className={combinedClassName} />;
      case "java": return <FaJava className={combinedClassName} />;
      case "javascript": return <SiNodedotjs className={combinedClassName} />;
      case "swift": return <SiSwift className={combinedClassName} />;
      case "kotlin": return <SiKotlin className={combinedClassName} />;
      case "typescript": return <SiTypescript className={combinedClassName} />;

      // Web Development
      case "web": return <FaGlobe className={combinedClassName} />;
      case "react": return <FaReact className={combinedClassName} />;
      case "vue": return <SiVuedotjs className={combinedClassName} />;
      case "node.js": return <FaNode className={combinedClassName} />;
      case "redux": return <SiRedux className={combinedClassName} />;
      case "graphql": return <SiGraphql className={combinedClassName} />;

      // Backend & Frameworks
      case "spring": return <SiSpring className={combinedClassName} />;
      case "reverse.proxy": return <SiNginxproxymanager className={combinedClassName} />;
      case "reactive.programming": return <GrOptimize className={combinedClassName} />;

      // DevOps & Infrastructure
      case "containerization": return <AiOutlineContainer className={combinedClassName} />;
      case "ci.cd": return <SiGithubactions className={combinedClassName} />;
      case "docker": return <FaDocker className={combinedClassName} />;
      case "kubernetes": return <SiKubernetes className={combinedClassName} />;
      case "jenkins": return <SiJenkins className={combinedClassName} />;
      case "nginx": return <SiNginx className={combinedClassName} />;
      case "gitlab.ci": return <SiGitlab className={combinedClassName} />;
      case "kafka": return <SiApachekafka className={combinedClassName} />;
      case "autoscaling": return <MdAutoMode className={combinedClassName} />;
      case "load.balancing": return <AiOutlineNodeIndex className={combinedClassName} />;

      // Databases
      case "sqlite": return <SiSqlite className={combinedClassName} />;
      case "database": return <FaDatabase className={combinedClassName} />;
      case "postgresql": return <SiPostgresql className={combinedClassName} />;
      case "mysql": return <SiMysql className={combinedClassName} />;
      case "mongodb": return <SiMongodb className={combinedClassName} />;
      case "redis": return <SiRedis className={combinedClassName} />;

      // Cloud & Virtualization
      case "aws": return <FaAws className={combinedClassName} />;
      case "virtualization": return <SiVirtualbox className={combinedClassName} />;
      case "container.orchestration": return <AiOutlineDeploymentUnit className={combinedClassName} />;
      case "cloud": return <AiOutlineCloud className={combinedClassName} />;

      // Game & Graphics
      case "unity": return <SiUnity className={combinedClassName} />;
      case "unreal.engine": return <SiUnrealengine className={combinedClassName} />;
      case "graphics.programming": return <SiOpengl className={combinedClassName} />;

      // System & Architecture
      case "virtual.memory": return <BiMemoryCard className={combinedClassName} />;
      case "memory.management": return <GrStorage className={combinedClassName} />;
      case "operating.system": return <SiLinux className={combinedClassName} />;
      case "computer.architecture": return <GrVirtualMachine className={combinedClassName} />;
      case "server": return <FaServer className={combinedClassName} />;
      case "linux.kernel": return <SiLinuxcontainers className={combinedClassName} />;
      case "multithreading": return <BiGitBranch className={combinedClassName} />;

      // AI & Data
      case "data.structure": return <BiData className={combinedClassName} />;
      case "data.processing": return <BiData className={combinedClassName} />;
      case "statistical.learning": return <SiTensorflow className={combinedClassName} />;
      case "machine.learning": return <SiPytorch className={combinedClassName} />;
      case "deep.learning": return <SiTensorflow className={combinedClassName} />;
      case "model.evaluation": return <SiTensorflow className={combinedClassName} />;

      // Blockchain
      case "blockchain": return <SiBlockchaindotcom className={combinedClassName} />;

      // Network & Security
      case "network": return <FaNetworkWired className={combinedClassName} />;
      case "network.security": return <GrSecure className={combinedClassName} />;
      case "security": return <FaLock className={combinedClassName} />;
      case "tcp": return <BiNetworkChart className={combinedClassName} />;

      // Testing & Optimization
      case "testing": return <BiTestTube className={combinedClassName} />;
      case "performance.optimization": return <GrOptimize className={combinedClassName} />;
      case "rendering.optimization": return <GrOptimize className={combinedClassName} />;

      // Monitoring & Logging
      case "kibana": return <SiKibana className={combinedClassName} />;
      case "logstash": return <SiLogstash className={combinedClassName} />;
      case "elasticsearch": return <SiElasticsearch className={combinedClassName} />;

      // Software Design & Patterns
      case "algorithm": return <VscSymbolMethod className={combinedClassName} />;
      case "object.oriented.design": return <MdArchitecture className={combinedClassName} />;
      case "design.pattern": return <MdArchitecture className={combinedClassName} />;
      case "configuration.management": return <SiAnsible className={combinedClassName} />;
      case "software.engineering": return <BsGearFill className={combinedClassName} />;

      // Mobile Development
      case "jetpack": return <SiAndroid className={combinedClassName} />;

      default:
        return <FaCode className={combinedClassName} />;
    }
  };


  return getIcon(normalizedTech);
};

export default TechIcon;
