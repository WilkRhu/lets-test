import { Customer } from "../models/Customer";
import {
  deleteItem,
  getAllItems,
  getItem,
  putItem,
  updateItem,
} from "../database/dynamoDB";
import {
  convertFromDynamoFormat,
  convertToDynamoFormat,
} from "../utils/dynamoDBConverter";
import { v4 as uuidv4 } from "uuid";

export const createCustomer = async (customerData: Customer) => {
  const customerId = uuidv4();
  const customerWithId = { ...customerData, id: customerId };

  const dynamoItem = convertToDynamoFormat(customerWithId);

  try {
    await putItem("Customers", dynamoItem);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Customer created successfully",
        customer: customerWithId,
      }),
    };
  } catch (error) {
    console.error("Error creating customer:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create customer", error }),
    };
  }
};

export const getAllItemService = async (tableName: string) => {
  try {
    const items = await getAllItems(tableName);

    if (items.length === 0) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Nenhum item encontrado." }),
      };
    }

    return {
      statusCode: 200,
      body: items,
    };
  } catch (error) {
    console.error("Erro ao recuperar os itens:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Erro ao recuperar os itens",
        error: error,
      }),
    };
  }
};

export const getItemService = async (tableName: string, key: any) => {
  try {
    const id = { id: { S: `${key}` } };
    const item = await getItem(tableName, id);
    if (!item) {
      return { statusCode: 404, message: "Item not found" };
    }

    return { statusCode: 200, item };
  } catch (error) {
    console.error("Error in getItemService:", error);
    return { statusCode: 500, message: "Failed to retrieve item", error };
  }
};

export const deleteCustomerService = async (customerId: string) => {
  try {
    const key = { id: { S: customerId } };

    await deleteItem("Customers", key);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Cliente com id ${customerId} deletado com sucesso.`,
      }),
    };
  } catch (error) {
    console.error("Erro ao deletar o item:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Erro ao tentar deletar o cliente com id ${customerId}.`,
        error: error,
      }),
    };
  }
};

export const updateCustomerService = async (customerId: string, updatedData: any) => {
  try {
    const key = { id: { S: `${customerId}` } };
    
    // Chamando a função de atualização com os dados fornecidos
    const updatedAttributes = await updateItem(
      "Customers",
      key,
      updatedData
    );

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Cliente com id ${customerId} atualizado com sucesso.`,
        updatedAttributes,
      }),
    };
  } catch (error) {
    console.error('Erro ao atualizar o cliente:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Erro ao tentar atualizar o cliente com id ${customerId}.`,
        error: `${error}`,
      }),
    };
  }
};

