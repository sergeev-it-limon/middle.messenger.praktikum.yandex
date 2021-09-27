import FormGatherer from './formGatherer';
import initSearhcChatForm from './searchChatForm.js';
import initSendMessageForm from './sendMessageForm.js';
import initPopupAddFile from './popupAddFile.js';
import initPopupChatActions from './popupChatActions';
import initModalAddRemoveUser from './modalAddRemoveUser';
import showDialog from './utils/showDialog.js';

window.onload = () => {
    // Ищем на странице элементы ввода, с котрых нужо собирать данные (элементы с классом inputStringItem)
    const inputElemsArr=[...document.querySelectorAll('.inputString__input')];
    if (inputElemsArr.length > 0) {        
        // Получим массив с идентификаторами
        const inputElemIdArr = inputElemsArr.map((item)=>item.id);
        // Создаем экземпляр сборщика
        const gatherer = new FormGatherer(inputElemIdArr);
        // Навешиваем обработчики события
        gatherer.addEventLesteners();        
    }
    window.showDialog = showDialog;
    initSearhcChatForm();
    initSendMessageForm();
    initPopupAddFile();
    initPopupChatActions();
    initModalAddRemoveUser()
}