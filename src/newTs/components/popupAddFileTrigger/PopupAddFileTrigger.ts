import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions } from "../baseComponent";
import { template } from "./popupAddFileTrigger.tmpl.js";
import "./popupAddFileTrigger.css";
import style from "./popupAddFileTrigger.css.json";

type TPopupAddFileTriggerProps = {
	isActive: boolean;
};

type TPopupAddFileTriggerState = {
	className: string;
};

export class PopupAddFileTrigger extends BaseComponent<
	TPopupAddFileTriggerState,
	TPopupAddFileTriggerProps
> {
	private handleClick: (e: Event) => void;

	private getClassName(): string {
		const classNameActive = `${style.root} ${style.root_active}`;
		const className = this.props.isActive ? classNameActive : style.root;
		return className;
	}

	constructor(
		handleClick: (e: Event) => void,
		props: TPopupAddFileTriggerProps
	) {
		super(props);
		this.handleClick = handleClick;
	}

	propsToState(): void {
		this.state.className = this.getClassName();
	}

	render(): HTMLElement {
		return htmlFromStr(template({ iconClassName: style.icon }));
	}

	initState(): TPopupAddFileTriggerState {
		return {
			className: this.getClassName(),
		};
	}

	initActions(): TActions {
		return {
			handleClick: this.handleClick,
		};
	}
}
