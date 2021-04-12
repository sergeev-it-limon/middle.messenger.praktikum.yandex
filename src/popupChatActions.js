import initPopup from './popup';
const BUTTON_CLASS_ACTIVE = 'buttonChatActions_active';

const initPopupChatActions = () => {
    const buttonChatActions = document.querySelector('#buttonChatActions');
    const popupChatActions = document.querySelector('#popupChatActions');

    initPopup(buttonChatActions, BUTTON_CLASS_ACTIVE, popupChatActions);
};

export default initPopupChatActions;
