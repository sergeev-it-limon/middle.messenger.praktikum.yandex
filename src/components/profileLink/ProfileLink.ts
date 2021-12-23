import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./profileLink.tmpl.js";
import style from "./profileLink.css";
import { Link } from "../link";
import { ProfileLinkContent } from "../profileLinkContent";

type TProfileLinkState = {
	rootWrapperClassName: string;
};

export class ProfileLink extends BaseComponent<TProfileLinkState> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	protected initState(): TProfileLinkState {
		return {
			rootWrapperClassName: style.root__Wrapper,
		};
	}

	protected initChildren(): TChildren {
		const content = new ProfileLinkContent({ className: style.icon });
		const link = new Link({ className: style.root, href: "/settings" });

		content.build(null);
		const fg = document.createDocumentFragment();

		fg.append("Профиль");
		fg.appendChild(content.ref);

		link.build({ content: fg });

		return {
			link: link.ref,
		};
	}
}
