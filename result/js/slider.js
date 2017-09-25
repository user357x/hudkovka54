"use strict";

function Slider(selector) {

    var self = this,
        i = 0,
        interval = 3000,
        images = hkSlider,
        block = document.querySelector(selector);

    this.start = function () {

        images.forEach(function (img) {
            new Image().src = "../img/slider/" + img;
        });

        setTimeout(function next() {
            console.log(images[i]);
            block.style.backgroundImage = "url('../img/slider/" + images[i] + "')";
            i = i + 1 === images.length ? 0 : i + 1;
            setTimeout(next, interval);
        }, interval);
    }

}

new Slider('#slider').start();