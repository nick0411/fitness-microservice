ARG JAVA_VERSION=23
FROM maven:3.9.9-eclipse-temurin-${JAVA_VERSION} AS build
WORKDIR /app
COPY . .
ARG SERVICE
WORKDIR /app/${SERVICE}
RUN mvn clean package -DskipTests

FROM eclipse-temurin:${JAVA_VERSION}-jre-alpine
WORKDIR /app
ARG SERVICE
COPY --from=build /app/${SERVICE}/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "app.jar"]