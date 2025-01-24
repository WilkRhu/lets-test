import { APIGatewayEvent, Context } from "aws-lambda";
import * as getAllItemServiceModule from "../../../services/customerService";
import { getAllHandler } from "../../../handlers/getAllCustomer";

jest.mock("../../../services/customerService");

describe("getAllHandler", () => {
    const event = {} as APIGatewayEvent;  
    const context = {} as Context;        
  
    afterEach(() => {
      jest.resetAllMocks();
    });
  
    it("deve retornar 200 e uma lista de itens quando os itens forem encontrados", async () => {
      (getAllItemServiceModule.getAllItemService as jest.Mock).mockResolvedValue({
        statusCode: 200,
        body: [
          { id: "1", name: "Customer 1" },
          { id: "2", name: "Customer 2" }
        ],
      });
  
      const response = await getAllHandler(event, context);
  
      const parsedBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(200);
      expect(parsedBody.message).toBe("Items successfully recovered");
      expect(parsedBody.items.length).toBe(2); 
    });
  
    it("deve retornar 404 quando nenhum item for encontrado", async () => {
      (getAllItemServiceModule.getAllItemService as jest.Mock).mockResolvedValue({
        statusCode: 404,
        body: { message: "No items found." }
      });
  
      const response = await getAllHandler(event, context);
  
      const parsedBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(404);
      expect(parsedBody.message).toBe("No items found.");
    });
  
    it.skip("deve retornar 500 em caso de erro no serviço", async () => {
      (getAllItemServiceModule.getAllItemService as jest.Mock).mockRejectedValue(new Error("Service error"));
  
      const response = await getAllHandler(event, context);
  
      const parsedBody = JSON.parse(response.body);
      expect(response.statusCode).toBe(500);
      expect(parsedBody.message).toBe("Error retrieving items");
      expect(parsedBody.error).toBe("Error: Service error");
    });
  });