import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TChildren } from "../baseComponent";
import { LeftNavPanelContent } from "../leftNavPanelContent";
import { Link } from "../link";
import style from "./leftNavPanel.css";
import { template } from "./leftNavPanel.tmpl.js";

type TLeftNavPanelState = {
	rootClassName: string;
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
			rootClassName: style.root,
		};
	}

	protected initChildren(): TChildren {
		const content = new LeftNavPanelContent(null);
		const link = new Link({
			className: style.backLink,
			href: this.props.linkTo,
		});

		content.build(null);
		link.build({ content: content.ref });

		return {
			link: link.ref,
		};
	}
}
