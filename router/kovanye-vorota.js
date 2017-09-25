'use strict';

module.exports = (req, res, next) => co(function* () {

    const filename = __filename.split('/').reverse()[0].split('.')[0];

    //const gallery = yield co(getGallery(filename));

    const gallery_src = `/img/gallery/${filename}`;

    const gallery_path = `${result_path}${gallery_src}`;

    const small_gallery_src = `${gallery_src}/small`;

    const small_gallery_path = `${result_path}${small_gallery_src}`;

    const items = yield fs.readDir(gallery_path);

    const images = items.filter(img => img.split('.').length === 2);

    const gallery = yield Promise.all(
        images.map(img => {
            return new Promise((resolve, reject) => {

                console.log(`${gallery_path}/${img}`);

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

    console.log(gallery);

    const html = yield save(
        res,
        {
            title : `Кованые ворота`,
            description : `Здесь представлены кованые ворота.`,
            keywords : [
                `кованые ворота`,
                `кованые ворота фото`,
                `кованые калитки`,
                `кованые калитки фото`
            ],
            styles: ['photoswipe', 'default-skin'],
            scripts: ['photoswipe.min', 'photoswipe-ui-default.min', 'gallery'],
            block : 'product',
            content: {
                header: `Кованые ворота`,
                paragraphs: [
                    `Кованые ворота - это проезд в стене или ограде, оснащённый запираемыми створами, 
                    выполненными, как правило из металла (но возможно и из дерева) с применением элементов художественной ковки.`,
                    `Распашные ворота - классический способ открывания створов, предполагают свободное пространство спереди или сзади въезда на территорию участка.`,
                    `Вместе с коваными воротами, как правило, изготавливаются кованые калитки, которые служат для прохода людей на огороженную территорию.`,
                    `Откатные кованые ворота - открываются при помощи системы роликов, влево или вправо, возможно и в обе стороны.
                    При открывании не занимают полезного пространства, так как открываются вдоль ограждения или фасада строения, в зависимости от расположения проезда на участок.`,
                    `Как откатные так и распашные кованые ворота, могут быть оснащены автоматическими приводами, домофоном и системой видеонаблюдения.`,
                ]
            },
            gallery: gallery
        },
        filename
    );

    res.status(200).send(filename);

}).catch(next);