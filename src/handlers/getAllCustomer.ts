import { APIGatewayEvent } from "aws-lambda";
import { Context } from "vm";
import { getAllItemService } from "../services/CustomerService";

export const getAllHandler = async (event: APIGatewayEvent, context: Context) => {
    try {
      const tableName = "Customers";
  
      const items = await getAllItemService(tableName);
  
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Itens recuperados com sucesso",
          items: items,
        }),
      };
    } catch (error) {
      console.error("Erro ao recuperar itens:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Erro ao recuperar itens",
          error: error,
        }),
      };
    }
  };