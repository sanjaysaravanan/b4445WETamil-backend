import express from 'express';
import cors from 'cors';

import { logSomething } from './utils.js';

import connectToDb from './db-utils/mongoos-connection.js';

import todoRouter from './routes/todos.js';
import userRouter from './routes/users.js';
import authRouter from './routes/app-users.js';

var todos = [
  { id: "2", title: 'Run', isComplete: true, dueDate: '2023-08-31' },
  { id: "3", title: 'Sleep', isComplete: true, dueDate: '2023-08-27' },
  { id: "1", title: 'Dance', isComplete: true, dueDate: '2023-08-30' }
];

// const express = require('express');

// const { logSomething } = require('./utils');

const app = express();

const PORT = process.env.PORT || 5050;

// Top/Global Level await
await connectToDb();

app.use(express.static('public'));

app.use(cors());

app.use(express.json());

app.use('/api/todos', todoRouter);
app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);

app.get('/api', (req, res) => {
  res.send({ 'name': 'B4445WETAMIL', students: 25 });
});

// path params
app.get('/api/:name', (req, res) => {

  // Get the path params
  res.send({ path: req.params, query: req.query });
});

app.listen(PORT, () => {
  console.log('Application Started on 5050');
  logSomething();
});