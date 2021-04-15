import { getFormEntries } from "./utils/getFormEntries";

const initModalAddRemoveUser = () => {
    initForms();
    initModals();
};

function initForms() {
    const addUserForm = document.querySelector('#modalAddUser__form');
    if (addUserForm != null) {
        addUserForm.addEventListener('submit', (e) => {
            e.preventDefault();

            console.log(getFormEntries(e.target));
        });
    }
    
    const removeUserForm = document.querySelector('#modalRemoveUser__form');

    if (removeUserForm != null) {
        removeUserForm.addEventListener('submit', (e) => {
            e.preventDefault();

            console.log(getFormEntries(e.target));
        });
    }
}

function initModals() {
    const addModalElem = document.querySelector('#modalAddUser__outerWrapper');
    const addCloseElem = addModalElem.querySelector('#modalAddUser__close');
    // Триггер - это кнопка вызывающая модальное окно, и располагается вне модального окна
    const addTrigger = document.querySelector('#modalAddUser__trigger');
    
    const removeModalElem = document.querySelector('#modalRemoveUser__outerWrapper');
    const removeCloseElem = removeModalElem.querySelector('#modalRemoveUser__close');
    // Триггер - это кнопка вызывающая модальное окно, и располагается вне модального окна
    const removeTrigger = document.querySelector('#modalRemoveUser__trigger');

    initModal(addModalElem, addCloseElem, addTrigger);
    initModal(removeModalElem, removeCloseElem, removeTrigger);
}

function initModal(modalElem, closeElem, trigger) {
    if (modalElem == null || closeElem == null || trigger == null) return;

    closeElem.addEventListener('click', () => {
        modalElem.classList.add('modalAddRemoveUser_close');
        modalElem.classList.remove('modalAddRemoveUser_open');
    });

    trigger.addEventListener('click', () => {
        modalElem.classList.remove('modalAddRemoveUser_close');
        modalElem.classList.add('modalAddRemoveUser_open');
    });
}

export default initModalAddRemoveUser;