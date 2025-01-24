"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// src/test/unit/handlers/deleteCustomer.test.ts
const customerService_1 = require("../../../services/customerService");
const database_1 = require("../../mocks/database");
const common_1 = require("../../utils/common");
describe("deleteCustomerService", () => {
    it("should handle customer not found (404)", async () => {
        const customerId = (0, common_1.generateCustomerId)();
        // Simula que o cliente não foi encontrado
        database_1.mockGetItem.mockResolvedValueOnce(null);
        const response = await (0, customerService_1.deleteCustomerService)(customerId);
        expect(response.statusCode).toBe(404);
        expect(JSON.parse(response.body).message).toBe(`Customer with id ${customerId} not found.`);
    });
});
