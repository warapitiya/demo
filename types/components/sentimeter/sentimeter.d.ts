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
}
export declare class SentimeterComponent {
    themeColor: string;
    theme: Theme;
    containerHover: boolean;
    showText: boolean;
    activatedScreen: ScreenTemplate;
    showModal: boolean;
    showThankYouModal: boolean;
    handleFabToggle(): void;
    handleFabClick(): void;
    handleThumb(): void;
    handleQuestionClick(): void;
    handleSubmitClick(): void;
    renderQuestion(): JSX.Element;
    renderMoreFeedback(): JSX.Element;
    renderRating(): JSX.Element;
    renderFab(): JSX.Element;
    render(): JSX.Element;
}
export {};
