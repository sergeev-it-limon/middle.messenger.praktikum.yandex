import pug from "pug-runtime";

export const template = pug`
div(class=style.root  data-state='style:lineClamp')
  div(data-component='content')
`;
