'use strict';

module.exports = (req, res, next) => co(function* () {

    const html = yield save(
        res,
        {
            title : 'Наша продукция',
            description : 'Здесь представлена продукция компании Художественная ковка.',
            keywords : [
                `кованые изделия`,
                `кованые изделия купить`,
                `кованые изделия фото`,
                `кованые элементы`,
                `кованые элементы купить`
            ],
            block : 'production',
            content: {
                header: 'Наша продукция',
                paragraphs: [
                    `Здесь представлена наша продукция - основные виды изделий художественной ковки.`,
                    `У нас в можете заказать или купить кованые изделия любой сложности, независимо от форм и размеров, 
                    так же возможен заказ кованых элементов по отдельности - всё зависит от Вашего желания!`,
                    `Первостепенная задача мастера художественной ковки, сделать так, чтобы его творения гармонично вписывались в окружающую обстановку и в то же время сохраняли свою индивидуальность, выразительность и не терялись в архитектурном окружении.`,
                    `В проектировании изделий художественной ковки мы учитываем индивидуальный интерьер объекта, окружающую архитектуру, ландшафтный дизайн.`
                ]
            },
            products : [
                {
                    href : '/kovanye-perila.html',
                    title : 'Кованые перила',
                    img : '/img/menu/perila.jpg'
                },
                {
                    href : '/kovanye-reshotki.html',
                    title : 'Кованые решётки',
                    img : '/img/menu/reshotki.jpg'
                },
                {
                    href : '/kovanye-zabory.html',
                    title : 'Кованые заборы',
                    img : '/img/menu/ogrady.jpg'
                },
                {
                    href : '/kovanye-vorota.html',
                    title : 'Кованые ворота',
                    img : '/img/menu/vorota.jpg'
                },
                {
                    href : '/kovanaya-mebel.html',
                    title : 'Кованая мебель',
                    img : '/img/menu/mebel.jpg'
                },
                {
                    href : '/kovanaya-arhitektura.html',
                    title : 'Архитектура',
                    img : '/img/menu/architecture.jpg'
                },
                {
                    href : '/exclusivnaya-kovka.html',
                    title : 'Эксклюзив',
                    img : '/img/menu/exclusive.jpg'
                },
                {
                    href : '/kovanaya-chasovnja.html',
                    title : 'Кованая часовня',
                    img : '/img/menu/chasovnja.jpg'
                },
                {
                    href : '/kovanye-lestnitsy.html',
                    title : 'Кованая лестница',
                    img : '/img/menu/lestnitsa.jpg'
                },
                /*{
                    href : '/ritualnaya-kovka.html',
                    title : 'Для кладбища',
                    img : '/img/menu/ritual.jpg'
                }*/
            ]
        },
        __filename
    );

    res.send(__filename);

}).catch(next);