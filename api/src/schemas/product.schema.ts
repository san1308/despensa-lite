import { z } from 'zod';
import type { ProductInput } from '../models/product.ts';

// `satisfies` hace que TS falle si el schema y el modelo dejan de coincidir.
export const productInputSchema = z.strictObject({
  name: z.string().trim().min(1).max(100),
  quantity: z.number().int().min(0),
  expiryDate: z.iso.date(), // YYYY-MM-DD
}) satisfies z.ZodType<ProductInput>;
