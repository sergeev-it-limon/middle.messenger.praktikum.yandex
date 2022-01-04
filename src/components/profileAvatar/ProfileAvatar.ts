import { AuthController } from "../../controllers/authController";
import { eventBus } from "../../controllers/EventBus";
import { getImgSrc } from "../../utils/getImgSrc";
import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent, TActions, TChildren } from "../baseComponent";
import { ImageAvatar } from "../imageAvatar";
import { TSizeMod } from "../imageAvatar/ImageAvatar";
import style from "./profileAvatar.css";
import { template } from "./profileAvatar.tmpl.js";

type TProfileAvatarState = {
	rootClassName: string;
	popupClassName: string;
};

type TProfileAvatarBuildCtx = {
	src: string;
} | null;

export class ProfileAvatar extends BaseComponent<
	TProfileAvatarState,
	null,
	TProfileAvatarBuildCtx
> {
	private authController = new AuthController();
	private isInitSrc = false;

	private initSrc(): void {
		const src = this.authController.getState()?.avatar;
		if (src === null || src === "") {
			this.build({
				src: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=",
			});
		} else {
			this.build({ src: getImgSrc(src) });
		}
	}

	componentWillInit(): void {
		if (this.isInitSrc) return;

		this.isInitSrc = true;
		const src = this.authController.getState()?.avatar ?? null;

		if (src === null) {
			eventBus.subscribe("authStateUpdated", this.initSrc.bind(this));
		} else {
			this.initSrc();
		}
	}

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
			sizeMod: TSizeMod.lg,
			src: this.buildContext?.src ?? "",
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
