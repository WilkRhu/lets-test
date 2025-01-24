"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletItemHandler = void 0;
const customerService_1 = require("../services/customerService");
const deletItemHandler = async (event) => {
    const customerId = event.pathParameters?.id;
    if (!customerId) {
        return {
            statusCode: 400,
            body: JSON.stringify({
                message: "Customer ID is required.",
            }),
        };
    }
    const response = await (0, customerService_1.deleteCustomerService)(customerId);
    return response;
};
exports.deletItemHandler = deletItemHandler;
