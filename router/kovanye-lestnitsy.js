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
            title : `Кованые лестницы`,
            description : `Здесь представлены кованые лестницы.`,
            keywords : [
                'кованые лестницы',
                'кованые лестницы фото',
                'винтовая лестница',
                'винтовая лестница фото',
                'кованая винтовая лестница'
            ],
            styles: ['photoswipe', 'default-skin'],
            scripts: ['photoswipe.min', 'photoswipe-ui-default.min', 'gallery'],
            block : 'product',
            content: {
                header: `Кованые лестницы`,
                paragraphs: [
                    `Изысканный и утончённый вид Вашему дому могут придать кованые лестницы, как наружные так и внутренние. 
                    Винтовая кованая лестница - это не только практичное и удобное сооружение, но ещё и предмет интерьера, способный подчеркнуть Вашу индивидуальность.`,
                    `В нашей кузнице Вы можете заказать кованые лестницы любых габаритов и геометрических форм, а наши дизайнеры и инженеры сделают все необходимые расчёты, так что лестницы в Вашем доме были не только красивые, но и безопасные.`
                ]
            },
            gallery: gallery
        },
        filename
    );

    res.status(200).send(filename);

}).catch(next);