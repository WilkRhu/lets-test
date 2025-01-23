"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.getItem = exports.getAllItems = exports.putItem = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const dynamoDBConverter_1 = require("../utils/dynamoDBConverter");
const client = new client_dynamodb_1.DynamoDBClient({
    region: "us-east-2",
    endpoint: process.env.DYNAMODB_ENDPOINT || "http://localhost:8000",
    credentials: {
        accessKeyId: "fakeMyKeyId",
        secretAccessKey: "fakeSecretAccessKey",
    },
});
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
