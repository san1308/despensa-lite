# despensa-lite

Proyecto de aprendizaje de Node y Angular para un desarrollador backend Java/Spring Boot.
Monorepo con dos proyectos independientes (cada uno con su `package.json`, sin npm workspaces):

- `/api`: API REST de productos (`id`, `name`, `quantity`, `expiryDate`) con GET, POST, PUT y DELETE. Almacenamiento en memoria. Capas: routes → controller → service.
- `/web`: una página con la lista de productos, un formulario para alta/edición y un botón de borrar. Un servicio con HttpClient llama a la API.

## Stack
- Node 24 LTS (v24.21.0, instalado con el .msi oficial, sin nvm; `.nvmrc` = 24 como referencia)
- API: Express 5 + TypeScript 7, `tsx` en desarrollo, `tsc --noEmit` para comprobar tipos, `zod` para validar
- Web: Angular (última estable) con standalone components y Reactive Forms, CSS a pelo (sin Material). CLI con `npx`, sin instalar nada global
- Tests: solo en la API, al final, con Vitest + Supertest (2-3 casos). Se omiten si falta tiempo

## Convenciones
- Código en inglés (`Product`, `expiryDate`). Las explicaciones al usuario, en español
- Service como clase; controller como funciones
- Fechas como string ISO `YYYY-MM-DD`
- API en ESM (`"type": "module"`); imports relativos con extensión `.ts` (TS los reescribe a `.js` al compilar)

## Decisiones tomadas
- ESM en la API (`import`/`export`, no `require`)
- Express 5 + TypeScript 7 (últimas mayores), no Express 4 + TS 5
- tsconfig estricto (`strict`, `noUncheckedIndexedAccess`)

## Reglas de trabajo
- Proponer un plan y esperar el OK antes de escribir código
- Avanzar paso a paso y parar al final de cada paso
- Hacer un commit al final de cada paso con un mensaje claro
- En cada paso, explicar solo las diferencias importantes con Java/Spring (y el equivalente en Bean Validation de lo que se use en zod)
- Se pueden agrupar pasos si el usuario lo pide (commit por paso igualmente)
- Preguntar en vez de asumir
- Límite de tiempo de 1h-1h30: priorizar que la API y el front funcionen de punta a punta
- Mantener este archivo corto y actualizarlo si cambia alguna decisión

## Plan
0. Estructura del monorepo ✅
1. Arrancar /api (package.json, dependencias, tsconfig) ✅
2. Modelo + service en memoria ✅
3. Controller + routes + app/server
4. Validación con zod + middleware de errores
5. Probar la API (curl / .http)
6. Crear /web con Angular CLI
7. Modelo + ProductService con HttpClient
8. Componentes: lista, formulario, borrar
9. Conectar front y back (proxy/CORS)
10. README final (+ tests de la API si hay tiempo)
