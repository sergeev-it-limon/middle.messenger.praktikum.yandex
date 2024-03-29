import pug from 'pug-runtime';

export const template = pug`
section(class=style.root)
    header(class=style.header)
        div(data-component='imageAvatar')
        h1(class=style.headerText) Чат
        div(class=style.actions)
            div(data-component='popupChatActions')
    div(data-component='dividerHeader')
    section(class=style.chat)
        each meta in messagesMeta
            case meta.type
                when 'message'
                    div(class=style.messageWrapper)
                        div(data-component='message_'+meta.id)
                when 'myMessage'
                    div(class=style.myMessageWrapper)
                        div(data-component='message_'+meta.id)
                when 'date'
                    h3(class=style.date)= meta.dateValue
    div(data-component='dividerFooter')
    footer(class=style.footer)
        div(data-component='sendMessageForm')
`;