import { putItem } from "../utils/dynamoDB";
import { v4 as uuidv4 } from "uuid";

export const createCustomer = async (event: any) => {
  const body = JSON.parse(event.body);

  const customerId = uuidv4();

  const item = {
    id: { S: customerId },
    name: { S: body.name },
    birthDate: { S: body.birthDate },
    isActive: { BOOL: body.isActive },
    addresses: { 
      L: body.addresses.map((address: { street: string, city: string, state: string, zip: string }) => ({
        M: {
          street: { S: address.street },
          city: { S: address.city },
          state: { S: address.state },
          zip: { S: address.zip }
        }
      }))
    },
    contacts: { 
      L: body.contacts.map((contact: { email: string, phone: string, isPrimary: boolean }) => ({
        M: {
          email: { S: contact.email },
          phone: { S: contact.phone },
          isPrimary: { BOOL: contact.isPrimary }
        }
      }))
    },
  };

  try {
    await putItem('Customers', item);
    return {
      statusCode: 200,
      body: JSON.stringify({
        message: 'Customer created successfully',
        customer: {
          id: customerId,
          name: body.name,
          birthDate: body.birthDate,
          isActive: body.isActive,
          addresses: body.addresses,
          contacts: body.contacts,
        }
      }),
    };
  } catch (error) {
    console.error('Error creating customer:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: 'Failed to create customer', error }),
    };
  }
};
