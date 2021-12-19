import pug from "pug-runtime";

export const template = pug`
figure(data-state='class:class')
    img(class=style.image, src=src, alt=alt data-state='src:src,alt:alt')
`;
