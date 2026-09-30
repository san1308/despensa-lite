import { Router } from 'express';
import * as productController from '../controllers/product.controller.ts';
import { validateBody } from '../middlewares/validate-body.ts';
import { productInputSchema } from '../schemas/product.schema.ts';

export const productRouter = Router();

productRouter.get('/', productController.getAll);
productRouter.get('/:id', productController.getById);
productRouter.post('/', validateBody(productInputSchema), productController.create);
productRouter.put('/:id', validateBody(productInputSchema), productController.update);
productRouter.delete('/:id', productController.remove);
