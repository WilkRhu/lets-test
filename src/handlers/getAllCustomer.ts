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
          message: "Items successfully recovered",
          items: items,
        }),
      };
    } catch (error) {
      console.error("Error retrieving items:", error);
      return {
        statusCode: 500,
        body: JSON.stringify({
          message: "Error retrieving items",
          error: error,
        }),
      };
    }
  };