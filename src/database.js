const mongoose = require('mongoose');

function connect() {
  mongoose.connect(process.env.BASE_URL);

  mongoose.connection.once('open', () => {
    console.log('Database successfully connected');
  });

  mongoose.connection.on('error', () => {
    console.log('Something went wrong');
  });
}

module.exports = { connect }
