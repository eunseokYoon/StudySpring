# Multi-stage build
FROM gradle:8.5-jdk17 AS build

# 작업 디렉토리 설정
WORKDIR /app

# gradle 파일들 복사
COPY build.gradle settings.gradle ./
COPY gradle gradle/

# 소스 코드 복사
COPY src src/

# 애플리케이션 빌드
RUN gradle build -x test --no-daemon

# Runtime stage
FROM eclipse-temurin:17-jre

# 작업 디렉토리 설정
WORKDIR /app

# 빌드된 jar 파일 복사
COPY --from=build /app/build/libs/*.jar app.jar

# 포트 노출
EXPOSE 8080

# 애플리케이션 실행
ENTRYPOINT ["java", "-jar", "app.jar"]