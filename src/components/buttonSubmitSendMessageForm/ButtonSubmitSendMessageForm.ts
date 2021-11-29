import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./buttonSubmitSendMessageForm.tmpl.js";
import "./buttonSubmitSendMessageForm.css";
import style from "./buttonSubmitSendMessageForm.css.json";

export class ButtonSubmitSendMessageForm extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}
}
