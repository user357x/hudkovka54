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
            title : `Кованая мебель`,
            description : `Здесь представлена кованая мебель и предметы быта.`,
            keywords : [
                'кованая мебель',
                'кованая мебель фото',
                'кованые вешалки',
                'кованые столы',
                'кованые стулья',
                'кованые люстры',
                'кованые подсвечники',
                'набор для камина кованый',
                'кованые поленницы',
            ],
            styles: ['photoswipe', 'default-skin'],
            scripts: ['photoswipe.min', 'photoswipe-ui-default.min', 'gallery'],
            block : 'product',
            content: {
                header: `Кованая мебель`,
                paragraphs: [
                    `Кованая мебель всегда являлась одним из трендов дизайна и внутреннего интерьера жилища, а так же воплощением средневекового стиля.`,
                    `Наши мастера добились больших высот в данном направлении.`,
                    `У нас можно заказать кованые вешалки в прихожую и кованые полки для обуви.`,
                    `Большой кованый стол, украшенный кованой виноградной лозой, листьями и другими элементами художественной ковки, в гарнитуре с дюжиной кованых 
                    стульев, способен придать вашей гостиной неповторимый шик и утончённость.`,
                    `Для спальни: кованые люстры в средневековом стиле, кованые подсвечники и большие кованые кровати - это всё удел истинных аристократов!`,
                    `Если же вы любите вечером расслабиться и посидеть у камина, то в нашей организации вам нарисуют и изготовят, специально под ваш интерьер, все необходимые аксессуары: 
                    кованая решётка для камина, кованый набор для камина (лопатка, кочерга, щипцы, щётка), кованая поленница.`,
                    `В изготовлении кованой мебели, наряду с металлом, нами широко применяются инсталляции из других природных материалов, таких как дерево, камень, натуральная кожа, стекло и т.д.`,
                ]
            },
            gallery: gallery
        },
        filename
    );

    res.status(200).send(filename);

}).catch(next);