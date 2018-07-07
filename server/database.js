const mongoose = require('mongoose');

const config = require('./config/');

const {
  db,
} = config;

exports.connect = () => {
  mongoose.connect(db.url);

  mongoose.connection.on('open', () => {
    console.log('Database connected');
  });
};
