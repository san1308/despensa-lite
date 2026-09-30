import { Component, input, output } from '@angular/core';
import { Product } from '../product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  readonly products = input.required<Product[]>();
  readonly selectedId = input<string | null>(null);

  readonly edit = output<Product>();
  readonly remove = output<Product>();
}
