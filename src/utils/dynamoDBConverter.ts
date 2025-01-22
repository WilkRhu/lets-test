import { Contact, Customer, Address } from "../models/Customer";

export const convertToDynamoFormat = (customer: Customer) => {
  return {
    id: { S: customer.id },
    name: { S: customer.name },
    birthDate: { S: customer.birthDate },
    isActive: { BOOL: customer.isActive },
    addresses: {
      L: customer.addresses.map((address: Address) => ({
        M: {
          street: { S: address.street },
          city: { S: address.city },
          state: { S: address.state },
          zip: { S: address.zip },
        },
      })),
    },
    contacts: {
      L: customer.contacts.map((contact: Contact) => ({
        M: {
          email: { S: contact.email },
          phone: { S: contact.phone },
          isPrimary: { BOOL: contact.isPrimary },
        },
      })),
    },
  };
};

export const convertFromDynamoFormat = (item: any): Customer => {
  return {
    id: item.id.S,
    name: item.name.S,
    birthDate: item.birthDate.S,
    isActive: item.isActive.BOOL,
    addresses: item.addresses.L.map((address: any) => ({
      street: address.M.street.S,
      city: address.M.city.S,
      state: address.M.state.S,
      zip: address.M.zip.S,
    })),
    contacts: item.contacts.L.map((contact: any) => ({
      email: contact.M.email.S,
      phone: contact.M.phone.S,
      isPrimary: contact.M.isPrimary.BOOL,
    })),
  };
};

export const mapValuesToDynamoDB = (
  value: any,
  key: string,
  expressionAttributeNames: any,
  expressionAttributeValues: any
) => {
  const expressionKey = `#${key}`;
  const valueKey = `:${key}`;

  expressionAttributeNames[expressionKey] = key;

  if (typeof value === "string") {
    expressionAttributeValues[valueKey] = { S: value };
  } else if (typeof value === "boolean") {
    expressionAttributeValues[valueKey] = { BOOL: value };
  } else if (typeof value === "number") {
    expressionAttributeValues[valueKey] = { N: value.toString() };
  } else if (Array.isArray(value)) {
    expressionAttributeValues[valueKey] = {
      L: value.map((v: any) =>
        typeof v === "object"
          ? {
              M: Object.keys(v).reduce((acc: any, innerKey: string) => {
                acc[innerKey] = { S: v[innerKey] };
                return acc;
              }, {}),
            }
          : { S: v }
      ),
    };
  } else if (typeof value === "object") {
    expressionAttributeValues[valueKey] = {
      M: Object.keys(value).reduce((acc: any, innerKey: string) => {
        acc[innerKey] = { S: value[innerKey] };
        return acc;
      }, {}),
    };
  } else {
    console.error(`Tipo não tratado para o campo ${key}:`, value);
  }

  return `${expressionKey} = ${valueKey}`;
};

export const createUpdateExpression = (
  updateValues: any,
  expressionAttributeNames: any,
  expressionAttributeValues: any
) => {
  let updateExpression = "set";
  Object.keys(updateValues).forEach((key, index) => {
    const value = updateValues[key];
    updateExpression += ` ${mapValuesToDynamoDB(
      value,
      key,
      expressionAttributeNames,
      expressionAttributeValues
    )}${index < Object.keys(updateValues).length - 1 ? ", " : ""}`;
  });
  return updateExpression;
};
