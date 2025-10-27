const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const routes = require('./routes/routes.js')

const app = express();

//middlewares
app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

app.use(routes);

module.exports = app;