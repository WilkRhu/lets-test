"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.getItem = exports.getAllItems = exports.putItem = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dynamoDBConverter_1 = require("../utils/dynamoDBConverter");
const formatDynamoValue = (value) => {
    if (typeof value === "string")
        return { S: value };
    if (typeof value === "boolean")
        return { BOOL: value };
    if (typeof value === "number")
        return { N: value.toString() };
    if (Array.isArray(value))
        return { L: value.map((v) => ({ S: v })) };
    if (typeof value === "object")
        return { M: value };
    return null;
};
const client = new client_dynamodb_1.DynamoDBClient({
    region: "us-east-2",
    endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
    credentials: {
        accessKeyId: "fakeMyKeyId",
        secretAccessKey: "fakeSecretAccessKey",
    },
});
const testConnection = async () => {
    try {
        const data = await client.send(new client_dynamodb_1.ListTablesCommand({}));
        console.log("Conectado ao DynamoDB Local com sucesso! Tabelas:", data.TableNames);
    }
    catch (error) {
        console.error("Erro ao conectar com o DynamoDB Local:", error);
    }
};
const createTableIfNotExist = async (tableName) => {
    try {
        const listTablesCommand = new client_dynamodb_1.ListTablesCommand({});
        const data = await client.send(listTablesCommand);
        // Verificar se a tabela já existe
        if (data.TableNames && data.TableNames.includes(tableName)) {
            console.log(`A tabela "${tableName}" já existe.`);
            return;
        }
        const createTableCommand = new client_dynamodb_1.CreateTableCommand({
            TableName: tableName,
            KeySchema: [{ AttributeName: "id", KeyType: "HASH" }],
            AttributeDefinitions: [{ AttributeName: "id", AttributeType: "S" }],
            ProvisionedThroughput: {
                ReadCapacityUnits: 5,
                WriteCapacityUnits: 5,
            },
        });
        await client.send(createTableCommand);
        console.log(`Tabela "${tableName}" criada com sucesso.`);
    }
    catch (error) {
        console.error(`Erro ao criar a tabela "${tableName}":`, error);
    }
};
const createTablesIfNotExist = async (tableNames) => {
    for (const tableName of tableNames) {
        await createTableIfNotExist(tableName);
    }
};
const tablesToCreate = ["Customers"];
testConnection();
createTablesIfNotExist(tablesToCreate);
const putItem = async (tableName, item) => {
    try {
        const command = new client_dynamodb_1.PutItemCommand({
            TableName: tableName,
            Item: item,
        });
        await client.send(command);
        console.log(`Item inserted into ${tableName}`);
    }
    catch (error) {
        console.error("Error inserting item:", error);
    }
};
exports.putItem = putItem;
const getAllItems = async (tableName) => {
    try {
        const scanCommand = new client_dynamodb_1.ScanCommand({
            TableName: tableName,
        });
        const data = await client.send(scanCommand);
        if (data.Items) {
            console.log("Itens encontrados:", data.Items);
            return data.Items;
        }
        else {
            console.log("Nenhum item encontrado na tabela.");
            return [];
        }
    }
    catch (error) {
        console.error("Erro ao obter itens da tabela:", error);
        return [];
    }
};
exports.getAllItems = getAllItems;
const getItem = async (tableName, key) => {
    const command = new client_dynamodb_1.GetItemCommand({
        TableName: tableName,
        Key: key,
    });
    const result = await client.send(command);
    return result.Item;
};
exports.getItem = getItem;
const deleteItem = async (tableName, key) => {
    const command = new client_dynamodb_1.DeleteItemCommand({
        TableName: tableName,
        Key: key,
    });
    await client.send(command);
};
exports.deleteItem = deleteItem;
const updateItem = async (tableName, key, updateValues) => {
    let updateExpression = "set";
    const expressionAttributeValues = {};
    const expressionAttributeNames = {};
    updateExpression = (0, dynamoDBConverter_1.createUpdateExpression)(updateValues, expressionAttributeNames, expressionAttributeValues);
    const command = new client_dynamodb_1.UpdateItemCommand({
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
    }
    catch (error) {
        console.error("Erro ao atualizar item:", error);
        throw new Error("Erro ao atualizar item");
    }
};
exports.updateItem = updateItem;
