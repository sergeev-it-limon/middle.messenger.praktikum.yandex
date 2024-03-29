import pug from "pug-runtime";

export const template = pug`
section(class=style.root)
    div(class=style.imageAvatar)
        div(data-component='imageAvatar')
    div(class=style.contentWrapper)
        div(data-component='name')
        div(data-component='previewText')
    div(class=style.addInfo)
        time(class=style.timeLastMessage data-state='timeLastMsg')
        div(class=style.unreadedMessagesCount data-state='unreadedMsgCnt')
`;
