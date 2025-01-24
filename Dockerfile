# Use uma imagem base com suporte ao DynamoDB Local
FROM openjdk:8-jdk-slim

# Instale as dependências necessárias
RUN apt-get update && apt-get install -y curl unzip awscli \
    && curl -L -o dynamodb.zip https://s3.us-west-2.amazonaws.com/dynamodb-local/dynamodb_local_latest.zip \
    && unzip dynamodb.zip -d /dynamodb-local \
    && rm dynamodb.zip

# Defina o diretório de trabalho
WORKDIR /dynamodb-local

# Copie o script para dentro do contêiner
COPY dynamodb-init/create-tables.sh /dynamodb-local/create-tables.sh

# Dê permissão para executar o script
RUN chmod +x /dynamodb-local/create-tables.sh

# Inicia o DynamoDB Local e cria as tabelas
CMD ["sh", "-c", "java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb & sleep 5 && ./create-tables.sh"]
