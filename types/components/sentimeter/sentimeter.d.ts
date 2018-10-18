import '../../stencil.core';
declare enum ScreenTemplate {
    FAB_SCREEN = 0,
    RATING_SCREEN = 1,
    QUESTION_SCREEN = 2,
    MODAL_WINDOW = 3,
    THANK_YOU_WINDOW = 4
}
interface Theme {
    backgroundColor: string;
    color: string;
}
export declare class SentimeterComponent {
    el: HTMLElement;
    themeColor: string;
    btnColor: string;
    blackAndWhite: boolean;
    expandTime: number;
    theme: Theme;
    containerHover: boolean;
    showText: boolean;
    activatedScreen: ScreenTemplate;
    showModal: boolean;
    showThankYouModal: boolean;
    initialFabTrigger: {
        primaryTickId: any;
        secondaryTickId: any;
    };
    componentDidLoad(): void;
    static padZero(str: any): string;
    static invertColor(hex: any, bw: any): string;
    handleFabToggle(): void;
    clearTickTimeout(): void;
    handleFabClick(): void;
    handleThumb(): void;
    handleQuestionClick(): void;
    handleSubmitClick(): void;
    changeScreen(screen: ScreenTemplate): void;
    renderQuestion(): JSX.Element;
    renderMoreFeedback(): JSX.Element;
    renderRating(): JSX.Element;
    renderFab(): JSX.Element;
    render(): JSX.Element;
}
export {};
