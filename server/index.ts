import express from 'express';
import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './ormconfig';
const port: number = /*process.env.PORT || */3333;

// Controllers
import {WelcomeController} from './controllers/welcome';

(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app: express.Application = express();

  // register routes
  app.use('/welcome', WelcomeController);

  app.listen(port, () => {
      // Success callback
      console.log(`Listening at http://localhost:${port}/`);
  });
})();
