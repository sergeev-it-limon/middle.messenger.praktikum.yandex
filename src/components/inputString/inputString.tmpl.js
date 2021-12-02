import pug from "pug-runtime";

export const template = pug`
section(data-state='class:inputStringClassName')
    label(data-state='class:labelClassName,label')
    input(data-state='class:inputClassName,name:inputName,type:inputType,value:value')
    p(data-state='class:errorMessageClassName,errorMessage')
`;
