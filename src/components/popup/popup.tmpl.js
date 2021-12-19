import pug from "pug-runtime";

export const template = pug`
div(class=style.wrapper)
    section(class=style.root+' '+popupClassName data-state='style:innerStyle')
        div(data-state='class:innerClassName')
            div(data-component='content')
    div(data-component='trigger')
`;
