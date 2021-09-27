import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./profileLink.tmpl";
import "./profileLink.css";
import style from "./profileLink.css.json";

export class ProfileLink extends Component {
  render() {
    return {
      current: htmlFromStr(template({ style })),
    };
  }
}
