import express from 'express';

// Controllers
import {WelcomeController} from './controllers/welcome';

const app: express.Application = express();
const port: number = /*process.env.PORT || */3333;

// Mount the WelcomeController at the /welcome route
app.use('/welcome', WelcomeController);

// Serve the application at the given port
app.listen(port, () => {
    // Success callback
    console.log(`Listening at http://localhost:${port}/`);
});
