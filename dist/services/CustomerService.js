"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerService = void 0;
const dynamoDB_1 = require("../utils/dynamoDB");
const TABLE_NAME = process.env.CUSTOMER_TABLE_NAME;
class CustomerService {
    static async createCustomer(customer) {
        await (0, dynamoDB_1.putItem)(TABLE_NAME, {
            id: { S: customer.id },
            name: { S: customer.name },
            birthDate: { S: customer.birthDate },
            isActive: { BOOL: customer.isActive },
            addresses: { L: customer.addresses.map(address => ({ M: address })) },
            contacts: { L: customer.contacts.map(contact => ({ M: contact })) }
        });
    }
    static async getCustomer(id) {
        const result = await (0, dynamoDB_1.getItem)(TABLE_NAME, { id: { S: id } });
        return result ? result : null;
    }
    static async updateCustomer(id, customer) {
        const expression = 'set #name = :name, #birthDate = :birthDate, #isActive = :isActive';
        const expressionValues = {
            ':name': { S: customer.name || '' },
            ':birthDate': { S: customer.birthDate || '' },
            ':isActive': { BOOL: customer.isActive !== undefined ? customer.isActive : true }
        };
        await (0, dynamoDB_1.updateItem)(TABLE_NAME, { id: { S: id } }, expression, expressionValues);
    }
    static async deleteCustomer(id) {
        await (0, dynamoDB_1.deleteItem)(TABLE_NAME, { id: { S: id } });
    }
}
exports.CustomerService = CustomerService;
