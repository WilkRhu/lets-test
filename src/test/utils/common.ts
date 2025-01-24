export const generateCustomerId = (): string => `customer-${Math.random().toString(36).substr(2, 9)}`;
