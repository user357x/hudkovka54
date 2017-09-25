"use strict";

const config = require(`${__dirname}/config`);

global.express = require('express');
global.co = require(`co`);
global.im = require('imagemagick');
global.fs = require(`${__dirname}/lib/fs`);
global.save = require(`${__dirname}/lib/save`);
global.getGallery = require(`${__dirname}/lib/getGallery`);
global.result_path = config.result_path;

global.ENV = config.environment;
const favicon = require('express-favicon');
const router = require(`${__dirname}/router`);

const static_app = express();
static_app.use(express.static(`${__dirname}/result`));
static_app.listen(config.static_port, () => console.log('static_app ' + config.static_port));

const app = express();
app.disable(`x-powered-by`);
app.engine('ejs', require('ejs-locals'));
app.set('views', `${__dirname}/template`);
app.set('view engine', 'ejs');
app.use(favicon(`${__dirname}/result/img/favicon.ico`));
app.use(router);
app.use((err) => console.log(err));
app.listen(config.port, () => {
    console.log('app listening on port ' + config.port);
});