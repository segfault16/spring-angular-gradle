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

### Step 3: Add gradle project for Angular

Create a folder for the frontend project, e.g. `frontend`.
Inside that folder, add a `build.gradle` and `settings.gradle` file with the following content:

*build.gradle*

```
plugins {
  id "com.moowork.node" version "1.2.0"
}

apply plugin: 'com.moowork.node'
 
version '0.0.1'
 

node {
    version = '8.9.0'
    npmVersion = '5.5.1'
    download = true
    workDir = file("${project.buildDir}/node")
    nodeModulesDir = file("${project.projectDir}")
}
 
task build(type: NpmTask) {
  args = ['run', 'build']
}
 
build.dependsOn(npm_install)
```

*settings.gradle* (no content)

```

```

Copy `gradlew`, `gradlew.bat` and `gradle` folder from parent folder: `cp -r ../gradle* .`

Check: Run `./gradlew npm_version` to inspect the version information of npm provided by the gradle node plugin.