import pug from "pug-runtime";

export const template = pug`
div(data-state='class:outerWrapperClassName')
    div(data-state='class:closeElemClassName' data-actions='click:handleClose')
    section(data-state='class:rootClassName')
        h2(data-state='class:headerClassName,headerText')
        form(data-actions='submit:handleSubmit')
            div(data-state='class:inputClassName')
                div(data-component='inputString')
            div(data-state='class:submitClassName')
                div(data-component='buttonMain')
`;
