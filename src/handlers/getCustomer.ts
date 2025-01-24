import { getItemService } from "../services/customerService";

export const getCustomerHandler = async (event: any) => {
  const customerId = event.pathParameters.id;

  try {
    const response = await getItemService("Customers", customerId);

    // Se o item não for encontrado, responder com status 404
    if (response.statusCode === 404) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: response.message }),
      };
    }

    return {
      statusCode: response.statusCode,
      body: JSON.stringify(response.item),
    };
  } catch (error) {
    console.error("Error in getCustomerHandler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Internal Server Error",
        error: error,
      }),
    };
  }
};
