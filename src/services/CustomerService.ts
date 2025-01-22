import { Customer, Address, Contact } from '../models/Customer';
import { putItem, getItem, deleteItem, updateItem } from '../utils/dynamoDB';

const TABLE_NAME = process.env.CUSTOMER_TABLE_NAME!;

export class CustomerService {
  static async createCustomer(customer: Customer) {
    await putItem(TABLE_NAME, {
      id: { S: customer.id },
      name: { S: customer.name },
      birthDate: { S: customer.birthDate },
      isActive: { BOOL: customer.isActive },
      addresses: { L: customer.addresses.map(address => ({ M: address })) },
      contacts: { L: customer.contacts.map(contact => ({ M: contact })) }
    });
  }

  static async getCustomer(id: string) {
    const result = await getItem(TABLE_NAME, { id: { S: id } });
    return result ? result : null;
  }

  static async updateCustomer(id: string, customer: Partial<Customer>) {
    const expression = 'set #name = :name, #birthDate = :birthDate, #isActive = :isActive';
    const expressionValues = {
      ':name': { S: customer.name || '' },
      ':birthDate': { S: customer.birthDate || '' },
      ':isActive': { BOOL: customer.isActive !== undefined ? customer.isActive : true }
    };
    await updateItem(TABLE_NAME, { id: { S: id } }, expression, expressionValues);
  }

  static async deleteCustomer(id: string) {
    await deleteItem(TABLE_NAME, { id: { S: id } });
  }
}
