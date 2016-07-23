/**
 * Created by jin on 16/7/22.
 */
require('base');
require('normalize');
require('index.scss');

const Carousel = require('carousel');

let images = [
    require('slide1'),
    require('slide2'),
    require('slide3')
];

let carousel = new Carousel('#main', images);
