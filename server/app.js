const express = require('express');
const next = require('next');
require('dotenv/config');
// import apiRouter from './api';

const PORT = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';

// next(opts: object)
//  option: dev (bool) whether to launch Next.js in dev mode - default false
// dir (string) where the Next project is located - default '.'
// quiet (bool) Hide error messages containing server information - default  false
// conf (object) the same object you would use in next.config.js - default {}
const app = next({ dev });

const handle = app.getRequestHandler();

app.prepare()
    .then(() => {
        const server = express();

        // server.use('/api', apiRouter);

        server.get('*', (req, res) => handle(req, res));

        server.listen(PORT, err => {
            if (err) throw err;
            console.log(`> Ready on http://localhost:${PORT}`);
        });
    })
    .catch(ex => {
        console.error(ex);
        process.exit(1);
    });
