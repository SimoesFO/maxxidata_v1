import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import 'reflect-metadata';
import './database/connection';
import errorHandler from './errors/handler-errors';
import routes from './routes';

const PORT = process.env.APP_PORT;
const HOST = process.env.APP_HOST;

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, HOST, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${PORT}`);
});
