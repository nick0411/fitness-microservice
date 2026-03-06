FROM maven:3.9.9-eclipse-temurin-23 AS build
WORKDIR /build
COPY . .
RUN mvn clean package -DskipTests

FROM eclipse-temurin:23-jdk
WORKDIR /app
COPY --from=build /build/target/*.jar app.jar
ENTRYPOINT ["java","-jar","app.jar"]