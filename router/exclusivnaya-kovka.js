'use strict';

const im = require('imagemagick');

module.exports = (req, res, next) => co(function* () {

    const filename = __filename.split('/').reverse()[0].split('.')[0];

    //const gallery = yield co(getGallery(filename));

    const gallery_src = `/img/gallery/${filename}`;

    const gallery_path = `${result_path}${gallery_src}`;

    const small_gallery_src = `${gallery_src}/small`;

    const small_gallery_path = `${result_path}${small_gallery_src}`;

    const items = yield fs.readDir(gallery_path);

    const images = items.filter(img => img.split('.').length === 2);

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

    res.status(200).send(filename);

    /*yield save(
        res,
        {
            title : `Эксклюзив`,
            description : `Здесь представлены эксклюзивные кованые изделия.`,
            keywords : [
                'кованые цветы',
                'кованые подсвечники',
                'кованая люстра',
                'кованый светильник',
                'кованые розы'
            ],
            styles: ['photoswipe', 'default-skin'],
            scripts: ['photoswipe.min', 'photoswipe-ui-default.min', 'gallery'],
            block : 'product',
            content: {
                header: 'Эксклюзив',
                paragraphs: [
                    `В этом разделе представлены эксклюзивные кованые изделия.`,
                    `Давайте отправимся на двести, триста лет назад, во времена когда художественная ковка использовалась практически повсеместно. 
                    Мастера той эпохи не использовали никаких машин, станков и сварочных аппаратов - всё делалось вручную!
                    От этого каждая их деталь, каждый завиток, каждый листочек получали свою индивидуальность и были единственными в своём роде.
                    С первого взгляда на эти произведения, невозможно отличить их от творений самой природы!`,
                    `Весьма оригинально и впечатляюще выглядит кованая люстра или кованые светильники выполненные в стиле средневековья.
                    Такими люстрами в старину украшали свои усадьбы и замки знатные личности.
                    А такая тонкая работа как кованые подсвечники, кованые розы, кованые цветы, которые с первого взгляда нельзя отличить от настоящих - истинный шедевр кузнечного мастерства!`
                ]
            },
            gallery: gallery
        },
        filename
    );*/



}).catch(next);