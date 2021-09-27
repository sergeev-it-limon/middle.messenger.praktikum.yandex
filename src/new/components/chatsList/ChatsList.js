import { Component } from "../../libs/components";
import { getChatsData } from "../../mocks/getChatsData";
import { htmlFromStr } from "../../utils/htmlFrom";
import { ChatsListItem } from "../chatsListItem";
import { template } from "./chatsList.tmpl";
import "./chatsList.css";
import style from "./chatsList.css.json";

export class ChatsList extends Component {
  render() {
    const data = getChatsData();

    return {
      current: htmlFromStr(
        template({
          style,
          itemIds: data.map((item) => item.chatId),
        })
      ),
      children: data.reduce((items, props) => {
        items[`item_${props.chatId}`] = {
          Component: ChatsListItem,
          props,
        };

        return items;
      }, {}),
    };
  }
}
