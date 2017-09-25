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
            title : `Кованая часовня`,
            description : `Здесь представлена кованая часовня в честь святых Петра и Февронии Муромских в центре элитного посёлка Элеонор, Томская область`,
            keywords : [
                'кованая часовня',
                'кованая часовня фото',
                'посёлок Элеонор',
            ],
            styles: ['photoswipe', 'default-skin'],
            scripts: ['photoswipe.min', 'photoswipe-ui-default.min', 'gallery'],
            block : 'product',
            content: {
                header: `Кованая часовня`,
                paragraphs: [
                    `В посёлке Элеонор, Томская область, в 2012 году нами была возведена Часовня в честь святых Петра и Февронии Муромских.`,
                    `Творение имеет высоту 7 метров, массу 4 тонны и на 100% состоит из кованых элементов, каждая ягодка в виноградных гроздях, каждый листочек, каждый сантиметр виноградной лозы - всё выковано в ручную, без использования готовых элементов и станков.`,
                    `Всё это было сделано по одной простой причине - если-бы в процессе изготовления использовались станки, то это была-бы уже не художественная ковка, а дешёвая штамповка, чем мы в принципе не занимаемся...`
                ]
            },
            gallery: gallery
        },
        filename
    );

    res.status(200).send(filename);

}).catch(next);