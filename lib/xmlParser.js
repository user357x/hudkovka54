'use strict';

const parser = require('xml2js').parseString;

module.exports = xml => new Promise(
    (resolve, reject) => parser(xml, (error, result) => {
        error ? reject(error) : resolve(result);
    })
);
