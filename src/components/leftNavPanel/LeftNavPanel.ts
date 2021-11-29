import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import "./leftNavPanel.css";
import style from "./leftNavPanel.css.json";
import { template } from "./leftNavPanel.tmpl.js";

type TLeftNavPanelState = {
	rootClassName: string;
	backLinkClassName: string;
	linkTo: string;
};

type TLeftNavPanelProps = {
	linkTo: string;
};

export class LeftNavPanel extends BaseComponent<
	TLeftNavPanelState,
	TLeftNavPanelProps
> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TLeftNavPanelState {
		return {
			backLinkClassName: style.backLink,
			rootClassName: style.root,
			linkTo: this.props.linkTo,
		};
	}

	propsToState(): void {
		this.state.linkTo = this.props.linkTo;
	}
}
