// components/TechIcon/TechIcon.tsx
import {
  FaReact, FaHtml5, FaJsSquare, FaJava, FaPython, FaDocker, FaNode,
  FaVuejs, FaAngular, FaAws, FaCloud, FaChartBar, FaUnity,
  FaLock, FaEthereum, FaCode, FaCss3Alt, FaSass, FaRProject, FaRobot
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
  SiJunit5, SiCucumber, SiTestinglibrary, SiAppium, SiGraphql,
  SiSpringboot, SiAssemblyscript, SiEthereum
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

  const normalizedTech = tech.trim().toLowerCase();

  const getIcon = (tech: string) => {
    const baseClass = `tech-icon ${tech}`;

    switch (tech) {
      // Frontend
      case "html": return <FaHtml5 className={`${baseClass} ${className || ""}`.trim()} />;
      case "css": return <FaCss3Alt className={`${baseClass} ${className || ""}`.trim()} />;
      case "javascript": return <FaJsSquare className={`${baseClass} ${className || ""}`.trim()} />;
      case "react": return <FaReact className={`${baseClass} ${className || ""}`.trim()} />;
      case "vue": return <FaVuejs className={`${baseClass} ${className || ""}`.trim()} />;
      case "angular": return <FaAngular className={`${baseClass} ${className || ""}`.trim()} />;
      case "typescript": return <SiTypescript className={`${baseClass} ${className || ""}`.trim()} />;
      case "sass": return <FaSass className={`${baseClass} ${className || ""}`.trim()} />;

      // Backend
      case "java": return <FaJava className={`${baseClass} ${className || ""}`.trim()} />;
      case "spring": return <SiSpring className={`${baseClass} ${className || ""}`.trim()} />;
      case "spring boot": return <SiSpringboot className={`${baseClass} ${className || ""}`.trim()} />;
      case "node.js": return <FaNode className={`${baseClass} ${className || ""}`.trim()} />;
      case "express": return <SiExpress className={`${baseClass} ${className || ""}`.trim()} />;
      case "python": return <FaPython className={`${baseClass} ${className || ""}`.trim()} />;
      case "django": return <SiDjango className={`${baseClass} ${className || ""}`.trim()} />;
      case "flask": return <SiFlask className={`${baseClass} ${className || ""}`.trim()} />;
      case "ruby": return <SiRuby className={`${baseClass} ${className || ""}`.trim()} />;

      // Mobile
      case "swift": return <SiSwift className={`${baseClass} ${className || ""}`.trim()} />;
      case "kotlin": return <SiKotlin className={`${baseClass} ${className || ""}`.trim()} />;
      case "flutter": return <SiFlutter className={`${baseClass} ${className || ""}`.trim()} />;
      case "react native": return <FaReact className={`${baseClass} ${className || ""}`.trim()} />;
      case "objective-c": return <FaCode className={`${baseClass} ${className || ""}`.trim()} />;

      // Database
      case "mysql": return <SiMysql className={`${baseClass} ${className || ""}`.trim()} />;
      case "postgresql": return <SiPostgresql className={`${baseClass} ${className || ""}`.trim()} />;
      case "mongodb": return <SiMongodb className={`${baseClass} ${className || ""}`.trim()} />;
      case "oracle": return <SiOracle className={`${baseClass} ${className || ""}`.trim()} />;
      case "sqlite": return <SiSqlite className={`${baseClass} ${className || ""}`.trim()} />;
      case "redis": return <SiRedis className={`${baseClass} ${className || ""}`.trim()} />;
      case "mariadb": return <SiMariadb className={`${baseClass} ${className || ""}`.trim()} />;

      // DevOps
      case "docker": return <FaDocker className={`${baseClass} ${className || ""}`.trim()} />;
      case "kubernetes": return <SiKubernetes className={`${baseClass} ${className || ""}`.trim()} />;
      case "aws": return <FaAws className={`${baseClass} ${className || ""}`.trim()} />;
      case "azure": return <FaCloud className={`${baseClass} ${className || ""}`.trim()} />;
      case "gcp": return <SiGooglecloud className={`${baseClass} ${className || ""}`.trim()} />;
      case "terraform": return <SiTerraform className={`${baseClass} ${className || ""}`.trim()} />;
      case "ansible": return <SiAnsible className={`${baseClass} ${className || ""}`.trim()} />;
      case "jenkins": return <SiJenkins className={`${baseClass} ${className || ""}`.trim()} />;

      // Data Science & Machine Learning
      case "numpy": return <SiNumpy className={`${baseClass} ${className || ""}`.trim()} />;
      case "pandas": return <SiPandas className={`${baseClass} ${className || ""}`.trim()} />;
      case "tensorflow": return <SiTensorflow className={`${baseClass} ${className || ""}`.trim()} />;
      case "pytorch": return <SiPytorch className={`${baseClass} ${className || ""}`.trim()} />;
      case "matplotlib": return <FaPython className={`${baseClass} ${className || ""}`.trim()} />;
      case "scikit-learn": return <SiScikitlearn className={`${baseClass} ${className || ""}`.trim()} />;
      case "hadoop": return <SiApachehadoop className={`${baseClass} ${className || ""}`.trim()} />;
      case "spark": return <SiApachespark className={`${baseClass} ${className || ""}`.trim()} />;
      case "keras": return <SiKeras className={`${baseClass} ${className || ""}`.trim()} />;
      case "opencv": return <SiOpencv className={`${baseClass} ${className || ""}`.trim()} />;
      case "nltk": return <FaPython className={`${baseClass} ${className || ""}`.trim()} />;
      case "mllib": return <FaChartBar className={`${baseClass} ${className || ""}`.trim()} />;
      case "r": return <FaRProject className={`${baseClass} ${className || ""}`.trim()} />;

      // Game Development
      case "unity": return <FaUnity className={`${baseClass} ${className || ""}`.trim()} />;
      case "unreal engine": return <SiUnrealengine className={`${baseClass} ${className || ""}`.trim()} />;
      case "c#": return <FaCode className={`${baseClass} ${className || ""}`.trim()} />;
      case "c++": return <SiCplusplus className={`${baseClass} ${className || ""}`.trim()} />;
      case "godot": return <SiGodotengine className={`${baseClass} ${className || ""}`.trim()} />;
      case "blender": return <SiBlender className={`${baseClass} ${className || ""}`.trim()} />;

      // Embedded
      case "c": return <SiC className={`${baseClass} ${className || ""}`.trim()} />;
      case "assembly": return <SiAssemblyscript className={`${baseClass} ${className || ""}`.trim()} />;
      case "microcontrollers": return <SiArduino className={`${baseClass} ${className || ""}`.trim()} />;
      case "rtos": return <FaRobot className={`${baseClass} ${className || ""}`.trim()} />;
      case "iot": return <FaRobot className={`${baseClass} ${className || ""}`.trim()} />;

      // Cyber Security
      case "kali linux": return <SiKalilinux className={`${baseClass} ${className || ""}`.trim()} />;
      case "wireshark": return <SiWireshark className={`${baseClass} ${className || ""}`.trim()} />;
      case "metasploit": return <SiMetasploit className={`${baseClass} ${className || ""}`.trim()} />;
      case "burp suite": return <SiBurpsuite className={`${baseClass} ${className || ""}`.trim()} />;
      case "nmap": return <SiKalilinux className={`${baseClass} ${className || ""}`.trim()} />;
      case "owasp": return <SiOwasp className={`${baseClass} ${className || ""}`.trim()} />;
      case "encryption": return <FaLock className={`${baseClass} ${className || ""}`.trim()} />;

      // Blockchain
      case "solidity": return <SiSolidity className={`${baseClass} ${className || ""}`.trim()} />;
      case "ethereum": return <FaEthereum className={`${baseClass} ${className || ""}`.trim()} />;
      case "hyperledger": return <SiEthereum className={`${baseClass} ${className || ""}`.trim()} />;
      case "web3.js": return <SiWeb3Dotjs className={`${baseClass} ${className || ""}`.trim()} />;
      case "truffle": return <SiEthereum className={`${baseClass} ${className || ""}`.trim()} />;
      case "ganache": return <SiEthereum className={`${baseClass} ${className || ""}`.trim()} />;

      // Testing
      case "junit": return <SiJunit5 className={`${baseClass} ${className || ""}`.trim()} />;
      case "selenium": return <SiSelenium className={`${baseClass} ${className || ""}`.trim()} />;
      case "cucumber": return <SiCucumber className={`${baseClass} ${className || ""}`.trim()} />;
      case "testng": return <SiTestinglibrary className={`${baseClass} ${className || ""}`.trim()} />;
      case "appium": return <SiAppium className={`${baseClass} ${className || ""}`.trim()} />;

      // Additional
      case "graphql": return <SiGraphql className={`${baseClass} ${className || ""}`.trim()} />;

      default:
        console.warn(`No icon found for tech: ${tech}`);
        return <FaCode className={`${baseClass} ${className || ""}`.trim()} />;
    }
  };

  return getIcon(normalizedTech);
};

export default TechIcon;