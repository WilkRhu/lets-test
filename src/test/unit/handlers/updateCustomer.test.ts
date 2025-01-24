import * as dynamoDB from "../../../database/dynamoDB";
import { updateCustomerService } from "../../../services/customerService";
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

    const result = await updateCustomerService(customerId, updatedData);

    expect(dynamoDB.updateItem).toHaveBeenCalledWith(
      "Customers",
      { id: { S: customerId } },
      updatedData
    );

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: `Customer with id ${customerId} updated successfully.`,
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
});
