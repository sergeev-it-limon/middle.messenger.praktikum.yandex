import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./messageImage.tmpl.js";
import "./messageImage.css";
import style from "./messageImage.css.json";
import { formatTime } from "../../utils/formatTime";

type TMessageImageState = {
	time: string;
	src: string;
};

type TMessageImageProps = {
	time: number;
	src: string;
};

export class MessageImage extends BaseComponent<
	TMessageImageState,
	TMessageImageProps
> {
	getTimeStr() {
		const date = new Date(this.props.time);
		return formatTime(date.getHours(), date.getMinutes());
	}

	render() {
		return htmlFromStr(template({ style }));
	}

	initState(): TMessageImageState {
		return {
			src: "",
			time: "",
		};
	}

	propsToState(): void {
		this.state.src = this.props.src;
		this.state.time = this.getTimeStr();
	}
}
