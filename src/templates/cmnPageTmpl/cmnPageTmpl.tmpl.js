import pug from "pug-runtime";

export const template = pug`
main(data-state='class:rootClassName')
  div(data-component='content')
`;
