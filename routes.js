const routes = require('next-routes')();

routes
    .add('/hospitals/register', '/hospitals/register')
    .add('/hospitals/:address', '/hospitals/details')
    .add('/hospitals/:address/withdraw','/hospitals/withdraw')
    .add('/hospitals/:address/contributerList', '/hospitals/contributerList')

module.exports = routes;