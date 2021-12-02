import pug from "pug-runtime";

export const template = pug`
section(data-state='class:className')
    article(data-state='text')
    time(class=style.time data-state='time')
`;
