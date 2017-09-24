'use strict';

const im = require('imagemagick');

module.exports = filename => function* () {

    const gallery_src = `/img/gallery/${filename}`;

    const gallery_path = `${result_path}${gallery_src}`;

    const small_gallery_src = `${gallery_src}/small`;

    const small_gallery_path = `${result_path}${small_gallery_src}`;

    const items = yield fs.readDir(gallery_path);

    const images = items.filter(img => img.split('.').length === 2);

    /*
    yield Promise.all(
        images.map(img => {
            return new Promise((resolve, reject) => {
                im.resize({
                    srcPath: `${gallery_path}/${img}`,
                    dstPath: `${small_gallery_path}/${img}`,
                    width: 150
                }, err => err ? reject(err) : resolve());
            })
        })
    );
    */

    return yield Promise.all(
        images.map(img => {
            return new Promise((resolve, reject) => {
                im.identify(`${gallery_path}/${img}`, (err, features) => {
                    err ? reject(err) :
                        resolve({
                            width : features.width,
                            height : features.height,
                            src : `${gallery_src}/${img}`,
                            smallSrc : `${small_gallery_src}/${img}`
                        })
                });
            })
        })
    );
};