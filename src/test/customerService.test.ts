import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { CustomerService } from '../services/CustomerService';

jest.mock('@aws-sdk/client-dynamodb', () => {
  return {
    DynamoDBClient: jest.fn().mockImplementation(() => ({
      send: jest.fn()
    }))
  };
});

describe('CustomerService', () => {
  it('should create a customer', async () => {
    const customer = { id: '1', name: 'John Doe', birthDate: '1990-01-01', isActive: true, addresses: [], contacts: [] };
    await CustomerService.createCustomer(customer);
    expect(DynamoDBClient.prototype.send).toHaveBeenCalledTimes(1);
  });
});
