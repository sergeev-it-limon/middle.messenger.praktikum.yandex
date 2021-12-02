import pug from "pug-runtime";

export const template = pug`
section(class=style.root)
    ul(class=style.list)
        each id in itemIds
            hr(class=style.divider)
            div(class=style.itemWrapper)
                div(data-component='item_'+id)
        hr(class=style.divider)
`;
