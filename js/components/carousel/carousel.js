/**
 * Created by jin on 16/7/22.
 */
require('carousel.sass');

class Carousel {
    constructor(id, images) {
        this.images = images;
        this.id = id;
        this.active = 0;
        this.len = this.images.length;
        this.isMobile = true;
        this.checkMobile();
        this.render();
        this.resize();
        this.bindEvent();
        this.animation = false;
        this.autoTimer = null;
        this.runTimer = null;
        this.runTimer = setTimeout(() => {
            this.autoRun();
        }, 2000);
    }

    checkMobile() {
        if (typeof window.ontouchstart === "undefined") {
            this.isMobile = false;
        }
    }

    createList() {
        let images = this.images;
        let _list = '';
        for (let i = 0, len = images.length; i < len; i++) {
            _list += '<li class="li">' +
                '<image class="img" src=' + images[i] + ' />' +
                '</li>';
        }
        return _list + '<li class="li">' + '<image class="img" src=' + images[0] + ' />' + '</li>';
    }

    render() {
        let _html = "<div class='module-carousel'>" +
            "<ul class='ul clearfix'>" +
            this.createList() +
            "</ul>" +
            "<a href='javascript:;' class='arrow-left'><em class='icon'></em></a>" +
            "<a href='javascript:;' class='arrow-right'><em class='icon'></em></a>" +
            "</div>";
        this.box = $(_html).appendTo($(this.id));
        this.imgList = this.box.find('.li');
        this.width = this.box.width();
        this.container = this.box.find('.ul');
    }

    resize() {
        this.arrowLeft = this.box.find('.arrow-left');
        this.arrowRight = this.box.find('.arrow-right');
        let top = (this.box.height() - this.arrowLeft.height()) / 2;
        this.arrowLeft.css({
            top: top + 'px'
        });
        this.arrowRight.css({
            top: top + 'px'
        });
        this.container.width(this.box.width() * (this.len + 1));
    }

    bindEvent() {
        let startX = 0;
        let firstX = 0;
        this.arrowLeft.on('mousedown', (e) => {
            if (!this.animation) {
                this.animation = true;
                this.active++;
                this.animate(this.active);
            }
        });

        this.arrowRight.on('mousedown', (e) => {
            if (!this.animation) {
                this.animation = true;
                this.active--;
                this.animate(this.active);
            }
        });
        if (!this.isMobile) {
            console.log(111)
            this.box.on('mouseover', (e) => {
                this.arrowLeft.show();
                this.arrowRight.show();
                clearTimeout(this.autoTimer);
                this.autoTimer = null;
                clearTimeout(this.runTimer);
                this.runTimer = null;
            });

            this.box.on('mouseout', (e) => {
                this.arrowLeft.hide();
                this.arrowRight.hide();
                clearTimeout(this.runTimer);
                this.runTimer = null;
                this.runTimer = setTimeout(() => {
                    this.autoRun();
                }, 2000);
            });
        }else {
            this.box.on('touchstart', (e) => {
                clearTimeout(this.autoTimer);
                this.autoTimer = null;
                clearTimeout(this.runTimer);
                this.runTimer = null;
                startX = e.originalEvent.changedTouches[0].clientX;
                firstX = startX;
                this.container.stop(true, true);
            });

            this.box.on('touchmove', (e) => {
                let nowX = e.originalEvent.changedTouches[0].clientX;
                let moveX = nowX - startX;
                let currentLeft = parseFloat(this.container.css("left"));
                let left = currentLeft + moveX;
                if (left >= -(this.box.width() * this.len) && left <= 0) {
                    this.container.css('left', left + "px");
                    startX = nowX;
                }
            });

            this.box.on('touchend', (e) => {
                let nowX = e.originalEvent.changedTouches[0].clientX;
                let move = nowX - firstX;
                if (move > 0){
                    this.active -= 1;
                    this.animate(this.active, () => {
                        this.runTimer = null;
                        this.runTimer = setTimeout(() => {
                            this.autoRun();
                        }, 2000);
                    });
                }else {
                    this.active += 1;
                    this.animate(this.active, () => {
                        this.runTimer = null;
                        this.runTimer = setTimeout(() => {
                            this.autoRun();
                        }, 2000);
                    });
                }
            });
        }
    }

    autoRun() {
        clearTimeout(this.autoTimer);
        this.autoTimer = null;
        this.active++;
        this.animate(this.active);
        this.autoTimer = setTimeout(() => {
            this.autoRun();
        }, 3000);
    }

    animate(inx, callback) {
        if (inx > (this.len)) {
            this.container.css('left', 0);
            inx = 1;
        }
        if (inx < 0) {
            this.container.css('left', (-(this.box.width() * this.len) + "px"));
            inx = this.len - 1;
        }
        this.container.animate({
            left: -(this.box.width() * inx) + "px"
        }, () => {
            this.animation = false;
            if (typeof callback === "function"){
                callback();
            }
        });
        this.active = inx;
    }
}

module.exports = Carousel;