const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');

dotenv.config();

const domain =
    process.env.NODE_ENV === 'production' ? process.env.Domain : 'mysite.local';

const app = express();

const jsonParser = bodyParser.json();

app.use(cors());
app.use(jsonParser);

const appRoute = require('./routes/App');

app.use('/', appRoute);

app.listen(process.env.APP_PORT, () => console.log(`${domain} started on port ${process.env.APP_PORT}`));
