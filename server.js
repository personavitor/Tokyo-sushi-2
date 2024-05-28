const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Middlewares
app.use(bodyParser.json());
app.use(cors());

// Configurar a conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'yes',  // Substitua com a senha do seu MySQL
  database: 'sushi_delivery'
});

db.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao MySQL');
});

// Criar a tabela de pedidos (se não existir)
const createOrdersTable = `
  CREATE TABLE IF NOT EXISTS orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    item VARCHAR(255) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL
  )
`;

db.query(createOrdersTable, (err, result) => {
  if (err) {
    console.error('Erro ao criar tabela de pedidos:', err);
    return;
  }
  console.log('Tabela de pedidos criada ou já existente');
});

// Rotas
app.get('/', (req, res) => {
  res.send('Welcome to Sushi Delivery API');
});

// Criar pedido
app.post('/orders', (req, res) => {
  const { item, price, quantity } = req.body;
  const query = 'INSERT INTO orders (item, price, quantity) VALUES (?, ?, ?)';
  db.query(query, [item, price, quantity], (err, result) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(201).send({ id: result.insertId, item, price, quantity });
  });
});

// Obter todos os pedidos
app.get('/orders', (req, res) => {
  const query = 'SELECT * FROM orders';
  db.query(query, (err, results) => {
    if (err) {
      res.status(500).send(err);
      return;
    }
    res.status(200).send(results);
  });
});

// Iniciar o servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
