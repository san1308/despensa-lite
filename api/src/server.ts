import express from 'express';

const app = express();
const PORT = Number(process.env.PORT ?? 3000);

// Temporal: comprobar que la toolchain funciona. Se sustituye en el Paso 3.
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.listen(PORT, () => {
  console.log(`API escuchando en http://localhost:${PORT}`);
});
