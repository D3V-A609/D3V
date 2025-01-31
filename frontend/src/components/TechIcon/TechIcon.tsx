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
  }
  
  const TechIcon: React.FC<TechIconProps> = ({ tech }) => {
    // null/undefined 체크
    if (!tech) {
      console.warn("Tech prop is undefined");
      return null;
    }
  
    // 기술명 정규화
    const normalizedTech = tech.trim().toLowerCase();
  
    // 디버깅을 위한 로그
    console.log("Processing tech:", normalizedTech);
  
    const getIcon = (tech: string) => {
      switch (tech) {
        // 프론트엔드
        case "react":
          return <FaReact className="tech-icon react" />;
        case "vue":
          return <FaVuejs className="tech-icon vue" />;
        case "angular":
          return <FaAngular className="tech-icon angular" />;
        case "typescript":
          return <SiTypescript className="tech-icon typescript" />;
        case "javascript":
          return <FaJsSquare className="tech-icon javascript" />;
        case "html":
          return <FaHtml5 className="tech-icon html" />;
        case "nuxt":
          return <SiNuxtdotjs className="tech-icon nuxt" />;
  
        // 백엔드
        case "java":
          return <FaJava className="tech-icon java" />;
        case "spring":
          return <SiSpring className="tech-icon spring" />;
        case "python":
          return <FaPython className="tech-icon python" />;
        case "django":
          return <SiDjango className="tech-icon django" />;
        case "node.js":
          return <FaNode className="tech-icon nodejs" />;
        case "kotlin":
          return <SiKotlin className="tech-icon kotlin" />;
  
        // 모바일
        case "flutter":
          return <SiFlutter className="tech-icon flutter" />;
        case "ios":
          return <FaApple className="tech-icon ios" />;
        case "android":
          return <SiAndroid className="tech-icon android" />;
        case "jetpack":
          return <SiAndroidstudio className="tech-icon jetpack" />;
        case "dart":
          return <SiDart className="tech-icon dart" />;
        case "react native":
          return <FaReact className="tech-icon react-native" />;
        case "push notifications":
          return <FaBell className="tech-icon push-notifications" />;
  
        // DevOps
        case "docker":
          return <FaDocker className="tech-icon docker" />;
        case "kubernetes":
          return <SiKubernetes className="tech-icon kubernetes" />;
        case "aws":
          return <FaAws className="tech-icon aws" />;
        case "azure":
          return <FaCloud className="tech-icon azure" />;
        case "jenkins":
          return <SiJenkins className="tech-icon jenkins" />;
        case "terraform":
          return <SiTerraform className="tech-icon terraform" />;
        case "git":
          return <FaGitAlt className="tech-icon git" />;
        case "cloud computing":
          return <SiCloudflare className="tech-icon cloud-computing" />;
  
        // 데이터베이스 & 데이터 기술
        case "redis":
          return <SiRedis className="tech-icon redis" />;
        case "postgresql":
          return <SiPostgresql className="tech-icon postgresql" />;
        case "mysql":
          return <SiMysql className="tech-icon mysql" />;
        case "mongodb":
          return <SiMongodb className="tech-icon mongodb" />;
        case "elasticsearch":
          return <SiElasticsearch className="tech-icon elasticsearch" />;
        case "logstash":
          return <SiLogstash className="tech-icon logstash" />;
        case "kibana":
          return <SiKibana className="tech-icon kibana" />;
        case "kafka":
          return <FaDatabase className="tech-icon kafka" />;
  
        // 데이터 사이언스
        case "tensorflow":
          return <SiTensorflow className="tech-icon tensorflow" />;
        case "pandas":
          return <SiPandas className="tech-icon pandas" />;
        case "r":
          return <FaChartBar className="tech-icon r" />;
        case "spark":
          return <SiApachespark className="tech-icon spark" />;
        case "scikit-learn":
          return <SiScikitlearn className="tech-icon scikit-learn" />;
  
        // SQL은 PostgreSQL 아이콘으로 대체
        case "sql":
          return <SiPostgresql className="tech-icon sql" />;
  
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
  