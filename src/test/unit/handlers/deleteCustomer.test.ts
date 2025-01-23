import { deleteCustomerService } from "../../../services/CustomerService";
import { deleteItem } from "../../../database/dynamoDB"; // Importando o mock do repositório

jest.mock("../../../utils/dynamoDB", () => ({
  deleteItem: jest.fn(),
}));

describe("deleteCustomerService", () => {
  const customerId = "mock-customer-id";

  beforeEach(() => {
    jest.clearAllMocks(); 
  });

  it("should delete the customer successfully and return 200", async () => {
    (deleteItem as jest.Mock).mockResolvedValueOnce(undefined); 

    const result = await deleteCustomerService(customerId);

    expect(deleteItem).toHaveBeenCalledWith(
      "Customers", 
      { id: { S: customerId } } 
    );

    expect(result).toEqual({
      statusCode: 200,
      body: JSON.stringify({
        message: `Cliente com id ${customerId} deletado com sucesso.`,
      }),
    });
  });

  it("should return 500 if deleteItem fails", async () => {
    (deleteItem as jest.Mock).mockRejectedValueOnce(new Error("DynamoDB error"));
  
    const result = await deleteCustomerService(customerId);
  
    expect(result).toEqual({
      statusCode: 500,
      body: JSON.stringify({
        message: `Erro ao tentar deletar o cliente com id ${customerId}.`,
        error: {},
      }),
    });
  });
  
});
