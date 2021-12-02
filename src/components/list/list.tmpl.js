import pug from "pug-runtime";

export const template = pug`
ul(data-state='class:ulClassName')
  each key in childrenKeys
    li(data-state='class:liClassName')
      div(data-component=key)
`;
