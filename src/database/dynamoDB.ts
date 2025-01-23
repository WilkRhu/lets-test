import {
  DynamoDBClient,
  PutItemCommand,
  GetItemCommand,
  DeleteItemCommand,
  UpdateItemCommand,
  ListTablesCommand,
  CreateTableCommand,
  ScanCommand,
} from "@aws-sdk/client-dynamodb";
import { createUpdateExpression } from "../utils/dynamoDBConverter";

const client = new DynamoDBClient({
  region: "us-east-2",
  endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
  credentials: {
    accessKeyId: "fakeMyKeyId",
    secretAccessKey: "fakeSecretAccessKey",
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

export const getAllItems = async (tableName: string) => {
  try {
    const scanCommand = new ScanCommand({
      TableName: tableName,
    });

    const data = await client.send(scanCommand);

    if (data.Items) {
      console.log("Itens encontrados:", data.Items);
      return data.Items;
    } else {
      console.log("Nenhum item encontrado na tabela.");
      return [];
    }
  } catch (error) {
    console.error("Erro ao obter itens da tabela:", error);
    return [];
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
  updateValues: any
) => {
  let updateExpression = "set";
  const expressionAttributeValues: any = {};
  const expressionAttributeNames: any = {};

  updateExpression = createUpdateExpression(
    updateValues,
    expressionAttributeNames,
    expressionAttributeValues
  );

  const command = new UpdateItemCommand({
    TableName: tableName,
    Key: key,
    UpdateExpression: updateExpression,
    ExpressionAttributeValues: expressionAttributeValues,
    ExpressionAttributeNames: expressionAttributeNames,
    ReturnValues: "ALL_NEW",
  });

  try {
    const result = await client.send(command);
    return result.Attributes;
  } catch (error) {
    console.error("Erro ao atualizar item:", error);
    throw new Error("Erro ao atualizar item");
  }
};
