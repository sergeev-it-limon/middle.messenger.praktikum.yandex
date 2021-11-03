import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./buttonChatPopup.tmpl";
import "./buttonChatPopup.css";
import style from "./buttonChatPopup.css.json";

export class ButtonChatPopup extends BaseComponent {
	render() {
		return {
			current: htmlFromStr(template({ style, type: this.props.type })),
			children: {
				img: {
					Component: ComponentDefault,
					props: {
						tag: "img",
						attributes: {
							src: this.props.imgSrc,
							alt: this.props.imgAlt,
							class: this.props.imgClassName,
						},
					},
				},
				text: {
					Component: ComponentDefault,
					props: {
						tag: "span",
						innerText: this.props.text,
						attributes: { class: style.text },
					},
				},
			},
		};
	}

	initChildren(): TChildren {
		return {
			img: htmlFromStr("<div>img</div>"),
			text: htmlFromStr("<div>text</div>"),
		};
	}
}
