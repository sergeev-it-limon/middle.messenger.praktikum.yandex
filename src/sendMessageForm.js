import { getFormEntries } from "./utils/getFormEntries";

const initSendMessageForm = () => {
    const searchChatForm = document.querySelector('#sendMessageForm');

    if (searchChatForm == null) return;

    searchChatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log(getFormEntries(e.target));
    });
};

export default initSendMessageForm;