import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./sidebar.tmpl.js";
import "./sidebar.css";
import style from "./sidebar.css.json";
import { ChatsList } from "../chatsList";
import { ProfileLink } from "../ProfileLink";
import { SearchChatForm } from "../searchChatForm";

export class Sidebar extends Component {
  render() {
    return {
      current: htmlFromStr(template({ style })),
      children: {
        profileLink: {
          Component: ProfileLink,
        },
        searchChatForm: {
          Component: SearchChatForm,
        },
        chatsList: {
          Component: ChatsList,
        },
      },
    };
  }
}
