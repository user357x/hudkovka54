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
            title : `Кованые решетки`,
            description : `Здесь представлены кованые решетки.`,
            keywords : [
                `кованые решетки`,
                `кованые решетки фото`,
                `кованые решетки на окна`
            ],
            styles: ['photoswipe', 'default-skin'],
            scripts: ['photoswipe.min', 'photoswipe-ui-default.min', 'gallery'],
            block : 'product',
            content: {
                header: `Кованые решетки`,
                paragraphs: [
                    `Кованые решетки устанавливаются на окна, балконы, лоджии, двери. Предназначены для ограничения доступа посторонних лиц к Вашему жилищу и личной территории.
                    Но в то же время кованые решетки могут являться предметом интерьера и дизайна, украшая и дополняя его.`,
                    `Кованые решетки, украшенные различными элементами художественной ковки, такими как кованая виноградная лоза, акантовые листья, виноградные гроздья, цветы разукрашенные патиной, в разы увеличивают статус Вашего жилища, придают ему утонченный и более дорогой вид.`,
                    `У нас Вы можете заказать кованые решетки любых форм и размеров!`
                ]
            },
            gallery: gallery
        },
        filename
    );

    res.status(200).send(filename);

}).catch(next);