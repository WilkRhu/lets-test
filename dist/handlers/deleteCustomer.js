"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletItemHandler = void 0;
const CustomerService_1 = require("../services/CustomerService");
const deletItemHandler = async (event) => {
    const customerId = event.pathParameters?.id;
    if (!customerId) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "O ID do cliente é obrigatório.",
            }),
        };
    }
    const response = await (0, CustomerService_1.deleteCustomerService)(customerId);
    return response;
};
exports.deletItemHandler = deletItemHandler;
