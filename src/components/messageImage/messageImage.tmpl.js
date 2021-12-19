import pug from "pug-runtime";

export const template = pug`
section(class=style.root)
    div(class=style.wrapper)
        figure(class=style.imgContainer)
            img(class=style.img data-state='src:src')
        time(class=style.time data-state='time')
`;
