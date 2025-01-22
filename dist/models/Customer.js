"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCustomerItem = void 0;
const uuid_1 = require("uuid");
const createCustomerItem = (customer) => {
    return {
        id: { S: (0, uuid_1.v4)() },
        name: { S: customer.name },
        birthDate: { S: customer.birthDate },
        isActive: { BOOL: customer.isActive },
        addresses: {
            L: customer.addresses.map((address) => ({
                M: {
                    street: { S: address.street },
                    city: { S: address.city },
                    state: { S: address.state },
                    zip: { S: address.zip }
                }
            }))
        },
        contacts: {
            L: customer.contacts.map((contact) => ({
                M: {
                    email: { S: contact.email },
                    phone: { S: contact.phone },
                    isPrimary: { BOOL: contact.isPrimary }
                }
            }))
        },
    };
};
exports.createCustomerItem = createCustomerItem;
