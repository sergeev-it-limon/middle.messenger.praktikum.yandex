import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions } from "../baseComponent";
import { template } from "./buttonMain.tmpl.js";
import style from "./buttonMain.css";

type TButtonMainState = {
	rootClassName: string;
	text: string;
};

type TButtonMainProps = {
	text: string;
};

type TButtonMainBuildCtx = {
	handleClick: (e: MouseEvent) => void;
} | null;

export class ButtonMain extends BaseComponent<
	TButtonMainState,
	TButtonMainProps,
	TButtonMainBuildCtx
> {
	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	protected initState(): TButtonMainState {
		return {
			rootClassName: style?.root,
			text: this.props.text,
		};
	}

	protected propsToState(): void {
		this.state.text = this.props.text;
	}

	protected initActions(): TActions {
		const actions: TActions = {};

		if (typeof this.buildContext?.handleClick === "function") {
			(actions.handleClick as unknown as (e: MouseEvent) => void) =
				this.buildContext.handleClick;
		}

		return actions;
	}
}
