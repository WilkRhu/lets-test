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

export interface User {
    id: string;
    fullName: string;
    dateOfBirth: string;
    isActive: boolean;
    addresses: Address[];
    contacts: Contact[];
}
