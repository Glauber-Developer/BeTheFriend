# Use a imagem base do Maven com JDK 17 para construir o projeto
FROM maven:3.8.4-openjdk-17 AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

# Use a imagem base do OpenJDK 17 para rodar o projeto
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/bethefriend-0.0.1-SNAPSHOT.jar bethefriend.jar
COPY src/main/resources/application.properties /app/application.properties
EXPOSE 8081
ENTRYPOINT ["java", "-jar", "bethefriend.jar"]