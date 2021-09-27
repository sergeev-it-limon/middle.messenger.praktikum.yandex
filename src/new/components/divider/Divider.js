import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./divider.tmpl.js";
import "./divider.css";
import style from "./divider.css.json";

export class Divider extends Component {
  render() {
    return {
      current: htmlFromStr(template({ style })),
    };
  }
}
