import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./popup.tmpl.js";
import "./popup.css";
import style from "./popup.css.json";

export class Popup extends Component {
  render() {
    this.popupComponent = htmlFromStr(
      template({
        style,
        popupClassName: this.props.popupClassName,
        width: this.props.width,
        position: this.props.position,
        isOpen: this.props.isOpen,
      })
    );

    return {
      current: this.popupComponent,
      children: { content: this.props.content },
    };
  }
}
