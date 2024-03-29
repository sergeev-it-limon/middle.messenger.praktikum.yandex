import pug from "pug-runtime";

export const template = pug`
section(class=style.root)
    div(data-component='sidebar')
    main(class=style.mainContent)
        div(data-component='mainContent')
    div(data-component='addUserModal')
    div(data-component='removeUserModal')
`;
