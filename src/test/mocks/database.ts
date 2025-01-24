import { GetItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";

export const mockGetItem = jest.fn();
export const mockDeleteItem = jest.fn();

export const getItem = async (tableName: string, key: any) => {
  const result = await mockGetItem(tableName, key);
  return result;
};
export const deleteItem = async (tableName: string, key: any) => {
  await mockDeleteItem(tableName, key);
};

const client = {
  send: jest.fn().mockImplementation((command) => {
    if (command instanceof GetItemCommand) {
      console.log("Mocking GetItemCommand:", command.input);
      return Promise.resolve(mockGetItem(command.input.TableName, command.input.Key));
    }

    if (command instanceof DeleteItemCommand) {
      console.log("Mocking DeleteItemCommand:", command.input);
      return Promise.resolve(mockDeleteItem(command.input.TableName, command.input.Key));
    }

    throw new Error("Unsupported command");
  }),
};
