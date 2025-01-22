"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCustomerService = exports.deleteCustomerService = exports.getItemService = exports.getAllItemService = exports.createCustomer = void 0;
const dynamoDB_1 = require("../utils/dynamoDB");
const dynamoDBConverter_1 = require("../utils/dynamoDBConverter");
const uuid_1 = require("uuid");
const createCustomer = async (customerData) => {
    const customerId = (0, uuid_1.v4)();
    const customerWithId = { ...customerData, id: customerId };
    const dynamoItem = (0, dynamoDBConverter_1.convertToDynamoFormat)(customerWithId);
    try {
        await (0, dynamoDB_1.putItem)("Customers", dynamoItem);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Customer created successfully",
                customer: customerWithId,
            }),
        };
    }
    catch (error) {
        console.error("Error creating customer:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: "Failed to create customer", error }),
        };
    }
};
exports.createCustomer = createCustomer;
const getAllItemService = async (tableName) => {
    try {
        const items = await (0, dynamoDB_1.getAllItems)(tableName);
        if (items.length === 0) {
            return {
                statusCode: 404,
                body: JSON.stringify({ message: "Nenhum item encontrado." }),
            };
        }
        return {
            statusCode: 200,
            body: items,
        };
    }
    catch (error) {
        console.error("Erro ao recuperar os itens:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Erro ao recuperar os itens",
                error: error,
            }),
        };
    }
};
exports.getAllItemService = getAllItemService;
const getItemService = async (tableName, key) => {
    try {
        const id = { id: { S: `${key}` } };
        const item = await (0, dynamoDB_1.getItem)(tableName, id);
        if (!item) {
            return { statusCode: 404, message: "Item not found" };
        }
        return { statusCode: 200, item };
    }
    catch (error) {
        console.error("Error in getItemService:", error);
        return { statusCode: 500, message: "Failed to retrieve item", error };
    }
};
exports.getItemService = getItemService;
const deleteCustomerService = async (customerId) => {
    try {
        const key = { id: { S: customerId } };
        await (0, dynamoDB_1.deleteItem)("Customers", key);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Cliente com id ${customerId} deletado com sucesso.`,
            }),
        };
    }
    catch (error) {
        console.error("Erro ao deletar o item:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Erro ao tentar deletar o cliente com id ${customerId}.`,
                error: error,
            }),
        };
    }
};
exports.deleteCustomerService = deleteCustomerService;
const updateCustomerService = async (customerId, updatedData) => {
    try {
        const key = { id: { S: `${customerId}` } };
        // Chamando a função de atualização com os dados fornecidos
        const updatedAttributes = await (0, dynamoDB_1.updateItem)("Customers", key, updatedData);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: `Cliente com id ${customerId} atualizado com sucesso.`,
                updatedAttributes,
            }),
        };
    }
    catch (error) {
        console.error('Erro ao atualizar o cliente:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: `Erro ao tentar atualizar o cliente com id ${customerId}.`,
                error: `${error}`,
            }),
        };
    }
};
exports.updateCustomerService = updateCustomerService;
