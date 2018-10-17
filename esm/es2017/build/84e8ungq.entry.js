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
class SentimeterComponent {
    constructor() {
        this.blackAndWhite = false;
        this.expandTime = 30000;
        this.theme = {
            backgroundColor: '#11767E',
            color: 'white'
        };
        this.containerHover = false;
        this.showText = false;
        this.activatedScreen = ScreenTemplate.FAB_SCREEN;
        this.showModal = false;
        this.showThankYouModal = false;
        this.initialFabTrigger = {
            primaryTickId: null,
            secondaryTickId: null
        };
    }
    componentDidLoad() {
        this.initialFabTrigger.primaryTickId = setTimeout(() => {
            this.handleFabToggle();
            this.initialFabTrigger.secondaryTickId = setTimeout(() => {
                this.handleFabToggle();
            }, 3000);
        }, this.expandTime);
    }
    static padZero(str) {
        let len = 2;
        const zeros = new Array(len).join('0');
        return (zeros + str).slice(-len);
    }
    static invertColor(hex, bw) {
        if (hex.indexOf('#') === 0) {
            hex = hex.slice(1);
        }
        if (hex.length === 3) {
            hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
        }
        if (hex.length !== 6) {
            throw new Error('Invalid HEX color.');
        }
        let r = parseInt(hex.slice(0, 2), 16), g = parseInt(hex.slice(2, 4), 16), b = parseInt(hex.slice(4, 6), 16);
        if (bw) {
            return (r * 0.299 + g * 0.587 + b * 0.114) > 186
                ? '#000000'
                : '#FFFFFF';
        }
        const cr = (255 - r).toString(16);
        const cg = (255 - g).toString(16);
        const cb = (255 - b).toString(16);
        return "#" + SentimeterComponent.padZero(cr) + SentimeterComponent.padZero(cg) + SentimeterComponent.padZero(cb);
    }
    handleFabToggle() {
        this.containerHover = !this.containerHover;
        if (this.containerHover) {
            setTimeout(() => {
                this.showText = !this.showText;
            }, 400);
        }
        else {
            this.showText = !this.showText;
        }
    }
    clearTickTimeout() {
        clearTimeout(this.initialFabTrigger.primaryTickId);
        clearTimeout(this.initialFabTrigger.secondaryTickId);
        this.initialFabTrigger.primaryTickId = null;
        this.initialFabTrigger.secondaryTickId = null;
    }
    handleFabClick() {
        this.activatedScreen = ScreenTemplate.RATING_SCREEN;
    }
    handleThumb() {
        this.activatedScreen = ScreenTemplate.QUESTION_SCREEN;
    }
    handleQuestionClick() {
        this.activatedScreen = ScreenTemplate.MODAL_WINDOW;
        this.showModal = true;
    }
    handleSubmitClick() {
        this.activatedScreen = ScreenTemplate.THANK_YOU_WINDOW;
        this.showModal = false;
        this.showThankYouModal = true;
        setTimeout(() => {
            this.showThankYouModal = false;
        }, 3000);
    }
    changeScreen(screen) {
        this.activatedScreen = screen;
        this.containerHover = false;
        this.showText = false;
    }
    renderQuestion() {
        const textStyles = {
            lineHeight: 'normal',
            paddingTop: '6px',
            textAlign: 'left'
        };
        const btnSetStyle = {
            marginLeft: '10px'
        };
        if (this.activatedScreen === ScreenTemplate.QUESTION_SCREEN) {
            return (h("div", { id: "gt-sentimeter", class: "gt-sentimeter gt-sentimeter-more" },
                h("div", { id: "gt-sentimeter-wrapper", class: "gt-sentimeter-wrapper" },
                    h("p", { class: "gt-sentimeter-text", style: textStyles },
                        "Thank you! Your satisfication is our priority. ",
                        h("br", null),
                        "Help us improve further with 2 minutes of your time."),
                    h("div", { style: btnSetStyle },
                        h("button", { class: "btn btn-primary", onClick: () => this.handleQuestionClick() }, "LET'S GO"),
                        h("button", { class: "btn btn-transparent", onClick: () => this.changeScreen(ScreenTemplate.FAB_SCREEN) }, "NO THANKS")))));
        }
        else {
            return h("div", null);
        }
    }
    renderMoreFeedback() {
        return (h("div", null,
            this.renderQuestion(),
            h("div", { class: `modal ${this.showModal ? 'show-modal' : ''}` },
                h("div", { class: "modal-content" },
                    h("span", { class: "close-button" }, "\u00D7"),
                    h("div", null,
                        h("p", { class: "c-font" }, "What did you like most?"),
                        h("textarea", { class: "textarea", rows: 4, cols: 50 })),
                    h("div", null,
                        h("p", { class: "c-font" }, "What did you like least?"),
                        h("textarea", { class: "textarea", rows: 4, cols: 50 })),
                    h("div", null,
                        h("p", { class: "c-font" }, "Your email (optional)"),
                        h("input", { class: "input", type: "email" })),
                    h("div", { class: "btn-block" },
                        h("button", { class: "btn btn-transparent", onClick: () => this.handleSubmitClick() }, "CANCEL"),
                        h("button", { class: "btn btn-primary", onClick: () => this.handleSubmitClick() }, "SUBMIT")))),
            h("div", { class: `modal ${this.showThankYouModal ? 'show-modal' : ''}` },
                h("div", { class: "modal-content" },
                    h("div", { class: "thank-you-container" },
                        h("h1", { class: "c-font" }, "Thank you!"),
                        h("p", { class: "c-font" }, "Your feedback is valuable to us."))))));
    }
    renderRating() {
        const lineHeight = {
            lineHeight: '3.3'
        };
        return (h("div", { id: "gt-sentimeter", class: "gt-sentimeter gt-sentimeter-rating" },
            h("div", { id: "gt-sentimeter-wrapper", class: "gt-sentimeter-wrapper" },
                h("p", { class: "gt-sentimeter-text", style: lineHeight }, "It is easy to find what I need"),
                h("div", { class: "gt-sentimeter-thumb", onClick: () => this.handleThumb() },
                    h("svg", { width: "32", "enable-background": "new 0 0 490.2 490.2", viewBox: "0 0 490.2 490.2", xmlns: "http://www.w3.org/2000/svg" },
                        h("path", { d: "m490.1 234.464c0-37.6-30.6-68.3-68.3-68.3h-105.6v-76.1c0-32.2-9.4-55.4-28-69-29.4-21.6-69.8-9.3-71.5-8.7-5.1 1.6-8.6 6.3-8.6 11.7v85.5c0 67.3-78.1 90.2-81.4 91.2-1 .3-1.9.6-2.7 1.1-5.8-11.6-17.8-19.6-31.6-19.6h-57.2c-19.4 0-35.2 15.8-35.2 35.2v207.9c0 19.4 15.8 35.2 35.2 35.2h33.1c6.8 0 12.3-5.5 12.3-12.3s-5.6-12.2-12.3-12.2h-33.1c-5.9 0-10.7-4.8-10.7-10.7v-207.9c0-5.9 4.8-10.7 10.7-10.7h57.3c5.9 0 10.7 4.8 10.7 10.7v196.1c0 37.6 30.6 68.3 68.3 68.3h209.2c46.4 0 75.9-24.3 81.1-66.3l28.2-177c.1-.6.2-1.3.2-1.9v-2.2zm-24.5 1.1-28.1 176.5c-3.7 30-22.8 45.3-56.8 45.3h-7.8-201.4c-24.1 0-43.8-19.6-43.8-43.8v-189.1c1.8.4 3.7.3 5.6-.2 4.1-1.1 99.3-28.7 99.3-114.8v-75.6c10.4-1.6 28.2-2.5 41.1 6.9 11.9 8.8 18 25.3 18 49.3v88.4c0 6.8 5.5 12.3 12.3 12.3h117.9c24.1 0 43.8 19.6 43.8 43.8v1z" }))),
                h("div", { class: "gt-sentimeter-thumb", onClick: () => this.handleThumb() },
                    h("svg", { width: "32", "enable-background": "new 0 0 490.1 490.1", viewBox: "0 0 490.1 490.1", xmlns: "http://www.w3.org/2000/svg" },
                        h("path", { d: "m316.2 400.1v-76.1h105.6c37.6 0 68.3-30.6 68.3-68.3v-2.1c0-.6-.1-1.3-.2-1.9l-28.1-176.6c-5.2-42.4-34.8-66.8-81.1-66.8h-209.2c-37.6 0-68.3 30.6-68.3 68.3v196.1c0 5.9-4.8 10.7-10.7 10.7h-57.3c-5.9 0-10.7-4.8-10.7-10.7v-207.8c0-5.9 4.8-10.7 10.7-10.7h33.1c6.8 0 12.3-5.5 12.3-12.3s-5.6-12.3-12.3-12.3h-33.1c-19.4 0-35.2 15.8-35.2 35.2v207.9c0 19.4 15.8 35.2 35.2 35.2h57.3c13.8 0 25.8-8 31.6-19.6.8.5 1.7.8 2.7 1.1 3.3.9 81.4 23.9 81.4 91.2v85.5c0 5.3 3.5 10.1 8.6 11.7.9.3 13 4 28.6 4 13.4 0 29.3-2.7 42.9-12.7 18.5-13.6 27.9-36.8 27.9-69zm-42.4 49.2c-12.9 9.6-30.7 8.7-41.1 7v-75.6c0-86-95.2-113.6-99.3-114.8-1.9-.5-3.8-.6-5.6-.2v-189.1c0-24.1 19.6-43.8 43.8-43.8h209.2c34 0 53.1 15.2 56.9 45.7l28 176v1.1c0 24.1-19.6 43.8-43.8 43.8h-118c-6.8 0-12.3 5.5-12.3 12.3v88.4c.1 23.9-5.9 40.4-17.8 49.2z" }))),
                h("span", { class: "gt-rating-close", onClick: () => this.changeScreen(ScreenTemplate.FAB_SCREEN) }, "\u2715"))));
    }
    renderFab() {
        return (h("div", { id: "gt-sentimeter", class: `gt-sentimeter pointer ${this.containerHover ? 'gt-sentimeter-toggle' : ''}`, onMouseEnter: () => {
                this.clearTickTimeout();
                this.handleFabToggle();
            }, onMouseLeave: () => {
                this.clearTickTimeout();
                this.handleFabToggle();
            }, onClick: () => this.handleFabClick() },
            h("div", { id: "gt-sentimeter-wrapper", class: "gt-sentimeter-wrapper" },
                h("div", null,
                    h("svg", { width: "35", "enable-background": "new 0 0 489.8 489.8", viewBox: "0 0 489.8 489.8", xmlns: "http://www.w3.org/2000/svg" },
                        h("path", { d: "m49.7 375.5c-6.7 14.8-16.5 26.5-29.3 34.8-6.6 4.3-9.8 12.1-8.1 19.8 1.7 7.6 7.8 13.2 15.5 14.3 20.4 2.8 60.2 4.3 96.9-17.7 5.8-3.5 7.7-11 4.2-16.8s-11-7.7-16.8-4.2c-23 13.8-47.9 16.4-66 15.8 12.9-11.6 22.7-26.3 29.3-44 1.6-4.3.6-9.2-2.5-12.6-31.7-34.5-48.4-75.9-48.4-120 0-105.7 98.9-191.7 220.4-191.7s220.4 86 220.4 191.7-98.9 191.7-220.4 191.7c-20.3 0-40.5-2.4-59.9-7.2-6.6-1.6-13.2 2.4-14.8 9s2.4 13.2 9 14.8c21.3 5.2 43.4 7.9 65.7 7.9 135.1 0 244.9-97 244.9-216.2s-109.8-216.2-244.9-216.2-244.9 97-244.9 216.2c0 47.1 17.6 93.2 49.7 130.6z" }),
                        h("path", { d: "m244.9 336.8c34.1 0 64.8-16.9 80.1-44 3.3-5.9 1.3-13.4-4.6-16.7s-13.4-1.3-16.7 4.6c-10.9 19.2-34 31.6-58.8 31.6-25 0-47.5-11.9-58.6-31.1-3.4-5.9-10.9-7.9-16.7-4.5-5.9 3.4-7.9 10.9-4.5 16.7 15.5 26.8 46.1 43.4 79.8 43.4z" }),
                        h("path", { d: "m146 241.1c2.3 3.8 6.3 5.9 10.5 5.9 2.2 0 4.3-.6 6.3-1.8l56.2-34c3.9-2.4 6.2-6.7 5.9-11.2-.3-4.6-3.1-8.6-7.2-10.4l-57.4-25.6c-6.2-2.8-13.4 0-16.2 6.2s0 13.4 6.2 16.2l36 16.1-36.2 21.8c-5.8 3.5-7.6 11-4.1 16.8z" }),
                        h("path", { d: "m345.7 170.2c-2.8-6.2-10-8.9-16.2-6.2l-57.4 25.6c-4.2 1.9-7 5.9-7.2 10.4-.3 4.6 2 8.9 5.9 11.2l56.2 34c2 1.2 4.2 1.8 6.3 1.8 4.1 0 8.2-2.1 10.5-5.9 3.5-5.8 1.6-13.3-4.2-16.8l-36.2-21.8 36-16.1c6.3-2.8 9.1-10 6.3-16.2z" }))),
                this.showText && (h("div", null,
                    h("p", { class: "gt-sentimeter-text" }, "Help us improve?"))))));
    }
    render() {
        if (this.themeColor) {
            this.theme.backgroundColor = this.themeColor;
            this.el.style.setProperty('--theme-color', this.themeColor);
            this.theme.color = SentimeterComponent.invertColor(this.themeColor, this.blackAndWhite);
            this.el.style.setProperty('--text-color', this.theme.color);
            this.el.style.setProperty('--btn-color', this.theme.color.toLowerCase() === '#ffffff' ? 'black' : 'white');
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
    }
    static get is() { return "gt-sentimeter"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "activatedScreen": {
            "state": true
        },
        "blackAndWhite": {
            "type": Boolean,
            "attr": "black-and-white"
        },
        "containerHover": {
            "state": true
        },
        "el": {
            "elementRef": true
        },
        "expandTime": {
            "type": Number,
            "attr": "expand-time"
        },
        "initialFabTrigger": {
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
    }; }
    static get style() { return ":host{--font:\"Helvetica Neue\",sans-serif;--theme-color:#11767E;--text-color:white;--btn-color:white}h1{font-family:var(--font);font-size:2em;margin:.67em 0}textarea{font-family:var(--font);overflow:auto}p{font-family:var(--font);font-size:16px}.gt-sentimeter{display:-webkit-box;display:-ms-flexbox;display:flex;position:fixed;z-index:999;bottom:10px;left:20px;-webkit-transition:all .5s;transition:all .5s;background-color:var(--theme-color);color:var(--text-color);padding:10px;border-radius:50px;width:35px;height:35px;text-align:center;margin:0 auto}.gt-sentimeter-rating{width:375px;height:50px}.gt-sentimeter-more{width:670px;height:50px}.pointer{cursor:pointer}.gt-sentimeter-wrapper{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.gt-sentimeter-toggle{width:200px}path{fill:var(--text-color)}.gt-sentimeter-text{margin:0 0 0 10px;line-height:2.3;white-space:nowrap}.gt-sentimeter-thumb{cursor:pointer;background-color:rgba(0,0,0,.3);width:50px;height:50px;border-radius:50px;-webkit-transition:all .5s;transition:all .5s;line-height:3.8;margin:0 10px}.gt-sentimeter-thumb>svg{margin-top:8px}.gt-rating-close{cursor:pointer;height:20px}.btn{height:40px;border-radius:3px;padding:2px 20px;font-size:16px;font-family:var(--font)}.btn-primary{background-color:var(--btn-color);border-color:transparent;color:var(--text-color);-webkit-box-shadow:2px 5px 8px -3px rgba(0,0,0,.28);-moz-box-shadow:2px 5px 8px -3px rgba(0,0,0,.28);box-shadow:2px 5px 8px -3px rgba(0,0,0,.28)}.btn-transparent{color:var(--text-color);background-color:transparent;border-color:transparent}.btn-block{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;height:40px;margin-top:20px;padding-bottom:30px}.thank-you-container{text-align:center;padding:0 30px}.thank-you-container>h1{margin-bottom:0}.modal{z-index:1000;position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);opacity:0;visibility:hidden;-webkit-transform:scale(1.1);transform:scale(1.1);-webkit-transition:visibility 0s linear .25s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear .25s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear .25s,opacity .25s 0s,transform .25s;transition:visibility 0s linear .25s,opacity .25s 0s,transform .25s,-webkit-transform .25s}.modal-content{position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:var(--theme-color);color:var(--text-color);padding:1rem 30px;border-radius:.5rem}.textarea{font-size:1rem;line-height:1.5;color:#495057;border:1px solid #ced4da;border-radius:.25rem}.input{display:block;width:100%;height:40px;font-size:1rem;line-height:1.5;color:#495057;border:1px solid #ced4da;border-radius:.25rem}.close-button{float:right;width:1.5rem;line-height:1.5rem;text-align:center;cursor:pointer;border-radius:.25rem;color:#fff}.close-button:hover{background-color:#a9a9a9}.show-modal{opacity:1;visibility:visible;-webkit-transform:scale(1);transform:scale(1);-webkit-transition:visibility 0s linear 0s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear 0s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear 0s,opacity .25s 0s,transform .25s;transition:visibility 0s linear 0s,opacity .25s 0s,transform .25s,-webkit-transform .25s}"; }
}

export { SentimeterComponent as GtSentimeter };
