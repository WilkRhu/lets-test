import { APIGatewayEvent } from "aws-lambda";
import { Context } from "vm";
import { getAllItemService } from "../services/customerService";

export const getAllHandler = async (
  event: APIGatewayEvent,
  context: Context
) => {
  try {
    const tableName = "Customers";

    const { statusCode, body } = await getAllItemService(tableName);

    if (statusCode === 200) {
      return {
        statusCode: 200,
        body: JSON.stringify({
          message: "Items successfully recovered",
          items: body,
        }),
      };
    }

    return {
      statusCode: statusCode,
      body: JSON.stringify({
        message: body.message,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error retrieving items",
        error: error,
      }),
    };
  }
};
