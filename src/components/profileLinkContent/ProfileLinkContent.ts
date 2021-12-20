import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import { template } from "./profileLinkContent.tmpl.js";

type TProfileLinkContentState = {
	className: string;
};

type TProfileLinkContentProps = {
	className: string;
};

export class ProfileLinkContent extends BaseComponent<
	TProfileLinkContentState,
	TProfileLinkContentProps
> {
	protected render(): HTMLElement {
		return htmlFromStr(template());
	}

	protected initState(): TProfileLinkContentState {
		return {
			className: this.props.className,
		};
	}

	protected propsToState(): void {
		this.state.className = this.props.className;
	}
}
