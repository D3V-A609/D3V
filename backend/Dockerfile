# 1️⃣ 빌드 단계 (Gradle을 사용하는 경우)
FROM openjdk:17-jdk AS build
WORKDIR /app
COPY . .
RUN ./gradlew build --no-daemon

# 2️⃣ 실행 단계 (더 가벼운 JRE 사용)
FROM openjdk:17-jdk-slim
WORKDIR /app

# curl 설치 (HEALTHCHECK 사용을 위해)
RUN apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*

# 환경 변수 설정 (예: 메모리 최적화 옵션 추가)
ENV JAVA_OPTS="-Xms256m -Xmx512m"

# 빌드된 JAR 파일을 복사
COPY --from=build /app/build/libs/backend-0.0.1-SNAPSHOT.jar app.jar

# 스프링 부트 기본 포트 설정
EXPOSE 8080

# 컨테이너 상태 체크 (예제: 8080 포트 확인)
HEALTHCHECK --interval=30s --timeout=10s --start-period=10s \
  CMD curl -f http://localhost:8080/actuator/health || exit 1

# 애플리케이션 실행 (JAVA_OPTS 포함)
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
