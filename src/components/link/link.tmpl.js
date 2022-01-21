import pug from "pug-runtime";

export const template = pug`
  a(data-state='class:className' data-actions='click:handleClick')
    div(data-component='content')
`;
