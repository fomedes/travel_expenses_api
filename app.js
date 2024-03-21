import dotenv from 'dotenv';
dotenv.config();

import cookieParser from 'cookie-parser';
import express, { json } from 'express';
import { corsMiddleware } from './middlewares/cors.js';
import categoryRouter from './routes/category.js';
import loginRouter from './routes/login.js';
import planRouter from './routes/plan.js';
import transactionRouter from './routes/transactions.js';
import userRouter from './routes/user.js';


import './mongo.js';
// import './thenounproject.js';

const app = express()

app.use(json())
app.use(corsMiddleware())
app.use(cookieParser())

app.disable('x-powered-by')

app.use('/api/transactions', transactionRouter);

app.use('/api/users', userRouter);

app.use('/api/categories', categoryRouter);

app.use('/api/plans', planRouter);

app.use('/api/login', loginRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});