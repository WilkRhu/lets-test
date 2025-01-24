import { updateCustomerService } from "../services/customerService";

export const updateItemHandler = async (event: any) => {
  const customerId = event.pathParameters?.id;
  const updatedData = JSON.parse(event.body); 

  if (!customerId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Customer ID is required.",
      }),
    };
  }

  if (!updatedData || Object.keys(updatedData).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "No update data provided.",
      }),
    };
  }

  const response = await updateCustomerService(customerId, updatedData);

  return response;
};
