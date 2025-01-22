# Escolher a imagem base com Node.js
FROM node:20

# Definir o diretório de trabalho dentro do contêiner
WORKDIR /usr/src/app

# Copiar os arquivos de código da sua aplicação para dentro do contêiner
COPY package*.json ./

# Instalar as dependências da aplicação
RUN npm install

# Copiar o código restante da aplicação
COPY . .

# Expor a porta 3000 (ou qualquer outra porta que sua aplicação use)
EXPOSE 3000

# Rodar a aplicação
CMD ["npx", "serverless", "offline", "start"]
