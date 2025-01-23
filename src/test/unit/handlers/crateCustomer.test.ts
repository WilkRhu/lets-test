
import { v4 as uuidv4 } from "uuid";
import * as dynamoDB from "../../../database/dynamoDB";
import { handleCreateCustomer } from "../../../handlers/createCustomer";

// Mock de uuidv4 para retornar um id fixo
jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

// Mock da função putItem para simular a interação com o DynamoDB
jest.mock("../../../utils/dynamoDB", () => ({
  putItem: jest.fn(),
}));

describe("handleCreateCustomer", () => {
  const customerData = {
    name: "John Doe",
    birthDate: "1990-01-01",
    isActive: true,
    addresses: [{ street: "Street 1", city: "City 1" }],
    contacts: [{ phone: "+1234567890", email: "email@example.com" }],
  };

  const mockCustomerWithId = {
    ...customerData,
    id: "mock-id", 
  };

  beforeEach(() => {
    jest.clearAllMocks(); 
    (uuidv4 as jest.Mock).mockReturnValue("mock-id"); 
  });

  it("should create a customer successfully", async () => {
    // Simula sucesso do putItem
    (dynamoDB.putItem as jest.Mock).mockResolvedValueOnce(undefined);
  
    const event = {
      body: JSON.stringify(customerData),
    };
  
    const result = await handleCreateCustomer(event);
  
    const expectedDynamoItem = {
      id: { S: "mock-id" },
      name: { S: "John Doe" },
      birthDate: { S: "1990-01-01" },
      isActive: { BOOL: true },
      addresses: {
        L: [
          {
            M: {
              street: { S: "Street 1" },
              city: { S: "City 1" },
              state: { S: undefined }, 
              zip: { S: undefined }, 
            },
          },
        ],
      },
      contacts: {
        L: [
          {
            M: {
              phone: { S: "+1234567890" },
              email: { S: "email@example.com" },
              isPrimary: { BOOL: undefined }, 
            },
          },
        ],
      },
    };
  
    expect(dynamoDB.putItem).toHaveBeenCalledWith("Customers", expectedDynamoItem);
  
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
    (dynamoDB.putItem as jest.Mock).mockRejectedValueOnce(new Error("DynamoDB error"));
  
    const event = {
      body: JSON.stringify(customerData),
    };
  
    const result = await handleCreateCustomer(event);
  
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: "Failed to create customer",
        error: {}
      }),
    });
  });
  
});
