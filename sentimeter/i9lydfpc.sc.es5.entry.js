/*! Built with http://stenciljs.com */
sentimeter.loadBundle("i9lydfpc",["exports"],function(t){var e,n=window.sentimeter.h;!function(t){t[t.FAB_SCREEN=0]="FAB_SCREEN",t[t.RATING_SCREEN=1]="RATING_SCREEN",t[t.QUESTION_SCREEN=2]="QUESTION_SCREEN",t[t.MODAL_WINDOW=3]="MODAL_WINDOW",t[t.THANK_YOU_WINDOW=4]="THANK_YOU_WINDOW"}(e||(e={}));var i=function(){function t(){this.blackAndWhite=!1,this.expandTime=3e4,this.theme={backgroundColor:"#11767E",color:"white"},this.containerHover=!1,this.showText=!1,this.activatedScreen=e.FAB_SCREEN,this.showModal=!1,this.showThankYouModal=!1,this.initialFabTrigger={primaryTickId:null,secondaryTickId:null}}return t.prototype.componentDidLoad=function(){var t=this;this.initialFabTrigger.primaryTickId=setTimeout(function(){t.handleFabToggle(),t.initialFabTrigger.secondaryTickId=setTimeout(function(){t.handleFabToggle()},3e3)},this.expandTime)},t.padZero=function(t){return(new Array(2).join("0")+t).slice(-2)},t.invertColor=function(e,n){if(0===e.indexOf("#")&&(e=e.slice(1)),3===e.length&&(e=e[0]+e[0]+e[1]+e[1]+e[2]+e[2]),6!==e.length)throw new Error("Invalid HEX color.");var i=parseInt(e.slice(0,2),16),r=parseInt(e.slice(2,4),16),o=parseInt(e.slice(4,6),16);if(n)return.299*i+.587*r+.114*o>186?"#000000":"#FFFFFF";var a=(255-i).toString(16),s=(255-r).toString(16),l=(255-o).toString(16);return"#"+t.padZero(a)+t.padZero(s)+t.padZero(l)},t.prototype.handleFabToggle=function(){var t=this;this.containerHover=!this.containerHover,this.containerHover?setTimeout(function(){t.showText=!t.showText},400):this.showText=!this.showText},t.prototype.clearTickTimeout=function(){clearTimeout(this.initialFabTrigger.primaryTickId),clearTimeout(this.initialFabTrigger.secondaryTickId),this.initialFabTrigger.primaryTickId=null,this.initialFabTrigger.secondaryTickId=null},t.prototype.handleFabClick=function(){this.activatedScreen=e.RATING_SCREEN},t.prototype.handleThumb=function(){this.activatedScreen=e.QUESTION_SCREEN},t.prototype.handleQuestionClick=function(){this.activatedScreen=e.MODAL_WINDOW,this.showModal=!0},t.prototype.handleSubmitClick=function(){var t=this;this.activatedScreen=e.THANK_YOU_WINDOW,this.showModal=!1,this.showThankYouModal=!0,setTimeout(function(){t.showThankYouModal=!1},3e3)},t.prototype.changeScreen=function(t){this.activatedScreen=t,this.containerHover=!1,this.showText=!1},t.prototype.renderQuestion=function(){var t=this;return this.activatedScreen===e.QUESTION_SCREEN?n("div",{id:"gt-sentimeter",class:"gt-sentimeter gt-sentimeter-more"},n("div",{id:"gt-sentimeter-wrapper",class:"gt-sentimeter-wrapper"},n("p",{class:"gt-sentimeter-text",style:{lineHeight:"normal",paddingTop:"6px",textAlign:"left"}},"Thank you! Your satisfication is our priority. ",n("br",null),"Help us improve further with 2 minutes of your time."),n("div",{style:{marginLeft:"10px"}},n("button",{class:"btn btn-primary",onClick:function(){return t.handleQuestionClick()}},"LET'S GO"),n("button",{class:"btn btn-transparent",onClick:function(){return t.changeScreen(e.FAB_SCREEN)}},"NO THANKS")))):n("div",null)},t.prototype.renderMoreFeedback=function(){var t=this;return n("div",null,this.renderQuestion(),n("div",{class:"modal "+(this.showModal?"show-modal":"")},n("div",{class:"modal-content"},n("span",{class:"close-button"},"×"),n("div",null,n("p",{class:"c-font"},"What did you like most?"),n("textarea",{class:"textarea",rows:4})),n("div",null,n("p",{class:"c-font"},"What did you like least?"),n("textarea",{class:"textarea",rows:4})),n("div",null,n("p",{class:"c-font"},"Your email (optional)"),n("input",{class:"input",type:"email"})),n("div",{class:"btn-block"},n("button",{class:"btn btn-transparent",onClick:function(){return t.handleSubmitClick()}},"CANCEL"),n("button",{class:"btn btn-primary",onClick:function(){return t.handleSubmitClick()}},"SUBMIT")))),n("div",{class:"modal "+(this.showThankYouModal?"show-modal":"")},n("div",{class:"modal-content"},n("div",{class:"thank-you-container"},n("h1",{class:"c-font"},"Thank you!"),n("p",{class:"c-font"},"Your feedback is valuable to us.")))))},t.prototype.renderRating=function(){var t=this;return n("div",{id:"gt-sentimeter",class:"gt-sentimeter gt-sentimeter-rating"},n("div",{id:"gt-sentimeter-wrapper",class:"gt-sentimeter-wrapper"},n("p",{class:"gt-sentimeter-text",style:{lineHeight:"3.3"}},"It is easy to find what I need"),n("div",{class:"gt-sentimeter-thumb",onClick:function(){return t.handleThumb()}},n("svg",{width:"40",viewBox:"10 15 70 70",xmlns:"http://www.w3.org/2000/svg"},n("path",{d:"m65.62 36.37h-17.6l4.4-8.37a5.4 5.4 0 0 0 -4.77-7.93h-6.93a5.39 5.39 0 0 0 -4.72 2.93l-7.17 13.4a5.69 5.69 0 0 0 -1-.1h-5.4a5.41 5.41 0 0 0 -5.43 5.4v21.61a5.41 5.41 0 0 0 5.4 5.4h5.4a5.36 5.36 0 0 0 3.54-1.35 8 8 0 0 0 4.55 1.41h20.48a8.08 8.08 0 0 0 7.16-4.32l6.55-12.39a8.2 8.2 0 0 0 .92-3.79v-6.5a5.4 5.4 0 0 0 -5.38-5.4zm-43.21 26.94v-21.61h5.39v19 .32 2.33zm43.2-15a2.68 2.68 0 0 1 -.31 1.27l-6.54 12.35a2.69 2.69 0 0 1 -2.39 1.44h-20.47a2.68 2.68 0 0 1 -2.69-2.58v-19.09s0-.08 0-.12v-1.9l7.52-14.17h6.93l-6.5 12.23a2.7 2.7 0 0 0 2.37 4l22.08.06z"}))),n("div",{class:"gt-sentimeter-thumb",onClick:function(){return t.handleThumb()}},n("svg",{xmlns:"http://www.w3.org/2000/svg",width:"40",viewBox:"10 15 70 70"},n("path",{d:"M22.41,52.51,40,52.56l-4.39,8.28a5.4,5.4,0,0,0,4.77,7.93H47.3a5.37,5.37,0,0,0,4.77-2.87L59.2,52.48a5.67,5.67,0,0,0,1,.1h5.4a5.4,5.4,0,0,0,5.4-5.4V25.57a5.4,5.4,0,0,0-5.4-5.4h-5.4a5.4,5.4,0,0,0-3.53,1.34,8,8,0,0,0-4.55-1.4H31.66a8.1,8.1,0,0,0-7.17,4.32L18,36.82A8.17,8.17,0,0,0,17,40.6v6.51A5.41,5.41,0,0,0,22.41,52.51Zm43.2-26.94V47.18H60.23v-19c0-.1,0-.21,0-.32V25.57Zm-43.2,15a2.68,2.68,0,0,1,.32-1.26L29.27,27a2.69,2.69,0,0,1,2.39-1.44H52.13a2.68,2.68,0,0,1,2.68,2.58V47.18a.5.5,0,0,0,0,.12v1.89L47.3,63.37H40.38l6.49-12.24a2.7,2.7,0,0,0-2.38-4l-22.08-.06Z"}))),n("span",{class:"gt-rating-close",onClick:function(){return t.changeScreen(e.FAB_SCREEN)}},"✕")))},t.prototype.renderFab=function(){var t=this;return n("div",{id:"gt-sentimeter",class:"gt-sentimeter pointer "+(this.containerHover?"gt-sentimeter-toggle":""),onMouseEnter:function(){t.clearTickTimeout(),t.handleFabToggle()},onMouseLeave:function(){t.clearTickTimeout(),t.handleFabToggle()},onClick:function(){return t.handleFabClick()}},n("div",{id:"gt-sentimeter-wrapper",class:"gt-sentimeter-wrapper"},n("div",null,n("svg",{width:"36",viewBox:"10 6 70 70",xmlns:"http://www.w3.org/2000/svg"},n("g",null,n("path",{d:"m61.78 68.31h-35.38a4.4 4.4 0 0 1 -4.4-4.4v-9.91l-9-8.47a2.44 2.44 0 0 1 0-3.53l9-8.48v-9.9a4.41 4.41 0 0 1 4.4-4.4h35.38a4.41 4.41 0 0 1 4.4 4.4v40.29a4.4 4.4 0 0 1 -4.4 4.4zm-34.87-4.91h34.36v-39.27h-34.36v10.43a2.43 2.43 0 0 1 -.78 1.79l-7.9 7.42 7.9 7.41a2.43 2.43 0 0 1 .78 1.82z"}),n("path",{d:"m44.09 53.61a15.33 15.33 0 0 1 -14.62-10.89 2.45 2.45 0 0 1 4.7-1.4 10.36 10.36 0 0 0 19.84 0 2.46 2.46 0 0 1 4.71 1.4 15.35 15.35 0 0 1 -14.63 10.89z"})))),this.showText&&n("div",null,n("p",{class:"gt-sentimeter-text"},"Help us improve?"))))},t.prototype.render=function(){switch(this.themeColor&&(this.theme.backgroundColor=this.themeColor,this.el.style.setProperty("--theme-color",this.themeColor),this.theme.color=t.invertColor(this.themeColor,this.blackAndWhite),this.el.style.setProperty("--text-color",this.theme.color),this.el.style.setProperty("--btn-color",this.btnColor),this.el.style.setProperty("--btn-background-color",this.btnBackgroundColor)),this.activatedScreen){case e.FAB_SCREEN:return this.renderFab();case e.RATING_SCREEN:return this.renderRating();case e.THANK_YOU_WINDOW:case e.MODAL_WINDOW:case e.QUESTION_SCREEN:return this.renderMoreFeedback()}},Object.defineProperty(t,"is",{get:function(){return"gt-sentimeter"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"encapsulation",{get:function(){return"shadow"},enumerable:!0,configurable:!0}),Object.defineProperty(t,"properties",{get:function(){return{activatedScreen:{state:!0},blackAndWhite:{type:Boolean,attr:"black-and-white"},btnBackgroundColor:{type:String,attr:"btn-background-color"},btnColor:{type:String,attr:"btn-color"},containerHover:{state:!0},el:{elementRef:!0},expandTime:{type:Number,attr:"expand-time"},initialFabTrigger:{state:!0},showModal:{state:!0},showText:{state:!0},showThankYouModal:{state:!0},theme:{state:!0},themeColor:{type:String,attr:"theme-color"}}},enumerable:!0,configurable:!0}),Object.defineProperty(t,"style",{get:function(){return".sc-gt-sentimeter-h{--font:\"Helvetica Neue\",sans-serif;--theme-color:#11767E;--text-color:white;--btn-background-color:#11767E;--btn-color:white}h1.sc-gt-sentimeter{font-family:var(--font);font-size:2em;margin:.67em 0}textarea.sc-gt-sentimeter{font-family:var(--font);overflow:auto}p.sc-gt-sentimeter{font-family:var(--font);font-size:16px}.gt-sentimeter.sc-gt-sentimeter{display:-webkit-box;display:-ms-flexbox;display:flex;position:fixed;z-index:999;bottom:10px;left:20px;-webkit-transition:all .5s;transition:all .5s;background-color:var(--theme-color);color:var(--text-color);padding:10px;border-radius:50px;width:35px;height:35px;text-align:center;margin:0 auto}.gt-sentimeter-rating.sc-gt-sentimeter{width:375px;height:50px}.gt-sentimeter-more.sc-gt-sentimeter{width:670px;height:50px}.pointer.sc-gt-sentimeter{cursor:pointer}.gt-sentimeter-wrapper.sc-gt-sentimeter{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center}.gt-sentimeter-toggle.sc-gt-sentimeter{width:200px}path.sc-gt-sentimeter{fill:var(--text-color)}.gt-sentimeter-text.sc-gt-sentimeter{margin:0 0 0 10px;line-height:2.3;white-space:nowrap}.gt-sentimeter-thumb.sc-gt-sentimeter{cursor:pointer;background-color:rgba(0,0,0,.3);width:50px;height:50px;border-radius:50px;-webkit-transition:all .5s;transition:all .5s;line-height:3.8;margin:0 10px}.gt-sentimeter-thumb.sc-gt-sentimeter > svg.sc-gt-sentimeter{margin-top:8px}.gt-rating-close.sc-gt-sentimeter{cursor:pointer;height:20px}.btn.sc-gt-sentimeter{cursor:pointer;height:40px;border-radius:3px;padding:2px 20px;font-size:16px;font-family:var(--font)}.btn-primary.sc-gt-sentimeter{background-color:var(--btn-background-color);border-color:transparent;color:var(--text-color);-webkit-box-shadow:2px 5px 8px -3px rgba(0,0,0,.28);-moz-box-shadow:2px 5px 8px -3px rgba(0,0,0,.28);box-shadow:2px 5px 8px -3px rgba(0,0,0,.28)}.btn-transparent.sc-gt-sentimeter{color:var(--text-color);background-color:transparent;border-color:transparent}.btn-block.sc-gt-sentimeter{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;-webkit-box-align:stretch;-ms-flex-align:stretch;align-items:stretch;height:40px;margin-top:20px;padding-bottom:30px}.thank-you-container.sc-gt-sentimeter{text-align:center;padding:0 30px}.thank-you-container.sc-gt-sentimeter > h1.sc-gt-sentimeter{margin-bottom:0}.modal.sc-gt-sentimeter{z-index:1000;position:fixed;left:0;top:0;width:100%;height:100%;background-color:rgba(0,0,0,.5);opacity:0;visibility:hidden;-webkit-transform:scale(1.1);transform:scale(1.1);-webkit-transition:visibility 0s linear .25s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear .25s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear .25s,opacity .25s 0s,transform .25s;transition:visibility 0s linear .25s,opacity .25s 0s,transform .25s,-webkit-transform .25s}.modal-content.sc-gt-sentimeter{min-width:320px;position:absolute;top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%);background-color:var(--theme-color);color:var(--text-color);padding:1rem 30px;border-radius:.5rem}.textarea.sc-gt-sentimeter{width:100%;font-size:16px;line-height:1.5;color:#495057;border:1px solid #ced4da;border-radius:.25rem}.input.sc-gt-sentimeter{display:block;width:100%;height:40px;font-size:1rem;line-height:1.5;color:#495057;border:1px solid #ced4da;border-radius:.25rem}.close-button.sc-gt-sentimeter{float:right;width:1.5rem;line-height:1.5rem;text-align:center;cursor:pointer;border-radius:.25rem;color:#fff}.close-button.sc-gt-sentimeter:hover{background-color:#a9a9a9}.show-modal.sc-gt-sentimeter{opacity:1;visibility:visible;-webkit-transform:scale(1);transform:scale(1);-webkit-transition:visibility 0s linear 0s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear 0s,opacity .25s 0s,-webkit-transform .25s;transition:visibility 0s linear 0s,opacity .25s 0s,transform .25s;transition:visibility 0s linear 0s,opacity .25s 0s,transform .25s,-webkit-transform .25s}"},enumerable:!0,configurable:!0}),t}();t.GtSentimeter=i,Object.defineProperty(t,"__esModule",{value:!0})});