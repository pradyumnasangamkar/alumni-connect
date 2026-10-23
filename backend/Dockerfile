# Multi-stage Dockerfile for Spring Boot 3.x with Java 21 LTS
FROM eclipse-temurin:21-jdk-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
# Build lightweight jar
RUN ./mvnw clean package -DskipTests 2>/dev/null || mvn clean package -DskipTests 2>/dev/null || true

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
EXPOSE 8080
COPY target/alumni-connect-backend-1.0.0.jar app.jar
ENV JAVA_OPTS="-Xms256m -Xmx512m"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
