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
                    h("svg", { width: "40", viewBox: "10 15 70 70", xmlns: "http://www.w3.org/2000/svg" },
                        h("path", { d: "m65.62 36.37h-17.6l4.4-8.37a5.4 5.4 0 0 0 -4.77-7.93h-6.93a5.39 5.39 0 0 0 -4.72 2.93l-7.17 13.4a5.69 5.69 0 0 0 -1-.1h-5.4a5.41 5.41 0 0 0 -5.43 5.4v21.61a5.41 5.41 0 0 0 5.4 5.4h5.4a5.36 5.36 0 0 0 3.54-1.35 8 8 0 0 0 4.55 1.41h20.48a8.08 8.08 0 0 0 7.16-4.32l6.55-12.39a8.2 8.2 0 0 0 .92-3.79v-6.5a5.4 5.4 0 0 0 -5.38-5.4zm-43.21 26.94v-21.61h5.39v19 .32 2.33zm43.2-15a2.68 2.68 0 0 1 -.31 1.27l-6.54 12.35a2.69 2.69 0 0 1 -2.39 1.44h-20.47a2.68 2.68 0 0 1 -2.69-2.58v-19.09s0-.08 0-.12v-1.9l7.52-14.17h6.93l-6.5 12.23a2.7 2.7 0 0 0 2.37 4l22.08.06z" }))),
                h("div", { class: "gt-sentimeter-thumb", onClick: () => this.handleThumb() },
                    h("svg", { xmlns: "http://www.w3.org/2000/svg", width: "40", viewBox: "10 15 70 70" },
                        h("path", { d: "M22.41,52.51,40,52.56l-4.39,8.28a5.4,5.4,0,0,0,4.77,7.93H47.3a5.37,5.37,0,0,0,4.77-2.87L59.2,52.48a5.67,5.67,0,0,0,1,.1h5.4a5.4,5.4,0,0,0,5.4-5.4V25.57a5.4,5.4,0,0,0-5.4-5.4h-5.4a5.4,5.4,0,0,0-3.53,1.34,8,8,0,0,0-4.55-1.4H31.66a8.1,8.1,0,0,0-7.17,4.32L18,36.82A8.17,8.17,0,0,0,17,40.6v6.51A5.41,5.41,0,0,0,22.41,52.51Zm43.2-26.94V47.18H60.23v-19c0-.1,0-.21,0-.32V25.57Zm-43.2,15a2.68,2.68,0,0,1,.32-1.26L29.27,27a2.69,2.69,0,0,1,2.39-1.44H52.13a2.68,2.68,0,0,1,2.68,2.58V47.18a.5.5,0,0,0,0,.12v1.89L47.3,63.37H40.38l6.49-12.24a2.7,2.7,0,0,0-2.38-4l-22.08-.06Z" }))),
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
                    h("svg", { width: "36", viewBox: "10 6 70 70", xmlns: "http://www.w3.org/2000/svg" },
                        h("g", null,
                            h("path", { d: "m61.78 68.31h-35.38a4.4 4.4 0 0 1 -4.4-4.4v-9.91l-9-8.47a2.44 2.44 0 0 1 0-3.53l9-8.48v-9.9a4.41 4.41 0 0 1 4.4-4.4h35.38a4.41 4.41 0 0 1 4.4 4.4v40.29a4.4 4.4 0 0 1 -4.4 4.4zm-34.87-4.91h34.36v-39.27h-34.36v10.43a2.43 2.43 0 0 1 -.78 1.79l-7.9 7.42 7.9 7.41a2.43 2.43 0 0 1 .78 1.82z" }),
                            h("path", { d: "m44.09 53.61a15.33 15.33 0 0 1 -14.62-10.89 2.45 2.45 0 0 1 4.7-1.4 10.36 10.36 0 0 0 19.84 0 2.46 2.46 0 0 1 4.71 1.4 15.35 15.35 0 0 1 -14.63 10.89z" })))),
                this.showText && (h("div", null,
                    h("p", { class: "gt-sentimeter-text" }, "Help us improve?"))))));
    }
    render() {
        if (this.themeColor) {
            this.theme.backgroundColor = this.themeColor;
            this.el.style.setProperty('--theme-color', this.themeColor);
            this.theme.color = SentimeterComponent.invertColor(this.themeColor, this.blackAndWhite);
            this.el.style.setProperty('--text-color', this.theme.color);
            this.el.style.setProperty('--btn-color', this.btnColor);
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
        "btnColor": {
            "type": String,
            "attr": "btn-color"
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
