"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItem = exports.deleteItem = exports.getItem = exports.putItem = void 0;
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const client = new client_dynamodb_1.DynamoDBClient({
    region: "us-east-1",
    endpoint: process.env.DYNAMODB_ENDPOINT || "http://dynamodb-local:8000",
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
const updateItem = async (tableName, key, updateExpression, expressionValues) => {
    const command = new client_dynamodb_1.UpdateItemCommand({
        TableName: tableName,
        Key: key,
        UpdateExpression: updateExpression,
        ExpressionAttributeValues: expressionValues,
    });
    await client.send(command);
};
exports.updateItem = updateItem;
