import { AttributeValue } from "@aws-sdk/client-dynamodb";
import * as dynamoDB from "../../../database/dynamoDB";
import { updateItemHandler } from "../../../handlers/updateCustomer";
import {
  getItemService,
  updateCustomerService,
} from "../../../services/customerService";
import { customerData, expectedDynamoItem } from "../../mocks/user/create";
import { mockUpdatedAttributes, updatedData } from "../../mocks/user/update";

jest.mock("../../../database/dynamoDB", () => ({
  updateItem: jest.fn(),
}));

describe("updateCustomerService", () => {
  const customerId = "mock-id";

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should update a customer successfully", async () => {
    (dynamoDB.updateItem as jest.Mock).mockResolvedValueOnce(
      mockUpdatedAttributes
    );
    const event = {
      pathParameters: {
        id: "mock-id",
      },
      body: JSON.stringify(updatedData),
    };

    const result = await updateItemHandler(event);

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: "Customer with id mock-id updated successfully.",
        updatedAttributes: mockUpdatedAttributes,
      }),
    });
  });

  it("should return an error if updateItem fails", async () => {
    (dynamoDB.updateItem as jest.Mock).mockRejectedValueOnce(
      new Error("DynamoDB error")
    );

    const result = await updateCustomerService(customerId, updatedData);
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to update customer with id ${customerId}.`,
        error: "Error: DynamoDB error",
      }),
    });
  });

  it("should error 400 if update fails ID required", async () => {
    const event = {
      body: JSON.stringify(updatedData),
    };
    const result = await updateItemHandler(event);
    expect(result).toEqual({
      statusCode: 400,
      body: '{"message":"Customer ID is required."}'
    })
  });

  it("should error 400 if update fails body required", async () => {
    const event = {
      pathParameters: {
        id: "mock-id",
      },
      body: JSON.stringify(""),
    };
    const result = await updateItemHandler(event);
    expect(result).toEqual({
      statusCode: 400,
      body: '{"message":"No update data provided."}'
    })
  });
});
