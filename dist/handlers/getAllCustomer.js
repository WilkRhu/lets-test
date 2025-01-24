"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHandler = void 0;
const customerService_1 = require("../services/customerService");
const getAllHandler = async (event, context) => {
    try {
        const tableName = "Customers";
        const { statusCode, body } = await (0, customerService_1.getAllItemService)(tableName);
        if (statusCode === 200) {
            return {
                statusCode: 200,
                body: JSON.stringify({
                    message: "Items successfully recovered",
                    items: body,
                }),
            };
        }
        return {
            statusCode: statusCode,
            body: JSON.stringify({
                message: body.message,
            }),
        };
    }
    catch (error) {
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Error retrieving items",
                error: error,
            }),
        };
    }
};
exports.getAllHandler = getAllHandler;
