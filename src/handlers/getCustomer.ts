import { getItemService } from "../services/CustomerService";

export const getCustomerHandler = async (event: any) => {
  const customerId = event.pathParameters.id; // Obtém o ID da URL (por exemplo, /customer/{id})

  try {
    const response = await getItemService("Customers", customerId);

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
