import { Component, effect, inject, input, output, untracked } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product, ProductInput } from '../product';

@Component({
  selector: 'app-product-form',
  imports: [ReactiveFormsModule],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm {
  /** Producto a editar; null = modo alta. */
  readonly product = input<Product | null>(null);

  readonly save = output<ProductInput>();
  readonly cancelEdit = output<void>();

  private readonly fb = inject(NonNullableFormBuilder);

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.pattern(/\S/), Validators.maxLength(100)]],
    quantity: [1, [Validators.required, Validators.min(0), Validators.pattern(/^\d+$/)]],
    expiryDate: ['', Validators.required], // <input type="date"> ya devuelve YYYY-MM-DD
  });

  constructor() {
    // Cada vez que cambia el producto seleccionado, se rellena (o vacía) el formulario.
    // untracked: el effect solo debe depender de product(), no de los signals internos del form.
    effect(() => {
      const product = this.product();
      untracked(() => {
        if (product) {
          const { id, ...values } = product;
          this.form.reset(values);
        } else {
          this.form.reset();
        }
      });
    });
  }

  reset(): void {
    this.form.reset();
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.save.emit(this.form.getRawValue());
  }

  showError(control: 'name' | 'quantity' | 'expiryDate'): boolean {
    const c = this.form.controls[control];
    return c.invalid && c.touched;
  }
}
