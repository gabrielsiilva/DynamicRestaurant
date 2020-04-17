import express from 'express';
import http from 'http';
import cors from 'cors';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import io from 'socket.io';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.app = express();
    this.server = http.Server(this.app);

    Sentry.init(sentryConfig);

    this.socket();

    this.middlewares();
    this.routes();
    // this.exceptionHandler();
  }

  socket() {
    this.io = io(this.server);

    this.io.on('connection', (socket) => {
      console.log(socket.id);

      socket.on('disconnect', () => {
        console.log('user disconnected');
      });
    });
  }

  middlewares() {
    this.app.use(Sentry.Handlers.requestHandler());
    this.app.use(cors());
    this.app.use(express.json());

    this.app.use((req, res, next) => {
      req.io = this.io;
      next();
    });
  }

  routes() {
    this.app.use('/api/v1', routes);
  }

  exceptionHandler() {
    this.app.use(async (err, req, res, next) => {
      if ('development') {
        const errors = await new Youch(err, req).toJSON();
        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
