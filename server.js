const {createServer} = require('http');
const next = require('next');

const app = next({
    dev: process.env.NODE_ENV !== 'production',
   conf: {
       webpack: config => {
           config.devtool = false;

           for (const r of config.module.rules) {
               if (r.loader === 'babel-loader'){
                   r.options.sourceMaps = false;
               }
           }
           return config;
       }
   } 
});

const routes = require('./routes');
const { config } = require('process');
const handler = routes.getRequestHandler(app);

app.prepare().then(() => {
    createServer(handler).listen(3000, err => {
        if (err) throw err;
        console.log('ready on localhost:3000');
    });
});