const express = require('express');

const app = express();

app.get('/', (req, res, next) => {
  next(new Error('Connection Failed'));

  res.json({
    message: 'Welcome to api',
  });
});

app.use((req, res, next) => {
  res.status(404);
  res.json({
    message: 'Not found try again',
  });
});

app.use((err, req, res, next) => {
  res.status(500);
  res.json({
    message: err.message,
  });
});

module.exports = app;
