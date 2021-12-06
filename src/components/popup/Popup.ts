import { BaseComponent, TChildren } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./popup.tmpl.js";
import style from "./popup.css";

type TPopupState = {
	innerClassName: string;
	innerStyle: string;
};

export type TPopupMeta = {
	popupClassName: string;
	width: string;
	isOpenDefault: boolean;
	position: "top" | "bottom";
};

export abstract class Popup extends BaseComponent<TPopupState> {
	protected changeOpen(isOpen: boolean): void {
		this.state.innerClassName = this.getInnerClassName(isOpen);
	}

	private getInnerClassName(isOpen: boolean): string {
		const openClassName = isOpen ? style.inner_open : "";
		return `${style.inner} ${openClassName}`;
	}

	private getInnerStyle(): string {
		const { position, width } = this.initPopupMeta();

		if (position === "bottom") {
			return `top: calc(100% + 22px); right: 0; width: ${width};`;
		} else {
			return `bottom: calc(100% + 22px); width: ${width};`;
		}
	}

	render(): HTMLElement {
		const { popupClassName } = this.initPopupMeta();
		return htmlFromStr(template({ style, popupClassName }));
	}

	initState(): TPopupState {
		const { isOpenDefault } = this.initPopupMeta();

		return {
			innerClassName: this.getInnerClassName(isOpenDefault),
			innerStyle: this.getInnerStyle(),
		};
	}

	initChildren(): TChildren {
		return {
			content: this.initPopupContent(),
			trigger: this.initTrigger(),
		};
	}

	abstract initPopupContent(): HTMLElement;
	abstract initTrigger(): HTMLElement;
	abstract initPopupMeta(): TPopupMeta;
}
