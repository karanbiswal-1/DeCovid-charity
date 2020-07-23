const routes = require('next-routes')();

routes
    .add('/hospitals/register', '/hospitals/register')
    .add('/hospitals/:address', '/hospitals/details')
    .add('/validations/:address', 'validations/validate')
    .add('/hospitals/:address/withdraw','/hospitals/withdraw')
    .add('/hospitals/:address/contributerList', '/hospitals/contributerList')
    .add('/hospitals/:address/requests', '/hospitals/requests/index')
    .add('/hospitals/:address/requests/create', '/hospitals/requests/create');

module.exports = routes;