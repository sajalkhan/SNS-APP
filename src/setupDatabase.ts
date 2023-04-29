const mongoose = require('mongoose');
import { config } from './config';
import Logger from 'bunyan';

const log: Logger = config.createLogger('setupDatabase');

export const ConnectDatabase = () => {
  const connect = async () => {
    mongoose.set('strictQuery', true);

    if (mongoose.connection.readyState > 1) {
      return;
    }

    try {
      await mongoose
        .connect(config.DATABASE_URL, {
          useNewUrlParser: true,
          useUnifiedTopology: true
        })
        .then(() => {
          log.info('Successfully Connected to database!');
        });
    } catch (error) {
      log.error('Unable to connect to the mongodb instance. Error: ', error);
      process.exit(1);
    }
  };

  connect();
  mongoose.connection.on('disconnected', connect);
};
