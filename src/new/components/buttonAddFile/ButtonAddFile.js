import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./buttonAddFile.tmpl.js";
import "./buttonAddFile.css";
import style from "./buttonAddFile.css.json";

export class ButtonAddFile extends Component {
  render() {
    return {
      current: htmlFromStr(template({ style, isActive: this.props.isActive })),
      eventListeners: {
        onClick: this.props.onClick,
      },
    };
  }
}
