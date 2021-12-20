import { htmlFromStr } from "../../utils/htmlFrom";
import { BaseComponent } from "../baseComponent";
import { template } from "./leftNavPanelContent.tmpl.js";

export class LeftNavPanelContent extends BaseComponent {
	render(): HTMLElement {
		return htmlFromStr(template());
	}
}
