import { Component } from "../../libs/components";
import { template } from "./inputSendMessage.tmpl";
import { htmlFromStr } from "../../utils/htmlFrom";
import "./inputSendMessage.css";
import style from "./inputSendMessage.css.json";

export class InputSendMessage extends Component {
  render() {
    return {
      current: htmlFromStr(template({ style, name: this.props.name })),
    };
  }
}
