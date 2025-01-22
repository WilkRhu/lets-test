import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
} from "@aws-sdk/client-dynamodb";

const client = new DynamoDBClient({
  region: "us-east-1",
  endpoint: "http://0.0.0.0:8000",
  credentials: {
    accessKeyId: "fakeMyKeyId", // Chave fictícia
    secretAccessKey: "fakeSecretAccessKey", // Chave secreta fictícia
  },
});

export const putItem = async (tableName: string, item: any) => {
  try {
    const command = new PutItemCommand({
      TableName: tableName,
      Item: item,
    });
    await client.send(command);
    console.log(`Item inserted into ${tableName}`);
  } catch (error) {
    console.error("Error inserting item:", error);
  }
};

export const getItem = async (tableName: string, key: any) => {
  const command = new GetItemCommand({
    TableName: tableName,
    Key: key,
  });
  const result = await client.send(command);
  return result.Item;
};

export const deleteItem = async (tableName: string, key: any) => {
  const command = new DeleteItemCommand({
    TableName: tableName,
    Key: key,
  });
  await client.send(command);
};

export const updateItem = async (
  tableName: string,
  key: any,
  updateExpression: string,
  expressionValues: any
) => {
  const command = new UpdateItemCommand({
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionValues,
  });
  await client.send(command);
};
