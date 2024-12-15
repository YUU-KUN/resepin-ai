const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.use(bodyParser.json({
    limit: '50mb'
}));
// app.use(express.bodyParser({limit: '50mb'}));
app.use('/api', routes);

module.exports = app;
