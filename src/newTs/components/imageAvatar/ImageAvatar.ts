import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./imageAvatar.tmpl.js";
import "./imageAvatar.css";
import style from "./imageAvatar.css.json";

export type TSizeMod = "sm" | "md" | "lg";

type TImageAvatarProps = {
	sizeMod: TSizeMod;
	src: string;
	alt: string;
};

type TImageAvatarState = {
	class: string;
	src: string;
	alt: string;
};

export class ImageAvatar extends BaseComponent<
	TImageAvatarState,
	TImageAvatarProps
> {
	getStyleSize(sizeMod: TSizeMod): string {
		let styleSize;

		switch (sizeMod) {
			case "sm":
				styleSize = style.size_sm;
				break;
			case "md":
				styleSize = style.size_md;
				break;
			case "lg":
				styleSize = style.size_lg;
				break;
			default:
				styleSize = style.size_md;
				break;
		}

		return styleSize;
	}

	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initState(): TImageAvatarState {
		return {
			alt: "",
			class: style.root,
			src: "",
		};
	}

	propsToState() {
		this.state.alt = this.props.alt;
		this.state.class = `${style.root} ${this.getStyleSize(this.props.sizeMod)}`;
		this.state.src = this.props.src;
	}
}
