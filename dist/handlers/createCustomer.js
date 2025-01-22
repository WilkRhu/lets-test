"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomer = void 0;
const dynamoDB_1 = require("../utils/dynamoDB");
const uuid_1 = require("uuid");
const createCustomer = async (event) => {
    const body = JSON.parse(event.body);
    const customerId = (0, uuid_1.v4)();
    const item = {
        id: { S: customerId },
        name: { S: body.name },
        birthDate: { S: body.birthDate },
        isActive: { BOOL: body.isActive },
        addresses: {
            L: body.addresses.map((address) => ({
                M: {
                    street: { S: address.street },
                    city: { S: address.city },
                    state: { S: address.state },
                    zip: { S: address.zip }
                }
            }))
        },
        contacts: {
            L: body.contacts.map((contact) => ({
                M: {
                    email: { S: contact.email },
                    phone: { S: contact.phone },
                    isPrimary: { BOOL: contact.isPrimary }
                }
            }))
        },
    };
    try {
        await (0, dynamoDB_1.putItem)('Customers', item);
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: 'Customer created successfully',
                customer: {
                    id: customerId,
                    name: body.name,
                    birthDate: body.birthDate,
                    isActive: body.isActive,
                    addresses: body.addresses,
                    contacts: body.contacts,
                }
            }),
        };
    }
    catch (error) {
        console.error('Error creating customer:', error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Failed to create customer', error }),
        };
    }
};
exports.createCustomer = createCustomer;
