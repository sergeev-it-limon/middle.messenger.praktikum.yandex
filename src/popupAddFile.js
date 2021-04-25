import initPopup from './popup';
const BUTTON_CLASS_ACTIVE = 'buttonAddFile_active';

const initPopupAddFile = () => {
    const buttonAddFile = document.querySelector('#buttonAddFile');
    const popupAddFile = document.querySelector('#popupAddFile');

    initPopup(buttonAddFile, BUTTON_CLASS_ACTIVE, popupAddFile);
};

export default initPopupAddFile;
