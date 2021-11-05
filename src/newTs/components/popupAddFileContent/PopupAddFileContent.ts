import { BaseComponent, TChildren } from "../baseComponent";
import { ButtonChatPopup } from "../buttonChatPopup";
import { List } from "../list";
import "./popupAddFileContent.css";
import style from "./popupAddFileContent.css.json";
import imageIcon from "./imageIcon.png";
import fileIcon from "./fileIcon.png";
import { template } from "./popupAddFileContent.tmpl.js";
import { htmlFromStr } from "../../utils/htmlFrom";

export class PopupAddFileContent extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initChildren(): TChildren {
		const list = new List({
			ulClassName: style.list,
			liClassName: style.listItem,
		});

		const buttonImg = new ButtonChatPopup({
			imgAlt: "add image button",
			text: "Фото или видео",
			imgClassName: style.icon,
			imgSrc: imageIcon,
			type: "button",
		});

		const buttonFile = new ButtonChatPopup({
			imgAlt: "add file button",
			text: "Файл",
			imgClassName: style.icon,
			imgSrc: fileIcon,
			type: "button",
		});

		buttonImg.build(null);
		buttonFile.build(null);
		list.build({ items: [buttonImg.ref, buttonFile.ref] });

		return {
			content: list.ref,
		};
	}
}
