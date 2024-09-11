# Stage 1: Build
FROM gradle:7.5-jdk17 AS build  

# Set the working directory
WORKDIR /app

# Copy the source code
COPY . .

# Build the application
RUN gradle bootJar --no-daemon

# Stage 2: Run
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Expose the application port
EXPOSE 2818

# Copy the built jar from the build stage
COPY --from=build /app/build/libs/*.jar app.jar

# Set the entry point to run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]
