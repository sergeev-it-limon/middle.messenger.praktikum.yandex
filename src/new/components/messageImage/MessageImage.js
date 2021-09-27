import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./messageImage.tmpl.js";
import "./messageImage.css";
import style from "./messageImage.css.json";
import { formatTime } from "../../helpers/formatTime";

export class MessageImage extends Component {
  getTimeStr() {
    const date = new Date(this.props.time);
    return formatTime(date.getHours(), date.getMinutes());
  }
  render() {
    return {
      current: htmlFromStr(
        template({
          style,
          src: this.props.src,
          time: this.getTimeStr(),
        })
      ),
    };
  }
}
