import { Component, ComponentDefault } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom.js";
import { template } from "./chatSelectableElem.tmpl.js";
import "./chatSelectableElem.css";
import style from "./chatSelectableElem.css.json";
import { ImageAvatar } from "../imageAvatar";
import { TextLineClamp } from "../textLineClamp";

export class ChatSelectableElem extends Component {
  render() {
    const { src, alt, name, previewText, ...otherProps } = this.props;

    return {
      current: htmlFromStr(template({ style, ...otherProps })),
      children: {
        imageAvatar: {
          Component: ImageAvatar,
          props: { src, alt },
        },
        name: {
          Component: TextLineClamp,
          props: {
            countStr: 1,
            content: {
              Component: ComponentDefault,
              props: {
                tag: "h2",
                attributes: {
                  class: style.name,
                },
                innerText: name,
              },
            },
          },
        },
        previewText: {
          Component: TextLineClamp,
          props: {
            countStr: 2,
            content: {
              Component: ComponentDefault,
              props: {
                tag: "p",
                attributes: {
                  class: style.previewText,
                },
                innerText: previewText,
              },
            },
          },
        },
      },
    };
  }
}
