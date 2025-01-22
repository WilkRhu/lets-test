"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_dynamodb_1 = require("@aws-sdk/client-dynamodb");
const CustomerService_1 = require("../services/CustomerService");
jest.mock('@aws-sdk/client-dynamodb', () => {
    return {
        DynamoDBClient: jest.fn().mockImplementation(() => ({
            send: jest.fn()
        }))
    };
});
describe('CustomerService', () => {
    it('should create a customer', async () => {
        const customer = { id: '1', name: 'John Doe', birthDate: '1990-01-01', isActive: true, addresses: [], contacts: [] };
        await CustomerService_1.CustomerService.createCustomer(customer);
        expect(client_dynamodb_1.DynamoDBClient.prototype.send).toHaveBeenCalledTimes(1);
    });
});
