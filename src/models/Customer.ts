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