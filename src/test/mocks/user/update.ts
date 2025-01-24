import { AttributeValue } from "@aws-sdk/client-dynamodb";

interface Address {
    street: string;
    city: string;
  }
  
  interface Contact {
    phone: string;
    email: string;
  }
  
  interface UpdatedData {
    name: string;
    birthDate: string;
    isActive: boolean;
    addresses: Address[];
    contacts: Contact[];
  }
  
  type DynamoDBString = { S: string };
  type DynamoDBBoolean = { BOOL: boolean };
  type DynamoDBList = { L: DynamoDBMap[] };
  type DynamoDBMap = { M: Record<string, DynamoDBString | DynamoDBBoolean> };
  
  interface MockUpdatedAttributes {
    id: DynamoDBString;
    name: DynamoDBString;
    birthDate: DynamoDBString;
    isActive: DynamoDBBoolean;
    addresses: DynamoDBList;
    contacts: DynamoDBList;
  }

export const updatedData: UpdatedData = {
    name: "Updated John Doe",
    birthDate: "1991-01-01",
    isActive: false,
    addresses: [{ street: "Updated Street", city: "Updated City" }],
    contacts: [{ phone: "+9876543210", email: "updated@example.com" }],
  };
  

  
  export const mockUpdatedAttributes: Record<string, AttributeValue> = {
    id: { S: "mock-id" },
    name: { S: "Updated John Doe" },
    birthDate: { S: "1991-01-01" },
    isActive: { BOOL: false },
    addresses: {
      L: [
        {
          M: {
            street: { S: "Updated Street" },
            city: { S: "Updated City" },
          },
        },
      ],
    },
    contacts: {
      L: [
        {
          M: {
            phone: { S: "+9876543210" },
            email: { S: "updated@example.com" },
          },
        },
      ],
    },
  };
  