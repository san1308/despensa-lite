import request from 'supertest';
import { describe, expect, it } from 'vitest';
import { app } from '../src/app.ts';

// Nota: productService es un singleton en memoria compartido entre tests;
// cada test usa sus propios datos para no depender de los demás.
describe('/api/products', () => {
  it('POST crea un producto válido (201 + Location) y se puede consultar', async () => {
    const input = { name: 'Leche', quantity: 2, expiryDate: '2026-10-05' };

    const created = await request(app).post('/api/products').send(input).expect(201);

    expect(created.body).toEqual({ id: expect.any(String), ...input });
    expect(created.headers.location).toBe(`/api/products/${created.body.id}`);

    const fetched = await request(app).get(`/api/products/${created.body.id}`).expect(200);
    expect(fetched.body).toEqual(created.body);
  });

  it('POST con datos inválidos devuelve 400 con el detalle de cada campo', async () => {
    const res = await request(app)
      .post('/api/products')
      .send({ name: '', quantity: -1, expiryDate: '05/10/2026' })
      .expect(400);

    expect(res.body.error).toBe('Validation failed');
    const fields = res.body.details.map((d: { field: string }) => d.field);
    expect(fields).toEqual(expect.arrayContaining(['name', 'quantity', 'expiryDate']));
  });

  it('GET de un id inexistente devuelve 404', async () => {
    const res = await request(app).get('/api/products/does-not-exist').expect(404);

    expect(res.body).toEqual({ error: 'Product does-not-exist not found' });
  });
});
