import { v4 as uuidv4 } from "uuid";

export interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
  }
  
  export interface Contact {
    email: string;
    phone: string;
    isPrimary: boolean;
  }
  
  export interface Customer {
    id: string;
    name: string;
    birthDate: string;
    isActive: boolean;
    addresses: Address[];
    contacts: Contact[];
  }

  export const createCustomerItem = (customer: Customer) => {
    
    return {
      id: { S: uuidv4() },
      name: { S: customer.name },
      birthDate: { S: customer.birthDate },
      isActive: { BOOL: customer.isActive },
      addresses: {
        L: customer.addresses.map((address) => ({
          M: {
            street: { S: address.street },
            city: { S: address.city },
            state: { S: address.state },
            zip: { S: address.zip }
          }
        }))
      },
      contacts: {
        L: customer.contacts.map((contact) => ({
          M: {
            email: { S: contact.email },
            phone: { S: contact.phone },
            isPrimary: { BOOL: contact.isPrimary }
          }
        }))
      },
    };
  };