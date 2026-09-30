import type { Request, Response } from 'express';
import type { ProductInput } from '../models/product.ts';
import { productService } from '../services/product.service.ts';

type IdParams = { id: string };

export function getAll(_req: Request, res: Response): void {
  res.json(productService.findAll());
}

export function getById(req: Request<IdParams>, res: Response): void {
  res.json(productService.findById(req.params.id));
}

export function create(req: Request<{}, unknown, ProductInput>, res: Response): void {
  const product = productService.create(req.body);
  res.status(201).location(`${req.baseUrl}/${product.id}`).json(product);
}

export function update(req: Request<IdParams, unknown, ProductInput>, res: Response): void {
  res.json(productService.update(req.params.id, req.body));
}

export function remove(req: Request<IdParams>, res: Response): void {
  productService.delete(req.params.id);
  res.status(204).end();
}
