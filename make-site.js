'use strict';

const request = require(`superagent`);
const co = require(`co`);
const fs = require(`./lib/fs`);

const xmlParser = require(`${__dirname}/lib/xmlParser`);

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

    yield Promise.all(routes.map(route => request.get(`http://localhost:3000${route}`)));

}).catch(console.error);