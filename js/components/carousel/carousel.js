/**
 * Created by jin on 16/7/22.
 */
require('carousel.sass');

class Carousel {
    constructor(id, data) {
        this.dataList = data;
        this.id = id;
        this.active = 0;
        this.len = this.dataList.length;
        this.isMobile = true;
        this.checkMobile();
        this.render();
        this.title.html(this.imgList.eq(this.active).attr('alt'));
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
        let dataList = this.dataList;
        let _list = '';
        for (let i = 0, len = dataList.length; i < len; i++) {
            _list += '<li class="li">' +
                '<image alt=' + dataList[i].title + ' class="img" src=' + dataList[i].src + ' />' +
                '</li>';
        }
        return _list + '<li class="li">' + '<image class="img" alt=' + dataList[0].title + ' src=' + dataList[0].src + ' />' + '</li>';
    }

    render() {
        let _html = "<div class='module-carousel clearfix'>" +
            "<a href='javascript:;' class='arrow-left'></a>" +
            "<div class='container'>" +
            "<ul class='ul clearfix'>" +
            this.createList() +
            "</ul>" +
            "<div class='title-mask'></div>" +
            "<div class='title-region'>" +
            "<span class='title'></span>" +
            "<a href='javascript:;' class='click-more'>Click for more</a>" +
            "</div>" +
            "</div>" +
            "<a href='javascript:;' class='arrow-right'></a>" +
            "</div>";
        this.module = $(_html).appendTo($(this.id));
        this.box = this.module.find('.container');
        this.width = this.box.width();
        this.clickMore = this.box.find('.click-more');
        this.container = this.box.find('.ul');
        this.imgList = this.container.find('img');
        this.title = this.box.find('.title');
    }

    resize() {
        this.arrowLeft = this.module.find('.arrow-left');
        this.arrowRight = this.module.find('.arrow-right');
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

        this.clickMore.on('mousedown', () => {
            alert(this.imgList.eq(this.active).attr('alt'));
        });

        if (!this.isMobile) {
            this.module.on('mouseover', (e) => {
                clearTimeout(this.autoTimer);
                this.autoTimer = null;
                clearTimeout(this.runTimer);
                this.runTimer = null;
            });

            this.module.on('mouseout', (e) => {
                clearTimeout(this.runTimer);
                this.runTimer = null;
                this.runTimer = setTimeout(() => {
                    this.autoRun();
                }, 2000);
            });
        } else {
            this.arrowRight.hide();
            this.arrowLeft.hide();
            this.box.css('float', 'none');
            this.module.css("width", "auto");
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
                if (move > 0) {
                    this.active -= 1;
                    this.animate(this.active, () => {
                        this.runTimer = null;
                        this.runTimer = setTimeout(() => {
                            this.autoRun();
                        }, 2000);
                    });
                } else {
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
        this.title.html(this.imgList.eq(inx).attr('alt'));
        this.container.animate({
            left: -(this.box.width() * inx) + "px"
        }, () => {
            this.animation = false;
            if (typeof callback === "function") {
                callback();
            }
        });
        this.active = inx;
    }
}

module.exports = Carousel;