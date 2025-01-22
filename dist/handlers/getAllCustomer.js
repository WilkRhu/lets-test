"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllHandler = void 0;
const CustomerService_1 = require("../services/CustomerService");
const getAllHandler = async (event, context) => {
    try {
        const tableName = "Customers";
        const items = await (0, CustomerService_1.getAllItemService)(tableName);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Itens recuperados com sucesso",
                items: items,
            }),
        };
    }
    catch (error) {
        console.error("Erro ao recuperar itens:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({
                message: "Erro ao recuperar itens",
                error: error,
            }),
        };
    }
};
exports.getAllHandler = getAllHandler;
