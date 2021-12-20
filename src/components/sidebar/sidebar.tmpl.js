import pug from "pug-runtime";

export const template = pug`
aside(class=style.root)
    section(class=style.searchProfile)
        div(data-component='profileLink')
        div(data-component='searchChatForm')
    div(class=style.chatsList)
        div(data-component='chatsList')
`;
