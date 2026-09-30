import express from 'express';
import { errorHandler, notFoundHandler } from './middlewares/error-handler.ts';
import { productRouter } from './routes/product.routes.ts';

export const app = express();

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/products', productRouter);

// Siempre al final: primero rutas inexistentes, luego errores.
app.use(notFoundHandler);
app.use(errorHandler);
