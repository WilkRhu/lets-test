"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CustomerService_1 = require("../../../services/CustomerService");
const dynamoDB_1 = require("../../../database/dynamoDB"); // Importando o mock do repositório
jest.mock("../../../utils/dynamoDB", () => ({
    deleteItem: jest.fn(),
}));
describe("deleteCustomerService", () => {
    const customerId = "mock-customer-id";
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it("should delete the customer successfully and return 200", async () => {
        dynamoDB_1.deleteItem.mockResolvedValueOnce(undefined);
        const result = await (0, CustomerService_1.deleteCustomerService)(customerId);
        expect(dynamoDB_1.deleteItem).toHaveBeenCalledWith("Customers", { id: { S: customerId } });
        expect(result).toEqual({
            statusCode: 200,
            body: JSON.stringify({
                message: `Cliente com id ${customerId} deletado com sucesso.`,
            }),
        });
    });
    it("should return 500 if deleteItem fails", async () => {
        dynamoDB_1.deleteItem.mockRejectedValueOnce(new Error("DynamoDB error"));
        const result = await (0, CustomerService_1.deleteCustomerService)(customerId);
        expect(result).toEqual({
            statusCode: 500,
            body: JSON.stringify({
                message: `Erro ao tentar deletar o cliente com id ${customerId}.`,
                error: {},
            }),
        });
    });
});
