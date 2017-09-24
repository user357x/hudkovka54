'use strict';

module.exports = (req, res, next) => co(function* () {

    const slides = yield fs.readDir(`${__dirname}/../result/img/slider`);

    const html = yield save(
        res,
        {
            title : 'Художественная ковка',
            description : 'Художественная ковка в Новосибирске и Сибирском регионе.',
            keywords : [
                'художественная ковка',
                'ковка',
                'кованые изделя'
            ],
            scripts: ['slider'],
            block : 'home',
            slides : slides,
            content: {
                header: 'Здравствуйте!<br />Добро пожаловать в мир Художественной ковки!',
                paragraphs: [
                    'Для начала немного о том, что такое вообще <b>художественная ковка</b> и <b>кованые изделия</b>. В нынешние времена царит эпоха технического прогресса, следствием чего является массовое внедрение машинного производства во все сферы его отраслей. Ковку это так же не обошло стороной. Производители кованых изделий в погоне за количеством начинают гнать так называемую «штамповку», используя при этом специальные станки. Не трудно догадаться, что все изделия у них получаются однотипными, одноликими и бездушными, конечно такой метод приемлем, если Вам необходимо изготовить 3 километра металлического забора, но если Вас интересует индивидуальный, креативный подход, чтобы интерьер Вашего дома, квартиры, усадьбы, дачи отличался своей индивидуальностью, то Вы попали по адресу.',
                    'В нашей организации Вы можете заказать абсолютно любые кованые изделия, такие как - <a href="/kovanye-perila.html">кованые перила</a>, <a href="/kovanye-reshotki.html">кованые решётки</a>, <a href="/kovanye-zabory.html">кованые ограды</a>, <a href="/kovanye-vorota.html">кованые ворота</a>, <a href="/kovanaya-mebel.html">кованая мебель</a>, <a href="/kovanye-zabory.html">кованый забор</a>, <a href = "/kovanye-lestnitsy.html">кованые лестницы</a>, <a href="/kovanaya-arhitektura.html">кованая беседка</a>, <a href="/ritualnaya-kovka.html">кованые оградки на кладбище</a> и <a href="/production.html">т.д.</a> Мы можем выполнить заказ, как по Вашим чертежам и эскизам, так и полностью разработать с нуля индивидуальный дизайнерский проект.',
                    'Главным преимуществом нашей организации является большой опыт. Нам доверяют серьёзные проекты областного масштаба, как в Новосибирске, так и за его пределами, такие как: символика Заельцовского района, реставрация краеведческого музея на площади Ленина, <a href="/kovanaya-chasovnja.html">часовня в честь святых Петра и Февронии Муромских</a> в центре элитного посёлка "Элеонор", Томская область.'
                ]
            }
        },
        __filename
    );

    res.send(__filename);

}).catch(next);