import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./buttonSubmitSendMessageForm.tmpl.js";
import "./buttonSubmitSendMessageForm.css";
import style from "./buttonSubmitSendMessageForm.css.json";

export class ButtonSubmitSendMessageForm extends Component {
  render() {
    return {
      current: htmlFromStr(template({ style })),
    };
  }
}
