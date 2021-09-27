import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./inputSearch.tmpl.js";
import "./inputSearch.css";
import style from "./inputSearch.css.json";

export class InputSearch extends Component {
  render() {
    return {
      current: htmlFromStr(template({ style, name: this.props.name })),
    };
  }
}
