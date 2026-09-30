export interface Product {
  id: string;
  name: string;
  quantity: number;
  /** ISO date, YYYY-MM-DD */
  expiryDate: string;
}

/** Datos que envía el cliente al crear/actualizar (sin id). */
export type ProductInput = Omit<Product, 'id'>;
