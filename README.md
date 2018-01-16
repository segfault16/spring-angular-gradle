# Angular 4 + Spring Boot + Gradle

This project aims at setting up a Spring Boot Server with Angular 4 UI that can be build by gradle.

## Set up your own

### Prerequisites

- Installed java
- Install gradle

### Step 1: Generate Spring Project

`curl https://start.spring.io/starter.tgz -d type=gradle-project -d groupId=com.segfault16 -d artifactId=spring-angular | tar -xzvf -`

Check: Run the server with `./gradlew bootRun`, should start up and shut down afterwards. We'll fix that in step 2.

### Step 2: Add Spring Dependencies

Edit build.gradle and add the following dependencies:

- compile('org.springframework.boot:spring-boot-starter-web')
- compile("org.springframework.boot:spring-boot-starter-data-rest")

Check: Run the server again. Server should start up and stay running.
