import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./imageAvatar.tmpl.js";
import "./imageAvatar.css";
import style from "./imageAvatar.css.json";
import { sizeMod } from "./sizeMod";

export class ImageAvatar extends Component {
  componentWillMount() {
    this.setStyleSize();
  }

  setStyleSize() {
    let styleSize;

    switch (this.props.sizeMod) {
      case sizeMod.sm:
        styleSize = style.size_sm;
        break;
      case sizeMod.md:
        styleSize = style.size_md;
        break;
      case sizeMod.lg:
        styleSize = style.size_lg;
        break;
      default:
        styleSize = style.size_md;
        break;
    }

    this.styleSize = styleSize;
  }

  render() {
    return {
      current: htmlFromStr(
        template({
          style: {
            root: `${style.root} ${this.styleSize}`,
            image: style.image,
          },
          ...this.props,
        })
      ),
    };
  }
}
