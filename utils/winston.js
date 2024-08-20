const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, prettyPrint } = format;
const dotenv = require('dotenv');
dotenv.config();
const { AMBIENT } = process.env;

const log = AMBIENT == 'prod' ?  createLogger({
    level: 'info',
    format: combine(
        timestamp(),
        prettyPrint()
    ),
    defaultMeta: { service: 'user-service' },
    transports: [
        new transports.Console(),
        new transports.File({ filename: 'error.log', level: 'error' }),
        new transports.File({ filename: 'app.log' }),
    ],
  }) : createLogger({
    level: 'info',
    format: format.cli(),
    defaultMeta: { service: 'user-service' },
    transports: [
      new transports.Console(),
    ],
  });

exports.log = log;