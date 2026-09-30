import type { RequestHandler } from 'express';
import type { ZodType } from 'zod';

/** Valida req.body con el schema; si falla, lanza ZodError (lo recoge el errorHandler). */
export function validateBody(schema: ZodType): RequestHandler {
  return (req, _res, next) => {
    req.body = schema.parse(req.body);
    next();
  };
}
