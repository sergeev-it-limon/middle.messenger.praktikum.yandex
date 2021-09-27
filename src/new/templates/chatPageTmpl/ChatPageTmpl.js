import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./chatPageTmpl.tmpl.js";
import "./chatPageTmpl.css";
import style from "./chatPageTmpl.css.json";

export class ChatPageTmpl extends Component {
  render() {
    console.log(this.props);
    return {
      current: htmlFromStr(template({ style })),
      children: {
        sidebar: this.props.sidebar,
        mainContent: this.props.mainContent,
      },
    };
  }
}
