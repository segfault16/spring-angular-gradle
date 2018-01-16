# Angular 4 + Spring Boot + Gradle

This project aims at setting up a Spring Boot Server with Angular 4 UI that can be build by gradle.

## Getting started

To run the final server, build the jar:

```
./gradlew bootRepackage
```

and run the server:

```
java -jar build/libs/spring-angular-0.0.1-SNAPSHOT.jar
```

Navigate to `http://localhost:8080` to see the Angular Start Page with a custom Welcome message from the REST API.

## Development

When developing either the Spring Boot Server for the REST API or the Angular UI, the servers can be started and developed independently. For example:

```
Start the Spring Boot Server on http://localhost:8080
./gradlew bootRun
```

```
Start the Angular webpack development server on http://localhost:4200 with redirect to the REST API
./gradlew npm_start
```

## Set up your own

### Prerequisites

- Installed java

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

### Step 4: Create new Angular project

In the frontend directory, execute `ng new frontend --skip-git --directory .` to create a new angular project. 
I assume you have installed angular/cli on your local machine.

Check: Run `ng serve` or `npm start` and inspect the Angular UI on `http://localhost:4200`

Another Check: Run the `npm start` via gradle: `./gradlew npm_start`

### Step 5: Integrate Angular into Spring

In order to build the frontend project from the directory of the Spring project and to include the developed Angular UI into the Spring Server, add a `settings.gradle` into the root folder with the following content:

```
include 'frontend'
```

and add the following lines to `build.gradle` in the root folder:

```
...
jar {
	baseName = 'spring-angular'
	version = '0.0.1-SNAPSHOT'
	from('frontend/dist') {
		into 'public'
	}
}

processResources.dependsOn('frontend:build')
...
```

Check: Run `./gradlew tasks` in the root folder to check that the Node Tasks are available

Check: Repackage the entire server `./gradlew bootRepackage` and execute `java -jar build/libs/spring-angular-0.0.1-SNAPSHOT.jar`. You should now see the Angular UI on `http://localhost:8080`.

### Step 6: Add REST-Controller and Angular proxy configuration

Now we can add some REST-Controller to our Spring Boot Server, e.g.:

```
package com.segfault16.springangular.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("api/welcome")
public class WelcomeController {

    @RequestMapping(method = RequestMethod.GET)
    public @ResponseBody String getWelcome() {
        return "Welcome to Spring Boot Server!";
    }
}

```

Check: `http://localhost:8080/api/welcome` should return `Welcome to Spring Boot Server!`

Now create a service and consume the API in Angular, e.g.:

```
import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class WelcomeService{
    constructor(private http: HttpClient) {

    }

    public getWelcomeMessage() : Observable<string> {
        return this.http.get('/api/welcome', {responseType: 'text'});
    }
}
```

Check: Repackage the entire server `./gradlew bootRepackage` and execute `java -jar build/libs/spring-angular-0.0.1-SNAPSHOT.jar`. You should now see the Angular UI on `http://localhost:8080` with the welcome message provided by the API.

For local development in Angular, we can add a proxy configuration `proxy.conf.json` to redirect to the Spring Boot Server:

```
{
  "/api": {
    "target": "http://localhost:8080/api",
    "changeOrigin": true,
    "secure": false,
    "pathRewrite": {
      "^/api": ""
    },
    "logLevel": "debug"
  }
}
```

and set this proxy configuration as default when starting the Angular UI via `npm start`:

```
...
"start": "ng serve --proxy-config proxy.conf.json",
...
```

Now all requests to `/api/*` of the Angular UI running on `http://localhost:4200` are redirected to the Spring Boot Server running on `http://localhost:8080`.
