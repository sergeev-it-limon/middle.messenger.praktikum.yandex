import pug from "pug-runtime";

export const template = pug`
a(class=style.root href='/profile') Профиль
    svg(class=style.icon width='6' height='10' viewBox='0 0 6 10' fill='none' xmlns='http://www.w3.org/2000/svg')
        path(d='M1 9L5 5L1 1' stroke='#999999')
`;
