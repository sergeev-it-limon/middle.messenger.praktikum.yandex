import pug from "pug-runtime";

export const template = pug`
label(data-state='class:labelClassName')
  input(
    data-state='class:inputClassName,accept:accept'
    data-actions='change:handleChange'
    type='file'
    name='file'
  )
  span(data-state='text')
`;
