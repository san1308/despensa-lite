import express from 'express';
import { productRouter } from './routes/product.routes.ts';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRouter);
