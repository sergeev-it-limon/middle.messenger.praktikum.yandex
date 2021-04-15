const POPUP_CLASS_OPEN = 'popup__inner_open';

const initPopup = (trigger, triggerClassActive, popup) => {
    if (trigger == null || popup == null) return;

    let isOpenPopup = false;

    // На стадии поднятия после клика по триггеру
    // сбросится в false в колбэке popupClose
    let isClickByPopup = true;

    trigger.addEventListener('click', popupOpen);

    popup.addEventListener('click', () => {
        isClickByPopup = true;
    });

    function popupOpen() {
        if(!isOpenPopup) {
            isOpenPopup = true;

            trigger.classList.add(triggerClassActive);
            popup.classList.add(POPUP_CLASS_OPEN);

            document.body.addEventListener('click', popupClose);
        }
    }

    function popupClose() {
        if (isClickByPopup) {
            isClickByPopup = false;
        }
        else {
            isOpenPopup = false;
            isClickByPopup = true;

            trigger.classList.remove(triggerClassActive);
            popup.classList.remove(POPUP_CLASS_OPEN);

            document.body.removeEventListener('click', popupClose);
        }
    }
};

export default initPopup;
