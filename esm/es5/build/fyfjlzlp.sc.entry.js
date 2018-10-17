/*! Built with http://stenciljs.com */
import { h } from '../sentimeter.core.js';
var ScreenTemplate;
(function (ScreenTemplate) {
    ScreenTemplate[ScreenTemplate["FAB_SCREEN"] = 0] = "FAB_SCREEN";
    ScreenTemplate[ScreenTemplate["RATING_SCREEN"] = 1] = "RATING_SCREEN";
    ScreenTemplate[ScreenTemplate["QUESTION_SCREEN"] = 2] = "QUESTION_SCREEN";
    ScreenTemplate[ScreenTemplate["MODAL_WINDOW"] = 3] = "MODAL_WINDOW";
    ScreenTemplate[ScreenTemplate["THANK_YOU_WINDOW"] = 4] = "THANK_YOU_WINDOW";
})(ScreenTemplate || (ScreenTemplate = {}));
var SentimeterComponent = /** @class */ (function () {
    function SentimeterComponent() {
        this.theme = {
            backgroundColor: '#11767E',
            color: 'white'
        };
        this.containerHover = false;
        this.showText = false;
        this.activatedScreen = ScreenTemplate.FAB_SCREEN;
        this.showModal = false;
        this.showThankYouModal = false;
    }
    SentimeterComponent.prototype.padZero = function (str) {
        var len = 2;
        var zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    };
    SentimeterComponent.prototype.invertColor = function (hex, bw) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        var r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '#000000'
                : '#FFFFFF';
        }
        var cr = (255 - r).toString(16);
        var cg = (255 - g).toString(16);
        var cb = (255 - b).toString(16);
        return "#" + this.padZero(cr) + this.padZero(cg) + this.padZero(cb);
    };
    SentimeterComponent.prototype.handleFabToggle = function () {
        var _this = this;
        this.containerHover = !this.containerHover;
        if (this.containerHover) {
            setTimeout(function () {
                _this.showText = !_this.showText;
            }, 400);
        }
        else {
            this.showText = !this.showText;
        }
    };
    SentimeterComponent.prototype.handleFabClick = function () {
        this.activatedScreen = ScreenTemplate.RATING_SCREEN;
    };
    SentimeterComponent.prototype.handleThumb = function () {
        this.activatedScreen = ScreenTemplate.QUESTION_SCREEN;
    };
    SentimeterComponent.prototype.handleQuestionClick = function () {
        this.activatedScreen = ScreenTemplate.MODAL_WINDOW;
        this.showModal = true;
    };
    SentimeterComponent.prototype.handleSubmitClick = function () {
        var _this = this;
        this.activatedScreen = ScreenTemplate.THANK_YOU_WINDOW;
        this.showModal = false;
        this.showThankYouModal = true;
        setTimeout(function () {
            _this.showThankYouModal = false;
        }, 3000);
    };
    SentimeterComponent.prototype.renderQuestion = function () {
        var _this = this;
        var textStyles = {
            lineHeight: 'normal',
            paddingTop: '6px',
            textAlign: 'left'
        };
        var btnSetStyle = {
            alignContent: 'stretch',
            display: 'flex',
            marginLeft: '10px'
        };
        if (this.activatedScreen === ScreenTemplate.QUESTION_SCREEN) {
            var containerStyle = Object.assign({}, this.theme);
            return (h("div", { style: containerStyle, id: "gt-sentimeter", class: "gt-sentimeter gt-sentimeter-more" }, h("div", { id: "gt-sentimeter-wrapper", class: "gt-sentimeter-wrapper" }, h("p", { class: "gt-sentimeter-text", style: textStyles }, "Thank you! Your satisfication is our priority. ", h("br", null), "Help us improve further with 2 minutes of your time."), h("div", { style: btnSetStyle }, h("button", { class: "btn btn-primary", onClick: function () { return _this.handleQuestionClick(); } }, "LET'S GO"), h("button", { class: "btn btn-transparent" }, "NO THANKS")))));
        }
        else {
            return h("div", null);
        }
    };
    SentimeterComponent.prototype.renderMoreFeedback = function () {
        var _this = this;
        var containerStyle = Object.assign({}, this.theme);
        return (h("div", null, this.renderQuestion(), h("div", { class: "modal " + (this.showModal ? 'show-modal' : '') }, h("div", { style: containerStyle, class: "modal-content" }, h("span", { class: "close-button" }, "\u00D7"), h("div", null, h("p", { class: "c-font" }, "What did you like most?"), h("textarea", { class: "textarea", rows: 4, cols: 50 })), h("div", null, h("p", { class: "c-font" }, "What did you like least?"), h("textarea", { class: "textarea", rows: 4, cols: 50 })), h("div", null, h("p", { class: "c-font" }, "Your email (optional)"), h("input", { class: "input", type: "email" })), h("div", { class: "btn-block" }, h("button", { class: "btn btn-transparent", onClick: function () { return _this.handleSubmitClick(); } }, "CANCEL"), h("button", { class: "btn btn-primary", onClick: function () { return _this.handleSubmitClick(); } }, "SUBMIT")))), h("div", { class: "modal " + (this.showThankYouModal ? 'show-modal' : '') }, h("div", { style: containerStyle, class: "modal-content" }, h("span", { class: "close-button" }, "\u00D7"), h("div", { class: "thank-you-container" }, h("h1", { class: "c-font" }, "Thank you!"), h("p", { class: "c-font" }, "Your feedback is valuable to us."))))));
    };
    SentimeterComponent.prototype.renderRating = function () {
        var _this = this;
        var lineHeight = {
            lineHeight: '3.3'
        };
        var containerStyle = Object.assign({}, this.theme);
        return (h("div", { id: "gt-sentimeter", style: containerStyle, class: "gt-sentimeter gt-sentimeter-rating" }, h("div", { id: "gt-sentimeter-wrapper", class: "gt-sentimeter-wrapper" }, h("p", { class: "gt-sentimeter-text", style: lineHeight }, "It is easy to find what I need"), h("div", { class: "gt-sentimeter-thumb", onClick: function () { return _this.handleThumb(); } }, h("svg", { height: "24", viewBox: "0 0 26 24", width: "26", xmlns: "http://www.w3.org/2000/svg" }, h("mask", { id: "a", fill: "#fff" }, h("path", { d: "m25 16.788125c0 .2025-.05.40375-.144375.58375l-3.02875 5.736875c-.2175.41125-.640625.666875-1.105625.666875h-9.476875c-.33375 0-.648125-.13-.88375-.36625-.2225-.223125-.346875-.515625-.360625-.828125v-8.83625c0-.018125-.005-.035625-.005625-.054375v-.879375l3.4825-6.56125 3.208125-.005625-.0025.005625-3.005625 5.66375c-.205.386875-.19375.853125.0325 1.22875.225.37625.63.60625 1.06875.6075l10.221875.025625zm-20 6.961875v-10.005h2.494375v8.77875c0 .05.005.09875.0075.148125v1.078125zm20.003125-12.474375-8.14625-.020625 2.034375-3.833125c.415-.781875.390625-1.701875-.06625-2.460625-.455625-.75875-1.2575-1.21125-2.1425-1.21125h-3.205625c-.928125 0-1.77375.508125-2.20875 1.3275l-3.298125 6.215c-.1525-.029375-.30875-.0475-.47-.0475h-2.5c-1.37875 0-2.5 1.12125-2.5 2.5v10.005c0 1.37875 1.12125 2.5 2.5 2.5h2.5c.628125 0 1.195625-.240625 1.635-.62375.6175.42125 1.345625.649375 2.109375.649375h9.476875c1.395 0 2.665625-.76625 3.31625-2l3.02875-5.736875c.28375-.538125.43375-1.1425.43375-1.750625v-3.0125c0-1.37875-1.12125-2.5-2.496875-2.5z", fill: "none" })), h("g", { fill: "#fff", "fill-rule": "evenodd", mask: "url(#a)", transform: "translate(-2 -3)" }, h("path", { d: "m0 0h28.846154v28.846154h-28.846154z" })))), h("div", { class: "gt-sentimeter-thumb thumb-flip", onClick: function () { return _this.handleThumb(); } }, h("svg", { height: "24", viewBox: "0 0 26 24", width: "26", xmlns: "http://www.w3.org/2000/svg" }, h("mask", { id: "a", fill: "#fff" }, h("path", { d: "m25 16.788125c0 .2025-.05.40375-.144375.58375l-3.02875 5.736875c-.2175.41125-.640625.666875-1.105625.666875h-9.476875c-.33375 0-.648125-.13-.88375-.36625-.2225-.223125-.346875-.515625-.360625-.828125v-8.83625c0-.018125-.005-.035625-.005625-.054375v-.879375l3.4825-6.56125 3.208125-.005625-.0025.005625-3.005625 5.66375c-.205.386875-.19375.853125.0325 1.22875.225.37625.63.60625 1.06875.6075l10.221875.025625zm-20 6.961875v-10.005h2.494375v8.77875c0 .05.005.09875.0075.148125v1.078125zm20.003125-12.474375-8.14625-.020625 2.034375-3.833125c.415-.781875.390625-1.701875-.06625-2.460625-.455625-.75875-1.2575-1.21125-2.1425-1.21125h-3.205625c-.928125 0-1.77375.508125-2.20875 1.3275l-3.298125 6.215c-.1525-.029375-.30875-.0475-.47-.0475h-2.5c-1.37875 0-2.5 1.12125-2.5 2.5v10.005c0 1.37875 1.12125 2.5 2.5 2.5h2.5c.628125 0 1.195625-.240625 1.635-.62375.6175.42125 1.345625.649375 2.109375.649375h9.476875c1.395 0 2.665625-.76625 3.31625-2l3.02875-5.736875c.28375-.538125.43375-1.1425.43375-1.750625v-3.0125c0-1.37875-1.12125-2.5-2.496875-2.5z", fill: "none" })), h("g", { fill: "#fff", "fill-rule": "evenodd", mask: "url(#a)", transform: "translate(-2 -3)" }, h("path", { d: "m0 0h28.846154v28.846154h-28.846154z" })))))));
    };
    SentimeterComponent.prototype.renderFab = function () {
        var _this = this;
        var containerStyle = Object.assign({}, this.theme);
        return (h("div", { id: "gt-sentimeter", style: containerStyle, class: "gt-sentimeter pointer " + (this.containerHover ? 'gt-sentimeter-toggle' : ''), onMouseEnter: function () { return _this.handleFabToggle(); }, onMouseLeave: function () { return _this.handleFabToggle(); }, onClick: function () { return _this.handleFabClick(); } }, h("div", { id: "gt-sentimeter-wrapper", class: "gt-sentimeter-wrapper" }, h("div", null, h("svg", { height: "32", viewBox: "0 0 33 32", width: "33", xmlns: "http://www.w3.org/2000/svg" }, h("filter", { id: "a", height: "140.9%", width: "140.9%", x: "-20.5%", y: "-20.5%" }, h("feOffset", { dx: "0", dy: "-2", in: "SourceAlpha", result: "shadowOffsetOuter1" }), h("feGaussianBlur", { in: "shadowOffsetOuter1", result: "shadowBlurOuter1", stdDeviation: "2" }), h("feColorMatrix", { in: "shadowBlurOuter1", result: "shadowMatrixOuter1", type: "matrix", values: "0 0 0 0 0.2   0 0 0 0 0.2   0 0 0 0 0.2  0 0 0 0.3 0" }), h("feMerge", null, h("feMergeNode", { in: "shadowMatrixOuter1" }), h("feMergeNode", { in: "SourceGraphic" }))), h("mask", { id: "b", fill: "#fff" }, h("path", { d: "m7.875 22.5h15.75v-18h-15.75v4.7806875c0 .3110625-.1288125.6080625-.3555.8206875l-3.62475 3.398625 3.62475 3.3975c.2266875.212625.3555.509625.3555.8206875zm15.9823125 2.25h-16.2151875c-1.112625 0-2.017125-.9045-2.017125-2.017125v-4.5275625l-4.1445-3.884625c-.2266875-.212625-.3555-.509625-.3555-.8206875s.1288125-.6080625.3555-.8206875l4.1445-3.88575v-4.525875c0-1.112625.9045-2.0176875 2.017125-2.0176875h16.2151875c1.112625 0 2.0176875.9050625 2.0176875 2.0176875v18.4651875c0 1.112625-.9050625 2.017125-2.0176875 2.017125zm-8.1073125-6.7368375c-3.0695625 0-5.8258125-2.052-6.70275-4.9910625-.17775-.5956875.1603125-1.2223125.756-1.3995.59625-.1805625 1.2223125.1603125 1.3995.7554375.595125 1.9929375 2.464875 3.385125 4.54725 3.385125 2.0818125 0 3.9515625-1.3921875 4.54725-3.385125.1771875-.595125.8055-.936 1.3995-.7554375.5956875.1771875.93375.8038125.756 1.3995-.8780625 2.9390625-3.63375 4.9910625-6.70275 4.9910625z", fill: "none" })), h("g", { fill: "none", "fill-rule": "evenodd", filter: "url(#a)", transform: "translate(-5 -4)" }, h("g", { fill: "#fff", "fill-rule": "evenodd", mask: "url(#b)", transform: "translate(7.615385 8.461538)" }, h("path", { d: "m0 0h27v27h-27z", transform: "translate(-.5625)" }))))), this.showText && (h("div", null, h("p", { class: "gt-sentimeter-text" }, "Help us improve?"))))));
    };
    SentimeterComponent.prototype.render = function () {
        if (this.themeColor) {
            this.theme.backgroundColor = this.themeColor;
            this.theme.color = this.invertColor(this.themeColor, true);
        }
        switch (this.activatedScreen) {
            case ScreenTemplate.FAB_SCREEN: {
                return this.renderFab();
            }
            case ScreenTemplate.RATING_SCREEN: {
                return this.renderRating();
            }
            case ScreenTemplate.THANK_YOU_WINDOW:
            case ScreenTemplate.MODAL_WINDOW:
            case ScreenTemplate.QUESTION_SCREEN: {
                return this.renderMoreFeedback();
            }
        }
    };
    Object.defineProperty(SentimeterComponent, "is", {
        get: function () { return "gt-sentimeter"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SentimeterComponent, "encapsulation", {
        get: function () { return "shadow"; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SentimeterComponent, "properties", {
        get: function () {
            return {
                "activatedScreen": {
                    "state": true
                },
                "containerHover": {
                    "state": true
                },
                "showModal": {
                    "state": true
                },
                "showText": {
                    "state": true
                },
                "showThankYouModal": {
                    "state": true
                },
                "theme": {
                    "state": true
                },
                "themeColor": {
                    "type": String,
                    "attr": "theme-color"
                }
            };
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SentimeterComponent, "style", {
        get: function () { return "h1.sc-gt-sentimeter{font-size:2em;margin:.67em 0}textarea.sc-gt-sentimeter{overflow:auto}p.sc-gt-sentimeter{font-size:16px}*.sc-gt-sentimeter{font-family:\"Helvetica Neue\",serif}.gt-sentimeter.sc-gt-sentimeter{display:-webkit-box;display:-ms-flexbox;display:flex;position:fixed;z-index:999;bottom:10px;left:20px;-webkit-transition:all .5s;transition:all .5s;background-color:#11767e;color:#fff;padding:10px;border-radius:50px;width:35px;height:35px;text-align:center;margin:0 auto}.gt-sentimeter-rating.sc-gt-sentimeter{width:400px;height:50px}.gt-sentimeter-more.sc-gt-sentimeter{width:670px;height:50px}.pointer.sc-gt-sentimeter{cursor:pointer}.gt-sentimeter-wrapper.sc-gt-sentimeter{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch}.gt-sentimeter-toggle.sc-gt-sentimeter{width:200px}path.sc-gt-sentimeter{fill:#fff}.gt-sentimeter-text.sc-gt-sentimeter{font-size:16px;margin:0 0 0 10px;line-height:2.3;white-space:nowrap}.gt-sentimeter-thumb.sc-gt-sentimeter{cursor:pointer;background-color:rgba(0,0,0,.3);width:50px;height:50px;border-radius:50px;-webkit-transition:all .5s;transition:all .5s;line-height:3.8;margin:0 10px}.thumb-flip.sc-gt-sentimeter{-webkit-transform:scaleY(-1);transform:scaleY(-1)}.btn.sc-gt-sentimeter{border-radius:5px;padding:2px 20px;font-weight:700;font-size:18px;font-family:Arial,Helvetica,sans-serif}.btn-primary.sc-gt-sentimeter{background-color:#fff;color:#11767e;-webkit-box-shadow:5px 10px 9px -6px rgba(0,0,0,.28);-moz-box-shadow:5px 10px 9px -6px rgba(0,0,0,.28);box-shadow:5px 10px 9px -6px rgba(0,0,0,.28)}.btn-transparent.sc-gt-sentimeter{color:#fff;background-color:transparent;border-color:transparent}.btn-block.sc-gt-sentimeter{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;height:40px;margin-top:20px;padding-bottom:30px}.thank-you-container.sc-gt-sentimeter{text-align:center;padding:0 30px}.thank-you-container.sc-gt-sentimeter > h1.sc-gt-sentimeter{margin-bottom:0}.modal.sc-gt-sentimeter{z-index:1000;position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);opacity:0;visibility:hidden;-webkit-transform:scale(1.1);transform:scale(1.1);-webkit-transition:visibility 0s linear .25s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear .25s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear .25s,opacity .25s 0s,transform .25s;transition:visibility 0s linear .25s,opacity .25s 0s,transform .25s,-webkit-transform .25s}.modal-content.sc-gt-sentimeter{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:#11767e;color:#fff;padding:1rem 30px;border-radius:.5rem}.textarea.sc-gt-sentimeter{font-size:1rem;line-height:1.5;color:#495057;border:1px solid #ced4da;border-radius:.25rem}.input.sc-gt-sentimeter{display:block;width:100%;height:40px;font-size:1rem;line-height:1.5;color:#495057;border:1px solid #ced4da;border-radius:.25rem}.close-button.sc-gt-sentimeter{float:right;width:1.5rem;line-height:1.5rem;text-align:center;cursor:pointer;border-radius:.25rem;color:#fff}.close-button.sc-gt-sentimeter:hover{background-color:#a9a9a9}.show-modal.sc-gt-sentimeter{opacity:1;visibility:visible;-webkit-transform:scale(1);transform:scale(1);-webkit-transition:visibility 0s linear 0s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear 0s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear 0s,opacity .25s 0s,transform .25s;transition:visibility 0s linear 0s,opacity .25s 0s,transform .25s,-webkit-transform .25s}"; },
        enumerable: true,
        configurable: true
    });
    return SentimeterComponent;
}());
export { SentimeterComponent as GtSentimeter };
