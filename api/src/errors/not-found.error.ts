export class NotFoundError extends Error {
  // Express usa `status` para elegir el código HTTP si nadie maneja el error.
  readonly status = 404;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
  }
}
