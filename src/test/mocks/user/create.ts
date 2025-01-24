interface Address {
    street: string;
    city: string;
    state?: string;
    zip?: string;
  }
  
  interface Contact {
    phone: string;
    email: string;
    isPrimary?: boolean;
  }
  
  interface CustomerData {
    name: string;
    birthDate: string;
    isActive: boolean;
    addresses: Address[];
    contacts: Contact[];
  }
  
  type DynamoDBString = { S: string | undefined };
  type DynamoDBBoolean = { BOOL: boolean | undefined };
  type DynamoDBList = { L: DynamoDBMap[] };
  type DynamoDBMap = { M: Record<string, DynamoDBString | DynamoDBBoolean> };
  
  interface ExpectedDynamoItem {
    id: DynamoDBString;
    name: DynamoDBString;
    birthDate: DynamoDBString;
    isActive: DynamoDBBoolean;
    addresses: DynamoDBList;
    contacts: DynamoDBList;
  }
  
  export const customerData: CustomerData = {
    name: "John Doe",
    birthDate: "1990-01-01",
    isActive: true,
    addresses: [{ street: "Street 1", city: "City 1" }],
    contacts: [{ phone: "+1234567890", email: "email@example.com" }],
  };
  
  export const expectedDynamoItem: ExpectedDynamoItem = {
    id: { S: "mock-id" },
    name: { S: "John Doe" },
    birthDate: { S: "1990-01-01" },
    isActive: { BOOL: true },
    addresses: {
      L: [
        {
          M: {
            street: { S: "Street 1" },
            city: { S: "City 1" },
            state: { S: undefined },
            zip: { S: undefined },
          },
        },
      ],
    },
    contacts: {
      L: [
        {
          M: {
            phone: { S: "+1234567890" },
            email: { S: "email@example.com" },
            isPrimary: { BOOL: undefined },
          },
        },
      ],
    },
  };
  