FROM openjdk:11
ADD target/infrastock-0.0.1-SNAPSHOT.jar .
EXPOSE 9090
CMD java -jar infrastock-0.0.1-SNAPSHOT.jar