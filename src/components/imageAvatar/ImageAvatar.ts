import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./imageAvatar.tmpl.js";
import style from "./imageAvatar.css";

export enum TSizeMod {
	sm = "sm",
	md = "md",
	lg = "lg",
}

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
			case TSizeMod.sm:
				styleSize = style.size_sm;
				break;
			case TSizeMod.md:
				styleSize = style.size_md;
				break;
			case TSizeMod.lg:
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

	propsToState(): void {
		this.state.alt = this.props.alt;
		this.state.class = `${style.root} ${this.getStyleSize(this.props.sizeMod)}`;
		this.state.src = this.props.src;
	}
}
