import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./textLineClamp.tmpl";
import "./textLineClamp.css";
import style from "./textLineClamp.css.json";

export class TextLineClamp extends Component {
  render() {
    return {
      current: htmlFromStr(
        template({
          style,
          lineClamp: `-webkit-line-clamp: ${this.props.countStr};`,
        })
      ),
      children: {
        content: this.props.content,
      },
    };
  }
}
