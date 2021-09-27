import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./message.tmpl.js";
import "./message.css";
import style from "./message.css.json";
import { formatTime } from "../../helpers/formatTime";

export class Message extends Component {
  getClassType() {
    let className;

    switch (this.props.type) {
      case "default":
        className = style.type_default;
        break;
      case "my":
        className = style.type_my;
        break;
    }

    return className;
  }

  getTimeStr() {
    const date = new Date(this.props.time);
    return formatTime(date.getHours(), date.getMinutes());
  }

  render() {
    return {
      current: htmlFromStr(
        template({
          style,
          text: this.props.text,
          time: this.getTimeStr(),
          classType: this.getClassType(),
        })
      ),
    };
  }
}
