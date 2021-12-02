import pug from "pug-runtime";

export const template = pug`
form(
  data-state='class:rootClassName'
  data-actions='submit:handleSubmit;input:handleInput;focusin:handleFocusIn;focusout:handleFocusOut'
)
    div(data-state='class:topClassName')
      div(data-component='formTop')
    nav(data-state='class:bottomClassName')
      div(data-component='formBottom')
`;
