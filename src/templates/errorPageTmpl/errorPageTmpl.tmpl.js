import pug from "pug-runtime";

export const template = pug`
div(class=style.pageWrapper)
    header(class=style.header)
        div(data-component='header')
    main(class=style.main)
        div(data-component='main')
    footer(class=style.footer)
        div(data-component='button')
`;
