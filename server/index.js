import cors from 'cors';
import path from 'path';
import fs from 'fs-extra';
import morgan from 'morgan';
import dotenv from 'dotenv';
import webpack from 'webpack';
import express from 'express';
import winston from 'winston';
import mongoose from 'mongoose';
import yields from 'express-yields';
import bodyParser from 'body-parser';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

import config from '../webpack.config.babel';

// routes
import routes from './routes';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    silent: true,
    debug: true,
    path: path.join(__dirname, '../.env'),
  });
}

const app = express();
const router = express.Router();
const port = process.env.PORT || 1237;
const dbUrl = process.env.MONGODB_URI;

/***** DB Config *****/
mongoose.connect(dbUrl, { useNewUrlParser: true });

// for testing purposes
const db = mongoose.connection;
/***** End of DB Config *****/

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('dev'));

app.use(express.static("public"));

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(config);

  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
  }));

  app.use(webpackHotMiddleware(compiler));
}

routes(router);
app.use('/api', router);

app.get(['/'], function* (req, res) {
  let index = yield fs.readFile('./public/_index.html', 'utf-8');

  res.send(index);
});

/**** static html ****/
app.use('/static', express.static("static-pages"));
/**** end static html ****/

// error handler
app.use((err, req, res, next) => {
  // winston.error(err);
  // console.error(err)
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    res.status(500).send();
  }
});

app.listen(port, () => winston.info(`Server listening on ${port}`));

export default app;
export { db };
