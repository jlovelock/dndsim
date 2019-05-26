import express from 'express';
import * as bodyParser from 'body-parser';
import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import config from './ormconfig';
const port: number = /*process.env.PORT || */3333;

import errorMiddleware from './utils/errorMiddleware';

// Controllers
import CharacterController from './controllers/character';

(async () => {
  try {
    await createConnection(config);
  } catch (error) {
    console.log('Error while connecting to the database', error);
    return error;
  }
  const app: express.Application = express();
  app.use(bodyParser.json());

  // register routes
  const controllers = [
    new CharacterController()
  ];
  controllers.forEach((controller) => {
    app.use('/api', controller.router);
  });

  app.use(errorMiddleware);

  app.listen(port, () => {
      // Success callback
      console.log(`Listening at http://localhost:${port}/`);
  });
})();
