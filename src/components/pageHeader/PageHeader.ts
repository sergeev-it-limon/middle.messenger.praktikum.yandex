import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import style from "./pageHeader.css";
import { template } from "./pageHeader.tmpl.js";

type TPageHeaderState = {
	rootClassName: string;
	text: string;
};

type TPageHeaderProps = {
	text: string;
};

export class PageHeader extends BaseComponent<
	TPageHeaderState,
	TPageHeaderProps
> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TPageHeaderState {
		return {
			rootClassName: style.root,
			text: this.props.text,
		};
	}

	propsToState(): void {
		this.state.text = this.props.text;
	}
}
