import pug from "pug-runtime";

export const template = pug`
li(class=style.root)
  a(data-state='href:href,class:classLink')
    div(data-component='chatSelectableElem')
`;
