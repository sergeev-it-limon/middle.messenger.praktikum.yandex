import pug from "pug-runtime";

export const template = pug`
section(data-state='class:rootClassName')
    label(data-state='labelText')
    p(data-state='class:textClassName,mainText')
`;
