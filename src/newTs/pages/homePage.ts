import { ChatPageTmpl } from "../templates/chatPageTmpl";

export class HomePage extends ChatPageTmpl {
	initSidebar(): HTMLElement {
		const div = document.createElement("div");
		div.innerText = "sidebar";
		return div;
	}
	initMainContent(): HTMLElement {
		const div = document.createElement("div");
		div.innerText = "MainContent";
		return div;
	}
}
