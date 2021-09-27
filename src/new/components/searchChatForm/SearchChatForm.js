import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./searchChatForm.tmpl.js";
import { InputSearch } from "../inputSearch";
import { getFormEntries } from "../../utils/getFormEntries";

export class SearchChatForm extends Component {
  submitHandler(e) {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = getFormEntries(form);

    console.log("Сабмит формы поиска чата");
    console.log(formData);
  }

  render() {
    return {
      current: htmlFromStr(template({ style: {} })),
      eventListeners: {
        submitHandler: this.submitHandler,
      },
      children: {
        inputSearch: {
          Component: InputSearch,
          props: {
            name: "searchedText",
          },
        },
      },
    };
  }
}
