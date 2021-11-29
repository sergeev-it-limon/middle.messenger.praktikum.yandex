import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./message.tmpl.js";
import "./message.css";
import style from "./message.css.json";
import { formatTime } from "../../utils/formatTime";

type TMessageState = {
	className: string;
	text: string;
	time: string;
};

type TMessageProps = {
	type: "default" | "my";
	text: string;
	time: number;
};

export class Message extends BaseComponent<TMessageState, TMessageProps> {
	getClassType(): string {
		let className: string;

		switch (this.props.type) {
			case "default":
				className = style.type_default;
				break;
			case "my":
				className = style.type_my;
				break;
		}

		return className;
	}

	getTimeStr(): string {
		const date = new Date(this.props.time);
		return formatTime(date.getHours(), date.getMinutes());
	}

	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initState(): TMessageState {
		return {
			className: style.root,
			text: "",
			time: "",
		};
	}

	propsToState(): void {
		this.state.className = `${style.root} ${this.getClassType()}`;
		this.state.time = this.getTimeStr();
		this.state.text = this.props.text;
	}
}
