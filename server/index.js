import cors from 'cors';
import path from 'path';
import fs from 'fs-extra';
import morgan from 'morgan';
import dotenv from 'dotenv';
import express from 'express';
import winston from 'winston';
import mongoose from 'mongoose';
import yields from 'express-yields';
import bodyParser from 'body-parser';

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
/***** End of DB Config *****/

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'));

// error handler
app.use((err, req, res) => {
  console.error(err);
  if (err.isBoom) {
    res.status(err.output.statusCode).json(err.output.payload);
  } else {
    res.status(500).send();
  }
});

app.listen(port, () => winston.info(`Server listening on ${port}`));
