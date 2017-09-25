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
            title : `Кованые заборы`,
            description : `Здесь представлены кованые заборы и кованые ограды.`,
            keywords : [
                `кованые заборы`,
                `кованые заборы фото`,
                `кованые ограды`,
                `кованые ограды фото`
            ],
            styles: ['photoswipe', 'default-skin'],
            scripts: ['photoswipe.min', 'photoswipe-ui-default.min', 'gallery'],
            block : 'product',
            content: {
                header: `Кованые заборы`,
                paragraphs: [
                    `Кованые заборы и кованые ограды созданы для разграничения территории и поэтому в первую очередь их функциональное предназначение это - безопасность.`,
                    `Пролеты забора могут крепиться как на металлические так и на каменные (кирпичные) столбы, украшенные коваными навершиями.
                    Так же в изготовлении кованых заборов применяются другие природные материалы, как правило это - дерево или камень.`,
                    `В украшении кованых заборов и кованых оград используются различные заостренные формы - пики, оттяжки, листья и т. д., 
                    что обусловлено соображениями безопасности и способно сделать Вашу личную территорию безопасной и неприступной.`,
                ]
            },
            gallery: gallery
        },
        filename
    );

    res.status(200).send(filename);

}).catch(next);