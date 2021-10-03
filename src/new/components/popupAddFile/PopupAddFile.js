import { Component } from "../../libs/components";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./popupAddFile.tmpl.js";
import { ButtonChatPopup } from "../buttonChatPopup";
import { List } from "../list";
import { PopupWrapper } from "../popupWrapper";
import imageSrc from "./imageIcon.png";
import fileSrc from "./fileIcon.png";
import "./popupAddFile.css";
import style from "./popupAddFile.css.json";
import { Popup } from "../popup";
import { ButtonAddFile } from "../buttonAddFile";

export class PopupAddFile extends Component {
  componentWillMount() {
    this.togglePopup = this.togglePopup.bind(this);
  }

  initialState() {
    return { isOpen: false };
  }

  togglePopup() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return {
      current: htmlFromStr(template({ style })),
      children: {
        popupWrapper: {
          Component: PopupWrapper,
          props: {
            children: {
              popup: {
                Component: Popup,
                props: {
                  popupClassName: style.root,
                  width: "192px",
                  position: "top",
                  isOpen: this.state.isOpen,
                  content: {
                    Component: List,
                    props: {
                      tag: "ul",
                      ulClassName: style.list,
                      liClassName: style.listItem,
                      items: [
                        {
                          Component: ButtonChatPopup,
                          props: {
                            imgSrc: imageSrc,
                            alt: "imageIcon",
                            text: "Фото или видео",
                            type: "button",
                          },
                        },
                        {
                          Component: ButtonChatPopup,
                          props: {
                            imgSrc: fileSrc,
                            alt: "fileIcon",
                            text: "Файл",
                            type: "button",
                          },
                        },
                      ],
                    },
                  },
                },
              },
              button: {
                Component: ButtonAddFile,
                props: {
                  onClick: this.togglePopup,
                  isActive: this.state.isOpen,
                },
              },
            },
          },
        },
      },
    };
  }
}
