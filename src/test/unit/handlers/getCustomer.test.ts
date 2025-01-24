import { getCustomerHandler } from "../../../handlers/getCustomer";
import { getItemService } from "../../../services/customerService";

beforeAll(() => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

jest.mock("../../../services/customerService");

describe("getCustomerHandler", () => {
  const mockCustomerId = "mock-id";

  it("deve retornar o cliente com status 200 quando o cliente for encontrado", async () => {
    const mockEvent = {
      pathParameters: { id: mockCustomerId },
    };

    const mockCustomer = {
      id: { S: mockCustomerId },
      name: { S: "John Doe" },
      birthDate: { S: "1990-01-01" },
      isActive: { BOOL: true },
    };

    // Configura o mock do service
    (getItemService as jest.Mock).mockResolvedValue({
      statusCode: 200,
      item: mockCustomer,
    });

    const response = await getCustomerHandler(mockEvent);

    expect(getItemService).toHaveBeenCalledWith("Customers", mockCustomerId);
    expect(response.statusCode).toBe(200);
    expect(response.body).toBe(JSON.stringify(mockCustomer));
  });

  it("deve retornar status 404 quando o cliente não for encontrado", async () => {
    const mockEvent = {
      pathParameters: { id: mockCustomerId },
    };

    // Configura o mock do service para retornar 404
    (getItemService as jest.Mock).mockResolvedValue({
      statusCode: 404,
      message: "Item not found",
    });

    const response = await getCustomerHandler(mockEvent);

    expect(getItemService).toHaveBeenCalledWith("Customers", mockCustomerId);
    expect(response.statusCode).toBe(404);
    expect(response.body).toBe(JSON.stringify({ message: "Item not found" }));
  });

  it("deve retornar status 500 em caso de erro no serviço", async () => {
    const mockEvent = {
      pathParameters: { id: mockCustomerId },
    };

    (getItemService as jest.Mock).mockRejectedValue(new Error("Internal Error"));

    const response = await getCustomerHandler(mockEvent);

    expect(getItemService).toHaveBeenCalledWith("Customers", mockCustomerId);
    expect(response.statusCode).toBe(500);
    expect(JSON.parse(response.body).message).toBe("Internal Server Error");
    expect(JSON.parse(response.body).error).toBeDefined();
  });
});
