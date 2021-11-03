import { TActions } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./popupAddFile.tmpl.js";
// import { ButtonChatPopup } from "../buttonChatPopup";
// import { List } from "../list";
// import { PopupWrapper } from "../popupWrapper";
import imageSrc from "./imageIcon.png";
import fileSrc from "./fileIcon.png";
import "./popupAddFile.css";
import style from "./popupAddFile.css.json";
import { Popup } from "../popup";
import { TPopupMeta } from "../popup/Popup";
import { PopupAddFileTrigger } from "../popupAddFileTrigger";
// import { Popup } from "../popup";
// import { ButtonAddFile } from "../buttonAddFile";

export class PopupAddFile extends Popup {
	private isOpen = false;
	private trigger: PopupAddFileTrigger;

	private handleTriggerClick(): void {
		this.isOpen = !this.isOpen;
		this.changeOpen(this.isOpen);
		this.trigger.update({ isActive: this.isOpen });
	}

	initPopupContent(): HTMLElement {
		return htmlFromStr("<div>PopupContent</div>");
	}

	initTrigger(): HTMLElement {
		this.trigger = new PopupAddFileTrigger(this.handleTriggerClick.bind(this), {
			isActive: this.isOpen,
		});
		this.trigger.build();
		return this.trigger.ref;
	}

	initPopupMeta(): TPopupMeta {
		return {
			isOpenDefault: false,
			popupClassName: style.root,
			position: "top",
			width: "192px",
		};
	}

	initActions(): TActions {
		return {
			changeOpen: () => {
				console.log("changeOpen");
				this.changeOpen(false);
			},
		};
	}

	// componentWillInit(): void {
	// 	this.togglePopup = this.togglePopup.bind(this);
	// }

	// render() {
	// 	return {
	// 		current: htmlFromStr(template({ style })),
	// 		children: {
	// 			popupWrapper: {
	// 				Component: PopupWrapper,
	// 				props: {
	// 					children: {
	// 						popup: {
	// 							Component: Popup,
	// 							props: {
	// 								popupClassName: style.root,
	// 								width: "192px",
	// 								position: "top",
	// 								isOpen: this.state.isOpen,
	// 								content: {
	// 									Component: List,
	// 									props: {
	// 										tag: "ul",
	// 										ulClassName: style.list,
	// 										liClassName: style.listItem,
	// 										items: [
	// 											{
	// 												Component: ButtonChatPopup,
	// 												props: {
	// 													imgSrc: imageSrc,
	// 													alt: "imageIcon",
	// 													text: "Фото или видео",
	// 													type: "button",
	// 												},
	// 											},
	// 											{
	// 												Component: ButtonChatPopup,
	// 												props: {
	// 													imgSrc: fileSrc,
	// 													alt: "fileIcon",
	// 													text: "Файл",
	// 													type: "button",
	// 												},
	// 											},
	// 										],
	// 									},
	// 								},
	// 							},
	// 						},
	// 						button: {
	// 							Component: ButtonAddFile,
	// 							props: {
	// 								onClick: this.togglePopup,
	// 								isActive: this.state.isOpen,
	// 							},
	// 						},
	// 					},
	// 				},
	// 			},
	// 		},
	// 	};
	// }
}
