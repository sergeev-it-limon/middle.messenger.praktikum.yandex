import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./popupWrapper.tmpl.js";
import "./popupWrapper.css";
import style from "./popupWrapper.css.json";

export class PopupWrapper extends Component {
  render() {
    return {
      current: htmlFromStr(template({ style })),
      children: this.props.children,
    };
  }
}
