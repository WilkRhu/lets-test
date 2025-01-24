# Sumário
1. [Tecnologiad usadas](#tecnologias-usadas)  
2. [Pré-requisitos](#pre-requisitos)  
3. [Instalação](#instalacao)  
   - [Clonar o repositório](#clonaro-repositório)  
   - [Instalar dependências](#instalar-dependencias)
   - [Configuração do DynamoDB Local](#configuracao-do-dynamoDB-local)
4. [Executando a Aplicação](#executando-a-aplicação)
    - [Instalar o Docker](#instalar-o-docker)
    - [OBS](#obs)
5. [Rodar a aplicação](#rodar-a-aplicação)  
6. [Executando os testes](#executando-os-testes)
7. [Acessando a API](#acessando-a-api)
    - [Recuperar todos os itens](#recuperar-todos-os-itens)
    - [Recuperar um item específico](#recuperar-um-item-específico)
    - [Criar um novo item](#criar-um-novo-item)
    - [Atualizar um novo item](#atualizar-um-novo-item)
    - [Deletar um item](#deletar-um-item)

# Lets Test

Este projeto é uma aplicação desenvolvida para testar interações com o DynamoDB local, utilizando o Serverless Framework, Node.js, e outras tecnologias modernas.

## Tecnologias Usadas

- **Node.js** - Ambiente de execução JavaScript
- **Serverless Framework** - Ferramenta para facilitar o desenvolvimento de aplicações serverless
- **DynamoDB Local** - Instância local do DynamoDB para desenvolvimento e testes
- **Jest** - Framework de testes
- **Yarn** - Gerenciador de pacotes
- **Dotenv** - Gerenciamento de variáveis de ambiente

## Pré-requisitos

Antes de começar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org) (versão recomendada: LTS)
- [Yarn](https://yarnpkg.com) (gerenciador de pacotes)
- [AWS CLI](https://aws.amazon.com/cli/) (opcional, mas recomendado para integrar com AWS)
- [Serverless Framework](https://www.serverless.com/framework/docs/getting-started/) (Ferramenta para gerenciamento de funções serverless)

## Instalação

### 1. Clonar o repositório

```bash
git clone https://github.com/WilkRhu/lets-test
cd lets-test
```

### 2. Instalar dependências

Primeiro, instale as dependências do projeto. Se estiver usando o yarn:

```bash
yarn install
```
#### 4. Configuração do DynamoDB Local

Se você não tem um arquivo .env configurado, crie um para armazenar suas variáveis de ambiente necessárias, como credenciais do AWS, caso necessário. Exemplo de arquivo .env:

```ini
AWS_ACCESS_KEY_ID=your-access-key-id
AWS_SECRET_ACCESS_KEY=your-secret-access-key
DYNAMODB_LOCAL_PORT=8000
```

## Executando a Aplicação

### . Instalar o Docker
Caso ainda não tenha o Docker instalado, siga os seguintes passos:

Ubuntu:

```bash
sudo apt update
sudo apt install docker.io
sudo systemctl enable --now docker
sudo usermod -aG docker $USER
Mac / Windows:
```
Vá até Docker Desktop e baixe o instalador.

O projeto possui um Dockerfile e um docker-compose instalado para subir o dynamodb então só precisa rodar:

```bash
docker-compose up
```
### OBS
Existe uma lógica no projeto para criar a tabela então não precisa criar a tabela no banco

### 1. Rodar a aplicação

Após configurar o DynamoDB local, você pode rodar a aplicação com o seguinte comando:

```bash
yarn run start
```

### 2. Executando os testes

Os testes unitários e de integração são escritos usando Jest. Para rodar os testes, utilize o comando:

```bash
yarn run test
```

### 4. Acessando a API

Sua aplicação expõe endpoints via API Gateway local, e você pode interagir com a API utilizando ferramentas como Postman ou cURL. Abaixo estão exemplos de requisições para as principais rotas da sua aplicação.

#### 1. Recuperar todos os itens

Método: GET

Endpoint: /dev/customers

Descrição: Recupera todos os itens da tabela Customers.

Exemplo de requisição cURL:

```bash
curl -X GET http://localhost:3000/dev/customers
```

Exemplo de requisição no Postman:

Método: GET
URL: http://localhost:3000/dev/customers
Clique em "Send" para visualizar a resposta.
Resposta esperada (sucesso):

```json
{
  "message": "Items successfully recovered",
  "items": [
    {
      "id": "1",
      "name": "Customer 1",
      "email": "customer1@example.com"
    },
    {
      "id": "2",
      "name": "Customer 2",
      "email": "customer2@example.com"
    }
  ]
}
```

#### 2. Recuperar um item específico

Método: GET

Endpoint: /dev/customers/{id}

Descrição: Recupera um item específico da tabela Customers com base no id.

Exemplo de requisição cURL:

```bash
curl -X GET http://localhost:3000/dev/customers/1
```

Exemplo de requisição no Postman:

Método: GET
URL: http://localhost:3000/dev/customers/1
Clique em "Send" para visualizar a resposta.
Resposta esperada (sucesso):

```json
{
  "name": {
    "S": "Wilk Caetano"
  },
  "addresses": {
    "L": [
      {
        "M": {
          "zip": {
            "S": "12345"
          },
          "state": {
            "S": "State"
          },
          "city": {
            "S": "City"
          },
          "street": {
            "S": "123 Street"
          }
        }
      }
    ]
  },
  "id": {
    "S": "5c015d7e-1ea2-4cea-928b-eff61006f02e"
  },
  "isActive": {
    "BOOL": true
  },
  "birthDate": {
    "S": "1990-01-01"
  },
  "contacts": {
    "L": [
      {
        "M": {
          "phone": {
            "S": "+1234567890"
          },
          "email": {
            "S": "john@example.com"
          },
          "isPrimary": {
            "BOOL": true
          }
        }
      }
    ]
  }
}
```

#### 3. Criar um novo item

Método: POST

Endpoint: /dev/customers

Descrição: Cria um novo item na tabela Customers.

Exemplo de requisição cURL:

```bash
curl -X POST http://localhost:3000/dev/customers \
-H "Content-Type: application/json" \
-d '{
  "id": "123",
  "name": "Wilk Caetano",
  "birthDate": "1990-01-01",
  "isActive": true,
  "addresses": [
    {
      "street": "123 Street",
      "city": "City",
      "state": "State",
      "zip": "12345"
		}
  ],
  "contacts": [
    {
      "email": "john@example.com",
      "phone": "+1234567890",
      "isPrimary": true
    }
  ]
}'
```

Exemplo de requisição no Postman:

Método: POST
URL: http://localhost:3000/dev/customers
No corpo da requisição, insira o seguinte JSON:

```json
{
  "id": "123",
  "name": "Wilk Caetano",
  "birthDate": "1990-01-01",
  "isActive": true,
  "addresses": [
    {
      "street": "123 Street",
      "city": "City",
      "state": "State",
      "zip": "12345"
    }
  ],
  "contacts": [
    {
      "email": "john@example.com",
      "phone": "+1234567890",
      "isPrimary": true
    }
  ]
}
```

Clique em "Send" para enviar a requisição.

Resposta esperada (sucesso):

```json
{
  "message": "Customer created successfully",
  "customer": {
    "id": "189db210-40ec-4f64-adf9-921ea0dffc9b",
    "name": "Wilk Caetano",
    "birthDate": "1990-01-01",
    "isActive": true,
    "addresses": [
      {
        "street": "123 Street",
        "city": "City",
        "state": "State",
        "zip": "12345"
      }
    ],
    "contacts": [
      {
        "email": "john@example.com",
        "phone": "+1234567890",
        "isPrimary": true
      }
    ]
  }
}
```

#### 4.Atualizar um novo item

Método: PUT

Endpoint: /dev/customers/{id}

Descrição: Atualiza um item existente na tabela Customers.

Exemplo de requisição cURL:

```bash
curl -X PUT http://localhost:3000/dev/customers/1 \
-H "Content-Type: application/json" \
-d '{
	"name": "Wilk Caetano",
  "birthDate": "1990-01-01",
  "isActive": true,
	  "addresses": [
    {
      "street": " Loteamento Pará",
      "city": "Ferreiros",
      "state": "Pernambuco",
      "zip": "12345"
		}
  ],
	"contacts": [
    {
      "email": "wilk.caetano@gmail.com",
      "phone": "+5581993949202",
      "isPrimary": true
    }
  ]
}'
```

Exemplo de requisição no Postman:

Método: PUT
URL: http://localhost:3000/dev/customers/1
No corpo da requisição, insira o seguinte JSON:

```json
{
  "name": "Wilk Caetano",
  "birthDate": "1990-01-01",
  "isActive": true,
  "addresses": [
    {
      "street": " Loteamento Pará",
      "city": "Ferreiros",
      "state": "Pernambuco",
      "zip": "12345"
    }
  ],
  "contacts": [
    {
      "email": "wilk.caetano@gmail.com",
      "phone": "+5581993949202",
      "isPrimary": true
    }
  ]
}
```

Clique em "Send" para enviar a requisição.

Resposta esperada (sucesso):

```json
{
  "message": "Customer with id 189db210-40ec-4f64-adf9-921ea0dffc9b updated successfully.",
  "updatedAttributes": {
    "name": {
      "S": "Wilk Caetano"
    },
    "addresses": {
      "L": [
        {
          "M": {
            "zip": {
              "S": "12345"
            },
            "state": {
              "S": "Pernambuco"
            },
            "city": {
              "S": "Ferreiros"
            },
            "street": {
              "S": " Loteamento Pará"
            }
          }
        }
      ]
    },
    "id": {
      "S": "189db210-40ec-4f64-adf9-921ea0dffc9b"
    },
    "isActive": {
      "BOOL": true
    },
    "birthDate": {
      "S": "1990-01-01"
    },
    "contacts": {
      "L": [
        {
          "M": {
            "phone": {
              "S": "+5581993949202"
            },
            "email": {
              "S": "wilk.caetano@gmail.com"
            },
            "isPrimary": {
              "S": "true"
            }
          }
        }
      ]
    }
  }
}
```

#### 5. Deletar um item

Método: DELETE

Endpoint: /dev/customers/{id}

Descrição: Deleta um item específico da tabela Customers com base no id.

Exemplo de requisição cURL:

```bash
curl -X DELETE http://localhost:3000/dev/customers/1
```

Exemplo de requisição no Postman:

Método: DELETE
URL: http://localhost:3000/dev/customers/1
Clique em "Send" para enviar a requisição.
Resposta esperada (sucesso):

```json
{
  "message": "Item successfully deleted"
}
```

Detalhamento dos Endpoints
GET /dev/customers: Recupera todos os itens na tabela Customers.
GET /dev/customers/{id}: Recupera um item específico da tabela Customers com base no id.
POST /dev/customers: Cria um novo item na tabela Customers.
PUT /dev/customers/{id}: Atualiza um item existente na tabela Customers.
DELETE /dev/customers/{id}: Deleta um item da tabela Customers.
Testando a API
Você pode usar Postman ou cURL para testar todos os endpoints da sua API. Se você deseja automatizar os testes, pode utilizar bibliotecas como Jest para executar testes de integração diretamente no código.


