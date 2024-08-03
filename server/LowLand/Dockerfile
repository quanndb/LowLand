# Stage 1: Build
FROM ubuntu:latest AS build

# Install dependencies
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    curl \
    && apt-get clean

# Install Gradle
RUN curl -s "https://get.sdkman.io" | bash
RUN bash -c "source $HOME/.sdkman/bin/sdkman-init.sh && sdk install gradle"

# Set the working directory
WORKDIR /app

# Copy the source code
COPY . .

# Ensure gradlew has execute permissions
RUN chmod +x ./gradlew

# Build the application
RUN ./gradlew bootJar --no-daemon

# Stage 2: Run
FROM openjdk:17-jdk-slim

# Set the working directory
WORKDIR /app

# Expose the application port
EXPOSE 2818

# Copy the built jar from the build stage
COPY --from=build /app/build/libs/LowLand-1.jar app.jar

# Set the entry point to run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]