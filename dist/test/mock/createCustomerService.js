"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = void 0;
exports.createCustomer = jest.fn().mockResolvedValue({
    id: 'mock-id',
    name: 'John Doe',
    birthDate: '1990-01-01',
    isActive: true,
    addresses: [{ street: 'Street 1', city: 'City 1' }],
    contacts: [{ phone: '+1234567890', email: 'email@example.com' }],
    createdAt: '2022-10-01T00:00:00Z',
});
