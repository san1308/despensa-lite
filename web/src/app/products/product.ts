// Mismo contrato que la API (api/src/models/product.ts).
export interface Product {
  id: string;
  name: string;
  quantity: number;
  /** ISO date, YYYY-MM-DD */
  expiryDate: string;
}

export type ProductInput = Omit<Product, 'id'>;
