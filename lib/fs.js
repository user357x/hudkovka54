'use strict';

const fs = require('fs');

module.exports = {

    readFile: path => new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, res) => {
            err ? reject(err) : resolve(res);
        });
    }),

    readDir: path => new Promise((resolve, reject) => {
        fs.readdir(path, (err, items) => {
            err ? reject(err) : resolve(items);
        });
    }),

    readJson: path => new Promise((resolve, reject) => {
        fs.readFile(path, 'utf8', (err, res) => {
            err ? reject(err) : resolve(JSON.parse(res));
        });
    }),

};