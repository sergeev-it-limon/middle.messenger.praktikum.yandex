import pug from "pug-runtime";

export const template = pug`
button(data-state='class:rootClassName' data-actions='click:handleClick' type='button')
    div(data-component='imageAvatar')
    div(data-state='class:popupClassName')
        div Поменять аватар
`;
