'use strict';

const im = require('imagemagick');
const config = require(`${__dirname}/config`);
const co = require(`co`);
const fs = require(`./lib/fs`);

const xmlParser = require(`./lib/xmlParser`);

co(function* () {

    const siteMapXml = yield fs.readFile(`${__dirname}/result/sitemap.xml`);

    const map = yield xmlParser(siteMapXml);



    const urls = map.urlset.url;

    let filename;

    for(let i = 0; i < urls.length; i++) {

        console.log(urls[i]);

        filename = urls[i].loc[0].split('hudkovka54.ru')[1].split('.')[0];

        const gallery_src = `/img/gallery/${filename}`;

        console.log(`/img/gallery/${filename}`);

        const gallery_path = `${config.result_path}${gallery_src}`;

        const small_gallery_src = `${gallery_src}/small`;

        const small_gallery_path = `${config.result_path}${small_gallery_src}`;

        const files = yield fs.readDir(gallery_path);

        const images = files.filter(img => img.split('.').length === 2);

        yield Promise.all(
            images.map(img => {
                return new Promise((resolve, reject) => {
                    im.resize({
                        srcPath: `${gallery_path}/${img}`,
                        dstPath: `${small_gallery_path}/${img}`,
                        width: config.smallImgWidth
                    }, err => err ? reject(err) : resolve());
                })
            })
        );

    }

    /*
    const promises = urls.map(item => {

        filename = item.loc[0].split('hudkovka54.ru')[1].split('.')[0];

        const gallery_src = `/img/gallery/${filename}`;

        const gallery_path = `${config.result_path}${gallery_src}`;

        const small_gallery_src = `${gallery_src}/small`;

        const small_gallery_path = `${config.result_path}${small_gallery_src}`;

        const items = yield fs.readDir(gallery_path);

        const images = items.filter(img => img.split('.').length === 2);

        yield Promise.all(
            images.map(img => {
                return new Promise((resolve, reject) => {
                    im.resize({
                        srcPath: `${gallery_path}/${img}`,
                        dstPath: `${small_gallery_path}/${img}`,
                        width: config.smallImgWidth
                    }, err => err ? reject(err) : resolve());
                })
            })
        );

    });

    yield Promise.all(promises);
    */

}).catch(console.error);