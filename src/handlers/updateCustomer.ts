import { updateCustomerService } from "../services/CustomerService";

export const updateItemHandler = async (event: any) => {
  const customerId = event.pathParameters?.id;
  const updatedData = JSON.parse(event.body); // Verifica se o body é JSON

  if (!customerId) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "O ID do cliente é obrigatório.",
      }),
    };
  }

  if (!updatedData || Object.keys(updatedData).length === 0) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: "Nenhum dado para atualização fornecido.",
      }),
    };
  }

  const response = await updateCustomerService(customerId, updatedData);

  return response;
};
