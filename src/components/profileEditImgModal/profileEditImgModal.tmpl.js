import pug from "pug-runtime";

export const template = pug`
div(data-state='class:outerWrapperClassName')
    div(data-state='class:closeElemClassName' data-actions='click:handleClose')
    section(data-state='class:rootClassName')
        form(data-actions='submit:handleSubmit')
            h2(data-state='class:headerClassName') Загрузите файл
            div(data-component='form')
`;
