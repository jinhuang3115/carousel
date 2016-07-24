/**
 * Created by jin on 16/7/22.
 */
require('base');
require('normalize');
require('index.scss');

const Carousel = require('carousel');

let images = [
    {
        title: 'slide1',
        src: require('slide1')
    },
    {
        title: 'slide2',
        src: require('slide2')
    },
    {
        title: 'slide3',
        src: require('slide3')
    }
];

let carousel = new Carousel('#main', images);
