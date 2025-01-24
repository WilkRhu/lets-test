import { deleteCustomerService } from "../services/customerService";

export const deletItemHandler = async (event: any) => {
    const customerId = event.pathParameters?.id; 
  
  if (!customerId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Customer ID is required.",
      }),
    };
  }

  const response = await deleteCustomerService(customerId);

  return response;
}