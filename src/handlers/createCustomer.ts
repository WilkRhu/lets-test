import { createCustomer } from "../services/customerService";
import { v4 as uuidv4 } from "uuid";

export const handleCreateCustomer = async (event: any) => {
  const body = JSON.parse(event.body);
  const customerId = uuidv4();

  const customer = {
    id: customerId,
    name: body.name,
    birthDate: body.birthDate,
    isActive: body.isActive,
    addresses: body.addresses,
    contacts: body.contacts,
  };

  return createCustomer(customer);
};