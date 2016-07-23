/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/**
	 * Created by jin on 16/7/22.
	 */
	__webpack_require__(1);
	__webpack_require__(5);
	__webpack_require__(7);

	var Carousel = __webpack_require__(9);

	var images = [__webpack_require__(14), __webpack_require__(15), __webpack_require__(16)];

	var carousel = new Carousel('#main', images);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(2);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/sass-loader/index.js!./base.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/sass-loader/index.js!./base.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".clearfix:after {\n  content: \".\";\n  display: block;\n  height: 0;\n  clear: both;\n  visibility: hidden; }\n", ""]);

	// exports


/***/ },
/* 3 */
/***/ function(module, exports) {

	"use strict";

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function () {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for (var i = 0; i < this.length; i++) {
				var item = this[i];
				if (item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function (modules, mediaQuery) {
			if (typeof modules === "string") modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for (var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if (typeof id === "number") alreadyImportedModules[id] = true;
			}
			for (i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if (typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if (mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if (mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(6);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/sass-loader/index.js!./normalize.scss", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/autoprefixer-loader/index.js!./../node_modules/sass-loader/index.js!./normalize.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "/*! normalize.css v3.0.3 | MIT License | github.com/necolas/normalize.css */\nhtml {\n  font-family: sans-serif;\n  -ms-text-size-adjust: 100%;\n  -webkit-text-size-adjust: 100%; }\n\nbody {\n  margin: 0; }\n\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmain,\nmenu,\nnav,\nsection,\nsummary {\n  display: block; }\n\naudio,\ncanvas,\nprogress,\nvideo {\n  display: inline-block;\n  vertical-align: baseline; }\n\naudio:not([controls]) {\n  display: none;\n  height: 0; }\n\n[hidden],\ntemplate {\n  display: none; }\n\na {\n  background-color: transparent; }\n\na:active,\na:hover {\n  outline: 0; }\n\nabbr[title] {\n  border-bottom: 1px dotted; }\n\nb,\nstrong {\n  font-weight: bold; }\n\ndfn {\n  font-style: italic; }\n\nh1 {\n  font-size: 2em;\n  margin: 0.67em 0; }\n\nmark {\n  background: #ff0;\n  color: #000; }\n\nsmall {\n  font-size: 80%; }\n\nsub,\nsup {\n  font-size: 75%;\n  line-height: 0;\n  position: relative;\n  vertical-align: baseline; }\n\nsup {\n  top: -0.5em; }\n\nsub {\n  bottom: -0.25em; }\n\nimg {\n  border: 0; }\n\nsvg:not(:root) {\n  overflow: hidden; }\n\nfigure {\n  margin: 1em 40px; }\n\nhr {\n  box-sizing: content-box;\n  height: 0; }\n\npre {\n  overflow: auto; }\n\ncode,\nkbd,\npre,\nsamp {\n  font-family: monospace, monospace;\n  font-size: 1em; }\n\nbutton,\ninput,\noptgroup,\nselect,\ntextarea {\n  color: inherit;\n  font: inherit;\n  margin: 0; }\n\nbutton {\n  overflow: visible; }\n\nbutton,\nselect {\n  text-transform: none; }\n\nbutton,\nhtml input[type=\"button\"],\ninput[type=\"reset\"],\ninput[type=\"submit\"] {\n  -webkit-appearance: button;\n  cursor: pointer; }\n\nbutton[disabled],\nhtml input[disabled] {\n  cursor: default; }\n\nbutton::-moz-focus-inner,\ninput::-moz-focus-inner {\n  border: 0;\n  padding: 0; }\n\ninput {\n  line-height: normal; }\n\ninput[type=\"checkbox\"],\ninput[type=\"radio\"] {\n  box-sizing: border-box;\n  padding: 0; }\n\ninput[type=\"number\"]::-webkit-inner-spin-button,\ninput[type=\"number\"]::-webkit-outer-spin-button {\n  height: auto; }\n\ninput[type=\"search\"] {\n  -webkit-appearance: textfield;\n  box-sizing: content-box; }\n\ninput[type=\"search\"]::-webkit-search-cancel-button,\ninput[type=\"search\"]::-webkit-search-decoration {\n  -webkit-appearance: none; }\n\nfieldset {\n  border: 1px solid #c0c0c0;\n  margin: 0 2px;\n  padding: 0.35em 0.625em 0.75em; }\n\nlegend {\n  border: 0;\n  padding: 0; }\n\ntextarea {\n  overflow: auto; }\n\noptgroup {\n  font-weight: bold; }\n\ntable {\n  border-collapse: collapse;\n  border-spacing: 0; }\n\ntd,\nth {\n  padding: 0; }\n", ""]);

	// exports


/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(8);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./../../node_modules/sass-loader/index.js!./index.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, "#main {\n  margin-top: 20px; }\n", ""]);

	// exports


/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/**
	 * Created by jin on 16/7/22.
	 */
	__webpack_require__(10);

	var Carousel = function () {
	    function Carousel(id, images) {
	        var _this = this;

	        _classCallCheck(this, Carousel);

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
	        this.runTimer = setTimeout(function () {
	            _this.autoRun();
	        }, 2000);
	    }

	    _createClass(Carousel, [{
	        key: 'checkMobile',
	        value: function checkMobile() {
	            if (typeof window.ontouchstart === "undefined") {
	                this.isMobile = false;
	            }
	        }
	    }, {
	        key: 'createList',
	        value: function createList() {
	            var images = this.images;
	            var _list = '';
	            for (var i = 0, len = images.length; i < len; i++) {
	                _list += '<li class="li">' + '<image class="img" src=' + images[i] + ' />' + '</li>';
	            }
	            return _list + '<li class="li">' + '<image class="img" src=' + images[0] + ' />' + '</li>';
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _html = "<div class='module-carousel'>" + "<ul class='ul clearfix'>" + this.createList() + "</ul>" + "<a href='javascript:;' class='arrow-left'><em class='icon'></em></a>" + "<a href='javascript:;' class='arrow-right'><em class='icon'></em></a>" + "</div>";
	            this.box = $(_html).appendTo($(this.id));
	            this.imgList = this.box.find('.li');
	            this.width = this.box.width();
	            this.container = this.box.find('.ul');
	        }
	    }, {
	        key: 'resize',
	        value: function resize() {
	            this.arrowLeft = this.box.find('.arrow-left');
	            this.arrowRight = this.box.find('.arrow-right');
	            var top = (this.box.height() - this.arrowLeft.height()) / 2;
	            this.arrowLeft.css({
	                top: top + 'px'
	            });
	            this.arrowRight.css({
	                top: top + 'px'
	            });
	            this.container.width(this.box.width() * (this.len + 1));
	        }
	    }, {
	        key: 'bindEvent',
	        value: function bindEvent() {
	            var _this2 = this;

	            var startX = 0;
	            var firstX = 0;
	            this.arrowLeft.on('mousedown', function (e) {
	                if (!_this2.animation) {
	                    _this2.animation = true;
	                    _this2.active++;
	                    _this2.animate(_this2.active);
	                }
	            });

	            this.arrowRight.on('mousedown', function (e) {
	                if (!_this2.animation) {
	                    _this2.animation = true;
	                    _this2.active--;
	                    _this2.animate(_this2.active);
	                }
	            });
	            if (!this.isMobile) {
	                console.log(111);
	                this.box.on('mouseover', function (e) {
	                    _this2.arrowLeft.show();
	                    _this2.arrowRight.show();
	                    clearTimeout(_this2.autoTimer);
	                    _this2.autoTimer = null;
	                    clearTimeout(_this2.runTimer);
	                    _this2.runTimer = null;
	                });

	                this.box.on('mouseout', function (e) {
	                    _this2.arrowLeft.hide();
	                    _this2.arrowRight.hide();
	                    clearTimeout(_this2.runTimer);
	                    _this2.runTimer = null;
	                    _this2.runTimer = setTimeout(function () {
	                        _this2.autoRun();
	                    }, 2000);
	                });
	            } else {
	                this.box.on('touchstart', function (e) {
	                    clearTimeout(_this2.autoTimer);
	                    _this2.autoTimer = null;
	                    clearTimeout(_this2.runTimer);
	                    _this2.runTimer = null;
	                    startX = e.originalEvent.changedTouches[0].clientX;
	                    firstX = startX;
	                    _this2.container.stop(true, true);
	                });

	                this.box.on('touchmove', function (e) {
	                    var nowX = e.originalEvent.changedTouches[0].clientX;
	                    var moveX = nowX - startX;
	                    var currentLeft = parseFloat(_this2.container.css("left"));
	                    var left = currentLeft + moveX;
	                    if (left >= -(_this2.box.width() * _this2.len) && left <= 0) {
	                        _this2.container.css('left', left + "px");
	                        startX = nowX;
	                    }
	                });

	                this.box.on('touchend', function (e) {
	                    var nowX = e.originalEvent.changedTouches[0].clientX;
	                    var move = nowX - firstX;
	                    if (move > 0) {
	                        _this2.active -= 1;
	                        _this2.animate(_this2.active, function () {
	                            _this2.runTimer = null;
	                            _this2.runTimer = setTimeout(function () {
	                                _this2.autoRun();
	                            }, 2000);
	                        });
	                    } else {
	                        _this2.active += 1;
	                        _this2.animate(_this2.active, function () {
	                            _this2.runTimer = null;
	                            _this2.runTimer = setTimeout(function () {
	                                _this2.autoRun();
	                            }, 2000);
	                        });
	                    }
	                });
	            }
	        }
	    }, {
	        key: 'autoRun',
	        value: function autoRun() {
	            var _this3 = this;

	            clearTimeout(this.autoTimer);
	            this.autoTimer = null;
	            this.active++;
	            this.animate(this.active);
	            this.autoTimer = setTimeout(function () {
	                _this3.autoRun();
	            }, 3000);
	        }
	    }, {
	        key: 'animate',
	        value: function animate(inx, callback) {
	            var _this4 = this;

	            if (inx > this.len) {
	                this.container.css('left', 0);
	                inx = 1;
	            }
	            if (inx < 0) {
	                this.container.css('left', -(this.box.width() * this.len) + "px");
	                inx = this.len - 1;
	            }
	            this.container.animate({
	                left: -(this.box.width() * inx) + "px"
	            }, function () {
	                _this4.animation = false;
	                if (typeof callback === "function") {
	                    callback();
	                }
	            });
	            this.active = inx;
	        }
	    }]);

	    return Carousel;
	}();

	module.exports = Carousel;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(11);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(4)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/sass-loader/index.js!./carousel.scss", function() {
				var newContent = require("!!./../../../node_modules/css-loader/index.js!./../../../node_modules/autoprefixer-loader/index.js!./../../../node_modules/sass-loader/index.js!./carousel.scss");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(3)();
	// imports


	// module
	exports.push([module.id, ".module-carousel {\n  width: 900px;\n  height: 600px;\n  position: relative;\n  margin: 0 auto;\n  overflow: hidden; }\n  .module-carousel .ul {\n    list-style-type: none;\n    margin: 0;\n    padding: 0;\n    position: absolute;\n    top: 0;\n    left: 0; }\n  .module-carousel .li {\n    float: left;\n    width: 900px;\n    height: 600px; }\n  .module-carousel .arrow-left {\n    position: absolute;\n    left: 0;\n    top: 45%;\n    background-color: white;\n    opacity: 0.7;\n    display: none; }\n    .module-carousel .arrow-left .icon {\n      background: url(" + __webpack_require__(12) + ") 0 0 no-repeat;\n      width: 100px;\n      height: 120px;\n      display: block; }\n  .module-carousel .arrow-right {\n    position: absolute;\n    right: 0;\n    top: 45%;\n    width: 100px;\n    height: 120px;\n    background-color: white;\n    opacity: 0.7;\n    display: none; }\n    .module-carousel .arrow-right .icon {\n      background: url(" + __webpack_require__(13) + ") 0 0 no-repeat;\n      width: 100px;\n      height: 120px;\n      display: block; }\n", ""]);

	// exports


/***/ },
/* 12 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAB4CAMAAAAzKKeGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAIlUExURUdwTBonXxcuXBonYBomXxsnYBsnXxsmXwAAfxsnYAA/fxYsYxsnYBMnYhwoYQAAVRomYBsnXxsmXxonYBkoYRolXxomYBwqYxooXRomYBomYBonXx8fXxIkWxonYBomXxsmXxgkYRsmYBkqXRsmXx8fXxonYCoqVSQkbRsnXxomXxomYBomXxsnYBsnXyIiZhgkYRciXBsmYBsmYRsmXxonYBonYBonXxsmYB4oWxsmXxomXx0nYhonXxsnXxsnXxojYBomYBwcVRooXRomYDMzZhcmXBsnYBonYhsmXxsnYBwoYhsmXxwlXhsnYBonYBomXxomYBwnYBwlXhsmXxsnXxkoYBonXxsoXxsnXxkmXx0pXhomYBkmZhsnYBsmXxkmXwAAABsmXxsmYB4tWhslYRomXxonYBomXxsnYBomYBsmXxsmYBonXx8qXxwnXxomXxonYBwlXhsnXxUqahgpYhsnYBonXxsnXxsmYBsmYBkmXxcnXxspYBsmYBonYBslXxsoXxskZBwnYBooYBsmXxsmYBslXhonYBsmXxonXxsmYRsnYBsnYBsmXxomXxsmXxsnYBsnYBonXxwqYxomXxsnXxsmXhkzZhonYBkmXxslXxooYRkmYBokXRomXxsmXxsmXhwmXxwlXhonXxklYBsmYBglXRomYBomXx0nYholYRonYBsnYBsnYBomXxsnXhsnXxwmYBonXxslYBonYBsnYNnnTHAAAAC2dFJOUwD4C/f6/v37AvwEF/ENPwPmwvP2WTC+EhPu54gQDu/a8ir0HuAI3AYHU9L5Q3rqDxUWinHodIeO2RnYaxpo4pYdmQkmpAUh1yf11iyzUa/RrdQtNs1ARco4uzsrfxTEg3YBeOwRN3467W+ScHfwGG2Q5BuVDB+c426X4WMgJZ9iZWYcWl+d316hnt1cqaddpaaqVaMk27AuCrZQS0xPMcC6SUg+tT3GKcfLNES3zs+4QcM1yErBNgQXvAAAAiVJREFUaN7tl2V2G0EQBme1MBppxWBLssWSBeaYmWLGmB1mZmZmZmZm1vmSQ+T7la4L1Kt+szO9jBEEQRAEQRAE8X9jNOIdi4uteWhHfkmdwwpuWVVSKhqKsRLLRr/qW4odV0ejnfsCZmzH8b25zTUVUMf8s3HhbK2HOgzukKa3xrAd7qQqn2uCOorS/Tx6tRPqSA2NafLNbuxHODXC5TsRqMI0NS3k0QXYjm9fhPJsAHu3/3Bw6esM9MIyWn8ryix4Vh6vwn9asbMa/yTx73M2bMdsln/GdrDIqCwmfhVBHQPDLp55boI6YtckrSGN7Th83in6hxJQR9sRl7jgxp6rHbW6mrxogDqadur8wNEU1FFeqee2N2M7KgLrhH1eIXb5WRPU/OuxHWx1SA3X5GMdy9eGtOgG7KbIWF51aS4YqAdbCjZV8eD+GNhi2WpXo+0n0C37WrTw6U6wxXAsLlyXb4EthaeSal9XL9iSunJbcQ0+AVs63D1advgt2HLvQUbIr2bAf7vGx2NC8XrALYkX73jW+9oE1rycVpT3k2CJ6aND4W8m0S0f/m7DE4/QlrmnkjLy0AY+Y+ODksjcAL+UzHNf4nVpdMvd631az0kLuKX7kqSeOZgAW3q7nDzevAtsaWt3qi2NZWDLoT1hbq8uAFt2b/Op/hXgfYxtqdW1KvD2ypi5ciV3RMASVr5sySL0aslY2UKzjREEQRAEQRAEQfwL/gAg+VjAkaSWTQAAAABJRU5ErkJggg=="

/***/ },
/* 13 */
/***/ function(module, exports) {

	module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAAB4CAMAAAAzKKeGAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAIlUExURUdwTBonXxcuXBonYBomXxsnYBsnXxsmXwAAfxsnYAA/fxYsYxMnYhsnYBwoYQAAVRomYBsnXxsmXxonYBkoYRolXxomYBwqYxooXRonXxomYBomYBonYB8fXxomXxIkWxsmXxsmYBkqXRgkYSQkbRsmXxonYB8fXyoqVRsnXxomXxomYBomXxsnYBsnXxciXBgkYRsmXxonYBsmYBsmYRonYCIiZh4oWxsmYBsmXxonXx0nYhomXxonXxsnXxsnXzMzZhwcVRomYBojYBooXRomYBonYhsmXxsnYBsnYBcmXBwoYhsnYBsmXxwlXhomYBomXxwnYBonYBwlXhsmXxkoYBsnXxsoXxsnXxonXxkmXxkmZgAAABsmXx0pXhomYB4tWhslYRonYBkmXxsnYBomXxomXxsmYBsmYBsmXxomYBsnYBwnXxsmXxonXxsmYBsnXxwlXhonYBsnXx8qXxonXxomXxslXxsmYBsnYBgpYhUqahspYBsmYBonYBskZBooYBsmXxsoXxcnXxkmXxsnYBsmXxonYBslXhsmYRonXxsmXxwnYBsmYBomXxwqYxomXxsnYBsmXxkmXxkzZhonXxkmYBsnYBsnXxsnYBokXRsmXhonYBslXxwmXxglXRonXxooYRsmXhsmXxomXxwlXholYRomYB0nYhklYBsmYBomXxonYBslYBonYBomXxsnXhsnYBsnXxonXxwmYBsnYBsnYOnCXxwAAAC2dFJOUwD4C/f6/v37AvwEFw3xPwPmwvP2WTC+EhOI7ufvENoO8vQeKgfg3AgGU9L5Q3rqFhXoh4pxdA8Z2diOGmto4pYFCZkdJqQn9dfWISyvs1HUrS3RNs1FuzhAyjsUAYMrfxE3OnbEfu3sd3iSb21w8JduG+SVGOOQZeGcHwwln2IcX51mIGOnXaFeXN2eWt/bJKWpplAKo09VsKoxLrZLSCm1TEm6yz5ExzQ9xsC3SsG4Qc/DyDXOirCX/gAAAiZJREFUaN7tl3VX21AchhNyk5tLSajRUqFCaUtbZLjDYLiP4XN3dzfmMFeYu/v6+bYv8f6z83u+wHPem+TkuZJEEARBEARBEMT/T7ZlVTVcYlm9Yf0itCRi45srLGBJsLJMM+oPgC25W32q99AxsCWvyspDR8+DLdWNzaq9bQnYcrwpyu0dnWBLfGZOlW/1gi1Zs91a16MFHfzhJ2q5/DgHvCXjQVLIA8vQW56MMPnTNHhL5otRzlzv0ZbJj5zZ3maCNZOvGZt6g97ywZXi757GwZocFxND98HvmD7xXBHJO3fBW571p7RuZyvYMj/gYNcvFoAtnR1dauxMEGy5ccEhooczwJb2syGteU8e2HK6Laxad2SBLfm7/bxsC3pLjcefLqlyo9NyW1gLrFsB7rHykBpYC/5Tbvdp/o3YRx+stIpNnlLsjqZ9aaMCW/sFp45wY38DdseVmGrU78V2i/OqcJzEtnF8sEfYr52AOgoTdZp8Ox/bEi+T3NHfh93xZVQowxHsh27+4alxbHdnT//k8mdwdZu//tUw+P6wdJyxryZ0hz7xTea239iz6nvFxI/v4LMaVsTUGPbeEHmo8JEx7I7ee4o2NIht0/abYd6TKIQ6Gi4pasy5GFtyLYYWcGLbt6bFLqKXsTtKy3elD57Dxo/F4+XWRuzNyr3Sq/p2YnfoRXWipHgN+LZr2mqLc8HtLrnNouUSHF2XCIIgCIIgCIIg0PwFihhYwNq3oKoAAAAASUVORK5CYII="

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/slide-1927d41c2.jpg";

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/slide-240dfe153.jpg";

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__.p + "images/slide-38bf938e4.jpg";

/***/ }
/******/ ]);