const express = require('express');

// App
const app = express();
const router = express.Router();
const controller = require('./controllers/data.controller');
const handler = require('./handler');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get('/books', controller.getBooks);
app.get('/report', handler.top3MostLentBooksQ22021);


module.exports = app;
