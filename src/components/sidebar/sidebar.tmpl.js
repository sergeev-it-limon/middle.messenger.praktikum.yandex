import pug from "pug-runtime";

export const template = pug`
aside(class=style.root)
    section(class=style.searchProfile)
        div(data-component='profileLink')
        div(data-component='searchChatForm')
    section(class=style.buttonAddChat)
        div(data-component='buttonAddChat')
    div(class=style.chatsList)
        div(data-component='chatsList')
    div(data-component='modalAddChat')
`;
