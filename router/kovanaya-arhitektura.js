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
            title : `Кованая архитектура`,
            description : `Здесь представлены малые архитектурные формы художественной ковки`,
            keywords : [
                'кованые козырьки',
                'кованые фонари',
                'кованые уличные фонари',
                'кованые скамейки',
                'кованые урны',
                'кованые беседки',
                'кованые мангалы'
            ],
            styles: ['photoswipe', 'default-skin'],
            scripts: ['photoswipe.min', 'photoswipe-ui-default.min', 'gallery'],
            block : 'product',
            content: {
                header: `Кованая архитектура`,
                paragraphs: [
                    `Если Вас интересуют архитектурные формы с применением художественной ковки - нет проблем! 
                    Ландшафтный дизайн основанный на художественной ковке - такое направление было трендом во все времена.`,
                    `Кованые козырьки над входом в Ваше жилище имеют не только функциональное назначение, но и эстетическое, потому-что это просто красиво.
                    Кованые фонари, стоящие во дворе или вдоль улочек сада, подчеркивают аристократический стиль Вашего дома или усадьбы,
                    а так же для сада мы можем порекомендовать кованые скамейки в сочетании с коваными урнами.
                    Если Вы любите отдыхать на свежем воздухе, то в этом случае мы можем сделать специально для Вашего участка кованую беседку и кованый мангал, 
                    чтобы Вы могли в полной мере насладиться отдыхом и отлично провести время со своими друзьями и близкими.`,
                ]
            },
            gallery: gallery
        },
        filename
    );

    res.status(200).send(filename);

}).catch(next);