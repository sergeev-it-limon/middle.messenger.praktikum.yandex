import pug from "pug-runtime";

export const template = pug`
button(data-state='class:className,type:type' data-actions='click:handleClick')
  img(data-state='src:imgSrc,alt:imgAlt,class:imgClassName')
  span(data-state='text,class:textClassName')
`;
