"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const dynamoDB = __importStar(require("../../../database/dynamoDB"));
const createCustomer_1 = require("../../../handlers/createCustomer");
const create_1 = require("../../mocks/user/create");
jest.mock("uuid", () => ({
    v4: jest.fn(),
}));
jest.mock("../../../database/dynamoDB", () => ({
    putItem: jest.fn(),
}));
describe("handleCreateCustomer", () => {
    const mockCustomerWithId = {
        ...create_1.customerData,
        id: "mock-id",
    };
    beforeEach(() => {
        jest.clearAllMocks();
        uuid_1.v4.mockReturnValue("mock-id");
    });
    it("should create a customer successfully", async () => {
        dynamoDB.putItem.mockResolvedValueOnce(undefined);
        const event = {
            body: JSON.stringify(create_1.customerData),
        };
        const result = await (0, createCustomer_1.handleCreateCustomer)(event);
        expect(dynamoDB.putItem).toHaveBeenCalledWith("Customers", create_1.expectedDynamoItem);
        expect(result).toEqual({
            statusCode: 200,
            body: JSON.stringify({
                message: "Customer created successfully",
                customer: {
                    id: "mock-id",
                    name: "John Doe",
                    birthDate: "1990-01-01",
                    isActive: true,
                    addresses: [{ street: "Street 1", city: "City 1" }],
                    contacts: [{ phone: "+1234567890", email: "email@example.com" }],
                },
            }),
        });
    });
    it("should return an error if putItem fails", async () => {
        dynamoDB.putItem.mockRejectedValueOnce(new Error("DynamoDB error"));
        const event = {
            body: JSON.stringify(create_1.customerData),
        };
        const result = await (0, createCustomer_1.handleCreateCustomer)(event);
        expect(result).toEqual({
            statusCode: 500,
            body: JSON.stringify({
                message: "Failed to create customer",
                error: {}
            }),
        });
    });
});
