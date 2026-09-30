# despensa-lite

Monorepo de aprendizaje: API REST en Node + Express + TypeScript y front en Angular para gestionar los productos de una despensa.

```
despensa-lite/
├── api/   # Node + Express 5 + TypeScript (REST de productos, en memoria)
└── web/   # Angular 22 (standalone components, signals, Reactive Forms)
```

Son dos proyectos independientes: cada uno tiene su `package.json` y se instala y arranca por separado.

## Requisitos

- Node.js 24 LTS (ver `.nvmrc`), p. ej. el instalador oficial de nodejs.org
- npm (incluido con Node)

No hace falta instalar nada global: el Angular CLI va como dependencia de `web/`.

## Puesta en marcha

Primera vez, instalar dependencias:

```bash
cd api && npm install
cd ../web && npm install
```

Arrancar en **dos terminales**:

```bash
# Terminal 1: API en http://localhost:3000
cd api
npm run dev

# Terminal 2: front en http://localhost:4200
cd web
npm start
```

Abrir **http://localhost:4200**.

El front llama a rutas relativas (`/api/products`) y el dev server de Angular las reenvía a la API gracias a `web/proxy.conf.json`, así que no hace falta CORS. La API tiene que estar arrancada antes de usar el front.

> Los datos están en memoria: se pierden al reiniciar la API.

## API

Base: `http://localhost:3000/api/products`

| Método | Ruta                  | Respuesta                                  |
|--------|-----------------------|--------------------------------------------|
| GET    | `/api/products`       | 200: lista de productos                    |
| GET    | `/api/products/:id`   | 200: producto · 404 si no existe           |
| POST   | `/api/products`       | 201 + cabecera `Location` · 400 si inválido |
| PUT    | `/api/products/:id`   | 200: producto actualizado · 400 · 404      |
| DELETE | `/api/products/:id`   | 204 · 404                                  |

Body de POST/PUT:

```json
{ "name": "Leche", "quantity": 2, "expiryDate": "2026-10-05" }
```

- `name`: texto no vacío, máximo 100 caracteres
- `quantity`: entero ≥ 0
- `expiryDate`: fecha ISO `YYYY-MM-DD` válida
- No se admiten campos extra (p. ej. `id`)

Errores en JSON: `{ "error": "...", "details": [{ "field": "...", "message": "..." }] }` (`details` solo en validación).

Ejemplo con curl (Git Bash):

```bash
curl -i -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Leche","quantity":2,"expiryDate":"2026-10-05"}'
```

## Scripts

| Carpeta | Comando             | Qué hace                                        |
|---------|---------------------|-------------------------------------------------|
| `api`   | `npm run dev`       | Arranca con `tsx` en modo watch                  |
| `api`   | `npm test`          | Tests de integración (Vitest + Supertest)        |
| `api`   | `npm run typecheck` | Comprueba tipos con `tsc --noEmit`               |
| `api`   | `npm run build`     | Compila a `dist/`                                |
| `api`   | `npm start`         | Ejecuta la versión compilada (`dist/server.js`)  |
| `web`   | `npm start`         | `ng serve` con proxy a la API                    |
| `web`   | `npm run build`     | Build de producción en `dist/`                   |

## Estructura

```
api/src/
├── server.ts          # arranca el servidor HTTP
├── app.ts             # configuración de Express (sin listen, para testear)
├── routes/            # URL → middleware → controller
├── controllers/       # capa HTTP (funciones)
├── services/          # lógica + almacenamiento en memoria (clase)
├── models/            # tipos Product / ProductInput
├── schemas/           # validación con zod
├── middlewares/       # validación del body y manejo global de errores
└── errors/
api/test/              # tests de integración

web/src/app/
├── app.*                          # página: estado y coordinación
└── products/
    ├── product.ts                 # modelo
    ├── product.service.ts         # llamadas HTTP (HttpClient)
    ├── product-list/              # tabla con Editar / Borrar
    └── product-form/              # formulario de alta/edición
```

## Producción (fuera del alcance)

El proxy solo existe en `ng serve`. Para desplegar habría que servir el build de `web/` detrás de un reverse proxy (p. ej. nginx) que reenvíe `/api` a la API, o activar CORS en Express.
