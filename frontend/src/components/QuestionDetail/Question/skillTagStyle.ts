const skillStyles: {
  [key: string]: { backgroundColor: string; skillName: string };
} = {
  react: { backgroundColor: "#61DAFB", skillName: "React" },
  html: { backgroundColor: "#E44D26", skillName: "HTML" },
  css: { backgroundColor: "#264DE4", skillName: "CSS" },
  javascript: { backgroundColor: "#F7DF1E", skillName: "JavaScript" },
  typescript: { backgroundColor: "#3178C6", skillName: "TypeScript" },
  vue: { backgroundColor: "#42B883", skillName: "Vue.js" },
  angular: { backgroundColor: "#DD0031", skillName: "Angular" },
  sass: { backgroundColor: "#CC6699", skillName: "Sass" },
  webassembly: { backgroundColor: "#654FF0", skillName: "WebAssembly" },
  "next.js": { backgroundColor: "#000000", skillName: "Next.js" },

  // Backend
  java: { backgroundColor: "#007396", skillName: "Java" },
  spring: { backgroundColor: "#6DB33F", skillName: "Spring" },
  "spring boot": { backgroundColor: "#6DB33F", skillName: "Spring Boot" },
  "node.js": { backgroundColor: "#339933", skillName: "Node.js" },
  express: { backgroundColor: "#000000", skillName: "Express" },
  python: { backgroundColor: "#3776AB", skillName: "Python" },
  django: { backgroundColor: "#092E20", skillName: "Django" },
  flask: { backgroundColor: "#000000", skillName: "Flask" },
  ruby: { backgroundColor: "#CC342D", skillName: "Ruby" },

  // Mobile
  swift: { backgroundColor: "#F05138", skillName: "Swift" },
  kotlin: { backgroundColor: "#7F52FF", skillName: "Kotlin" },
  flutter: { backgroundColor: "#02569B", skillName: "Flutter" },
  "react native": { backgroundColor: "#61DAFB", skillName: "React Native" },
  "objective-c": { backgroundColor: "#438EFF", skillName: "Objective-C" },

  // Database
  mysql: { backgroundColor: "#4479A1", skillName: "MySQL" },
  postgresql: { backgroundColor: "#336791", skillName: "PostgreSQL" },
  mongodb: { backgroundColor: "#47A248", skillName: "MongoDB" },
  oracle: { backgroundColor: "#F80000", skillName: "Oracle" },
  sqlite: { backgroundColor: "#003B57", skillName: "SQLite" },
  redis: { backgroundColor: "#DC382D", skillName: "Redis" },
  mariadb: { backgroundColor: "#003545", skillName: "MariaDB" },

  // DevOps
  docker: { backgroundColor: "#2496ED", skillName: "Docker" },
  kubernetes: { backgroundColor: "#326CE5", skillName: "Kubernetes" },
  aws: { backgroundColor: "#FF9900", skillName: "AWS" },
  azure: { backgroundColor: "#0089D6", skillName: "Azure" },
  gcp: { backgroundColor: "#4285F4", skillName: "GCP" },
  terraform: { backgroundColor: "#623CE4", skillName: "Terraform" },
  ansible: { backgroundColor: "#EE0000", skillName: "Ansible" },
  jenkins: { backgroundColor: "#D24939", skillName: "Jenkins" },

  // Data Science & Machine Learning
  numpy: { backgroundColor: "#013243", skillName: "NumPy" },
  pandas: { backgroundColor: "#150458", skillName: "Pandas" },
  tensorflow: { backgroundColor: "#FF6F00", skillName: "TensorFlow" },
  pytorch: { backgroundColor: "#EE4C2C", skillName: "PyTorch" },
  matplotlib: { backgroundColor: "#3776AB", skillName: "Matplotlib" },
  "scikit-learn": { backgroundColor: "#F7931E", skillName: "Scikit-learn" },
  hadoop: { backgroundColor: "#66CCFF", skillName: "Hadoop" },
  spark: { backgroundColor: "#E25A1C", skillName: "Apache Spark" },
  keras: { backgroundColor: "#D00000", skillName: "Keras" },
  opencv: { backgroundColor: "#5C3EE8", skillName: "OpenCV" },
  nltk: { backgroundColor: "#3776AB", skillName: "NLTK" },
  mllib: { backgroundColor: "#E25A1C", skillName: "MLlib" },
  r: { backgroundColor: "#276DC3", skillName: "R" },

  // Game Development
  unity: { backgroundColor: "#000000", skillName: "Unity" },
  "unreal engine": { backgroundColor: "#0E1128", skillName: "Unreal Engine" },
  "c#": { backgroundColor: "#178600", skillName: "C#" },
  "c++": { backgroundColor: "#00599C", skillName: "C++" },
  godot: { backgroundColor: "#478CBF", skillName: "Godot" },
  blender: { backgroundColor: "#F5792A", skillName: "Blender" },

  // Embedded
  c: { backgroundColor: "#A8B9CC", skillName: "C" },
  assembly: { backgroundColor: "#6E4C13", skillName: "Assembly" },
  microcontrollers: { backgroundColor: "#00979D", skillName: "Microcontrollers" },
  rtos: { backgroundColor: "#F05340", skillName: "RTOS" },
  iot: { backgroundColor: "#F05340", skillName: "IoT" },

  // Cyber Security
  "kali linux": { backgroundColor: "#268BFF", skillName: "Kali Linux" },
  wireshark: { backgroundColor: "#1679A7", skillName: "Wireshark" },
  metasploit: { backgroundColor: "#003B57", skillName: "Metasploit" },
  "burp suite": { backgroundColor: "#FF5733", skillName: "Burp Suite" },
  nmap: { backgroundColor: "#268BFF", skillName: "Nmap" },
  owasp: { backgroundColor: "#000000", skillName: "OWASP" },
  encryption: { backgroundColor: "#000000", skillName: "Encryption" },

  // Blockchain
  solidity: { backgroundColor: "#363636", skillName: "Solidity" },
  ethereum: { backgroundColor: "#3C3C3D", skillName: "Ethereum" },
  hyperledger: { backgroundColor: "#2F3134", skillName: "Hyperledger" },
  "web3.js": { backgroundColor: "#F16822", skillName: "Web3.js" },
  truffle: { backgroundColor: "#5C2D91", skillName: "Truffle" },
  ganache: { backgroundColor: "#654321", skillName: "Ganache" },

  // Testing
  junit: { backgroundColor: "#25A162", skillName: "JUnit" },
  selenium: { backgroundColor: "#43B02A", skillName: "Selenium" },
  cucumber: { backgroundColor: "#23D96E", skillName: "Cucumber" },
  testng: { backgroundColor: "#D06B35", skillName: "TestNG" },
  appium: { backgroundColor: "#6800B4", skillName: "Appium" },

  // Additional
  graphql: { backgroundColor: "#E10098", skillName: "GraphQL" }
};


// 기본 값 정의
const defaultSkillStyle = {
  backgroundColor: "#B0B0B0",  // 회색
  skillName: "Unknown",
};

// 함수로 스타일 가져오기
const getSkillStyle = (key: string) => {
  return skillStyles[key] || defaultSkillStyle;
};

export default getSkillStyle;