package com.ssafy.d3v.backend.question.entity;

import java.util.Arrays;
import java.util.List;

public enum DevelopmentRole {
    FRONTEND(Arrays.asList(SkillType.HTML, SkillType.CSS, SkillType.JAVASCRIPT, SkillType.REACT, SkillType.VUE, SkillType.ANGULAR, SkillType.TYPESCRIPT, SkillType.SASS)),
    BACKEND(Arrays.asList(SkillType.JAVA, SkillType.SPRING, SkillType.SPRING_BOOT, SkillType.NODE_JS, SkillType.EXPRESS, SkillType.PYTHON, SkillType.DJANGO, SkillType.FLASK, SkillType.RUBY)),
    MOBILE(Arrays.asList(SkillType.SWIFT, SkillType.KOTLIN, SkillType.JAVA, SkillType.FLUTTER, SkillType.REACT_NATIVE, SkillType.OBJECTIVE_C)),
    DATABASE(Arrays.asList(SkillType.MYSQL, SkillType.POSTGRESQL, SkillType.MONGODB, SkillType.ORACLE, SkillType.SQLITE, SkillType.REDIS, SkillType.MARIADB)),
    DEVOPS(Arrays.asList(SkillType.DOCKER, SkillType.KUBERNETES, SkillType.AWS, SkillType.AZURE, SkillType.GCP, SkillType.TERRAFORM, SkillType.ANSIBLE, SkillType.JENKINS)),
    DATA_SCIENCE(Arrays.asList(SkillType.PYTHON, SkillType.R, SkillType.NUMPY, SkillType.PANDAS, SkillType.TENSORFLOW, SkillType.PYTORCH, SkillType.MATPLOTLIB, SkillType.SCIKIT_LEARN, SkillType.HADOOP, SkillType.SPARK)),
    MACHINE_LEARNING(Arrays.asList(SkillType.PYTHON, SkillType.TENSORFLOW, SkillType.PYTORCH, SkillType.SCIKIT_LEARN, SkillType.KERAS, SkillType.MLLIB, SkillType.OPENCV, SkillType.NLTK)),
    GAME_DEVELOPMENT(Arrays.asList(SkillType.UNITY, SkillType.UNREAL_ENGINE, SkillType.C_SHARP, SkillType.C_PLUS, SkillType.GODOT, SkillType.BLENDER)),
    EMBEDDED(Arrays.asList(SkillType.C, SkillType.C_PLUS, SkillType.ASSEMBLY, SkillType.MICROCONTROLLERS, SkillType.RTOS, SkillType.IOT)),
    CYBER_SECURITY(Arrays.asList(SkillType.KALI_LINUX, SkillType.WIRESHARK, SkillType.METASPLOIT, SkillType.BURP_SUITE, SkillType.NMAP, SkillType.OWASP, SkillType.ENCRYPTION)),
    BLOCKCHAIN(Arrays.asList(
            SkillType.SOLIDITY, SkillType.ETHEREUM, SkillType.HYPERLEDGER, SkillType.WEB3_JS, SkillType.TRUFFLE, SkillType.GANACHE)),
    TESTING(Arrays.asList(SkillType.JUNIT, SkillType.SELENIUM, SkillType.CUCUMBER, SkillType.TESTNG, SkillType.APPIUM)),
    FULLSTACK(Arrays.asList(SkillType.REACT, SkillType.NODE_JS, SkillType.SPRING_BOOT, SkillType.DJANGO, SkillType.MYSQL, SkillType.MONGODB, SkillType.TYPESCRIPT, SkillType.GRAPHQL));

    private final List<SkillType> techStack;

    DevelopmentRole(List<SkillType> techStack) {
        this.techStack = techStack;
    }

    public List<SkillType> getTechStack() {
        return techStack;
    }
}
