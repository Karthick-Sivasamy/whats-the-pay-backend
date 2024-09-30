const mongoose = require('mongoose');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT REJECTION💥Shutting down......');
  console.log(err.name, err.message);
  process.exit(1);
});

const app = require('./app');

const DB = process.env.MONGO_DB_CONNECTION_STRING.replace(
  '<db_password>',
  process.env.MONGO_DB_PASSWORD,
);

mongoose.connect(DB).then((con) => {
  console.log('DB connection succesfull');
});

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}... `);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION💥Shutting down......');

  if (process.env.NODE_ENV == 'development') {
    console.log('Error: ', err);
  }

  server.close(() => {
    process.exit(1);
  });
});
