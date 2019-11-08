const { createLogger, format, transports } = require('winston');
const configs = require('../configs');
const { combine, timestamp, colorize, printf } = format;

const createTransports = () => {
  // Setting up transports.
  let customTransports = [
    new transports.File({
      filename: `${configs.logger.path}error.log`,
      level: 'error'
    }),
    new transports.File({ filename: `${configs.logger.path}all.log` })
  ];

  // if console enabled add Console transport.
  if (configs.logger.console) {
    customTransports.push(
      new transports.Console({
        level: configs.logger.level
      })
    );
  }

  return customTransports;
};

// Config logger.
const logger = createLogger({
  level: configs.logger.level,
  format: combine(
    colorize(),
    timestamp(),
    printf((info) => `${info.timestamp} : ${info.message}`)
  ),
  transports: createTransports()
});

module.exports = logger;
