import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, inject, signal, viewChild } from '@angular/core';
import { Product, ProductInput } from './products/product';
import { ProductForm } from './products/product-form/product-form';
import { ProductList } from './products/product-list/product-list';
import { ProductService } from './products/product.service';

type ApiErrorBody = { error?: string; details?: { field: string; message: string }[] } | null;

@Component({
  selector: 'app-root',
  imports: [ProductForm, ProductList],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App implements OnInit {
  private readonly productService = inject(ProductService);
  private readonly productForm = viewChild.required(ProductForm);

  protected readonly products = signal<Product[]>([]);
  protected readonly selected = signal<Product | null>(null);
  protected readonly error = signal<string | null>(null);

  ngOnInit(): void {
    this.load();
  }

  protected onSave(input: ProductInput): void {
    const current = this.selected();
    const request = current
      ? this.productService.update(current.id, input)
      : this.productService.create(input);

    request.subscribe({
      next: () => {
        this.clearSelection();
        this.load();
      },
      error: (err: HttpErrorResponse) => this.showError(err),
    });
  }

  protected onEdit(product: Product): void {
    this.error.set(null);
    this.selected.set(product);
  }

  protected onRemove(product: Product): void {
    this.productService.delete(product.id).subscribe({
      next: () => {
        if (this.selected()?.id === product.id) {
          this.clearSelection();
        }
        this.load();
      },
      error: (err: HttpErrorResponse) => this.showError(err),
    });
  }

  protected clearSelection(): void {
    this.selected.set(null);
    this.productForm().reset();
  }

  private load(): void {
    this.productService.getAll().subscribe({
      next: (products) => {
        this.products.set(products);
        this.error.set(null);
      },
      error: (err: HttpErrorResponse) => this.showError(err),
    });
  }

  private showError(err: HttpErrorResponse): void {
    // La API devuelve { error, details?: [{ field, message }] }.
    const body = err.error as ApiErrorBody;
    if (err.status === 0 || !body?.error) {
      this.error.set('No se pudo contactar con la API. ¿Está arrancada en el puerto 3000?');
      return;
    }
    const details = body.details?.map((d) => `${d.field}: ${d.message}`).join('; ');
    this.error.set(details ? `${body.error} (${details})` : body.error);
  }
}
