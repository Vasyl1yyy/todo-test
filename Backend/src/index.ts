import express from 'express';

const app = express();
const PORT = 5000;

app.use(express.json()); // дозволяє читати JSON тіла запитів

app.get('/', (req, res) => {
  res.send('Сервер працює ✅');
});

app.listen(PORT, () => {
  console.log(`🚀 Сервер запущено на http://localhost:${PORT}`);
});
