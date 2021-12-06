import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./textLineClamp.tmpl.js";
import style from "./textLineClamp.css";

type TTextLineClampState = {
	lineClamp: string;
};

type TTextLineClampProps = {
	countStr: number;
	content: HTMLElement;
};

export class TextLineClamp extends BaseComponent<
	TTextLineClampState,
	TTextLineClampProps
> {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initChildren(): TChildren {
		return {
			content: this.props.content,
		};
	}

	initState(): TTextLineClampState {
		return {
			lineClamp: "",
		};
	}

	propsToState(): void {
		this.state.lineClamp = `-webkit-line-clamp: ${this.props.countStr};`;
	}
}
