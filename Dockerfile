FROM adoptopenjdk/openjdk8:alpine-jre

WORKDIR /app

COPY build/libs/spring-angular-0.0.1-SNAPSHOT.jar app.jar

ENTRYPOINT [ "java" ,"-jar", "/app/app.jar" ]