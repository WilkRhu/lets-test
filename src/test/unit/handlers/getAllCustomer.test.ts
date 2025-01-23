import { APIGatewayEvent, Context } from "aws-lambda";
import { getAllItemService } from "../../../services/CustomerService";
import { getAllHandler } from "../../../handlers/getAllCustomer";


// Mock do serviço
jest.mock("../services/CustomerService");

describe("getAllHandler", () => {

    const mockEvent: APIGatewayEvent = {
        body: null,  // Caso não precise de um corpo no evento
        headers: {},
        pathParameters: null,
        queryStringParameters: null,
        path: "/items",  // Caminho do recurso
        httpMethod: "GET", // Método HTTP
        requestContext: {
          identity: {
            sourceIp: '127.0.0.1',  // IP de origem
            userAgent: 'mock-user-agent',  // User-agent
          },
          stage: 'dev',
        },
        resource: "/items",
        isBase64Encoded: false,
        stageVariables: {},
        multiValueHeaders: {},
        multiValueQueryStringParameters: null,
      };
    

  const mockContext: Context = {} as any;

  it("should return 200 and items if retrieval is successful", async () => {
    const mockItems = [
      { id: "1", name: "Customer 1" },
      { id: "2", name: "Customer 2" },
    ];

    (getAllItemService as jest.Mock).mockResolvedValue({
      statusCode: 200,
      body: mockItems,
    });

    const result = await getAllHandler(mockEvent, mockContext);

    expect(result.statusCode).toBe(200);
    expect(JSON.parse(result.body).message).toBe("Itens recuperados com sucesso");
    expect(JSON.parse(result.body).items).toEqual(mockItems);
  });

  it("should return 500 if there is an error", async () => {
    const error = new Error("Failed to retrieve items");
    (getAllItemService as jest.Mock).mockRejectedValue(error);

    const result = await getAllHandler(mockEvent, mockContext);

    expect(result.statusCode).toBe(500);
    expect(JSON.parse(result.body).message).toBe("Erro ao recuperar itens");
    expect(JSON.parse(result.body).error).toEqual(error);
  });

  it("should return 404 if no items are found", async () => {
    const mockItems = [];
    (getAllItemService as jest.Mock).mockResolvedValue({
      statusCode: 404,
      body: { message: "Nenhum item encontrado." },
    });

    const result = await getAllHandler(mockEvent, mockContext);

    expect(result.statusCode).toBe(404);
    expect(JSON.parse(result.body).message).toBe("Nenhum item encontrado.");
  });
});
