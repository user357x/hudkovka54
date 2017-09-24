'use strict';

const winston = require('winston');

const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.Console)({ level: 'error' }),
        new (winston.transports.File)({
            filename: 'error.log',
            level: 'error'
        })
    ]
});

module.exports = (err, req, res, next) => co(function* () {

    const isHttp = err instanceof error.Http;
    const status = isHttp ? err.status : 500;
    const message = isHttp ? err.message : 'Произошла неизвестная ошибка!';

    if(isHttp) {
        if(status === 401)
            res.redirect('/login');
        else {
            logger.log('httpError', err);
            res.status(status).render('layout', {
                content: message,
                state: {},
                environment: ENV
            });
        }
    }
    else {
        if(ENV === 'production')
            logger.log('error', err);
        else
            console.error(err);

        res.status(status).render('layout', {
            content: message,
            state: JSON.stringify({}),
            environment: ENV
        });
    }

}).catch(next);