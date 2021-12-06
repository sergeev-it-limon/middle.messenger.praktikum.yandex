import { BaseComponent } from "../baseComponent";
import { htmlFromStr } from "../../utils/htmlFrom";
import { template } from "./profileLink.tmpl.js";
import style from "./profileLink.css";

export class ProfileLink extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template({ style }));
	}
}
