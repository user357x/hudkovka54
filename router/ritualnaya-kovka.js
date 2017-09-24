'use strict';

module.exports = (req, res, next) => co(function* () {

    const filename = __filename.split('/').reverse()[0].split('.')[0];

    const gallery = yield co(getGallery(filename));

    const html = yield save(
        res,
        {
            title : ``,
            description : ``,
            keywords : [],
            styles: ['photoswipe', 'default-skin'],
            scripts: ['photoswipe.min', 'photoswipe-ui-default.min', 'gallery'],
            block : 'product',
            content: {
                header: ``,
                paragraphs: [
                    ``,
                ]
            },
            gallery: gallery
        },
        filename
    );

    res.send(filename);

}).catch(next);