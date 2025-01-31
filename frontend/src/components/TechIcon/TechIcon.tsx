// components/TechIcon/TechIcon.tsx
import {
    FaReact,
    FaHtml5,
    FaJsSquare,
    FaJava,
    FaPython,
    FaDocker,
    FaNode,
    FaVuejs,
    FaAngular,
    FaAws,
    FaApple,
    FaGitAlt,
    FaDatabase,
    FaCloud,
    FaChartBar,
    FaBell,
  } from "react-icons/fa";
  import {
    SiTypescript,
    SiSpring,
    SiKubernetes,
    SiFlutter,
    SiDjango,
    SiTerraform,
    SiJenkins,
    SiRedis,
    SiPostgresql,
    SiMysql,
    SiElasticsearch,
    SiAndroid,
    SiTensorflow,
    SiPandas,
    SiApachespark,
    SiMongodb,
    SiScikitlearn,
    SiKotlin,
    SiAndroidstudio,
    SiNuxtdotjs,
    SiLogstash,
    SiKibana,
    SiDart,
    SiCloudflare,
  } from "react-icons/si";
  import "./TechIcon.css";
  
  interface TechIconProps {
    tech: string;
    className?: string
  }
  
  const TechIcon: React.FC<TechIconProps> = ({ tech, className }) => {
    // null/undefined 체크
    if (!tech) {
      console.warn("Tech prop is undefined");
      return null;
    }
  
    // 기술명 정규화
    const normalizedTech = tech.trim().toLowerCase();
  
    // 디버깅을 위한 로그
    //console.log("Processing tech:", normalizedTech);
  
    const getIcon = (tech: string) => {
      const baseClass = `tech-icon ${tech}`;

      switch (tech) {
        // 프론트엔드
        case "react":
          return <FaReact className={`${baseClass} ${className || ""}`.trim()} />;
        case "vue":
          return <FaVuejs className={`${baseClass} ${className || ""}`.trim()} />;
        case "angular":
          return <FaAngular className={`${baseClass} ${className || ""}`.trim()} />;
        case "typescript":
          return <SiTypescript className={`${baseClass} ${className || ""}`.trim()} />;
        case "javascript":
          return <FaJsSquare className={`${baseClass} ${className || ""}`.trim()} />;
        case "html":
          return <FaHtml5 className={`${baseClass} ${className || ""}`.trim()} />;
        case "nuxt":
          return <SiNuxtdotjs className={`${baseClass} ${className || ""}`.trim()} />;
  
        // 백엔드
        case "java":
          return <FaJava className={`${baseClass} ${className || ""}`.trim()} />;
        case "spring":
          return <SiSpring className={`${baseClass} ${className || ""}`.trim()} />;
        case "python":
          return <FaPython className={`${baseClass} ${className || ""}`.trim()} />;
        case "django":
          return <SiDjango className={`${baseClass} ${className || ""}`.trim()} />;
        case "node.js":
          return <FaNode className={`tech-icon nodejs ${className || ""}`.trim()} />;
        case "kotlin":
          return <SiKotlin className={`${baseClass} ${className || ""}`.trim()} />;
  
        // 모바일
        case "flutter":
          return <SiFlutter className={`${baseClass} ${className || ""}`.trim()} />;
        case "ios":
          return <FaApple className={`${baseClass} ${className || ""}`.trim()} />;
        case "android":
          return <SiAndroid className={`${baseClass} ${className || ""}`.trim()} />;
        case "jetpack":
          return <SiAndroidstudio className={`${baseClass} ${className || ""}`.trim()} />;
        case "dart":
          return <SiDart className={`${baseClass} ${className || ""}`.trim()} />;
        case "react native":
          return <FaReact className={`tech-icon react-native ${className || ""}`.trim()} />;
        case "push notifications":
          return <FaBell className={`tech-icon push-notifications ${className || ""}`.trim()} />;
  
        // DevOps
        case "docker":
          return <FaDocker className={`${baseClass} ${className || ""}`.trim()} />;
        case "kubernetes":
          return <SiKubernetes className={`${baseClass} ${className || ""}`.trim()} />;
        case "aws":
          return <FaAws className={`${baseClass} ${className || ""}`.trim()} />;
        case "azure":
          return <FaCloud className={`${baseClass} ${className || ""}`.trim()} />;
        case "jenkins":
          return <SiJenkins className={`${baseClass} ${className || ""}`.trim()} />;
        case "terraform":
          return <SiTerraform className={`${baseClass} ${className || ""}`.trim()} />;
        case "git":
          return <FaGitAlt className={`${baseClass} ${className || ""}`.trim()} />;
        case "cloud computing":
          return <SiCloudflare className={`tech-icon cloud-computing ${className || ""}`.trim()} />;
  
        // 데이터베이스 & 데이터 기술
        case "redis":
          return <SiRedis className={`${baseClass} ${className || ""}`.trim()} />;
        case "postgresql":
          return <SiPostgresql className={`${baseClass} ${className || ""}`.trim()} />;
        case "mysql":
          return <SiMysql className={`${baseClass} ${className || ""}`.trim()} />;
        case "mongodb":
          return <SiMongodb className={`${baseClass} ${className || ""}`.trim()} />;
        case "elasticsearch":
          return <SiElasticsearch className={`${baseClass} ${className || ""}`.trim()} />;
        case "logstash":
          return <SiLogstash className={`${baseClass} ${className || ""}`.trim()} />;
        case "kibana":
          return <SiKibana className={`${baseClass} ${className || ""}`.trim()} />;
        case "kafka":
          return <FaDatabase className={`${baseClass} ${className || ""}`.trim()} />;
  
        // 데이터 사이언스
        case "tensorflow":
          return <SiTensorflow className={`${baseClass} ${className || ""}`.trim()} />;
        case "pandas":
          return <SiPandas className={`${baseClass} ${className || ""}`.trim()} />;
        case "r":
          return <FaChartBar className={`${baseClass} ${className || ""}`.trim()} />;
        case "spark":
          return <SiApachespark className={`${baseClass} ${className || ""}`.trim()} />;
        case "scikit-learn":
          return <SiScikitlearn className={`${baseClass} ${className || ""}`.trim()} />;
  
        // SQL은 PostgreSQL 아이콘으로 대체
        case "sql":
          return <SiPostgresql className={`${baseClass} ${className || ""}`.trim()} />;
  
        default:
          console.warn(`No icon found for tech: ${tech}`);
          return null;
      }
    };
  
    const icon = getIcon(normalizedTech);
    if (!icon) {
      console.warn(`No icon found for tech: ${tech}`);
    }
    return icon;
  };
  
  export default TechIcon;
  