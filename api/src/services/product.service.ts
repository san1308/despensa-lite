import { randomUUID } from 'node:crypto';
import { NotFoundError } from '../errors/not-found.error.ts';
import type { Product, ProductInput } from '../models/product.ts';

export class ProductService {
  private readonly products = new Map<string, Product>();

  findAll(): Product[] {
    return [...this.products.values()];
  }

  findById(id: string): Product {
    const product = this.products.get(id);
    if (!product) {
      throw new NotFoundError(`Product ${id} not found`);
    }
    return product;
  }

  create(input: ProductInput): Product {
    const product: Product = { id: randomUUID(), ...input };
    this.products.set(product.id, product);
    return product;
  }

  update(id: string, input: ProductInput): Product {
    this.findById(id);
    const product: Product = { id, ...input };
    this.products.set(id, product);
    return product;
  }

  delete(id: string): void {
    if (!this.products.delete(id)) {
      throw new NotFoundError(`Product ${id} not found`);
    }
  }
}

// Instancia única compartida por toda la app (el "bean" singleton).
export const productService = new ProductService();
