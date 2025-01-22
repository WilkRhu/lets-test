"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateItemHandler = void 0;
const CustomerService_1 = require("../services/CustomerService");
const updateItemHandler = async (event) => {
    const customerId = event.pathParameters?.id;
    const updatedData = JSON.parse(event.body); // Verifica se o body é JSON
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
                message: "Nenhum dado para atualização fornecido.",
            }),
        };
    }
    const response = await (0, CustomerService_1.updateCustomerService)(customerId, updatedData);
    return response;
};
exports.updateItemHandler = updateItemHandler;
