import { Customer } from "../models/Customer";
import {
  deleteItem,
  getAllItems,
  getItem,
  putItem,
  updateItem,
} from "../database/dynamoDB";
import { convertToDynamoFormat } from "../utils/dynamoDBConverter";
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
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Failed to create customer", error }),
    };
  }
};

export const getAllItemService = async (tableName: string): Promise<any> => {
  try {
    const items = await getAllItems(tableName);
    if (items.length === 0) {
      return {
        statusCode: 404,
        body: { message: "No items found." },
      };
    }
    return {
      statusCode: 200,
      body: items,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: { message: "Failed to retrieve items", error },
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
    return { statusCode: 500, message: "Failed to retrieve item", error };
  }
};

export const deleteCustomerService = async (customerId: string) => {
  try {
    const key = { id: { S: customerId } };
    const customer = await getItem("Customers", { id: { S: customerId } });
    if (!customer) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Customer with id ${customerId} not found.`,
        }),
      };
    }

    if (!customer) {
      return {
        statusCode: 404,
        body: JSON.stringify({
          message: `Customer with id ${customerId} not found.`,
        }),
      };
    }

    await deleteItem("Customers", key);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Customer with id ${customerId} deleted successfully.`,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to delete customer with id ${customerId}.`,
        error: error,
      }),
    };
  }
};

export const updateCustomerService = async (
  customerId: string,
  updatedData: any
) => {
  try {
    const item = await getItemService("Customers", customerId);
    if (!item) {
      return {
        statusCode: 404,
        body: JSON.stringify({ message: "Customer not found" }),
      };
    }
    
    const key = { id: { S: `${customerId}` } };
    const updatedAttributes = await updateItem("Customers", key, updatedData);

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: `Customer with id ${customerId} updated successfully.`,
        updatedAttributes,
      }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: `Failed to update customer with id ${customerId}.`,
        error: `${error}`,
      }),
    };
  }
};
