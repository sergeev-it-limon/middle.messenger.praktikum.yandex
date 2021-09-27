import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatSelected.tmpl.js";
import "./chatSelected.css";
import style from "./chatSelected.css.json";
import { getSelectedChatData } from "../../mocks/getSelectedChatData";
import { MessageImage } from "../messageImage";
import { Message } from "../message/Message";
import { Divider } from "../divider";

export class ChatSelected extends Component {
  getMeta(messagesData) {
    return messagesData.reduce((meta, mesByDay) => {
      meta.push(this.getDateMeta(mesByDay.timeDay));

      for (let mes of mesByDay.messages) {
        meta.push(this.getMessageMeta(mes));
      }

      return meta;
    }, []);
  }

  getMessageMeta(mes) {
    const mesMeta = {};

    if (mes.isMy) {
      mesMeta.type = "myMessage";
    } else {
      mesMeta.type = "message";
    }

    mesMeta.id = mes.id;

    return mesMeta;
  }

  getDateMeta(time) {
    const date = new Date(time);

    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    const dateStr = `${day}.${month}.${year}`;
    const dateStrNorm = dateStr.replace(/^\d(?=\.)|(?<=\.)\d(?=\.)/g, "0$&");

    return {
      type: "date",
      id: time,
      dateValue: dateStrNorm,
    };
  }

  mesDataToShallowArr(mesData) {
    return mesData.reduce((acc, mesByDay) => {
      return acc.concat(mesByDay.messages);
    }, []);
  }

  getImgMesChild(mes) {
    return {
      Component: MessageImage,
      props: {
        src: mes.content.src,
        time: mes.content.time,
        type: mes.isMy ? "my" : "default",
      },
    };
  }

  getTextMesChild(mes) {
    console.log(mes);
    return {
      Component: Message,
      props: {
        text: mes.content.text,
        time: mes.content.time,
        type: mes.isMy ? "my" : "default",
      },
    };
  }

  render() {
    const messagesData = getSelectedChatData();

    const messagesMeta = this.getMeta(messagesData);
    const mesDataShallow = this.mesDataToShallowArr(messagesData);

    const mesChildren = mesDataShallow.reduce((children, mes) => {
      switch (mes.type) {
        case "message":
          children[`message_${mes.id}`] = this.getTextMesChild(mes);
          break;
        case "image":
          children[`message_${mes.id}`] = this.getImgMesChild(mes);
          break;
      }

      return children;
    }, {});

    return {
      current: htmlFromStr(template({ style, messagesMeta })),
      children: {
        dividerHeader: {
          Component: Divider,
        },
        dividerFooter: {
          Component: Divider,
        },
        ...mesChildren,
      },
    };
  }
}
