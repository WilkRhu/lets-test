"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleCreateCustomer = void 0;
const customerService_1 = require("../services/customerService");
const uuid_1 = require("uuid");
const handleCreateCustomer = async (event) => {
    const body = JSON.parse(event.body);
    const customerId = (0, uuid_1.v4)();
    const customer = {
        id: customerId,
        name: body.name,
        birthDate: body.birthDate,
        isActive: body.isActive,
        addresses: body.addresses,
        contacts: body.contacts,
    };
    return (0, customerService_1.createCustomer)(customer);
};
exports.handleCreateCustomer = handleCreateCustomer;
