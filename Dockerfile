# Build stage
FROM maven AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package

# Final stage
FROM builder
WORKDIR /app
COPY --from=builder app/target/my-fridge-0.0.1-SNAPSHOT.jar ./app.jar
EXPOSE 8080
CMD ["java", "-jar", "app.jar"]
