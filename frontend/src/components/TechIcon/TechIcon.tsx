// components/TechIcon/TechIcon.tsx
import {
  FaReact, FaHtml5, FaJsSquare, FaJava, FaPython, FaDocker, FaNode,
  FaVuejs, FaAngular, FaAws, FaCloud, FaChartBar, FaUnity,
  FaLock, FaEthereum, FaCode, FaCss3Alt, FaSass, FaRProject, FaRobot,
  FaGitAlt
} from "react-icons/fa";

import {
  SiTypescript, SiSpring, SiKubernetes, SiFlutter, SiDjango, SiTerraform,
  SiJenkins, SiRedis, SiPostgresql, SiMysql, SiMongodb, SiExpress,
  SiFlask, SiRuby, SiSwift, SiKotlin, SiSqlite, SiMariadb,
  SiOracle, SiGooglecloud, SiAnsible, SiNumpy, SiPandas, SiTensorflow,
  SiPytorch, SiScikitlearn, SiApachehadoop, SiApachespark,
  SiKeras, SiOpencv, SiUnrealengine, SiGodotengine, SiBlender,
  SiCplusplus, SiC, SiArduino, SiKalilinux, SiWireshark, SiMetasploit,
  SiBurpsuite, SiOwasp, SiSolidity, SiWeb3Dotjs, SiSelenium, 
  SiJunit5, SiCucumber, SiAppium, SiGraphql,
  SiSpringboot, SiAssemblyscript, SiWebassembly, SiNextdotjs,
  SiApachekafka, SiNuxtdotjs, SiElasticsearch, SiLogstash, SiKibana,
  SiApollographql, SiRust, SiWebpack, SiLinux, SiGatsby, SiIos, SiAndroid,
  SiPushbullet, SiDart, SiJetpackcompose, SiThreedotjs,
  SiAwslambda, SiServerless, SiD3Dotjs, SiSocketdotio, SiStoryblok
} from "react-icons/si";

import "./TechIcon.css";

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
      // Frontend
      case "html": return <FaHtml5 className={combinedClassName} />;
      case "css": return <FaCss3Alt className={combinedClassName} />;
      case "javascript": return <FaJsSquare className={combinedClassName} />;
      case "react": return <FaReact className={combinedClassName} />;
      case "vue": return <FaVuejs className={combinedClassName} />;
      case "angular": return <FaAngular className={combinedClassName} />;
      case "typescript": return <SiTypescript className={combinedClassName} />;
      case "sass": return <FaSass className={combinedClassName} />;
      case "webassembly": return <SiWebassembly className={combinedClassName} />;
      case "next.js": return <SiNextdotjs className={combinedClassName} />;
      case "gatsby": return <SiGatsby className={combinedClassName} />;
      case "webpack": return <SiWebpack className={combinedClassName} />;
      case "nuxt": return <SiNuxtdotjs className={combinedClassName} />;
      case "d3.js": return <SiD3Dotjs className={combinedClassName} />;
      case "module.federation": return <SiWebpack className={combinedClassName} />;

      // Backend
      case "java": return <FaJava className={combinedClassName} />;
      case "spring": return <SiSpring className={combinedClassName} />;
      case "spring boot": return <SiSpringboot className={combinedClassName} />;
      case "node.js": return <FaNode className={combinedClassName} />;
      case "express": return <SiExpress className={combinedClassName} />;
      case "python": return <FaPython className={combinedClassName} />;
      case "django": return <SiDjango className={combinedClassName} />;
      case "flask": return <SiFlask className={combinedClassName} />;
      case "ruby": return <SiRuby className={combinedClassName} />;
      case "rust": return <SiRust className={combinedClassName} />;
      case "websocket": return <SiSocketdotio className={combinedClassName} />;

      // Mobile & Desktop
      case "swift": return <SiSwift className={combinedClassName} />;
      case "kotlin": return <SiKotlin className={combinedClassName} />;
      case "flutter": return <SiFlutter className={combinedClassName} />;
      case "react native": return <FaReact className={combinedClassName} />;
      case "ios": return <SiIos className={combinedClassName} />;
      case "android": return <SiAndroid className={combinedClassName} />;
      case "jetpack": return <SiJetpackcompose className={combinedClassName} />;
      case "dart": return <SiDart className={combinedClassName} />;

      // Database & Cache
      case "mysql": return <SiMysql className={combinedClassName} />;
      case "postgresql": return <SiPostgresql className={combinedClassName} />;
      case "mongodb": return <SiMongodb className={combinedClassName} />;
      case "oracle": return <SiOracle className={combinedClassName} />;
      case "sqlite": return <SiSqlite className={combinedClassName} />;
      case "redis": return <SiRedis className={combinedClassName} />;
      case "mariadb": return <SiMariadb className={combinedClassName} />;
      case "elasticsearch": return <SiElasticsearch className={combinedClassName} />;
      case "logstash": return <SiLogstash className={combinedClassName} />;
      case "kibana": return <SiKibana className={combinedClassName} />;

      // DevOps & Cloud
      case "docker": return <FaDocker className={combinedClassName} />;
      case "kubernetes": return <SiKubernetes className={combinedClassName} />;
      case "aws": return <FaAws className={combinedClassName} />;
      case "aws.lambda": return <SiAwslambda className={combinedClassName} />;
      case "azure": return <FaCloud className={combinedClassName} />;
      case "gcp": return <SiGooglecloud className={combinedClassName} />;
      case "terraform": return <SiTerraform className={combinedClassName} />;
      case "ansible": return <SiAnsible className={combinedClassName} />;
      case "jenkins": return <SiJenkins className={combinedClassName} />;
      case "git": return <FaGitAlt className={combinedClassName} />;
      case "linux": return <SiLinux className={combinedClassName} />;
      case "linux.kernel": return <SiLinux className={combinedClassName} />;
      case "kafka": return <SiApachekafka className={combinedClassName} />;
      case "cloud.computing": return <FaAws className={combinedClassName} />;
      case "serverless.framework": return <SiServerless className={combinedClassName} />;

      // Data Science & ML
      case "numpy": return <SiNumpy className={combinedClassName} />;
      case "pandas": return <SiPandas className={combinedClassName} />;
      case "tensorflow": return <SiTensorflow className={combinedClassName} />;
      case "pytorch": return <SiPytorch className={combinedClassName} />;
      case "scikit.learn": return <SiScikitlearn className={combinedClassName} />;
      case "hadoop": return <SiApachehadoop className={combinedClassName} />;
      case "spark": return <SiApachespark className={combinedClassName} />;
      case "keras": return <SiKeras className={combinedClassName} />;
      case "opencv": return <SiOpencv className={combinedClassName} />;
      case "r": return <FaRProject className={combinedClassName} />;
      case "bert": return <FaCode className={combinedClassName} />;

      // Game Development & Graphics
      case "unity": return <FaUnity className={combinedClassName} />;
      case "unreal engine": return <SiUnrealengine className={combinedClassName} />;
      case "godot": return <SiGodotengine className={combinedClassName} />;
      case "blender": return <SiBlender className={combinedClassName} />;
      case "3d.graphics": return <SiThreedotjs className={combinedClassName} />;

      // Programming Languages
      case "c": return <SiC className={combinedClassName} />;
      case "c++": return <SiCplusplus className={combinedClassName} />;
      case "c#": return <FaCode className={combinedClassName} />;
      case "assembly": return <SiAssemblyscript className={combinedClassName} />;

      // IoT & Embedded
      case "iot": return <FaRobot className={combinedClassName} />;
      case "microcontrollers": return <SiArduino className={combinedClassName} />;

      // Security
      case "kali linux": return <SiKalilinux className={combinedClassName} />;
      case "wireshark": return <SiWireshark className={combinedClassName} />;
      case "metasploit": return <SiMetasploit className={combinedClassName} />;
      case "burp suite": return <SiBurpsuite className={combinedClassName} />;
      case "owasp": return <SiOwasp className={combinedClassName} />;
      case "encryption": return <FaLock className={combinedClassName} />;

      // Blockchain
      case "solidity": return <SiSolidity className={combinedClassName} />;
      case "ethereum": return <FaEthereum className={combinedClassName} />;
      case "web3.js": return <SiWeb3Dotjs className={combinedClassName} />;

      // Testing
      case "junit": return <SiJunit5 className={combinedClassName} />;
      case "selenium": return <SiSelenium className={combinedClassName} />;
      case "cucumber": return <SiCucumber className={combinedClassName} />;
      case "appium": return <SiAppium className={combinedClassName} />;

      // API & GraphQL
      case "graphql": return <SiGraphql className={combinedClassName} />;
      case "apollo": return <SiApollographql className={combinedClassName} />;

      // Others
      case "push.notification": return <SiPushbullet className={combinedClassName} />;
      case "headless.cms": return <SiStoryblok className={combinedClassName} />;

      default:
        console.warn(`No icon found for tech: ${tech}`);
        return <FaCode className={combinedClassName} />;
    }
  };

  return getIcon(normalizedTech);
};

export default TechIcon;
