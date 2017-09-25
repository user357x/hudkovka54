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
            title : `Кованые перила`,
            description : `Здесь представлены кованые перила`,
            keywords : [
                `кованые перила`,
                `кованые перила фото`,
                `кованые перила для лестниц`
            ],
            styles: ['photoswipe', 'default-skin'],
            scripts: ['photoswipe.min', 'photoswipe-ui-default.min', 'gallery'],
            block : 'product',
            content: {
                header: `Кованые перила`,
                paragraphs: [
                    `Кованые перила являются разновидностью кованых ограждений. Имеют высоту не менее 90 см.`,
                    `С одной стороны кованые перила созданы для комфортного передвижения по лестничным маршам, а с другой - способны украсить Ваш дом, добавить его стилю и дизайну неповторимости и изысканности.`,
                    `У нас Вы можете заказать как кованую лестницу в сборе (входную группу для крыльца или веранды) так и кованые элементы по отдельности, например кованые балясины, кованые поручни.`,
                ]
            },
            gallery: gallery
        },
        filename
    );

    res.status(200).send(filename);

}).catch(next);