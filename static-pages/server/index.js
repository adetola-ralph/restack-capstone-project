import express from 'express';
import winston from 'winston';
import bodyParser from 'body-parser';
import fs from 'fs-extra';
import path from 'path';
import morgan from 'morgan';
import yields from 'express-yields';
import cors from 'cors';

const app = express();
const router = express.Router();
const port = process.env.PORT || 1237;

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
