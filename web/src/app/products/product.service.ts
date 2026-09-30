import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductInput } from './product';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private readonly http = inject(HttpClient);
  // Ruta relativa: en desarrollo el proxy de Angular la reenvía a la API (puerto 3000).
  private readonly baseUrl = '/api/products';

  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  create(input: ProductInput): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, input);
  }

  update(id: string, input: ProductInput): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, input);
  }

  delete(id: string): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
