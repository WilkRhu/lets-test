
import { v4 as uuidv4 } from "uuid";
import * as dynamoDB from "../../../database/dynamoDB";
import { handleCreateCustomer } from "../../../handlers/createCustomer";
import { customerData, expectedDynamoItem } from "../../mocks/user/create";

jest.mock("uuid", () => ({
  v4: jest.fn(),
}));

jest.mock("../../../database/dynamoDB", () => ({
  putItem: jest.fn(),
}));

describe("handleCreateCustomer", () => {


  const mockCustomerWithId = {
    ...customerData,
    id: "mock-id", 
  };

  beforeEach(() => {
    jest.clearAllMocks(); 
    (uuidv4 as jest.Mock).mockReturnValue("mock-id"); 
  });

  it("should create a customer successfully", async () => {
    (dynamoDB.putItem as jest.Mock).mockResolvedValueOnce(undefined);
  
    const event = {
      body: JSON.stringify(customerData),
    };
  
    const result = await handleCreateCustomer(event);
  
    
  
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
