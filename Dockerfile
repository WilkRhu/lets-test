# Use uma imagem base com suporte ao DynamoDB Local e apt-get
FROM openjdk:8-jdk-slim

RUN apt-get update && apt-get install -y curl unzip awscli \
    && curl -L -o dynamodb.zip https://s3.us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.zip \
    && unzip dynamodb.zip -d /dynamodb-local \
    && rm dynamodb.zip

WORKDIR /dynamodb-local
CMD ["java", "-Djava.library.path=./DynamoDBLocal_lib", "-jar", "DynamoDBLocal.jar", "-sharedDb"]

COPY dynamodb-init/create-tables.sh /docker-entrypoint-initdb.d/create-tables.sh
RUN chmod +x /docker-entrypoint-initdb.d/create-tables.sh
