import { BaseComponent, TChildren } from "../../components/baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./errorPageTmpl.tmpl.js";
import { ButtonTransparent } from "../../components/buttonTransparent";
import style from "./errorPageTmpl.css";

type TErrorPageTmplBuildCtx = {
	header: Node;
	main: Node;
};

export class ErrorPageTmpl extends BaseComponent<
	null,
	null,
	TErrorPageTmplBuildCtx
> {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}

	initChildren(): TChildren {
		const button = new ButtonTransparent({
			text: "Назад к чатам",
			type: "button",
		});
		button.build({ handleClick: () => location.assign("/messenger") });

		return {
			header: this.buildContext.header,
			main: this.buildContext.main,
			button: button.ref,
		};
	}
}
