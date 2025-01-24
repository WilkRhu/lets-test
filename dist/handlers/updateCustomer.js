"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemHandler = void 0;
const customerService_1 = require("../services/customerService");
const updateItemHandler = async (event) => {
    const customerId = event.pathParameters?.id;
    const updatedData = JSON.parse(event.body);
    if (!customerId) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "O ID do cliente é obrigatório.",
            }),
        };
    }
    if (!updatedData || Object.keys(updatedData).length === 0) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "No update data provided.",
            }),
        };
    }
    const response = await (0, customerService_1.updateCustomerService)(customerId, updatedData);
    return response;
};
exports.updateItemHandler = updateItemHandler;
