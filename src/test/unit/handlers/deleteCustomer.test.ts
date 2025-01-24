// src/test/unit/handlers/deleteCustomer.test.ts
import { deleteCustomerService } from "../../../services/customerService";
import { mockGetItem, mockDeleteItem } from "../../mocks/database";
import { generateCustomerId } from "../../utils/common";



describe("deleteCustomerService", () => {


  it("should handle customer not found (404)", async () => {
    const customerId = generateCustomerId();

    mockGetItem.mockResolvedValueOnce(null);

    const response = await deleteCustomerService(customerId);

    expect(response.statusCode).toBe(404);
    expect(JSON.parse(response.body).message).toBe(
      `Customer with id ${customerId} not found.`
    );
  });
});
