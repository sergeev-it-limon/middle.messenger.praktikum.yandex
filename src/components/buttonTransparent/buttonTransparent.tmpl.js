import pug from "pug-runtime";

export const template = pug`
button(data-state='class:rootClassName,type:type,text' data-actions='click:handleClick')
`;
