'use strict';

//const request = require(`superagent`);
const co = require(`co`);
const fs = require(`./lib/fs`);
const config = require(`./config`);

const xmlParser = require(`${__dirname}/lib/xmlParser`);

const agent = require("superagent");

const request = route => new Promise((resolve, reject) => {

    console.log(route);

    setTimeout(() => {
        agent
            .get(`${config.host}:${config.port}${route}`)
            .end((err, res) => {
                if(err) {
                    reject(err);
                }
                else {
                    resolve(res);
                }
            });
    }, 3000);
});

co(function* () {

    let routes;

    if(process.argv.length > 2) {
        routes = process.argv.slice(2).map(route => `/${route}`);
    }
    else {
        const siteMapXml = yield fs.readFile(`${__dirname}/result/sitemap.xml`);
        const map = yield xmlParser(siteMapXml);
        routes = map.urlset.url.map(item => item.loc[0].split('hudkovka54.ru')[1].split('.')[0]);
    }

    console.log(routes);

    //yield Promise.all(routes.map(request));

    for(let i = 0; i < routes.length; i++) {
        yield request(routes[i]);
    }




}).catch(console.error);