import dotenv from 'dotenv';
dotenv.config();

import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import transactionRouter from './routes/transactions.js';
import userRouter from './routes/user.js';

import './mongo.js';

const app = express()

app.use(json())
app.use(corsMiddleware())
app.disable('x-powered-by')

app.use('/api/transactions', transactionRouter);

app.use('/api/users', userRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});