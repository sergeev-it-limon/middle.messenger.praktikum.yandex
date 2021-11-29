import { eventBus } from "../../controllers/EventBus";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions, TChildren } from "../baseComponent";
import { ImageAvatar } from "../imageAvatar";
import "./profileAvatar.css";
import style from "./profileAvatar.css.json";
import { template } from "./profileAvatar.tmpl.js";

type TProfileAvatarState = {
	rootClassName: string;
	popupClassName: string;
};

export class ProfileAvatar extends BaseComponent<TProfileAvatarState> {
	render(): HTMLElement {
		return htmlFromStr(template());
	}

	initState(): TProfileAvatarState {
		return {
			rootClassName: style.root,
			popupClassName: style.popup,
		};
	}

	initChildren(): TChildren {
		const imageAvatar = new ImageAvatar({
			alt: "user avatar",
			sizeMod: "lg",
			src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
		});

		imageAvatar.build(null);

		return {
			imageAvatar: imageAvatar.ref,
		};
	}

	initActions(): TActions {
		return {
			handleClick: () => eventBus.emit("openEditAvatar", null),
		};
	}
}
