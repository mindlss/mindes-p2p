const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const WebSocket = require('ws');

dotenv.config();

require('./database');

const domain =
    process.env.NODE_ENV === 'production' ? process.env.Domain : 'mysite.local';

const app = express();

const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);

const appRoute = require('./routes/App');
const apiRoute = require('./routes/Api');

app.use('/', appRoute);
app.use('/api/', apiRoute);

const server = app.listen(process.env.APP_PORT, () => console.log(`${domain} started on port ${process.env.APP_PORT}`));

const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  console.log('Client connected');

  ws.send('Send file');

  ws.on('message', (message) => {
    console.log(`Received message: ${message}`);
  });

  ws.on('close', () => {
    console.log('Client disconnected');
  });
});
