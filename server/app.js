import express from 'express';
import next from 'next';
import cors from 'cors';
import logger from 'morgan';
import bodyParser from 'body-parser';
import 'dotenv/config';
import 'source-map-support/register';
import apiRouter from './api';
import favicon from 'serve-favicon';
import path from 'path';
import compression from 'compression';

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

// next(opts: object)
//  option: dev (bool) whether to launch Next.js in dev mode - default false
// dir (string) where the Next project is located - default '.'
// quiet (bool) Hide error messages containing server information - default  false
// conf (object) the same object you would use in next.config.js - default {}
const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();
    server.use(logger('dev'));
    server.use(cors());
    server.use(compression());
    server.use(bodyParser.json());
    server.use(bodyParser.urlencoded({ extended: true }));
    server.use(favicon(path.join(__dirname, '../static', 'favicon.ico')));
    server.use('/api', apiRouter);
    server.get('*', (req, res) => handle(req, res));

    server.listen(PORT, (err) => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${PORT}`);
    });
  })
  .catch((ex) => {
    console.error(`Server do not started because: ${ex}`);
    process.exit(1);
  });
