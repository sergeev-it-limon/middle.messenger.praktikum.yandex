import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatStub.tmpl";
import "./chatStub.css";
import style from "./chatStub.css.json";

export class ChatStub extends Component {
  render() {
    return {
      current: htmlFromStr(template({ style })),
    };
  }
}
