import { deleteCustomerService } from "../services/CustomerService";

export const deletItemHandler = async (event: any) => {
    const customerId = event.pathParameters?.id; 
  
  if (!customerId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "O ID do cliente é obrigatório.",
      }),
    };
  }

  const response = await deleteCustomerService(customerId);

  return response;
}