# syntax=docker/dockerfile:1

FROM node:20-alpine AS frontend
WORKDIR /ui
COPY frontend/package.json frontend/package-lock.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

FROM eclipse-temurin:17-jdk AS backend
WORKDIR /app
COPY gradlew settings.gradle build.gradle ./
COPY gradle ./gradle
RUN sed -i 's/\r$//' gradlew && chmod +x gradlew
COPY src ./src
COPY --from=frontend /ui/dist ./src/main/resources/static
RUN ./gradlew bootJar -x test --no-daemon

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=backend /app/build/libs/*.jar app.jar
EXPOSE 8081
# Render free instances are ~512MB. 75% heap + Metaspace caused OOM (exit 137).
ENV JAVA_OPTS="-XX:+UseContainerSupport -Xms64m -Xmx192m -XX:MaxMetaspaceSize=96m -Xss256k -XX:+UseSerialGC -XX:TieredStopAtLevel=1"
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar app.jar"]
