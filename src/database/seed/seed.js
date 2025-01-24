const { DynamoDBClient, CreateTableCommand, ListTablesCommand } = require("@aws-sdk/client-dynamodb");

const client = new DynamoDBClient({
  region: process.env.AWS_REGION,
  endpoint: process.env.DYNAMODB_ENDPOINT,
});

const createTablesIfNotExist = async (tables) => {
  for (const table of tables) {
    const { TableName, AttributeDefinitions, KeySchema, ProvisionedThroughput } = table;

    try {
      const existingTables = await client.send(new ListTablesCommand({}));

      if (existingTables.TableNames.includes(TableName)) {
        console.log(`A tabela ${TableName} já existe.`);
        continue;
      }

      const command = new CreateTableCommand({
        TableName,
        AttributeDefinitions,
        KeySchema,
        ProvisionedThroughput,
      });

      await client.send(command);
      console.log(`Tabela ${TableName} criada com sucesso!`);
    } catch (error) {
      console.error(`Erro ao criar a tabela ${TableName}:`, error);
    }
  }
};

const runSeed = async () => {
  console.log("Iniciando a configuração das tabelas no DynamoDB Local...");
  console.log("Região:", process.env.AWS_REGION);
  console.log("Endpoint:", process.env.DYNAMODB_ENDPOINT);

  const tablesToCreate = [
    {
      TableName: "Customers",
      AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
      KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
      ProvisionedThroughput: { ReadCapacityUnits: 5, WriteCapacityUnits: 5 },
    },
  ];

  await createTablesIfNotExist(tablesToCreate);
  console.log("Configuração das tabelas concluída!");
};

runSeed().catch((error) => {
  console.error("Erro ao configurar as tabelas:", error);
});
