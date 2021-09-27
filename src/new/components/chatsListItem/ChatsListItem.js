import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom.js";
import { template } from "./chatsListItem.tmpl.js";
import "./chatsListItem.css";
import style from "./chatsListItem.css.json";
import { ChatSelectableElem } from "../chatSelectableElem";

export class ChatsListItem extends Component {
  render() {
    const { isActive, chatId, testHandler, ...otherProps } = this.props;
    const styleLinkActive = this.props.isActive ? style.link_active : "";

    return {
      current: htmlFromStr(
        template({
          style: {
            root: style.root,
            link: `${style.link} ${styleLinkActive}`,
          },
          isActive,
          chatId,
        })
      ),
      children: {
        chatSelectableElem: {
          Component: ChatSelectableElem,
          props: otherProps,
        },
      },
      eventListeners: { testHandler },
    };
  }
}
