FROM node:12.13.1

# Dependencies for 'pdf2html' package
# Install OpenJDK-8
RUN apt-get update && \
    apt-get install -y openjdk-8-jdk && \
    apt-get install -y ant && \
    apt-get clean;

# Fix certificate issues
RUN apt-get update && \
    apt-get install ca-certificates-java && \
    apt-get clean && \
    update-ca-certificates -f;

# Setup JAVA_HOME -- useful for docker commandline
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/
RUN export JAVA_HOME

# Dependencies for 'node-poppler' package
RUN apt-get update && \
    apt-get install -y poppler-data && \
    apt-get install -y poppler-utils && \
    apt-get clean;

# Dependencies for Converter app
RUN npm install -g nodemon

WORKDIR /app
