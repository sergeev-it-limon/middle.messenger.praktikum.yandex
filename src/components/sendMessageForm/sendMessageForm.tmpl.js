import pug from "pug-runtime";

export const template = pug`
form(class=style.root data-actions='submit:handleSubmit')
    div(data-component='popupAddFile')
    div(class=style.inputSendMessage)
        div(data-component='inputSendMessage')
    div(class=style.buttonSubmitSendMessageForm)
        div(data-component='buttonSubmitSendMessageForm')
`;
