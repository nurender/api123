const mongoose = require('mongoose');
const logger = require('../core/logger');

connect = (host, port, name) => {
  mongoose.Promise = global.Promise;
  mongoose.connect(`mongodb://${host}:${port}/${name}`);
  const { connection } = mongoose;

  // On db connect.
  connection.on('connected', () =>
   logger.info(`Database [${name}] connected`)
  );

  // Connection failed.
  connection.on('error', (err) =>
    logger.info(`Database connection failed ${err}`)
  );
  connection.on('disconnected', () =>
    logger.info(`Database [${name}] disconnected`)
  );
};

module.exports = { connect };
