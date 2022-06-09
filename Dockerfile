FROM openjdk:11
ADD target/InfraStock-0.0.1-SNAPSHOT.jar .
EXPOSE 8000
CMD java -jar InfraStock-0.0.1-SNAPSHOT.jar