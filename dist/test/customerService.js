"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dynamoDB_1 = require("../../src/utils/dynamoDB");
const CustomerService_1 = require("../services/CustomerService");
jest.mock('../../src/utils/dynamoDB', () => ({
    putItem: jest.fn(),
}));
describe('customerService', () => {
    it('should create a customer and return the success response', async () => {
        const customer = {
            id: "123",
            name: 'John Doe',
            birthDate: '1990-01-01',
            isActive: true,
            addresses: [
                { street: '123 Street', city: 'City', state: 'State', zip: '12345' },
            ],
            contacts: [
                { email: 'john.doe@example.com', phone: '+1234567890', isPrimary: true },
            ],
        };
        // Mockando a resposta do putItem
        dynamoDB_1.putItem.mockResolvedValueOnce(undefined);
        const result = await (0, CustomerService_1.createCustomer)(customer);
        expect(result.statusCode).toBe(200);
        expect(JSON.parse(result.body).message).toBe('Customer created successfully');
    });
    it('should return an error when the customer creation fails', async () => {
        const customer = {
            id: "123",
            name: 'John Doe',
            birthDate: '1990-01-01',
            isActive: true,
            addresses: [
                { street: '123 Street', city: 'City', state: 'State', zip: '12345' },
            ],
            contacts: [
                { email: 'john.doe@example.com', phone: '+1234567890', isPrimary: true },
            ],
        };
        // Mockando a falha no putItem
        dynamoDB_1.putItem.mockRejectedValueOnce(new Error('DynamoDB error'));
        const result = await (0, CustomerService_1.createCustomer)(customer);
        expect(result.statusCode).toBe(500);
        expect(JSON.parse(result.body).message).toBe('Failed to create customer');
    });
});
