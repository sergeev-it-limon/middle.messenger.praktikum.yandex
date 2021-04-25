import { getFormEntries } from "./utils/getFormEntries";

const initSearhcChatForm = () => {
    const searchChatForm = document.querySelector('#searchChatForm');
    
    if (searchChatForm == null) return;

    searchChatForm.addEventListener('submit', (e) => {
        e.preventDefault();

        console.log(getFormEntries(e.target));
    });
};

export default initSearhcChatForm;