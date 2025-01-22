"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCustomerHandler = void 0;
const CustomerService_1 = require("../services/CustomerService");
const getCustomerHandler = async (event) => {
    const customerId = event.pathParameters.id; // Obtém o ID da URL (por exemplo, /customer/{id})
    try {
        const response = await (0, CustomerService_1.getItemService)("Customers", { id: customerId });
        return {
            statusCode: response.statusCode,
            body: response.item,
        };
    }
    catch (error) {
        console.error("Error in getCustomerHandler:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Internal Server Error",
                error: error,
            }),
        };
    }
};
exports.getCustomerHandler = getCustomerHandler;
