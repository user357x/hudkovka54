'use strict';

const fs = require('fs');
const merge = require('lodash.mergewith');
const isArray = require('lodash.isarray');

function customizer(objValue, srcValue) {
    if (isArray(objValue)) {
        return objValue.concat(srcValue);
    }
}

const common = {
    menu_items: [
        {
            title: `здравствуйте`,
            href: `/`
        },
        {
            title: `творения`,
            href: `/production.html`
        },
        {
            title: `мы`,
            href: `/about.html`
        },
        {
            title: `на карте`,
            href: `/contacts.html`
        },
        {
            title: `как-то так`,
            href: `/kak-to-tak.html`
        }
    ],
    styles: ['main'],
    scripts: []
};



module.exports = (res, data, path) => new Promise((resolve, reject) => {

    const merged = merge({}, common, data, customizer);

    console.log(merged.menu_items)

    res.render(
        "layout",
        merged,
        (err, html) => {
            if(err)
                reject(err);
            else {
                const arr = path.split('/');
                let file_name;
                if(arr.length === 1) {
                    file_name = arr[0];
                }
                else {
                    file_name = arr.reverse()[0].split('.')[0];
                }
                fs.writeFile(`${result_path}/${file_name === 'home' ? 'index' : file_name}.html`, html);

                //console.log(html);

                //res.send(html);
                resolve(html);
            }
        }
    )
});
