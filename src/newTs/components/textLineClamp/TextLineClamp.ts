import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./textLineClamp.tmpl";
import "./textLineClamp.css";
import style from "./textLineClamp.css.json";

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
		console.log(template({ style }));
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

	propsToState() {
		this.state.lineClamp = `-webkit-line-clamp: ${this.props.countStr};`;
	}
}
