import app from './app';
import { config } from './config';
import connectDB from './config/db';

const port = config.port;

const start = async () => {
  await connectDB(); // Connect to (and create) the DB if it doesn't exist

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

start();
